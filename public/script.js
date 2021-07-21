const host = 'http://localhost:8000/'
document.querySelector('#get-video-info-btn').addEventListener('click', () => {
    let videoURL = document.querySelector('#videoURL').value.trim();
    if (videoURL.length == 0) {
        alert('Por favor Digite um Link')
        return;
    }
    fetch(host + 'videoInfo?videoURL=' + videoURL).then((res) => {
        return res.json()
    }).then((data) => {
        console.log(data)
        let detailsNodes = {
            thumbnail: document.querySelector('.video-data .data .thumbnail img'),
            title: document.querySelector('.video-data .info h2'),
            description: document.querySelector('.video-data .info p'),
            videoURL: document.querySelector('.video-data .controls #video-url'),
            downloadOption: document.querySelector('.video-data .controls #download-options')
        }
        let html = ''
        for (let i = 0; i < data.formats.length; i++) {
            if (data.formats[i].container != 'mp4') {
                continue;
            }
            html += `
                <option value=${data.formats[i].itag}>
                    ${data.formats[i].container} - ${data.formats[i].qualityLabel}
                </option>
            `;
            detailsNodes.thumbnail.src = data.videoDetails.thumbnails[data.videoDetails.thumbnails.length - 1].url
            detailsNodes.title.innerText = data.videoDetails.title
            detailsNodes.description.innerText = data.videoDetails.description;
            detailsNodes.videoURL.value = videoURL;
            detailsNodes.downloadOption.innerHTML = html;

            document.querySelector('.video-data').style.display = 'block'
            document.querySelector('.video-data').scrollIntoView({
                behavior: 'smooth'
            })
        }
    }).catch((err) => {
        console.log(err)
        alert(err)
    })
})
document.querySelector('#download-btn').addEventListener('click', () => {
    let videoURL = document.querySelector('#video-url').value;
    let itag = document.querySelector('#download-options').value
    window.open(host + 'download?videoURL=' + videoURL + '&itag=' + itag)
})
document.querySelector('#download-btn-mp3').addEventListener('click', () => {
    let videoURL = document.querySelector("#video-url").value;
    let itag = document.querySelector('#download-options').value;
    window.open(host + 'downloadmp3?videoURL=' + videoURL + '&itag=' + itag)
})


