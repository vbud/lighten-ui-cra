import React, { PropTypes } from 'react'
import DataBlock from '../components/DataBlock'

export default class Location extends React.Component {

  static propTypes = {
    label: PropTypes.string,
    location: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
  }

  constructor (props) {
    super(props)
    this.state = {
      value: props.location.addrtxtlines
    }
  }

  render () {
    const {value} = this.state
    const {name} = this.props.location

    const address = value.join(', ')
    const uriEncodedAddress = encodeURIComponent(address)
    const googleMapsIframeUrl = [
      'https://www.google.com/maps/embed/v1/place',
      '?key=AIzaSyCLeuAb-KkMbNrB489TN77duPkdsqHCTco',
      '&zoom=14',
      `&q=${uriEncodedAddress}`
    ].join('')

    return (
      <div className="Location">
        <DataBlock
          label={name}
          value={address}
          onSave={this.onSave} />
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

  onSave = (value) => {
    this.props.onSave(Location.formatValue(value))
  }

  static formatValue = (value) => {
    return value.split(', ')
  }
}
