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
import { Link } from 'react-router-dom'

const LocationListItem = ({ item, user }) => {
  return (
    <Card key={item['@id']}>
      <CardHeader>
        <CardTitle>{item.name}</CardTitle>
      </CardHeader>
      <Link to={`/location/${item['@id']}`}>
        <CardMedia
          style={{
            // backgroundImage: `url(${item.photos[0].contentUrl})`,
            backgroundPosition: 'center',
            // height: '128px',
            backgroundSize: 'cover'
          }}
        />
      </Link>
      <CardText>
        {/* //@todo add table icons here */}
        Leonhard
      </CardText>
      <CardActions>
        <Button compact>action 1</Button>

        <Button
          disabled={user.isAnonymous}
          onClick={() => {
            alert('no functionality, yet')
            // this.props.dispatch(checkInUser(user.uid))
          }}
          compact
        >
          Check in
        </Button>
      </CardActions>
    </Card>
  )
}

export default LocationListItem