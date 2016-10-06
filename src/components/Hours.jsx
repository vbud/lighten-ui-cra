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
  },
  td: {
    'padding-right': '8px',
  }
}

export class Hours extends Component {

  static propTypes = {
    organization: PropTypes.object,
    onSave: PropTypes.func.isRequired,
  }

  constructor (props) {
    super(props)
    this.state = {
      data: _get(props.organization, hours.path)
    }
  }

  render () {
    const {data} = this.state

    return (
      <DataBlock
        label="Hours"
        valueMarkup={this.renderHours(data)}
        editMarkup={this.renderEdit(data)}
        onSave={this.onSave}
      />
    )
  }

  renderHours (data) {
    const {classes} = this.props.sheet

    return <table>
      <tbody>{
        data.map(({day, ranges}, index) => {
          return <tr key={index}>
            <td className={classes.td}>{day}</td>
            <td className={classes.td}>{ranges.map(({open, close}) => `${open} - ${close}`).join(', ')}</td>
          </tr>
        })
      }</tbody>
    </table>
  }

  renderEdit (data) {
    const {classes} = this.props.sheet

    return data.map(({day, ranges}, dataIndex) => {
      return <div key={dataIndex}>
        <div>{day}</div>
        <div>{
          ranges.map(({open, close}, rangeIndex) => {
            return <div key={rangeIndex}>
              <input
                type="text"
                className={classes.time}
                value={open}
                onChange={this.changeRange(dataIndex, rangeIndex, 'open')}
              />
              <input
                type="text"
                className={classes.time}
                value={close}
                onChange={this.changeRange(dataIndex, rangeIndex, 'close')}
              />
            </div>
          })
        }</div>
      </div>
    })
  }

  changeRange = (dataIndex, rangeIndex, property) => ({target: {value}}) => {
    const data = [...this.state.data]
    data[dataIndex].ranges[rangeIndex][property] = value
    this.setState({data})
  }

  onSave = () => {
    this.props.onSave(hours.path)(this.state.data)
  }
}

export default useSheet(Hours, styles)