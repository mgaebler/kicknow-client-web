import React from 'react';
import { Router, Route, Link } from 'react-router';
import CheckboxGroup from 'react-checkbox-group';


export default class AddLocation extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      venueId: this.props.params.venueId,
      venue: {},
      dataCreated: false,
    };
  }

  componentDidMount () {
    this.getVenue();
  }

  getVenue () {
    var endpoint = '/fs/venue';
    $.ajax({
      url: endpoint,
      contentType: "application/json; charset=utf-8",
      dataType: 'json',
      type: 'POST',
      data: JSON.stringify({
        venueId: this.props.params.venueId
      }),
      success: function (data) {
        this.setState({
          venue: data.venue
        });
        // this.state.items = data.hits.hits;
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(endpoint, status, err.toString());
      }.bind(this)
    });
  }

  handleSubmit(event){
    event.preventDefault();
    var description = React.findDOMNode(this.refs.description).value.trim();
    var tables = this.refs.tablesGroup.getCheckedValues();

    $.ajax({
      url: '/location/add',
      contentType: "application/json; charset=utf-8",
      dataType: 'json',
      type: 'POST',
      data: JSON.stringify({
        venueId: this.props.params.venueId,
        description: description,
        tables: tables
      }),
      success: function (data) {
        //data: Object {_id: "AVAVylTpiRuSvzFkVh2Z", _index: "kickertables", _type: "locations", _version: 1, created: true}
        if(data.created){
          console.log(data);
          this.setState({dataCreated: true});
        }
      }.bind(this),
      error: function (xhr, status, err) {
        console.error('/add-venue', status, err.toString());
      }.bind(this)
    });
  }

  render () {
    let tables = [
      {
        name: 'leonhart',
        icon: 'leonhart.ico'
      },{
        name: 'fireball',
        icon: 'fireball.ico'
      },{
        name: 'garlando',
        icon: 'garlando.ico'
      },{
        name: 'lettner',
        icon: 'lettner.ico'
      },{
        name: 'ullrich',
        icon: 'ullrich.ico'
      }
    ];

    function generateTableSelects(table) {
      return (
        <div className="checkbox">
          <img src={require('file!../images/logos/' + table.icon)} />
          <label>
          <input
            value={table.name}
            type="checkbox"
          />
          {table.name}
          </label>
        </div>
      );
    }

    let response;
    if(this.state.dataCreated){
      response = (
        <div>
          <h3>Danke für deine Hilfe</h3>
          <Link className="btn btn-success btn-lg btn-block" to="/">Zurück zur Hauptseite</Link>
        </div>
      );
    } else {
      response = (
        <form
          method="POST"
          onSubmit={this.handleSubmit.bind(this)}
        >
          <h3>Neue Location anlegen</h3>
          <div className="form-group">
            <label htmlFor="inputDesription">
              Erzähle uns mehr über {this.state.venue.name}
            </label>
            <textarea
              className="form-control"
              id="inputDesription"
              name="description"
              ref="description"
            />
          </div>

          <div name="tables" className="form-group">
            <label>Welche Tische kann man hier spielen?</label>
            <CheckboxGroup ref="tablesGroup">
              {tables.map(generateTableSelects)}
            </CheckboxGroup>
          </div>

          <button type="submit" className="btn btn-default col-xs-12">
            Eintragen
          </button>

        </form>
      );
    }

    return (
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
