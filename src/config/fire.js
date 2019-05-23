import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCNqxit_VzIyKy6PdVUVZu795rXc6Xd_Ck",
    authDomain: "inventory-app-4324e.firebaseapp.com",
    databaseURL: "https://inventory-app-4324e.firebaseio.com",
    projectId: "inventory-app-4324e",
    storageBucket: "inventory-app-4324e.appspot.com",
    messagingSenderId: "524277749950",
    appId: "1:524277749950:web:7cdd0301566e5c13"
};

const fire = firebase.initializeApp(firebaseConfig);

export default fire;