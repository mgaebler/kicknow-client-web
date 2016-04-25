import React from 'react';
import Item from './item';


export default class FilterableResultList extends React.Component {

  // static get propTypes (){
  //   return {
  //     'data': React.PropTypes.object,
  //     'onItemClick': React.PropTypes.instanceOf(Item),
  //     'items': React.PropTypes.arrayOf(React.PropTypes.instanceOf(Item)),
  //     'items.map': React.PropTypes.object
  //   };
  // }

  render() {

    let items = this.props.items.map(function (item) {
      return(
        <Item
          data={item}
          key={item._id}
          onSelect={data => this.props.onItemSelect(data)}
          selected={item._id == this.props.selectedItem.id}
        />
      );
    }, this);

    return(
      <div id="Results">
        {items}
      </div>
    );
  }
}
