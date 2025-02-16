


// Get stored user info from local storage
const userName = localStorage.getItem("userName");
const userPhoto = localStorage.getItem("userPhoto");
const userEmail = localStorage.getItem("userEmail");

// Check if user is logged in
if (userName) {
    document.getElementById("profile-name").innerText = `Welcome, ${userName}`;
    document.getElementById("profile-pic").src = userPhoto;
    document.getElementById("profile-email").innerText = ` ${userEmail}`;
} else {
    // Redirect back to login page if no user data
    window.location.href = "signin.html";
}

// ✅ Logout Function
function logout() {
    localStorage.removeItem("userName");
    localStorage.removeItem("userPhoto");

    signOut(auth).then(() => {
        console.log("User signed out.");
        window.location.href = "login.html"; // Redirect to login
    }).catch((error) => {
        console.error("Sign-Out Error:", error.message);
    });
}
