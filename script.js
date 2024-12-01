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
                <p><a target="__blank" href="${artwork.artist_link}">${artwork.artist}</a>, <em>${artwork.title}</em>, ${artwork.medium}, ${artwork.year}</p>
            `;
            innerHTML += artwork.link ? `<a href="${artwork.link}">${artwork.link}</a>` : '';
            innerHTML += artwork.license ? `<p class="license">${artwork.license}</p>` : '';

            div.innerHTML = innerHTML;
            gallery.appendChild(div);
        });
    })
    .catch(error => console.error('Error loading artworks:', error));
})();