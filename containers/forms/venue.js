import React from 'react';
import { Router, Route, Link } from 'react-router';
import CheckboxGroup from 'react-checkbox-group';


export default class VenueForm extends React.Component {
  constructor(props){
    super(props);
  }

  handleSubmit(event){
    event.preventDefault();
    var description = React.findDOMNode(this.refs.description).value.trim();
    var tables = this.refs.tablesGroup.getCheckedValues();

    $.ajax({
      url: '/location/update',
      contentType: "application/json; charset=utf-8",
      dataType: 'json',
      type: 'POST',
      data: JSON.stringify({
        id: this.props.params.venueId,
        description: description,
        tables: tables
      }),
      success: function (data) {
        //data: Object {_id: "AVAVylTpiRuSvzFkVh2Z", _index: "kickertables", _type: "locations", _version: 1, created: true}
        this.setState({dataValid: true});
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(status, err.toString());
      }.bind(this)
    });
  }

  render(){

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
          <img src={require('file!../../images/logos/' + table.icon)} />
          <label>
          <input
            type="checkbox"
            value={table.name}
          />
          {table.name}
          </label>
        </div>
      );
    }

    return (
      <form
        method="POST"
        onSubmit={this.handleSubmit}
      >
        <h3>Location aktualisieren</h3>
        <div className="form-group">
          <label htmlFor="inputDesription">
            Erzähle uns mehr über {this.props.data.name}
          </label>
          <textarea
            className="form-control"
            defaultValue={this.props.data.additional_info}
            id="inputDesription"
            name="description"
            ref="description"
          />
        </div>

        <div
          className="form-group"
          name="tables"
        >
          <label>Welche Tische kann man hier spielen?</label>
          <CheckboxGroup
            ref="tablesGroup"
            value={(this.props.data.tables)? this.props.data.tables.map(table => table.id):[]}
          >
            {tables.map(generateTableSelects)}
          </CheckboxGroup>
        </div>

        <button
          className="btn btn-default col-xs-12"
          type="submit"
        >
          Eintragen
        </button>

      </form>
    );
  }
}
