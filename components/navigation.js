import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link } from 'react-router';
import { Button, Modal, Col, Row, Glyphicon } from 'react-bootstrap';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { searchInput, getPosition } from '../actions/navigation';
import { fetchItems } from '../actions/search_page';


class Navigation extends React.Component {

  static get propTypes(){
    return { onInput: React.PropTypes.func };
  }

  componentDidMount(){
    // fetch the current user position initial
    this.props.dispatch(getPosition());
  }

  setPhrase (e) { // on change
    this.props.dispatch(searchInput(e.target.value));
    this.props.dispatch(fetchItems());
    return;
  }

  setPosition () {
    this.props.dispatch(getPosition());
  }

  handleSearchSubmit(event){
    event.preventDefault();
    // console.log('submit');
    ReactDOM.findDOMNode(this.refs.searchInput).blur();
  }

  render () {
    var geoLocationState = 'btn btn-error';
    switch (this.props.position.status) {
      case 'neutral':
        geoLocationState = 'btn neutral'; break;
      case 'fetch':
        geoLocationState = 'btn btn-warning fetch'; break;
      case 'success':
        geoLocationState = 'btn btn-success success'; break;
      case 'error':
        geoLocationState = 'btn btn-error error'; break;
    }

    var searchButton;
    if(this.props.searchInput){
      searchButton = (
        <button
          className={geoLocationState}
          onClick={this.handleSearchSubmit.bind(this)}
        >
          <Glyphicon glyph="search" />
        </button>
      );
    } else {
      searchButton = (
        <button
          className={geoLocationState}
          onClick={this.setPosition.bind(this)}
        >
          <Glyphicon glyph="map-marker" />
        </button>
      );
    }

    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container">

          <div className="navbar-header">

            <button
              aria-expanded="false"
              className="navbar-toggle collapsed"
              data-target="#NavbarCollapse"
              data-toggle="collapse"
              type="button"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link
              className="navbar-brand"
              to="/"
            >
              Kicknow
            </Link>
          </div>

          <div
            className="collapse navbar-collapse"
            id="NavbarCollapse"
          >
            {/* search menu */}
            <form
              className="navbar-form navbar-left hidden-xs"
              onSubmit={this.handleSearchSubmit.bind(this)}
              role="search"
            >
              <div className="input-group search-input">
                <input
                  className="form-control"
                  onChange={this.setPhrase.bind(this)}
                  placeholder="Suche nach Orten, Tischen"
                  ref="searchInput"
                  type="text"
                />
                <span className="input-group-btn">
                  <button className={geoLocationState}>
                    <span
                      className="glyphicon glyphicon-map-marker"
                      onClick={this.setPosition.bind(this)}
                    ></span>
                  </button>
                </span>
              </div>
            </form>

            {/* more navigation */}
            <ul className="nav navbar-nav">
              <li className="active">
                <Link to="/about">About</Link>
              </li>
              <li className="active">
                <Link to="/get-nearby">Add Location</Link>
              </li>
              {/* todo: maybe later
              <li className="dropdown">
                <a href="#" className="dropdown-toggle"
                  data-toggle="dropdown"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false">
                  Schusstechniken <span className="caret"></span>
                </a>
                <ul className="dropdown-menu">
                  <li><a href="#abroller">Abroller</a></li>
                  <li><a href="#jet">Jet</a></li>
                  <li><a href="#schuss-mit-handgelenk">Schuss mit Handgelenk</a></li>
                  <li><a href="#diagonal-aussen">Diagonal Außen</a></li>
                  <li><a href="#drop-fake">Drop Fake</a></li>
                  <li><a href="#schieber">Schieber/Zieher</a></li>
                  <li><a href="#rueckhand">Rückhand</a></li>
                  <li><a href="#banden">Banden</a></li>
                  <li><a href="#drop-long">Drop Long</a></li>
                  <li><a href="#ticktack">TickTack</a></li>
                  <li><a href="#gegenschieber">Gegenschieber/-zieher</a></li>
                  <li><a href="#heber">Heber	</a></li>
                  <li><a href="#fast-drop">Fast Drop</a></li>
                </ul>
              </li>
              */}
            </ul>

          </div>
        </div>

        {/* search input on small devices */}
        <form
          className="visible-xs"
          onSubmit={this.handleSearchSubmit.bind(this)}
          role="search"
        >
          <div className="input-group search-input">
            <input
              className="form-control"
              onChange={this.setPhrase.bind(this)}
              placeholder="Suche nach Orten, Tischen"
              ref="searchInput"
              type="text"
            />
            <span className="input-group-btn">
              {searchButton}
            </span>
          </div>
        </form>

      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    position: state.position,
    searchInput: state.searchInput.text
  };
}

export default connect(mapStateToProps)(Navigation);
