import React from 'react'
const hachiko = require('../assets/images/hachiko.jpg')

// @todo move to db
const tables = [
  {
    name: 'leonhart',
    icon: 'leonhart.ico'
  },
  {
    name: 'fireball',
    icon: 'fireball.ico'
  },
  {
    name: 'garlando',
    icon: 'garlando.ico'
  },
  {
    name: 'lettner',
    icon: 'lettner.ico'
  },
  {
    name: 'ullrich',
    icon: 'ullrich.ico'
  }
]
export default class AddLocation extends React.Component {
  // @todo fetch locations around
  // @todo fulfill the form with address data
  // @todo make tables editable
  // @todo make custom comment editable
  render() {
    const location = {
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

    return <div>Add a location</div>
  }
}
