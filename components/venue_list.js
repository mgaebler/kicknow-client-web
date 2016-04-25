import React from 'react';

export default class VenueList extends React.Component {

  render () {
    function generateVenueButton (venue){

      return (
        <a
          className="list-group-item"
          href={`/location/add/${venue.id}`}
          key={venue.id}
        >
          <h4 className="list-group-item-heading">
            {venue.name}
          </h4>
          <p className="list-group-item-text">
            {venue.location.address}
          </p>
        </a>

      );
    }

    return (
      <div className="list-group">
        {this.props.venues.map(generateVenueButton)}
      </div>
    );
  }
}
