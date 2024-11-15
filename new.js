const iframe = document.getElementById('iframe-container');

function showIframe() {
    iframe.style.display = 'block'; // Show the iframe
};

// Listen for messages from the iframe
window.addEventListener('message', function(event) {
    if (event.data === 'hideIframe') {
        iframe.style.display = 'none'; // Hide the iframe instead of removing it
    }
});


// Listen for messages from the iframe
window.addEventListener('message', function(event) {
	if (event.data === 'closeIframe') {
		iframe.style.display = 'none'; // Hide the iframe
	}
});

function slide() {
    var box = document.getElementById('animatedBox');
    box.classList.toggle('animate'); // Toggle the 'animate' class on click
	document.getElementById('sideb').classList.toggle('active');
	};
