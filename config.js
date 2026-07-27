const firebaseConfig = {
  apiKey: "AIzaSyBwxKIB7ELm3zv8IeLIkHOyABYtCc5u93I",
  authDomain: "vocesquehacen-47c9e.firebaseapp.com",
  projectId: "vocesquehacen-47c9e",
  storageBucket: "vocesquehacen-47c9e.firebasestorage.app",
  messagingSenderId: "77004145451",
  appId: "1:77004145451:web:4ee56027be79350d62bb6e",
  measurementId: "G-0DXNL513N8"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();