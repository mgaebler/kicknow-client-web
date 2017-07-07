import { REQUEST_ITEMS, RECEIVE_ITEMS, SELECT_ITEM } from './types'

export function createQueryObject(searchPhrase = '', geoPoint = false) {
  // console.log('geoPoint', geoPoint)
  let query = {
    query: searchPhrase ? { fuzzy: { _all: searchPhrase } } : { match_all: {} },
    aggs: {
      all_tables: {
        terms: {
          field: 'tables',
          size: 20
        }
      }
    }
  }

  // if geo point is available
  if (geoPoint) {
    let query = {
      query: {
        filtered: {
          query: searchPhrase
            ? { fuzzy: { _all: searchPhrase } }
            : { match_all: {} }
        }
      },
      sort: [
        {
          _geo_distance: {
            geopoint: {
              lat: geoPoint.lat,
              lon: geoPoint.lon
            },
            order: 'asc',
            unit: 'm',
            distance_type: 'plane'
          }
        }
      ]
    }
    // use the distance filter only in nearby queries
    if (!searchPhrase) {
      query.query.filtered.filter = {
        geo_distance: {
          distance: '5km',
          geopoint: {
            lat: geoPoint.lat,
            lon: geoPoint.lon
          }
        }
      }
    }
  }

  return query
}

export function requestItems(status = '') {
  return {
    type: REQUEST_ITEMS,
    status: status
  }
}

export function receiveItems(data) {
  return {
    type: RECEIVE_ITEMS,
    items: data,
    receivedAt: Date.now()
  }
}

export function selectItem(item) {
  return {
    type: SELECT_ITEM,
    item
  }
}
