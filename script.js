function toggleDropdown() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches(".options-button")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

function profile() {
  window.location.href = "profile-page.html"; // Redirects to the profile page
}

function whackamole() {
    window.location.href = "whackamole.html"; // Redirects to the profile page
  }

function mazemania() {
    window.location.href = "maze.html"; // Redirects to the profile page
  }

window.addEventListener("mouseover", initLandbot, { once: true });
window.addEventListener("touchstart", initLandbot, { once: true });
var myLandbot;
function initLandbot() {
  if (!myLandbot) {
    var s = document.createElement("script");
    s.type = "module";
    s.async = true;
    s.addEventListener("load", function () {
      var myLandbot = new Landbot.Livechat({
        configUrl:
          "https://storage.googleapis.com/landbot.online/v3/H-2778607-PDACSLNG9TLDKUCI/index.json",
      });
    });
    s.src = "https://cdn.landbot.io/landbot-3/landbot-3.0.0.mjs";
    var x = document.getElementsByTagName("script")[0];
    x.parentNode.insertBefore(s, x);
  }
}
