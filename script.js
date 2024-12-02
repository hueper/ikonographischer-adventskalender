(function(){
    fetch('tuerchen.json')
    .then(response => response.json())
    .then(data => {
        const gallery = document.getElementById('gallery');
        Object.keys(data).forEach(key => {
            const artwork = data[key];
            const div = document.createElement('div');
            div.className = 'artwork';
            let innerHTML = `
                <h2>${key}</h2>
                <img src="${artwork.image_url}" alt="${artwork.alt_text}">
                <div class="paratext">
                    <p class="artist">
                        <a target="__blank" href="${artwork.artist_link}">${artwork.artist}</a>
                    </p>
                    <p class="title_and_year">
                        <em>${artwork.title}</em>, ${artwork.year}<br/>
                    </p>
                    <span class="medium">${artwork.medium}</span>
            `;
            innerHTML += artwork.link ? `<p class="linkContainer"><a href="${artwork.link}">${artwork.link}</a></p>` : '';
            innerHTML += `</div>`;
            innerHTML += artwork.license ? `<p class="license">${artwork.license}</p>` : '';

            div.innerHTML = innerHTML;
            gallery.appendChild(div);
        });
    })
    .catch(error => console.error('Error loading artworks:', error));
})();