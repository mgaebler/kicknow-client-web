import React from 'react'
import firebase from 'firebase'
import { checkInRef } from '../modules/user/operations'
import { List, ListItem } from 'react-mdc-web'

const refCheckIns = firebase.database().ref(checkInRef)
refCheckIns.off()

class UserDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      checkIns: []
    }
  }
  componentDidMount() {
    refCheckIns
      .limitToLast(5)
      .once('value')
      .then(data => {
        this.setState({
          checkIns: Object.entries(data.val()).map(checkIn => checkIn[1])
        })
      })
    // .then(data => this.setState({ checkIns: data.val() }))
  }
  render() {
    return (
      <div>
        User Detail
        <List>
          {this.state.checkIns.map((checkIn, key) => (
            <ListItem key={key}>{checkIn.locationId}</ListItem>
          ))}
        </List>
      </div>
    )
  }
}
export default UserDetail
