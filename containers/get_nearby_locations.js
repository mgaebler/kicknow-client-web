import React from 'react';
import { Link, Router, Route } from 'react-router';
import VenueList from '../components/venue_list';

export default class GetLocations extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      items: [],
      progress: {width: 1 + '%'}
    };
  }

  componentDidMount () {
    this.getPosition();

    // @todo: remove this and add a spinner
    // let count = 1;
    // function countUp(){
    //   this.setState({progress: {width: count++ + '%'}});
    //   if(count==100) clearInterval(interval);
    // }
    // let interval = setInterval(countUp.bind(this), 60);
  }

  getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition.bind(this));
      // geolocation support is available but the query failed.
      this.state.geoLocation = 'warning';
    } else {
      console.info("Geolocation is not supported by this browser.");
      this.state.geoLocation = 'error';
    }
  }

  showPosition(position) {
    // console.log("Latitude: " + position.coords.latitude + "Longitude: " + position.coords.longitude);
    this.getNearbyLocations(position.coords.latitude, position.coords.longitude);
  }

  getNearbyLocations (lat, lng) {

    $.ajax({
      url: '/fs/venues/nearby',
      contentType: "application/json; charset=utf-8",
      dataType: 'json',
      type: 'POST',
      data: JSON.stringify({
        latitude: lat,
        longitude: lng
      }),
      success: function (data) {
          this.setState({
            items: data.venues
          });
          // this.state.items = data.hits.hits;
      }.bind(this),
      error: function (xhr, status, err) {
          console.error(status, err.toString());
      }.bind(this)
    });
  }


  render () {

    var response;

    if(this.state.items.length > 0){
      response = (
        <div>
          <h3>Wähle einen der folgenden Orte</h3>
          <div>
            <VenueList venues={this.state.items} />
          </div>
        </div>
      );
    } else {
      // display a progress bar
      response = (
        <div>
          <h3>Lade Orte in deiner Nähe</h3>
          <div className="progress progress-striped active">
            <div
              className="progress-bar"
              style={this.state.progress}
            ></div>
          </div>
        </div>
      );
    }

    return(
      <div className="container">
        <div className="row">
          <div className="col-xs-12">

            {response}

          </div>
        </div>
      </div>
    );
  }
}
