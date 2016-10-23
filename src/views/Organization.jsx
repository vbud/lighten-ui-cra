import React, { PropTypes } from 'react'
import {get as _get, set as _set} from 'lodash'
import DataBlock from '../components/DataBlock'
import Locations from '../components/Locations'
import Hours from '../components/Hours'
import http from 'superagent'
import {
  notes,
  accessibility,
  eligiblePopulation,
  whatToBring,
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
            organization: response.body.json
          }
        })
      })
  }

  render () {
    const {organization} = this.state
    if (!organization) return null
    console.log(organization)

    const {classes} = this.props.sheet 

    return (
      <div className={classes.Organization}>
        <section>
          <h1>{organization.name}</h1>
          <p>{organization.description}</p>
        </section>

        <section>
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
          <h2>Usage requirements</h2>
          <DataBlock
            label={languagesSpoken.label}
            values={_get(organization, languagesSpoken.path)}
            onSave={this.onSave(languagesSpoken.path)}
          />
          <DataBlock
            label={eligiblePopulation.label}
            values={_get(organization, eligiblePopulation.path)}
            onSave={this.onSave(eligiblePopulation.path)}
          />
          <DataBlock
            label={whatToBring.label}
            values={_get(organization, whatToBring.path)}
            onSave={this.onSave(whatToBring.path)}
          />
          <DataBlock
            label={accessibility.label}
            values={_get(organization, accessibility.path)}
            onSave={this.onSave(accessibility.path)}
          />
          <DataBlock
            label={faithBased.label}
            value={_get(organization, faithBased.path)}
            onSave={this.onSave(faithBased.path)}
          />
        </section>

        <Locations
          organization={organization}
          onSave={this.onSave} />

        <section>
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
      .send({
        json: this.state.organization
      })
      .end((error, response) => {
        if (error) {
          return console.error(error)
        }
      })
  }
}

export default useSheet(Organization, styles)
