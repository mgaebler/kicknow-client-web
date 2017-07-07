import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Content } from 'react-mdc-web'

import LocationSearchField from '../components/LocationSearchField'
import FilterableResultList from '../components/FilterableResultList'
// import MapArea from '../components/MapArea'
import * as SearchPageActions from '../modules/locations/actions'

class SearchPage extends Component {
  handleGeoInput(point) {
    this.setState({ geoPoint: point })
  }

  handleItemSelect(item) {
    // console.log(item)
    this.props.selectItem(item)
  }

  render() {
    let selectedItem =
      this.props.items.items.length > 0 ? this.props.selectedItem : false

    return (
      <Content>
        <LocationSearchField />
        <FilterableResultList
          items={this.props.items}
          onItemSelect={this.handleItemSelect.bind(this)}
          selectedItem={selectedItem}
        />

        {/*
        <MapArea
          items={this.props.items.items}
          onItemSelect={this.handleItemSelect.bind(this)}
          selectedItem={selectedItem}
        />
        */}
      </Content>
    )
  }
}

function mapStateToProps(state) {
  return {
    items: state.items,
    selectedItem: state.selectedItem
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(SearchPageActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)
