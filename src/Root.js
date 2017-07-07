import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router-dom'

import SearchPage from './containers/SearchPage'
import AboutPage from './containers/About'
import AddLocation from './containers/AddLocation'
import { LinearProgress, Snackbar } from 'react-mdc-web'
import { clearSnack } from './modules/snacks/actions'
import { Content } from 'react-mdc-web'
import Navigation from './components/Navigation'

class Root extends Component {
  constructor(props) {
    super(props)
    this.state = {
      snackbar: false
    }
  }

  render() {
    const { snacks } = this.props
    console.log(snacks)
    return (
      <div className="App">
        <Navigation />
        <Content style={{ marginTop: '72px' }}>
          {this.props.loading && <LinearProgress indeterminate />}
          <Route exact path="/" component={SearchPage} />
          <Route path="/search-page" component={SearchPage} />
          <Route path="/add-location" component={AddLocation} />
          <Route path="/about" component={AboutPage} />
        </Content>
        <Snackbar
          onTimeout={() => {
            this.setState({ snackbar: false })
            this.props.dispatch(clearSnack())
          }}
          open={snacks.open}
        >
          {snacks.message}
        </Snackbar>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    loading: state.ajaxCallsInProgress > 0,
    snacks: state.snacks
  }
}

export default withRouter(connect(mapStateToProps)(Root))
