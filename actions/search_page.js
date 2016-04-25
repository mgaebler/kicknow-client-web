function createQueryObject(searchPhrase='', geoPoint=false) {
  // console.log('geoPoint', geoPoint)
  var query = {
      "query": (searchPhrase) ? { "fuzzy": { "_all": searchPhrase }} : {"match_all": {}},
      "aggs": {
          "all_tables": {
              "terms": {
                  "field": "tables",
                  "size": 20
              }
          }
      }
  };

  // if geopoint is available
  if (geoPoint) {
    var query = {
        "query": {
            "filtered": {
                "query": (searchPhrase) ? { "fuzzy": { "_all": searchPhrase }} : {"match_all": {}}
            }
        },
        "sort": [
            {
                "_geo_distance": {
                    "geopoint": {
                        "lat": geoPoint.lat,
                        "lon": geoPoint.lon
                    },
                    "order": "asc",
                    "unit": "m",
                    "distance_type": "plane"
                }
            }
        ]
    };
    // use the distance filter only in nearby queries
    if(!searchPhrase){
      query.query.filtered.filter = {
        "geo_distance" : {
          "distance" : "5km",
          "geopoint" : {
              "lat": geoPoint.lat,
              "lon": geoPoint.lon
          }
        }
      };
    }

  }

  return query;
}


export const REQUEST_ITEMS = 'REQUEST_ITEMS';
export function requestItems(status=''){
  return {
    type: REQUEST_ITEMS,
    status: status
  };
}

export const RECEIVE_ITEMS = 'RECEIVE_ITEMS';
export function receiveItems(data){
  return {
    type: RECEIVE_ITEMS,
    items: data,
    receivedAt: Date.now()
  };
}

export const SELECT_ITEM = 'SELECT_ITEM'
export function selectItem(item){
  return {
    type: SELECT_ITEM,
    item
  }
}

export function fetchItems(){
  return function(dispatch, getState){
    let searchPhrase = getState().searchInput.text;
    let position = getState().position;
    let queryObject = createQueryObject(searchPhrase, position);
    const PLACES_ENDPOINT = 'http://private-f0df95-kicknow.apiary-mock.com/places';
    dispatch(requestItems(status='fetch'));

    fetch(PLACES_ENDPOINT, {method: 'POST', mode: 'cors'})
      .then(response => {
        dispatch(requestItems(status='success'));
        dispatch(receiveItems(data=response.hits.hits));
      })
      .catch(error => {
        dispatch(requestItems(status='fail'));
      })

  };
}
