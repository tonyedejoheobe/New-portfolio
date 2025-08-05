const navLinks = document.getElementById('animatedBox');

function updateNavLinks() {
    // Clear existing links
    navLinks.innerHTML = '';

    // Check the screen width
    if (window.innerWidth < 800) {
        // Links for small screens
        navLinks.innerHTML = `
            <nav class="navbar">
			<a href="#" class="narbar-header">
				<div class="navbar-header">
					<div class="work-path-2">
					</div>
				</div>
			</a>
			<div class="navbar links align-right">
				<a class="nav-link nav-style" href="#case-studies" class="smooth-scroll">
					<div class="title-background"></div>
					<span class="text-decoration">Case Studies</span></a>
				<a class="nav-link nav-style" href="/smallest.html" id="about">
					<div class="title-background"></div>
					<span class="text-decoration">About Me/Contact</span></a>
			</div>
		</nav>
        `;
    } else {
        // Links for large screens
        navLinks.innerHTML = `
            <nav class="navbar">
			<a href="#" class="narbar-header">
				<div class="navbar-header">
					<div class="work-path-2">
					</div>
				</div>
			</a>
			<div class="navbar links align-right">
				<a class="nav-link nav-style" href="#case-studies" class="smooth-scroll">
					<div class="title-background"></div>
					<span class="text-decoration">Case Studies</span></a>
				<a class="nav-link nav-style" href="#" id="about" onclick="showIframe()">
					<div class="title-background"></div>
					<span class="text-decoration">About Me/Contact</span></a>
					<div id="iframe-container" style="display:none;">
						<iframe src="test.html" frameborder="0" width="900px" height="600px"></iframe>
					</div>
			</div>
		</nav>
        `;
    }
}

// Initial call to set the navigation links based on the current screen size
updateNavLinks();

// Add an event listener to update the links on window resize
window.addEventListener('resize', updateNavLinks);

$('.hamburger').click(function() {
    $(this).toggleClass('is-opened');

  })     

