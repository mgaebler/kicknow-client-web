import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import FilterableResultList from '../components/result_list';
import MapArea from '../components/map';
import Navigation from '../components/navigation';

import * as SearchPageActions from '../actions/search_page';

class SearchPage extends Component {

  componentDidMount() {
    this.props.fetchItems();
  }

  handleGeoInput(point) {
    // this.setState({geoPoint: point});
    this.state.geoPoint = point;
  }

  handleItemSelect(item) {
    // console.log(item);
    this.props.selectItem(item)
  }

  render() {
    var selectedItem = (this.props.items.items.length>0)? this.props.selectedItem : false;
    return (
      <div id="SearchPage">
        <Navigation/>

        <div className="results container">
          <FilterableResultList
            items={this.props.items.items}
            onItemSelect={this.handleItemSelect.bind(this)}
            selectedItem={selectedItem}
          />
        </div>

        {/*
        <MapArea
          items={this.props.items.items}
          onItemSelect={this.handleItemSelect.bind(this)}
          selectedItem={selectedItem}
        />
        */}

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    items: state.items,
    selectedItem: state.selectedItem
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(SearchPageActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
