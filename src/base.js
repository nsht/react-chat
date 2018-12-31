import Rebase from 're-base';
import firebase from 'firebase';
import config from './creds';


const firebaseApp = firebase.initializeApp({
    apiKey: config.apiKey,
    authDomain: config.authDomain,
    databaseURL: config.databaseURL,
    projectId: config.projectId,
    storageBucket: config.storageBucket,
    messagingSenderId: config.messagingSenderId
})


const base = Rebase.createClass(firebase.database());

// named export
export {firebaseApp};


// default export
export default base;