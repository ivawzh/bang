import deepMerge from 'deepmerge'

const dbUser = process.env.REACT_APP_DB_USER || 'default-user'
const nodeEnv = process.env.NODE_ENV || 'development'

const commonEnv = {
  firebase: {
    enableLogging: false
  }
}

const testEnv = {
  firebase: {
    secret: {
      apiKey: "AIzaSyC0Vl7WvmJIZ4zqoiBFER7socl7wkdwiqM",
      authDomain: "bang-staging.firebaseapp.com",
      databaseURL: "https://bang-staging.firebaseio.com",
      storageBucket: "bang-staging.appspot.com",
      messagingSenderId: "723765349435"
    },
    rootRef: `test/${dbUser}`,
    enableLogging: false
  }
}

const devEnv = {
  firebase: {
    secret: {
      apiKey: "AIzaSyC0Vl7WvmJIZ4zqoiBFER7socl7wkdwiqM",
      authDomain: "bang-staging.firebaseapp.com",
      databaseURL: "https://bang-staging.firebaseio.com",
      storageBucket: "bang-staging.appspot.com",
      messagingSenderId: "723765349435"
    },
    rootRef: `development/${dbUser}`
  }
}

const prodEnv = {
  firebase: {
    secret: {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
      databaseURL:  process.env.REACT_APP_DATABASE_URL,
      storageBucket:  process.env.REACT_APP_STORAGE_BUCKET,
      messagingSenderId:  process.env.REACT_APP_MESSAGING_SENDER_ID
    },
    rootRef: '',
    enableLogging: false
  }
}

const options = {
  test: deepMerge(commonEnv, testEnv),
  development: deepMerge(commonEnv, devEnv),
  production: deepMerge(commonEnv, prodEnv)
}

const env = options[nodeEnv]

export default env
