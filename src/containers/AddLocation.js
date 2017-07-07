/* global google */

import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { List, ListItem } from 'react-mdc-web'
import LocationListItem from '../components/LocationListItem'
import { mapGooglePlaceToSchemaPlace } from '../functions'
import { resolve } from 'path'

const hachiko = require('../assets/images/hachiko.jpg')

// @todo move to db
const tables = [
  {
    name: 'leonhart',
    icon: 'leonhart.ico'
  },
  {
    name: 'fireball',
    icon: 'fireball.ico'
  },
  {
    name: 'garlando',
    icon: 'garlando.ico'
  },
  {
    name: 'lettner',
    icon: 'lettner.ico'
  },
  {
    name: 'ullrich',
    icon: 'ullrich.ico'
  }
]

class AddLocation extends React.Component {
  // @todo fetch locations around
  // @todo fulfill the form with address data
  // @todo make tables editable
  // @todo make custom comment editable
  constructor(props) {
    super(props)
    this.state = {
      locations: [],
      fetchLocations: false
    }
  }

  componentWillReceiveProps(props) {
    if (
      props.position.status === 'success' &&
      this.state.fetchLocations !== true
    ) {
      this.setState({ fetchLocations: true })
      this.fetchNearBy().then(locations =>
        this.setState({
          locations: locations,
          fetchLocations: false
        })
      )
    }
  }

  fetchNearBy() {
    console.log('hit')
    return new Promise(resolve => {
      const { lat, lon } = this.props.position

      function initialize() {
        var pyrmont = new google.maps.LatLng(lat, lon)

        const map = new google.maps.Map(document.getElementById('map'), {
          center: pyrmont,
          zoom: 15
        })

        var request = {
          location: pyrmont,
          radius: '100',
          type: ['restaurant']
        }

        const service = new google.maps.places.PlacesService(map)
        service.nearbySearch(request, callback)
      }

      const callback = (places, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          resolve(places)
        }
      }

      initialize()
    })
  }

  render() {
    let user = this.props.user
    return (
      <div>
        <h1>Add a location</h1>
        <div>
          {this.state.locations.map(location => (
            <LocationListItem
              key={location.id}
              user={user}
              item={mapGooglePlaceToSchemaPlace(location)}
            />
          ))}
        </div>
        <div id="map" />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    items: state.items,
    selectedItem: state.selectedItem,
    user: state.user,
    position: state.position
  }
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(SearchPageActions, dispatch)
// }

export default connect(mapStateToProps)(AddLocation)
