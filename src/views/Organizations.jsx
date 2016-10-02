import React from 'react'
import { Link } from 'react-router'
import http from 'superagent'

import {useSheet} from '../jss'

const styles = {
  Organizations: {
    padding: '0 1rem'
  },
}

export class Organizations extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      organizations: [],
      search: '',
    }
  }

  componentDidMount () {
    http.get('/api/organizations/')
      .end((error, response) => {
        if (error) {
          return console.error(error)
        }
        this.setState((state) => {
          return Object.assign({}, state, {
            organizations: response.body.results
          })
        })
      })
  }

  render () {
    const {organizations, search} = this.state
    const {classes} = this.props.sheet

    return (
      <div className={classes.Organizations}>
        <input type="search" value={search} onChange={this.changeSearch} />
        <h1>Organizations</h1>
        <ul>{
          organizations.filter(({json: {name}}) => {
            return name.toLowerCase().match(search.toLowerCase())
          })
            .map(({id, json: {name}}) => {
              return <li key={id}><Link to={`organizations/${id.toString()}`}>{name}</Link></li>
            })
        }</ul>
      </div>
    )
  }

  changeSearch = (event) => {
    const {target: {value}} = event
    this.setState({search: value})
  }
}

export default useSheet(Organizations, styles)
