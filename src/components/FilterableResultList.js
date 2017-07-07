import React from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardMedia,
  CardText,
  CardActions,
  Button
} from 'react-mdc-web'

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
        <Card key={item['@id']}>
          <CardHeader>
            <CardTitle>{item.name}</CardTitle>
          </CardHeader>
          <CardMedia
            style={{
              backgroundImage: `url(${item.photos[0].contentUrl})`,
              height: '300px',
              backgroundSize: 'cover'
            }}
          />
          <CardText>
            {/* //@todo add table icons here */}
            Leonhard
          </CardText>
          <CardActions>
            <Button compact>action 1</Button>
            <Button compact>action 2</Button>
          </CardActions>
        </Card>
      )
    })

    return <div id="Results">{items}</div>
  }
}
