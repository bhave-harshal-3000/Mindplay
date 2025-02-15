
function toggleDropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.options-button')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}


    function profile() {
        window.location.href = "profile-page.html"; // Redirects to the profile page
    }
    
    
