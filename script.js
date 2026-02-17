document.addEventListener('DOMContentLoaded', function() {
    fetch('stories.json')
        .then(response => response.json())
        .then(stories => {
            const storiesContainer = document.querySelector('.stories');
            storiesContainer.innerHTML = '';

            stories.forEach(story => {
                const storyCard = document.createElement('div');
                storyCard.className = 'story-card';
                storyCard.setAttribute('data-level', story.level);
                storyCard.innerHTML = `
                    <i class="fas ${story.icon}"></i>
                    <h3>${story.title}</h3>
                    <p>Nivel: ${story.level}</p>
                `;
                // Add click event to each story card
                storyCard.addEventListener('click', () => {
                    // Store the story in localStorage
                    localStorage.setItem('selectedStory', JSON.stringify(story));
                    // Open the story page
                    window.location.href = 'story.html';
                });
                storiesContainer.appendChild(storyCard);
            });

            // Search and filter functionality
            const searchInput = document.querySelector('.search-filter input');
            const levelFilter = document.querySelector('.search-filter select');

            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                document.querySelectorAll('.story-card').forEach(card => {
                    const title = card.querySelector('h3').textContent.toLowerCase();
                    card.style.display = title.includes(searchTerm) ? 'block' : 'none';
                });
            });

            levelFilter.addEventListener('change', function() {
                const selectedLevel = this.value;
                document.querySelectorAll('.story-card').forEach(card => {
                    card.style.display = (selectedLevel === '' || card.getAttribute('data-level') === selectedLevel) ? 'block' : 'none';
                });
            });
        })
        .catch(error => console.error('Error loading stories:', error));
});
