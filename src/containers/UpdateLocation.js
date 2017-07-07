import React from 'react'
import { Router, Route, Link } from 'react-router-dom'
import VenueForm from './forms/venue'


export default class UpdateLocation extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      locationId: this.props.params.venueId,
      venue: {},
      dataValid: false,
    }
  }

  componentDidMount () {
    this.getVenue()
  }

  getVenue () {
    let endpoint = '/location'
    // $.ajax({
    //   url: endpoint,
    //   contentType: "application/json charset=utf-8",
    //   dataType: 'json',
    //   type: 'POST',
    //   data: JSON.stringify({
    //     id: this.props.params.venueId,
    //   }),
    //   success: function (data) {
    //     // console.log(data)
    //     this.setState({
    //       venue: data._source
    //     })
    //     // this.state.items = data.hits.hits
    //   }.bind(this),
    //   error: function (xhr, status, err) {
    //     console.error(endpoint, status, err.toString())
    //   }.bind(this)
    // })
  }

  render () {

    let response
    if(this.state.dataValid){
      response = (
        <div>
          <h3>Danke für deine Hilfe</h3>
          <Link
            className="btn btn-success btn-lg btn-block"
            to="/search"
          >
            Zurück zur Hauptseite
          </Link>
        </div>
      )
    } else {
      if(this.state.venue){
        response = (
          <VenueForm
            data={this.state.venue}
            venueId={this.props.params.venueId}
          />
        )
      } else {
        response = (
          <div>Bin laden ... </div>
        )
      }
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            {response}
          </div>
        </div>
      </div>
    )
  }
}
