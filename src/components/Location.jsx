import React, { PropTypes } from 'react'
import DataBlock from '../components/DataBlock'

export default class Location extends React.Component {

  static propTypes = {
    label: PropTypes.string,
    location: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
  }

  render () {
    const {location} = this.props

    const googleMapsIframeUrl = [
      'https://www.google.com/maps/embed/v1/place',
      '?key=AIzaSyCLeuAb-KkMbNrB489TN77duPkdsqHCTco',
      '&zoom=14',
      `&q=${encodeURIComponent(Location.buildAddressString(location.physical_address))}`
    ].join('')

    return (
      <div className="Location">
        {this.renderPhysicalAddress(location.physical_address)}
        <iframe
          width="600"
          height="450"
          frameBorder="0"
          style={{border: 0}}
          src={googleMapsIframeUrl}
          allowFullScreen></iframe>
      </div>
    )
  }

  renderPhysicalAddress (address) {
    return ['primary', 'city', 'state', 'zipcode', 'country'].map((key) => (
      <DataBlock
        key={key}
        label={key}
        value={address[key]}
        onSave={this.onSave(key)} />
    ))
  }

  onSave = (key) => (value) => {
    const {path, onSave} = this.props
    onSave(`${path}.physical_address.${key}`)(value)
  }

  static buildAddressString = ({primary, city, state, zipcode, country}) => `${primary} ${city} ${state} ${zipcode} ${country}`
}
