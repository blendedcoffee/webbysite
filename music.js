document.addEventListener('DOMContentLoaded', function () {
    const container = document.createElement('div');
    container.innerHTML = `
        <iframe style="border-radius:12px"
            src="https://open.spotify.com/embed/album/3AMXFnwHWXCvNr5NCCpLZI?utm_source=generator&theme=0"
            width="100%" height="352" frameborder="0"
            allowfullscreen=""
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy">
        </iframe>
    `;
    document.body.appendChild(container);
});

