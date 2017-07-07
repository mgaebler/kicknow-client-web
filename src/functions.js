/**
 * @returns object schema.org compatible object
 * @param {*} googlePlaceObject
 */
export function mapGooglePlaceToSchemaPlace(googlePlaceObject) {
  const gpo = googlePlaceObject
  return {
    '@context': 'http://schema.org',
    '@id': gpo.id,
    '@type': 'Place',
    address: {
      '@context': 'http://schema.org',
      '@type': 'PostalAddress',
      addressLocality: null,
      addressRegion: null,
      streetAddress: gpo.vicinity
    },
    geo: {
      '@context': 'http://schema.org',
      '@type': 'GeoCoordinates'
      // latitude: gpo.geometry.lat(),
      // longitude: gpo.geometry.lon()
    },
    logo: {
      '@context': 'http://schema.org',
      '@type': 'ImageObject',
      author: null,
      contentLocation: null,
      contentUrl: gpo.icon,
      datePublished: null,
      description: null,
      name: null
    },
    name: gpo.name,
    photos:
      gpo.photos !== undefined
        ? gpo.photos.map(photo => mapGooglePlacePhotoToSchemaImageObject(photo))
        : []
  }
}

/**
 * @returns object schema.org compatible ImageObject
 * @param {*} googlePhoto
 */
export function mapGooglePlacePhotoToSchemaImageObject(googlePhoto) {
  const gp = googlePhoto
  return {
    '@context': 'http://schema.org',
    '@type': 'ImageObject',
    author:
      gp.html_attribution !== undefined && gp.html_attribution.length > 0
        ? gp.html_attribution[0]
        : null,
    contentLocation: null,
    // contentUrl: gp.getUrl(),
    datePublished: null,
    description: null,
    name: null
  }
}
