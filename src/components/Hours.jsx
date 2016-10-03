import React, {Component, PropTypes} from 'react';
import {get as _get} from 'lodash'
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

export class Hours extends Component {

  static propTypes = {
    organization: PropTypes.object,
    onSave: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      data: _get(props.organization, hours.path)
    }
  }

  render() {
    const {data} = this.state

    return (
      <DataBlock
        label="Hours"
        valueMarkup={this.renderHours(data)}
        editMarkup={this.renderEdit(data)}
      />
    )
    return (
      <div className="Hours">{
        data.map(({day, ranges}, index) => {
          return <DataBlock
            key={day}
            label={day}
            valueMarkup={this.renderRanges(ranges)}
            editMarkup={this.renderEditRanges(ranges, index)}
          />
        })
      }</div>
    )
  }

  renderHours (data) {
    return data.map(({day, ranges}) => {
      return <div>
        <div>{day}</div>
        <div>{
          ranges.map(({open, close}) => `${open} - ${close}`).join(', ')
        }</div>
      </div>
    })
  }

  renderEdit (data) {
    return data.map(({day, ranges}) => {
      return <div>
        <div>{day}</div>
        
      </div>
    })
  }

  renderEditRanges (ranges, dataIndex) {
    const {classes} = this.props.sheet

    return ranges.map((range, rangeIndex) => {
      return <div key={range[DAY]}>
        <input className={classes.time} type="text" value={range[OPEN]} onChange={this.changeRange(dataIndex, rangeIndex, OPEN)} />
        <input className={classes.time} type="text" value={range[CLOSE]} onChange={this.changeRange(dataIndex, rangeIndex, CLOSE)} />
      </div>
    })
  }

  changeRange = (dataIndex, rangeIndex, property) => ({target: {value}}) => {
    const data = {...this.state.data}
    data[dataIndex][rangeIndex][property] = value
    this.setState({data})
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

  getValueMarkup = (hoursAtoms) => {
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