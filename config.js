// ============================================================
// VOCES QUE HACEN — Configuración de Firebase
// ============================================================

const firebaseConfig = {
  apiKey: "AIzaSyBwxKIB7ELm3zv8IeLIkHOyABYtCc5u93I",
  authDomain: "vocesquehacen-47c9e.firebaseapp.com",
  projectId: "vocesquehacen-47c9e",
  storageBucket: "vocesquehacen-47c9e.firebasestorage.app",
  messagingSenderId: "77004145451",
  appId: "1:77004145451:web:4ee56027be79350d62bb6e",
  measurementId: "G-0DXNL513N8"
};

// (La apiKey de Firebase NO es secreta: va siempre en el código del
//  cliente. Lo que protege tus datos son las reglas de Firestore.)

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// 'auth' solo existe si la página cargó el SDK de Auth (lo hace admin.html,
// no index.html). Así config.js sirve para ambas sin romper la pública.
const auth = (typeof firebase.auth === 'function') ? firebase.auth() : null;
