import React from 'react'

import { connect } from 'react-redux'
import { Textfield, Icon } from 'react-mdc-web'
import { getPosition } from '../modules/position/operations'
import { searchInput } from '../modules/navigation/actions'
import { fetchItems } from '../modules/locations/operations'

class LocationSearchField extends React.Component {
  constructor(props) {
    super(props)

    this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
    this.setPosition = this.setPosition.bind(this)
    this.setPhrase = this.setPhrase.bind(this)
  }

  setPosition() {
    this.props.dispatch(getPosition())
  }

  handleSearchSubmit(event) {
    event.preventDefault()
  }

  setPhrase(e) {
    // on change
    this.props.dispatch(searchInput(e.target.value))
    this.props.dispatch(fetchItems())
    return
  }

  getLocationStateIcon(state) {
    let status = <Icon name="location_disabled" />

    switch (state) {
      case 'fetch':
        status = <Icon name="location_searching" />
        break
      case 'success':
        status = <Icon name="my_location" />
        break
      case 'error':
        status = <Icon name="location_disabled" />
        break
      default:
        status = <Icon name="location_disabled" />
    }
    return status
  }

  render() {
    return (
      <form
        style={{ display: 'flex' }}
        onSubmit={this.handleSearchSubmit}
        role="search"
      >
        <Textfield
          floatingLabel="Suche nach Orten, Tischen"
          value={this.props.searchInput.text}
          onChange={this.setPhrase}
          className="mdc-textfield--fullwidth"
        />
        <button type="button">
          {this.getLocationStateIcon(this.props.position.status)}
        </button>
      </form>
    )
  }
}

function mapStateToProps(state) {
  let { position, searchInput } = state
  return {
    position,
    searchInput
  }
}

export default connect(mapStateToProps)(LocationSearchField)
