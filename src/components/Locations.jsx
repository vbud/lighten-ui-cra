import React, { PropTypes } from 'react'
import {get as _get} from 'lodash'

import {locations as locationsProperties} from '../constants/properties'

import Location from '../components/Location'

export default class Locations extends React.Component {

  static propTypes = {
    organization: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
  }

  render () {
    const {organization, onSave} = this.props

    const locations = _get(organization, locationsProperties.path)

    return (
      <section>
        <h2>{locationsProperties.label}</h2>
        <div className="Locations">{
          locations.map((location, index) => (
            <Location
              key={index}
              location={location}
              path={`${locationsProperties.path}[${index}]`}
              onSave={onSave} />
          ))
        }</div>

      </section>
    )
  }
}
