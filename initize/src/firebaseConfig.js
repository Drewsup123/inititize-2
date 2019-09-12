import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBXy50_GzO38Bjxva0_mVDybKYmhtCQcIU",
  authDomain: "initize-2.firebaseapp.com",
  databaseURL: "https://initize-2.firebaseio.com",
  projectId: "initize-2",
  storageBucket: "initize-2.appspot.com",
  messagingSenderId: "216065183611",
  appId: "1:216065183611:web:47d24fb2a8dbec72"
};
  // Initialize Firebase
export default function initializeFirebase() {
  console.log("Firebase Config", firebaseConfig);
  firebase.initializeApp(firebaseConfig);
}

// Firebase product	                                Namespace	Web
// Authentication	                                firebase.auth()		
// Cloud Firestore	                                firebase.firestore()		
// Cloud Functions for Firebase Client SDK	        firebase.functions()		
// Cloud Messaging	                                firebase.messaging()		
// Cloud Storage	                                firebase.storage()		
// Performance Monitoring(beta release)	            firebase.performance()		
// Realtime Database	                            firebase.database()		




// Firebase product	                                Library reference
// Firebase core (required)	                        import "firebase/app";
// Authentication	                                import "firebase/auth";
// Cloud Firestore	                                import "firebase/firestore";
// Cloud Functions for Firebase Client SDK	        import "firebase/functions";
// Cloud Messaging	                                import "firebase/messaging";
// Cloud Storage	                                import "firebase/storage";
// Performance Monitoring(beta release)	            import "firebase/performance";
// Realtime Database	                            import "firebase/database";