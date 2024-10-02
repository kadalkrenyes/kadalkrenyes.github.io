document.addEventListener("DOMContentLoaded",function(){
 var body=document.body;
  setInterval(createStar,50);
  function createStar(){
    var right=Math.random()*500;
    var top=Math.random()*screen.height;
    var star=document.createElement("div");
 star.classList.add("star")
  body.appendChild(star);
  setInterval(runStar,10);
    star.style.top=top+"px";
  function runStar(){
    if(right>=screen.width){
      star.remove();
    }
    right+=3;
    star.style.right=right+"px";
  }
  } 
})

//   play audio code start
 const audioPlayer = document.querySelector(".audio-player");
    const audio = new Audio("Gravity.mp3");
    console.dir(audio);

    audio.addEventListener(
        "loadeddata",
        () => {
            audioPlayer.querySelector(".time .length").textContent = getTimeCodeFromNum(
                audio.duration
            );
            audio.volume = .75;
        },
        false
    );

    //click on timeline to skip around
    const timeline = audioPlayer.querySelector(".timeline");
    timeline.addEventListener("click", e => {
        const timelineWidth = window.getComputedStyle(timeline).width;
        const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
        audio.currentTime = timeToSeek;
    }, false);


    //check audio percentage and update time accordingly
    setInterval(() => {
        const progressBar = audioPlayer.querySelector(".progress");
        progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
        audioPlayer.querySelector(".time .current").textContent = getTimeCodeFromNum(
            audio.currentTime
        );
    }, 500);

    //toggle between playing and pausing on button click
    const playBtn = audioPlayer.querySelector(".toggle-play");
    playBtn.addEventListener(
        "click",
        () => {
            if (audio.paused) {
                playBtn.classList.remove("play");
                playBtn.classList.add("pause");
                audio.play();
            } else {
                playBtn.classList.remove("pause");
                playBtn.classList.add("play");
                audio.pause();
            }
        },
        false
    );

    //turn 128 seconds into 2:08
    function getTimeCodeFromNum(num) {
        let seconds = parseInt(num);
        let minutes = parseInt(seconds / 60);
        seconds -= minutes * 60;
        const hours = parseInt(minutes / 60);
        minutes -= hours * 60;

        if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
        return `${String(hours).padStart(2, 0)}:${minutes}:${String(
            seconds % 60
        ).padStart(2, 0)}`;
 }
