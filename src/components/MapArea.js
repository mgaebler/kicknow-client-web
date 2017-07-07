/*global L */
import React from 'react'
import PropTypes from 'prop-types'

// TODO the leaflet css and js is still loaded via cdn. It should be part of the package
//import L from 'leaflet'

export default class MapArea extends React.Component {
  static get propTypes() {
    return {
      selectedItem: PropTypes.object
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      canvas: 'small'
    }

    this.customMarkerIcon = L.icon({
      className: 'svg-marker',
      iconUrl: require('../assets/images/marker.png'),
      iconRetinaUrl: require('../assets/images/marker@2x.png'),
      iconSize: [25, 46],
      iconAnchor: [12, 46],
      popupAnchor: [0, -46]
    })

    this.userMarker = false
  }

  componentDidMount() {
    this.createMap()

    // @TODO: implement event listener for other browsers than webkit
    this.refs.mapContainer.addEventListener(
      'webkitTransitionEnd',
      this.adjustMap.bind(this)
    )

    window.addEventListener('scroll', this.hideMap.bind(this))
  }

  createMap() {
    this.map = L.map('MapCanvas', { zoomControl: false })

    // L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    // 	maxZoom: 19,
    // 	attribution: '&copy <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    // }).addTo(this.map)

    L.tileLayer(
      'http://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        attribution:
          '&copy <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }
    ).addTo(this.map)

    // L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
    // 	maxZoom: 18,
    // 	attribution: '&copy <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    // }).addTo(this.map)

    // L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IjZjNmRjNzk3ZmE2MTcwOTEwMGY0MzU3YjUzOWFmNWZhIn0.Y8bhBaUMqFiPrDRW9hieoQ', {
    // 	maxZoom: 18,
    // 	attribution: 'Map data &copy <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    // 		'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    // 		'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    // 	id: 'mapbox.streets'
    // }).addTo(this.map)

    this.map.locate({ setView: true, maxZoom: 16 })
    this.map.on('locationfound', this.onLocationFound.bind(this))
  }

  onLocationFound(e) {
    let radius = e.accuracy / 2
    // set user marker
    this.userMarker = L.marker(e.latlng).bindPopup('ME')
    // .openPopup()

    L.circle(e.latlng, radius).addTo(this.map)
  }

  /**
  Use an array of location items to create a layer of markers. Finaly the map
  is fitted to the marker bounds.
  */
  setMarkers(items) {
    let markers = []

    // set user marker
    if (this.userMarker) {
      markers.push(this.userMarker)
    }

    // set venue markers
    items.forEach(item => {
      if (
        item._source.geopoint !== undefined &&
        item._source.geopoint.lat &&
        item._source.geopoint.lon
      ) {
        let latLng = L.latLng([
          item._source.geopoint.lat,
          item._source.geopoint.lon
        ])
        let marker = L.marker(latLng, { icon: this.customMarkerIcon })
          .bindPopup(item._source.name)
          .openPopup()

        marker.id = item._id
        marker.name = item._source.name
        marker.on('click', () => this.props.onItemSelect(item))
        markers.push(marker)
      }
    })
    // console.log('Markers:', markers)
    if (this.markerLayer) {
      this.markerLayer.clearLayers()
    }

    if (markers.length > 0) {
      this.markerLayer = L.featureGroup(markers).addTo(this.map)
      // fit map bounds
      this.map.fitBounds(this.markerLayer.getBounds())
    }
  }

  adjustMap() {
    // execute after map transition
    this.map.invalidateSize()
    if (this.markerLayer) {
      this.map.fitBounds(this.markerLayer.getBounds())
    }
  }

  toggleMap() {
    this.state.canvas === 'small' ? this.showMap() : this.hideMap()
    // this.state.canvas = (this.state.canvas==='small')? 'full': 'small'
  }

  showMap() {
    if (this.state.canvas !== 'full') this.setState({ canvas: 'full' })
  }

  hideMap() {
    if (this.state.canvas !== 'small') this.setState({ canvas: 'small' })
  }

  /**
  Find the selected item and focus it on the map.
  */
  focusItem(item) {
    // console.log('selectedItem:', item)
    this.markerLayer.eachLayer(layer => {
      if (layer.id === item.id) {
        // console.log(selectedItem)
        // this.map.setView(layer.getLatLng())
        layer.bindPopup(layer.name).openPopup()
      }
    })
  }

  render() {
    let controlZoomClass =
      this.state.canvas === 'small'
        ? 'glyphicon glyphicon-resize-full'
        : 'glyphicon glyphicon-resize-small'

    // console.log('Items:', this.props.items)
    if (this.map) {
      this.setMarkers(this.props.items)
    }

    // set focus on item if at least one item exists
    if (this.props.selectedItem.id && this.props.items.length > 0) {
      this.focusItem(this.props.selectedItem)
    }

    return (
      <div className={this.state.canvas} id="MapContainer" ref="mapContainer">
        <div id="Controls">
          <span
            className={controlZoomClass}
            onClick={this.toggleMap.bind(this)}
          />
        </div>
        <div id="MapCanvas" />
      </div>
    )
  }
}
