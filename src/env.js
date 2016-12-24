import deepMerge from 'deepmerge'

const dbUser = process.env.DB_USER || 'default-user'
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
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      databaseURL:  process.env.DATABASE_URL,
      storageBucket:  process.env.STORAGE_BUCKET,
      messagingSenderId:  process.env.MESSAGING_SENDER_ID
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
