        const mailIcon = document.getElementById('git');
        const pen = document.getElementById('codep')
        const socialMenu = document.getElementById('socialMenu');
        let scrollTimeout;

        window.addEventListener('scroll', () => {
            // Get the current scroll position
            const scrollPosition = window.scrollY;

            // Calculate the maximum scrollable height
            const maxScroll = document.body.scrollHeight - window.innerHeight; // Maximum scrollable height
            const scrollPercentage = scrollPosition / maxScroll; // Percentage of how much the page has been scrolled

            // Change color from white to black and back to white at the end
            let newColor;

            if (scrollPercentage < 0.5) {
                // Transition from white to black
                const value = Math.floor((scrollPercentage * 2) * 255); // Scale to 0-255
                newColor = `rgb(${255 - value}, ${255 - value}, ${255 - value})`; // White to Black
            } else if (scrollPercentage < 1) {
                // Transition from black back to white
                const value = Math.floor(((0 - scrollPercentage) *-0.6 ) * 255); // Scale to 0-255
                newColor = `rgb(${value}, ${value}, ${value})`; // Black to White
            } else {
                // Ensure the icon is white at the very end
                newColor = 'rgb(255, 255, 255)'; // Final white color
            }

            pen.style.color = newColor; // Change the icon color
            mailIcon.style.color = newColor; // Change the icon color

            // Clear the scroll timeout if it exists
            clearTimeout(scrollTimeout);

            // Set a new timeout to show the social menu after 1 miliseconds of no scrolling
            scrollTimeout = setTimeout(() => {
                socialMenu.classList.add('visible'); // Add the visible class to slide in the menu
            }, 100);
        });

        // Optional: Hide the social menu when scrolling starts
        window.addEventListener('scroll', () => {
            socialMenu.classList.remove('visible'); // Remove the visible class to hide the menu
        });