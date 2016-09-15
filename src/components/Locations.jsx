import React, { PropTypes } from 'react'
import {get as _get} from 'lodash'
import Location from '../components/Location'
import {addressKeys} from '../constants/properties'

export default class Locations extends React.Component {

  static propTypes = {
    organization: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
  }

  render () {
    const {organization, onSave} = this.props

    // find all the `service_site` contacts (`service_site` contact === location)
    const paths = Object.keys(organization.json.contacts)
      .filter((contactKey) => contactKey.match(new RegExp(addressKeys.join('|'), 'i')))
      .map((contactKey) => `json.contacts.${contactKey}.value`)

    return (
      <div className="Locations">{
        paths.map((path) => <Location
          key={path}
          location={_get(organization, path)}
          onSave={onSave(path)} />
        )
      }</div>
    )
  }

  onChange = (value) => {
    this.setState({value: Location.formatValue(value)})
  }

  onSave = (value) => {
    this.props.onSave(Location.formatValue(value))
  }

  static formatValue = (value) => {
    return value.split(', ')
  }
}
