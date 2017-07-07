import React from 'react'

import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import { openDrawer, closeDrawer } from '../modules/navigation/actions'

import {
  Toolbar,
  ToolbarRow,
  ToolbarTitle,
  ToolbarSection,
  Icon
} from 'react-mdc-web'
import Menu from './Menu'

class Navigation extends React.Component {
  static get propTypes() {
    return { onInput: PropTypes.func }
  }

  ESCAPE_KEY = 27

  constructor(props) {
    super(props)

    this.toggleDrawer = this.toggleDrawer.bind(this)
    this._handleKeyDown = this._handleKeyDown.bind(this)
  }

  componentWillMount() {
    document.addEventListener('click', this._handleDocumentClick, false)
    document.addEventListener('keydown', this._handleKeyDown.bind(this))
  }

  componentWillUnmount() {
    document.removeEventListener('click', this._handleDocumentClick, false)
    document.removeEventListener('keydown', this._handleKeyDown.bind(this))
  }

  _handleKeyDown(event) {
    switch (event.keyCode) {
      case this.ESCAPE_KEY:
        this.props.dispatch(closeDrawer())
        break
      default:
        this.props.dispatch(closeDrawer())
        break
    }
  }

  toggleDrawer() {
    this.props.dispatch(this.props.drawer ? closeDrawer() : openDrawer())
  }

  render() {
    return (
      <div>
        <Menu open={this.props.drawer} dispatch={this.props.dispatch} />
        <Toolbar fixed>
          <ToolbarRow>
            <ToolbarSection align="start">
              <Icon onClick={this.toggleDrawer} name="menu" />
            </ToolbarSection>
            <ToolbarSection align="start">
              <ToolbarTitle>Kicknow</ToolbarTitle>
            </ToolbarSection>
            <ToolbarSection align="end">
              <ToolbarTitle>
                <Icon name="account_circle" />
              </ToolbarTitle>
            </ToolbarSection>
          </ToolbarRow>
        </Toolbar>
      </div>
    )
  }
}

function mapStateToProps(state) {
  let { drawer } = state
  return {
    drawer
  }
}

export default connect(mapStateToProps)(Navigation)
