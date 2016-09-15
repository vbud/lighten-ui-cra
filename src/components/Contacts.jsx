import React, { PropTypes } from 'react'
import _ from 'lodash'
import DataBlock from '../components/DataBlock'
import {contacts, addressKeys} from '../constants/properties'

export default class Contacts extends React.Component {

  static propTypes = {
    organization: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
  }

  render () {
    const {organization, onSave} = this.props

    return (
      <div>
        <h2>{contacts.label}</h2>
        {
          Object.keys(_.get(organization, contacts.path))
            // find all the non-location contacts (`service_site` contact === location)
            .filter((contactKey) => !contactKey.match(new RegExp(addressKeys.join('|'), 'i')))
            .map((contactKey) => {
              const path = `${contacts.path}.${contactKey}.value`
              const contact = _.get(organization, path)
              console.log(path, contact)
              return <DataBlock
                key={contactKey}
                label={contactKey}
                value={contact}
                onSave={onSave(path)} />
            })
        }
      </div>
    )
  }
}
