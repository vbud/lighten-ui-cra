import React from 'react'
import {Link} from 'react-router'

import {useSheet} from '../jss'

const styles = {
  header: {
    width: '100%',
    padding: '0 1rem',
    'border-bottom': '1px solid #eee',
    'line-height': '3rem',
  },
  h1: {
    'font-size': '1rem',
    margin: 0,
  },
  Link: {
    color: 'inherit',
    'text-decoration': 'none',
  }
}

export class Header extends React.Component {

  render () {
    const {classes} = this.props.sheet
    return (
      <header className={classes.header}>
        <h1 className={classes.h1}><Link className={classes.Link} to="/">lighten-ui!</Link></h1>
      </header>
    )
  }
}

export default useSheet(Header, styles)