import React, {Component, PropTypes} from 'react'

import {useSheet} from '../jss'

const styles = {
  DataBlock: {
    'margin-bottom': '1rem',
  },
  label: {
    color: '#888',
  },
  input: {
    display: 'block',
  },
  textarea: {
    width: '30rem',
    height: '10rem',
  }
}

export class DataBlock extends Component {

  static propTypes = {
    type: PropTypes.string.isRequired,
    onSave: PropTypes.func.isRequired,
    InputTag: PropTypes.string.isRequired,
    label: PropTypes.string,
    value: PropTypes.node,
    values: PropTypes.node,
    editMarkup: PropTypes.node,
    valueMarkup: PropTypes.node,
    onChange: PropTypes.func,
    changeValue: PropTypes.func,
    changeValueInValues: PropTypes.func,
  }

  static defaultProps = {
    type: 'text',
    InputTag: 'input',
    onChange: () => {}
  }

  defaultChangeValue = (event) => {
    const {value} = event.target
    this.setState({value})
    this.props.onChange(value)
  }

  defaultChangeValueinValues = (index) => (event) => {
    const values = this.state.values.slice()
    values[index] = event.target.value
    this.setState({values})
    this.props.onChange(values)
  }

  constructor (props) {
    super(props)
    this.state = {
      isEditing: false,
      value: props.value,
      values: props.values,
    }
  }

  render () {
    const {
      label,
      type,
      InputTag,
      changeValue,
      changeValueInValues,
      editMarkup,
      valueMarkup,
      sheet: {classes},
    } = this.props
    const {
      isEditing,
      value,
      values
    } = this.state
    const changeValueFunc = changeValue || this.defaultChangeValue
    const changeValueInValuesFunc = changeValueInValues || this.defaultChangeValueinValues

    let dataMarkup
    if (isEditing) {
      // use custom edit rendered if provided
      if (editMarkup) {
        dataMarkup = editMarkup
      } else if (values) {
        dataMarkup = <div>{
          values.map((value, i) => {
            return <InputTag className={classes.input} key={i} type={type} value={value} onChange={changeValueInValuesFunc(i)} />
          })
        }</div>
      } else {
        dataMarkup = <InputTag className={classes.input} type={type} value={value} onChange={changeValueFunc} />
      }
    } else {
      if (valueMarkup) {
        dataMarkup = valueMarkup
      } else if (values) {
        dataMarkup = <div>{
          values.map((value, i) => {
            return <div key={i}>{value}</div>
          })
        }</div>
      } else {
        dataMarkup = <div>{value}</div>
      }
    }

    let buttonMarkup
    if (isEditing) {
      buttonMarkup =
        <div>
          <button onClick={this.save}>Save</button>
          <button onClick={this.cancel}>Cancel</button>
        </div>
    } else {
      buttonMarkup =
        <div>
          <button onClick={this.edit}>Edit</button>
        </div>
    }

    return (
      <div className={classes.DataBlock}>
        {label && <label className={classes.label}>{label}</label>}
        {dataMarkup}
        {buttonMarkup}
      </div>
    )
  }

  edit = () => {
    this.setState((state) => {
      return {
        ...state,
        isEditing: true
      }
    })
  }

  cancel = () => {
    const {value, values} = this.props
    this.setState({
      isEditing: false,
      value,
      values,
    })
  }

  save = () => {
    this.props.onSave(this.state.value || this.state.values)
    this.setState({
      isEditing: false
    })
  }
}

export default useSheet(DataBlock, styles)
