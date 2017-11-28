/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Note: You will edit this file in the follow up codelab about the Cloud Functions for Firebase.

// import g cloud functions
const functions = require('firebase-functions')
// init fb admin sdk
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

exports.addWelcomeMessages = functions.auth.user().onCreate(event => {
  const user = event.data
  console.log('A new user signed in for the first time.')
  const fullName = user.displayName || 'Anonymous'

  return admin
    .database()
    .ref('messages')
    .push({
      name: 'Firebase Bot',
      photoUrl: '/images/firebase-logo.png',
      text: `${fullName} signed in for the first time! Welcome!`
    })
    .then(() => console.log('Welcome message written to database'))
})

// TODO(DEVELOPER): Write the blurOffensiveImages Function here.

exports.sendNotifications = functions.database.ref('/messages/{messageId}').onCreate(event => {
  const snapshot = event.data
  // notification details
  const text = snapshot.val().text
  const payload = {
    notification: {
      title: `${snapshot.val().name} posted ${text ? 'a message' : 'an image'}`,
      body: text ? (text.length <= 100 ? text : text.substring(0, 97) + '...') : '',
      icon: snapshot.val().photoUrl || '/images/profile_placeholder.png',
      click_actions: `https://${functions.config().firebase.authDomain}`
    }
  }

  return admin
    .database()
    .ref('fcmTokens')
    .once('value')
    .then(allTokens => {
      if (allTokens.val()) {
        const tokens = Object.keys(allTokens.val())
        return admin
          .messaging()
          .sendToDevice(tokens, payload)
          .then(response => {
            const tokensToRemove = []
            response.results.forEach((result, index) => {
              const error = result.error
              if (error) {
                console.error('failure sending notification to', tokens[index], error)

                if (
                  error.code === 'messaging/invalid-registration-token' ||
                  error.code === 'messaging/registration-token-not-registered'
                ) {
                  tokensToRemove.push(allTokens.ref.child(tokens[index]).remove())
                }
              }
            })
            return Promise.all(tokensToRemove)
          })
      }
    })
})
