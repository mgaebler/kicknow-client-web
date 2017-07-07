import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Button, Modal, Col, Row, Glyphicon } from 'react-bootstrap'

import VenueDataMapper from './helpers/mapper'
/**
 * @deprecated
 */
export default class Item extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    onItemClick: PropTypes.function
  }

  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      isDeleted: false
    }

    this.venue = new VenueDataMapper(this.props.data)
  }

  handleItemOption(event) {
    this.setState({ showModal: true })
  }

  close() {
    this.setState({ showModal: false })
  }

  handleItemClick() {
    // console.log('click', this)
    this.props.onSelect(this.props.data)
  }

  /**
  Formats times with format hhmm
  */
  formatStringTime(timeString) {
    let hours = timeString.slice(-4, -2)
    let minutes = timeString.slice(-2)
    return hours + ':' + minutes
  }

  /**
  Creates a start rating from integers
  */
  createRating(num, key) {
    let rating = []
    for (let i = 0; i < num; i++)
      rating.push(<span className="glyphicon glyphicon-heart" />)
    return <div key={key}>{rating}</div>
  }

  /**
  Parses foursquare hours object and formats them
  */
  createHours(foursquareHours) {
    let today = new Date()
    let currentDay = today.getDay()
    currentDay = currentDay === 0 ? 7 : currentDay // sunday is 0
    let open = {}
    foursquareHours.hours.timeframes.forEach(timeframe => {
      if (timeframe.days.includes(currentDay)) {
        open = timeframe.open
      }
    })

    return open
  }

  createTable(table, key) {
    let setIcon = function(name) {
      let icon
      switch (name) {
        case 'Leonhart':
          icon = 'leonhart.ico'
          break
        case 'Fireball':
          icon = 'fireball.ico'
          break
        case 'Garlando':
          icon = 'garlando.ico'
          break
        case 'Lettner':
          icon = 'lettner.ico'
          break
        case 'Ullrich':
          icon = 'ullrich.ico'
          break
        default:
          return
      }
      return require('../assets/images/logos/' + icon)
    }
    return <img key={key} alt="icon" src={setIcon(table.name)} />
  }

  renderOpeningHours(open, key) {
    return (
      <span key={key}>
        {this.formatStringTime(open.start)} - {this.formatStringTime(open.end)}
      </span>
    )
  }

  render() {
    let venue = this.venue
    // console.log(venue)
    const getAddress = function(data) {
      let address = data.split(', ')
      return address[0] + ', ' + address[1]
    }

    const getPhotoPath = function(reference) {
      return '/photo/' + reference
    }

    const createPhoto = function(photo) {
      return (
        <img
          height="100"
          alt="Location"
          src={getPhotoPath(photo.photo_reference)}
          width="100"
        />
      )
    }

    let hours = ''
    if (Object.keys(venue.hours.hours).length > 0) {
      hours = this.renderOpeningHours(this.createHours(venue.hours))
    }

    let panelClass = this.props.selected
      ? 'card panel panel-info'
      : 'card panel panel-default'
    // let getCardStyle = function(){
    //   if(itemSource.google_places_data !== undefined && itemSource.google_places_data.photos !== undefined){
    //      return {
    //        backgroundImage: 'url(' + getPhotoPath(itemSource.google_places_data.photos[0].photo_reference) + ')',
    //        backgroundRepeat: 'no-repeat',
    //        backgroundPosition: 'center',
    //        backgroundSize: 'cover'
    //      }
    //   } else {
    //     return {}
    //   }
    // }

    let panelHeading = (
      <Col className="panel-heading" md={12}>
        <Row>
          <Col className="name" md={10} sm={10} xs={10}>
            {venue.name}
          </Col>
          <Col className="options" md={2} sm={2} xs={2}>
            <Glyphicon
              glyph="option-vertical"
              onClick={this.handleItemOption.bind(this)}
            />
          </Col>
        </Row>
      </Col>
    )

    let panelDash = (
      <Row className="panel-dash">
        <Col className="tile address" md={4} sm={4} xs={4}>
          <div>
            <Glyphicon glyph="map-marker" />
            {venue.distance}
          </div>
          <span className="text">{venue.address}</span>
        </Col>
        <Col className="tile hours" md={4} sm={4} xs={4}>
          <span className="glyphicon glyphicon-time" />
          <span className="text">{hours}</span>
        </Col>
        <Col className="tile" md={4} sm={4} xs={4}>
          <span className="glyphicon glyphicon-heart" />
          {venue.likes.likes.count}
        </Col>
      </Row>
    )

    let panelBody = (
      <Col className="panel-body" md={12}>
        <Row>
          <Col className="rating" md={6} sm={6} xs={6}>
            Player Level: {venue.playerLevel}
          </Col>
          <Col className="tables" md={6} sm={6} xs={6}>
            Tables: {venue.tables.map(this.createTable)}
          </Col>
        </Row>

        <Row>
          <Col className="additional_info" md={12} sm={12} xs={12}>
            {venue.additional_info}
          </Col>
        </Row>
      </Col>
    )

    let modalWindow = (
      <Modal onHide={this.close.bind(this)} show={this.state.showModal}>
        <Modal.Header closeButton>
          <Modal.Title>{venue.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <a
              className="btn btn-default col-xs-6 btn-warning"
              href={`/location/update/${venue.id}`}
            >
              Update this Venue?
            </a>

            <Link
              className="btn btn-default col-xs-6 btn-warning"
              to={`/update/${venue.id}`}
            >
              Update this Venue?
            </Link>

            <Button
              bsStyle="danger"
              className="col-xs-6"
              onClick={this.delete.bind(this)}
            >
              Delete this Venue?
            </Button>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.close.bind(this)}>Close</Button>
        </Modal.Footer>
      </Modal>
    )

    let response = <div />
    // just display an empty diff if the item is deleted
    if (!this.state.isDeleted) {
      response = (
        <Row
          className={panelClass}
          id={venue.id}
          key={venue.id}
          onClick={event => this.handleItemClick()}
        >
          {/*}
          <div
            className="card-background"
            style={getCardStyle()}
          >
          </div>
          {*/}

          {panelHeading}

          {panelDash}

          {panelBody}

          {modalWindow}
        </Row>
      )
    }

    return response
  }
}
