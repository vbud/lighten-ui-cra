import React, {PropTypes} from 'react';
import _ from 'lodash'
import DataBlock from '../components/DataBlock'
import {hours} from '../constants/properties'
import {useSheet} from '../jss'

const styles = {
  day: {
    width: '130px'
  },
  time: {
    width: '70px'
  }
}

const DAY = 'day'
const OPEN = 'open'
const CLOSE = 'close'

export class Hours extends React.Component {

  static propTypes = {
    organization: PropTypes.object,
    onSave: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      data: _.get(props.organization, hours.path)
    }
  }

  render() {
    const {data} = this.state

    return (
      <div className="Hours">
        {
          Object.keys(data).map(key => {
            const hours = data[key]
            const displayLabel = key || '[no label]'
            return <DataBlock
              key={displayLabel}
              label={displayLabel}
              valueMarkup={Hours.getValueMarkup(hours.hours_atoms)}
              editMarkup={this.getEditMarkup(hours.hours_atoms, key)}
              onSave={this.onSave}
            />
          })
        }
      </div>
    )
  }

  onSave = () => {
    this.props.onSave(hours.path)(this.state.data)
  }

  changeHours = (key, index, property) => ({target: {value}}) => {
    const data = {...this.state.data}
    data[key].hours_atoms[index][property] = value
    this.setState({data})
  }

  getEditMarkup = (hoursAtoms, dataKey) => {
    const {classes} = this.props.sheet

    return hoursAtoms.map((atom, index) => {
      return <div key={index}>
        <input className={classes.day} type="text" value={atom[DAY]} onChange={this.changeHours(dataKey, index, DAY)}/>
        <input className={classes.time} type="text" value={atom[OPEN]} onChange={this.changeHours(dataKey, index, OPEN)}/>
        <input className={classes.time} type="text" value={atom[CLOSE]}
               onChange={this.changeHours(dataKey, index, OPEN)}/>
      </div>
    })
  }

  static getValueMarkup = (hoursAtoms) => {
    // create a key:value pair of day:hours
    const dayHoursMap = hoursAtoms.reduce((acc, atom) => {
      if (!Array.isArray(acc[atom.day])) {
        acc[atom.day] = []
      }
      acc[atom.day].push(`${atom.open} - ${atom.close}`)
      return acc
    }, {})
    return Object.keys(dayHoursMap).map((day) => {
      return <div key={day}>{`${day}: ${dayHoursMap[day].join(', ')}`}</div>
    })
  }
}

export default useSheet(Hours, styles)