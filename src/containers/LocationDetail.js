import React from 'react'

import {
  Card,
  CardHeader,
  CardTitle,
  CardMedia,
  CardText,
  CardActions,
  Button,
  Cell,
  Grid,
  Icon
} from 'react-mdc-web'

const hachiko = require('../assets/images/hachiko.jpg')

export default class LocationDetail extends React.Component {
  render() {
    const locationId = this.props.match.params.id
    const locations = require('../modules/locations/test_locations').default

    const location = locations.filter(
      location => location['@id'] === locationId
    )[0]

    const test = {
      '@context': 'http://schema.org',
      '@id': '11',
      '@type': 'Place',
      address: {
        '@context': 'http://schema.org',
        '@type': 'PostalAddress',
        addressLocality: 'Mexico Beach',
        addressRegion: 'FL',
        streetAddress: '3102 Highway 98'
      },
      geo: {
        '@context': 'http://schema.org',
        '@type': 'GeoCoordinates',
        latitude: '40.75',
        longitude: '73.98'
      },
      logo: {
        '@context': 'http://schema.org',
        '@type': 'ImageObject',
        author: 'Jane Doe',
        contentLocation: 'Puerto Vallarta, Mexico',
        contentUrl: 'http://lorempixel.com/output/city-q-c-64-64-5.jpg',
        datePublished: '2008-01-25',
        description: 'I took this picture while on vacation last year.',
        name: 'Beach in Mexico'
      },
      name: 'Empire State Building',
      photos: [
        {
          '@context': 'http://schema.org',
          '@type': 'ImageObject',
          author: 'Jane Doe',
          contentLocation: 'Puerto Vallarta, Mexico',
          contentUrl: hachiko,
          datePublished: '2008-01-25',
          description: 'I took this picture while on vacation last year.',
          name: 'Beach in Mexico'
        },
        {
          '@context': 'http://schema.org',
          '@type': 'ImageObject',
          author: 'Jane Doe',
          contentLocation: 'Puerto Vallarta, Mexico',
          contentUrl: hachiko,
          datePublished: '2008-01-25',
          description: 'I took this picture while on vacation last year.',
          name: 'Beach in Mexico'
        }
      ],
      tables: [
        {
          '@context': 'http://schema.org',
          '@type': 'Product',
          'brand Brand': '',
          description: '',
          name: '',
          logo: {
            '@context': 'http://schema.org',
            '@type': 'ImageObject',
            author: 'Jane Doe',
            contentLocation: 'Puerto Vallarta, Mexico',
            contentUrl: 'http://lorempixel.com/output/city-q-c-64-64-5.jpg',
            datePublished: '2008-01-25',
            description: 'I took this picture while on vacation last year.',
            name: 'Beach in Mexico'
          }
        },
        {
          '@context': 'http://schema.org',
          '@type': 'Product',
          'brand Brand': '',
          description: '',
          name: '',
          logo: {
            '@context': 'http://schema.org',
            '@type': 'ImageObject',
            author: 'Jane Doe',
            contentLocation: 'Puerto Vallarta, Mexico',
            contentUrl: 'http://lorempixel.com/output/city-q-c-64-64-5.jpg',
            datePublished: '2008-01-25',
            description: 'I took this picture while on vacation last year.',
            name: 'Beach in Mexico'
          }
        }
      ]
    }
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            {location.name}
            <img src={location.logo.contentUrl} alt={location.logo.name} />
          </CardTitle>
        </CardHeader>
        <CardText>
          <p>{location.address.addressLocality}</p>
          <p>{location.address.addressRegion}</p>
          <p>{location.address.streetAddress}</p>
        </CardText>
        {/* Photos */}
        <Grid>
          {location.photos.map((photo, key) => (
            <Cell key={key} phone={2}>
              <img height="100" src={photo.contentUrl} alt={photo.name} />
            </Cell>
          ))}
        </Grid>
        {/* Tables */}
        <Grid>
          {location.tables.map((table, key) => (
            <Cell key={key} phone={2}>
              <img
                key={key}
                height="100"
                src={table.logo.contentUrl}
                alt={table.logo.name}
              />
            </Cell>
          ))}
        </Grid>

        <CardActions>
          <Button compact>
            <Icon name="star" />
          </Button>
          <Button compact>
            <Icon name="star" />
          </Button>
          <Button compact>
            <Icon name="bookmark" />
          </Button>
        </CardActions>
      </Card>
    )
  }
}
