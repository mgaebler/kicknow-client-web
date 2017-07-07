import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  openDrawer,
  closeDrawer,
  openUserMenu,
  closeUserMenu
} from '../modules/navigation/actions'
import { signIn, signOut } from '../modules/auth/operations'

import {
  Toolbar,
  ToolbarRow,
  ToolbarTitle,
  ToolbarIcon,
  ToolbarSection,
  Icon,
  MenuAnchor,
  MenuDivider,
  MenuItem,
  Menu
} from 'react-mdc-web'
import { Link } from 'react-router-dom'
import DrawerMenu from './Menu'

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
        this.props.dispatch(closeUserMenu())
        break
      default:
        this.props.dispatch(closeDrawer())
        this.props.dispatch(closeUserMenu())
        break
    }
  }

  toggleDrawer() {
    this.props.dispatch(this.props.drawer ? closeDrawer() : openDrawer())
  }
  toggleUserMenu() {
    this.props.dispatch(this.props.userMenu ? closeUserMenu() : closeUserMenu())
  }

  renderUserAvatar() {
    return (
      <span>
        <img
          onClick={() => this.props.dispatch(openUserMenu())}
          alt={this.props.user.displayName}
          style={{ height: 24, width: 24, borderRadius: '100%' }}
          src={this.props.user.photoURL}
        />
        {this.renderUserMenu()}
      </span>
    )
  }

  renderUserMenu() {
    return (
      <MenuAnchor>
        <Menu
          right
          open={this.props.userMenu}
          onClose={() => {
            // this.props.dispatch(closeUserMenu())
          }}
        >
          <MenuItem>
            <Link to={`/user/current`}>Profile</Link>
          </MenuItem>
          <MenuDivider />
          <MenuItem
            onClick={() => {
              signOut()
            }}
          >
            Sign Out
          </MenuItem>
        </Menu>
      </MenuAnchor>
    )
  }

  render() {
    return (
      <div>
        <DrawerMenu open={this.props.drawer} dispatch={this.props.dispatch} />
        <Toolbar fixed>
          <ToolbarRow>
            <ToolbarSection align="start">
              <ToolbarIcon>
                <Icon onClick={this.toggleDrawer} name="menu" />
              </ToolbarIcon>
              <ToolbarTitle>Kicknow</ToolbarTitle>
            </ToolbarSection>
            <ToolbarSection align="end">
              <ToolbarIcon>
                {!this.props.user.isAnonymous ? (
                  this.renderUserAvatar()
                ) : (
                  <Icon name="account_circle" onClick={() => signIn()} />
                )}
              </ToolbarIcon>
            </ToolbarSection>
          </ToolbarRow>
        </Toolbar>
      </div>
    )
  }
}

function mapStateToProps(state) {
  let { drawer, user, userMenu } = state
  return {
    drawer,
    user,
    userMenu
  }
}

export default connect(mapStateToProps)(Navigation)
