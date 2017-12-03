import React from 'react'
import { Link } from 'react-router-dom'
import {
  Drawer,
  DrawerHeader,
  DrawerContent,
  DrawerSpacer,
  DrawerHeaderContent,
  Navigation,
  Icon
} from 'react-mdc-web'
import { closeDrawer } from '../modules/navigation/actions'

class Menu extends React.Component {
  render() {
    return (
      <Drawer
        open={this.props.open}
        onClose={() => {
          this.setState({ isOpen: false })
        }}
      >
        <DrawerContent>
          {/* I add a small timeout just to realise the navigation element response */}
          <Navigation
            onClick={() =>
              setTimeout(() => this.props.dispatch(closeDrawer()), 200)
            }
          >
            <DrawerHeader>
              <DrawerHeaderContent>Menu</DrawerHeaderContent>
            </DrawerHeader>
            <Link to="/user/current">
              <Icon name="account_circle" />Profile
            </Link>
            <Link to="/search-page">
              <Icon name="search" />Search Page
            </Link>
            <Link to="/add-location">
              <Icon name="add_location" />
              Add Location
            </Link>
            <Link to="/events">
              <Icon name="event" />Events
            </Link>
            <DrawerSpacer />
            <Link to="/techniques">Techniken</Link>
            <Link to="/about">About</Link>
          </Navigation>
        </DrawerContent>
      </Drawer>
    )
  }
}

export default Menu
