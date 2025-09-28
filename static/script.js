const container = document.querySelector('.allCon');
const control = document.querySelector('.controls');
const bgvid = document.querySelector('.bgvid');
const canvas = document.querySelector('.c1');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

let song;
let analyser;
let isPlaying = false;
let animation;
let audioCTX;

function draw() {
    ctx.beginPath()
    ctx.moveTo(0, canvas.height - 2);
    ctx.lineTo(canvas.width, canvas.height - 2);
    ctx.strokeStyle = '#ffffffff';
    ctx.lineWidth = 3;
    ctx.stroke();
}

container.addEventListener('click', ()=> {
    let song;

    if (isPlaying === false) {
        control.textContent = '❚❚';

        bgvid.play();

        audio = new Audio('Travis Scott - goosebumps (Lyrics) ft. Kendrick Lamar - Vibe Music.mp3');

        audioCTX = new AudioContext();

        audio.play();

        audioSrc = audioCTX.createMediaElementSource(audio);

        analyser = audioCTX.createAnalyser();

        audioSrc.connect(analyser);

        analyser.connect(audioCTX.destination);

        analyser.fftSize = 512;

        const bufferLength = analyser.frequencyBinCount;

        const dataArray = new Uint8Array(bufferLength);

        const barWidth = canvas.width / bufferLength;

        let barHeight;
        
        let x;

        function animate() {
            x = 0;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            analyser.getByteFrequencyData(dataArray);

            for (let i = 0; i < bufferLength; i++) {
                draw();
                barHeight = dataArray[i];
                ctx.fillStyle = '#ffffffff';
                ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
                x += barWidth + 5;
            }

            animation = window.requestAnimationFrame(animate);

        }
        animate()
        isPlaying = true;
    } else {
        audioCTX.suspend();
        control.textContent = '▶';
        bgvid.pause()
        window.cancelAnimationFrame(animation)
        isPlaying = false;
    }

})