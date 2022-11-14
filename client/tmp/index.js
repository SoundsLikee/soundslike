const mediaDevices = navigator.mediaDevices
mediaDevices
    .getUserMedia(constraints)
    .then(function (stream) {
        console.log('Then')
        const mediaRecorder = new MediaRecorder(stream)
        // visualViewport(mediaRecorder)
        record.onclick = () => {
            mediaRecorder.start()
            console.log(mediaRecorder.state)
            console.log('recorder started')
            record.style.background = 'red'
            record.style.color = 'black'
        }
        stop.onclick = () => {
            mediaRecorder.stop()
            console.log(mediaRecorder.state)
            console.log('recorder stopped')
            record.style.background = ''
            record.style.color = ''
        }
        mediaRecorder.onstop = (e) => {
            console.log('data available after MediaRecorder.stop() called.')

            const clipName = prompt('Enter a name for your sound clip')

            const clipContainer = document.createElement('article')
            const clipLabel = document.createElement('p')
            const audio = document.createElement('audio')
            const deleteButton = document.createElement('button')

            clipContainer.classList.add('clip')
            audio.setAttribute('controls', '')
            deleteButton.textContent = 'Delete'
            clipLabel.textContent = clipName

            clipContainer.appendChild(audio)
            clipContainer.appendChild(clipLabel)
            clipContainer.appendChild(deleteButton)
            soundClips.appendChild(clipContainer)

            audio.controls = true
            const blob = new Blob(chunks, {type: 'audio/ogg; codecs=opus'})
            chunks = []
            const audioURL = URL.createObjectURL(blob)
            audio.src = audioURL
            console.log('recorder stopped')

            deleteButton.onclick = (e) => {
                const evtTgt = e.target
                evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode)
            }
        }

        mediaRecorder.ondataavailable = (e) => {
            chunks.push(e.data)
        }
    })
    .catch((err) => {
        console.log(err)
    });


// let audioTracks = stream.getAudioTracks()
// console.log(audioTracks[0].label)
// stream.onremovetrack = function () {
//    console.log('Stream ended')
// }
window.stream = stream

const constraints = window.constraints = {
    audio: true,
    video: false
};
chunks = [];
audio = temp3;
stop = temp2;
record = temp1;
navigator.mediaDevices
    .getUserMedia(constraints)
    .then(function (stream) {
        console.log('Then')
        const mediaRecorder = new MediaRecorder(stream)

        record.onclick = () => {
            mediaRecorder.start()
            console.log(mediaRecorder.state)
            console.log('recorder started')
            record.style.background = 'red'
            record.style.color = 'black'
        }
        stop.onclick = () => {
            mediaRecorder.stop()
            console.log(mediaRecorder.state)
            console.log('recorder stopped')
            record.style.background = ''
            record.style.color = ''
        }
        mediaRecorder.onstop = (e) => {
            console.log('data available after MediaRecorder.stop() called.')

            audio.controls = true
            const blob = new Blob(chunks, {type: 'audio/ogg; codecs=opus'})
            chunks = []
            const audioURL = URL.createObjectURL(blob)
            audio.src = audioURL
            console.log('recorder stopped')
            console.log(audioURL)
        }

        mediaRecorder.ondataavailable = (e) => {
            console.log("available")
            chunks.push(e.data)
        };
    })
    .catch((err) => {
        console.log(err)
    });

