import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBSRtgbZ4_j-c339ecVhSYELH-9EuPSVfs",
  authDomain: "mindplay2005.firebaseapp.com",
  projectId: "mindplay2005",
  storageBucket: "mindplay2005.firebasestorage.app",
  messagingSenderId: "961633648306",
  appId: "1:961633648306:web:4c930b45a396ada0b853ab",
  measurementId: "G-3YK6DHL8K2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Wait for DOM to load before accessing elements
document.addEventListener("DOMContentLoaded", () => {
  const submit = document.getElementById("submit");

  submit.addEventListener("click", function (event) {
    event.preventDefault();
    
    // Get input values inside the event listener
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        alert("Creating Account...")
        window.location.href="index.html"
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(error)
        // ..
      });
  });
});
