import React, { PropTypes } from 'react'
import {get as _get, set as _set} from 'lodash'
import DataBlock from '../components/DataBlock'
import Locations from '../components/Locations'
import Contacts from '../components/Contacts'
import Hours from '../components/Hours'
import http from 'superagent'
import {
  notes,
  usageRequirements,
  languagesSpoken,
  faithBased,
  services,
} from '../constants/properties'

import {useSheet} from '../jss'

const styles = {
  Organization: {
    padding: '0 1rem'
  },
}

export class Organization extends React.Component {

  static propTypes = {
    params: PropTypes.object.isRequired,
  }

  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    http.get(`/api/organizations/${this.props.params.organizationId}`)
      .end((error, response) => {
        if (error) {
          return console.error(error)
        }
        this.setState((state) => {
          return {
            ...state,
            organization: response.body
          }
        })
      })
  }

  render () {
    const {organization} = this.state
    if (!organization) return null

    const {classes} = this.props.sheet 

    return (
      <div className={classes.Organization}>
        <section>
          <h1>{organization.json.org_name}</h1>
          <p>{organization.json.description}</p>
        </section>
        <section>
          <Contacts
            organization={organization}
            onSave={this.onSave} />
          <Hours
            organization={organization}
            onSave={this.onSave}
          />
          <DataBlock
            InputTag="textarea"
            onSave={this.onSave(notes.path)}
            label={notes.label}
            value={_get(organization, notes.path)} />
        </section>

        <section>
          <h2>{usageRequirements.label}</h2>
          {this.atomsMarkup(usageRequirements.path)}
          <DataBlock
            label={languagesSpoken.label}
            values={_get(organization, languagesSpoken.path)}
            onSave={this.onSave(languagesSpoken.path)} />
          {this.atomsMarkup('json.accessiblity.accessibility_atoms')}
          <DataBlock
            label={faithBased.label}
            value={_get(organization, faithBased.path)}
            onSave={this.onSave(languagesSpoken.path)} />
        </section>

        <section>
          <h2>Locations</h2>
          <Locations
            organization={organization}
            onSave={this.onSave} />
        </section>

        <section>
          <h2>Services</h2>
          <DataBlock
            label={services.label}
            values={_get(organization, services.path)}
            onSave={this.onSave(services.path)}
          />
        </section>
      </div>
    )
  }

  onSave = (path) => (value) => {
    const {organization} = this.state
    console.log('before', _get(organization, path))
    _set(organization, path, value)
    console.log('after', _get(organization, path))
    this.setState({organization})

    http.put(`/api/organizations/${this.props.params.organizationId}/`)
      .send(this.state.organization)
      .end((error, response) => {
        if (error) {
          return console.error(error)
        }
      })
  }

  atomsMarkup = (pathToAtoms) => {
    const atoms = _get(this.state.organization, pathToAtoms)
    return atoms.reduce((acc, atom, i) => {
      if (atom.kind) {
        acc.push(<DataBlock
          key={atom.kind}
          label={atom.kind}
          values={atom.keys}
          onSave={this.onSave(`${pathToAtoms}[${i}].keys`)}
        />)
      }
      return acc
    }, [])
  }
}

export default useSheet(Organization, styles)
