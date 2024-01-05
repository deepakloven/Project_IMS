import 'firebase/compat/database'
import  firebase from 'firebase/compat/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_fvXjKXmRCaNh0euMg2X_DauJ1CiuNpw",
  authDomain: "dipak-97252.firebaseapp.com",
  projectId: "dipak-97252",
  storageBucket: "dipak-97252.appspot.com",
  messagingSenderId: "195727924325",
  appId: "1:195727924325:web:482ec6c16c58da20613a8c"
};

const firebaseDB=firebase.initializeApp(firebaseConfig);

export default firebaseDB.database().ref();