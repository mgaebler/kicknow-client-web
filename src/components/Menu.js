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
            <DrawerSpacer>Credits</DrawerSpacer>
            <Link to="/about">About</Link>
            <DrawerSpacer>Techniken</DrawerSpacer>
            <a href="#abroller">Abroller</a>
            <a href="#jet">Jet</a>
            <a href="#schuss-mit-handgelenk">Schuss mit Handgelenk</a>
            <a href="#diagonal-aussen">Diagonal Außen</a>
            <a href="#drop-fake">Drop Fake</a>
            <a href="#schieber">Schieber/Zieher</a>
            <a href="#rueckhand">Rückhand</a>
            <a href="#banden">Banden</a>
            <a href="#drop-long">Drop Long</a>
            <a href="#ticktack">TickTack</a>
            <a href="#gegenschieber">Gegenschieber/-zieher</a>
            <a href="#heber">Heber </a>
            <a href="#fast-drop">Fast Drop</a>
          </Navigation>
        </DrawerContent>
      </Drawer>
    )
  }
}

export default Menu
