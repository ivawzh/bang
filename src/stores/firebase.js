import firebase from 'firebase'
import env from '../env'
const config = env.firebase

firebase.database.enableLogging(config.enableLogging)

export const serverTimestamp = firebase.database.ServerValue.TIMESTAMP

export const appName = 'BANG-APP'

const store = initStore()

export default store

function initStore(): firebase.database.Reference {
  let app: firebase.app.App
  try {
    app = firebase.app(appName)
  } catch (appNotExistError) {
    app = firebase.initializeApp(config.secret, appName)
  }
    const database: firebase.database.Database = app.database()
  const store: firebase.database.Reference = database.ref(config.rootRef)
  return store
}

export async function checkConnection(client):boolean {
  const isConnectedSnap = await client.root.child('.info/connected').once('value')
  return isConnectedSnap.val()
}
