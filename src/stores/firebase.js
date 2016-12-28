import firebase from 'firebase'
import env from '../env'
const config = env.firebase

firebase.database.enableLogging(config.enableLogging)

export const serverTimestamp = firebase.database.ServerValue.TIMESTAMP

export const appName = 'BANG-APP'

const store = initStore()

export default store

export function currentUser() : ?firebase.User {
  const app: firebase.app.App = initApp()
  const auth: firebase.auth.Auth = app.auth()
  return auth.currentUser
}

export async function googleAuth() : { googleAccessToken: string, userInfo: object } {
  const app:firebase.app.App = initApp()
  const provider: firebase.auth.GoogleAuthProvider = new firebase.auth.GoogleAuthProvider()
  const result = await app.auth().signInWithPopup(provider)
  const googleAccessToken = result.credential.accessToken
  const userInfo = result.user
  return { googleAccessToken, userInfo }
}

function initApp():firebase.app.App {
  let app
  try {
    app = firebase.app(appName)
  } catch (appNotExistError) {
    app = firebase.initializeApp(config.secret, appName)
  }
  return app
}

function initStore(): firebase.database.Reference {
  const app:firebase.app.App = initApp()
  const database: firebase.database.Database = app.database()
  const store: firebase.database.Reference = database.ref(config.rootRef)
  return store
}

export async function checkConnection():boolean {
  const isConnectedSnap = await store.root.child('.info/connected').once('value')
  return isConnectedSnap.val()
}

export function listenAuth(loggedInHandler: (userInfo: object) => void, notLoggedInHandler: func) {
  const app:firebase.app.App = initApp()
  const auth: firebase.auth.Auth = app.auth()
  auth.onAuthStateChanged((userInfo) => {
    if (userInfo) {
      // current user is logged in
      loggedInHandler(userInfo)
    } else {
      // current user is not logged in
      notLoggedInHandler()
    }
  })
}
