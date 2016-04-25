export default class VenueDataMapper {
  constructor(elasticsearch_item) {
    this.id = elasticsearch_item._id;
    this.type = elasticsearch_item._type;
    this.sort = elasticsearch_item.sort;
    this.source = elasticsearch_item._source;
    this.provider = this.getProvider(this.source);
    if(this.sort) this.distance = this.getDistance(this.sort);

    this.mapVenueData();
  }

  getProvider(source) {
    // we prefer foursquare then google places
    if(source.foursquare_data !== undefined){
      return 'foursquare_data';
    } else if (source.google_places_data !== undefined) {
      return 'google_places_data';
    } else {
      return null;
    }
  }

  mapVenueData(){
    let source = this.source;
    this.tables = source.tables;
    this.additional_info = source.additional_info;
    this.fuzzyMapData = (source.map_data_fuzzy)? true: false;
    this.hours = source.hours;
    this.rating = source.rating;
    this.likes = source.likes;
    this.playerLevel = source.player_level

    if(this.provider == 'foursquare_data'){
      let data = source[this.provider];
      this.name = data.name;
      this.address = data.location.address;
      this.additional_info = source.additional_info;
    } else if(this.provider == 'google_places_data'){
      let data = source[this.provider];
      this.name = data.name;
      this.address = data.formatted_address;
    }
  }

  getDistance(sortValue){
    let meters = Math.round(sortValue);
    if(meters > 1000){
        return Math.round(meters / 10) / 100 + 'km';
    }
    return meters + 'm';
  }

}
