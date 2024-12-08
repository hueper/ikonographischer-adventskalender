(function() {
    fetch('tuerchen.json')
    .then(response => response.json())
    .then(data => {
        const gallery = document.getElementById('gallery');
        Object.keys(data).forEach(key => {
            const artwork = data[key];
            const div = document.createElement('div');
            div.className = 'artwork';

            // Determine if the artwork link is a YouTube link
            const isYouTubeLink = artwork.link && /youtube\.com|youtu\.be/.test(artwork.link);

            let innerHTML = `
                <h2>${key}</h2>
                <div class="image-container">
                    ${artwork.link ? `<a href="${artwork.link}" target="_blank">` : ''}
                        <img src="${artwork.artwork_url}" alt="${artwork.alt_text}">
                        ${isYouTubeLink ? `<div class="play-icon">▶</div>` : ''}
                    ${artwork.link ? `</a>` : ''}
                </div>
                <div class="paratext">
                    <p class="artist">
                        <a target="_blank" href="${artwork.artist_link}">${artwork.artist}</a>
                    </p>
                    <p class="title_and_year">
                        <em>${artwork.title}</em>, ${artwork.year}<br/>
                    </p>
                    <p class="medium">${artwork.medium}</p>
            `;
            innerHTML += artwork.link ? `<br/><p class="linkContainer"><a href="${artwork.link}" target="_blank">${artwork.link}</a></p>` : '';
            innerHTML += `</div>`;
            innerHTML += artwork.license ? `<hr/><p class="license">${artwork.license}</p>` : '';
            
            if (artwork.description) {
                const descriptionText = artwork.description;
                const words = descriptionText.split(' ');
                const shortDescription = words.slice(0, 15).join(' ') + (words.length > 15 ? '...' : '');

                innerHTML += `
                    <hr/>
                    <p class="description" style="cursor: pointer;" onclick="toggleDescription(event)">
                        <span class="short">${shortDescription} <span class="icon">▼</span></span>
                        <span class="full" style="display: none;">${descriptionText} <span class="icon">▲</span></span>
                    </p>
                `;
            }

            div.innerHTML = innerHTML;
            gallery.appendChild(div);
        });
    })
    .catch(error => console.error('Error loading artworks:', error));
})();

function toggleDescription(event) {
    const descriptionElement = event.currentTarget;
    const shortDescription = descriptionElement.querySelector('.short');
    const fullDescription = descriptionElement.querySelector('.full');

    if (fullDescription.style.display === 'none') {
        fullDescription.style.display = 'inline';
        shortDescription.style.display = 'none';
    } else {
        fullDescription.style.display = 'none';
        shortDescription.style.display = 'inline';
    }
}
