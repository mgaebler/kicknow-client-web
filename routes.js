import React from 'react';

import { IndexRoute, Route } from 'react-router';

import About from './containers/about';
import SearchPage from './containers/search_page';

import AddLocation from './containers/add_location';
import GetLocations from './containers/get_nearby_locations';
import UpdateLocation from './containers/update_location';

export default (
  <SearchPage />
)

// export default (
//   <Route>
//     <IndexRoute component={SearchPage} />
//     <Route
//       component={SearchPage}
//       path="/"
//     />
//     {/*
//     <Route
//       component={GetLocations}
//       path="add"
//     />
//
//     <Route
//       component={AddLocation}
//       path="add/:venueId"
//     />
//     */}
//     <Route
//       component={UpdateLocation}
//       path="update/:venueId"
//     />
//     <Route
//       component={GetLocations}
//       path="get-nearby"
//     />
//
//     <Route
//       component={About}
//       path="about"
//     />
//
//   </Route>
// );
