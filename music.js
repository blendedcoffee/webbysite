document.addEventListener('DOMContentLoaded', function () {
    let container = document.getElementById('spotify-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'spotify-container';
        container.style.position = 'relative';
        container.style.zIndex = '1';
        container.style.display = 'none';
        document.body.appendChild(container);
    }

    container.innerHTML = `
        <iframe style="border-radius:12px"
            src="https://open.spotify.com/embed/album/3AMXFnwHWXCvNr5NCCpLZI?utm_source=generator&theme=0"
            width="100%" height="352" frameborder="0"
            allowfullscreen=""
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy">
        </iframe>
    `;
});
