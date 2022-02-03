import firebase from 'firebase';

const firebaseConfig = {
  apiKey:
    process.env.NODE_ENV === 'production'
      ? `${process.env.REACT_APP_API_KEY} `
      : `${process.env.REACT_APP_API_KEY_STG} `,
  authDomain:
    process.env.NODE_ENV === 'production'
      ? `${process.env.REACT_APP_AUTH_DOMAIN}`
      : `${process.env.REACT_APP_AUTH_DOMAIN_STG}`,
  databaseURL:
    process.env.NODE_ENV === 'production'
      ? `${process.env.REACT_APP_DATABASE_URL}`
      : `${process.env.REACT_APP_DATABASE_URL_STG}`,
  projectId:
    process.env.NODE_ENV === 'production'
      ? `${process.env.REACT_APP_PROJECT_ID}`
      : `${process.env.REACT_APP_PROJECT_ID_STG}`,
  storageBucket:
    process.env.NODE_ENV === 'production'
      ? `${process.env.REACT_APP_STORAGE_BUCKET}`
      : `${process.env.REACT_APP_STORAGE_BUCKET_STG}`,
  messagingSenderId:
    process.env.NODE_ENV === 'production'
      ? `${process.env.REACT_APP_MESSAGING_SENDER_ID}`
      : `${process.env.REACT_APP_MESSAGING_SENDER_ID_STG}`,
  appId:
    process.env.NODE_ENV === 'production'
      ? `${process.env.REACT_APP_APP_ID}`
      : `${process.env.REACT_APP_APP_ID_STG}`,
  measurementId:
    process.env.NODE_ENV === 'production'
      ? `${process.env.REACT_APP_MEASUREDMENT_ID}`
      : `${process.env.REACT_APP_MEASUREDMENT_ID_STG}`,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
