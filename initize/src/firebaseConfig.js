var firebaseConfig = {
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    databaseURL: process.env.DATABASEURL,
    projectId: process.env.PROJECTID,
    storageBucket: "",
    messagingSenderId: process.env.MESSAGINGSENDERID,
    appId: process.env.APPID
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);