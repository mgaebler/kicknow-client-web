import React from 'react'
import LocationListItem from './LocationListItem'

export default class FilterableResultList extends React.Component {
  // static get propTypes (){
  //   return {
  //     'data': React.PropTypes.object,
  //     'onItemClick': React.PropTypes.instanceOf(Item),
  //     'items': React.PropTypes.arrayOf(React.PropTypes.instanceOf(Item)),
  //     'items.map': React.PropTypes.object
  //   }
  // }

  render() {
    let items = this.props.items.items.map(item => {
      return (
        <LocationListItem
          key={item['@id']}
          item={item}
          user={this.props.user}
        />
      )
    })

    return <div id="Results">{items}</div>
  }
}
