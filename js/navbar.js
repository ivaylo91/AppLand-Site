function myFunc(event) {
    event.preventDefault();
    let menu = document.getElementById('site-navigation');
    menu.classList.toggle('active');
    
    // Close menu when a link is clicked
    let links = menu.getElementsByTagName('a');
    for (let link of links) {
        link.addEventListener('click', function() {
            menu.classList.remove('active');
        });
    }
}

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    let menu = document.getElementById('site-navigation');
    let navBar = document.getElementById('nav-bar');
    
    if (!menu.contains(event.target) && event.target !== navBar) {
        menu.classList.remove('active');
    }
});