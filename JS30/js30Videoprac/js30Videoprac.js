// 요소를 가져오자
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');

const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

//기능을 만들어보자

function togglePlay(){
    const method = video[video.paused ? 'play':'pause']();
    //매서드는 비디오라는 함수인데 비디오는 비디오가 멈췃다면 플레이 하거나
    //멈추는 기능이 있다

    // if(video.paused){ 위에 한 문장으로 단축 가능
    //     video.play();
    // } else{
    //     video.pause();
    // }
}

function updateButton(){
    const icon = this.paused ? '⏯':'⏹';//비디오가 멈추었냐? y= 실행, 
                                          //n= 중지
    toggle.textContent = icon;//위의 icon을 원래 있던 실행버튼과 교채
}

function skip(){
    video.currentTime += parseFloat(this.dataset.skip);
}//skip func은 this.dataset.skip만큼 비디오의 현재 재생시간에 영향을 주거라

function handleRangeUpdate(){
    video[this.name] = this.value;
    //html에 range tag를 갖고 slide bar인 볼륨과 재생속도 슬라이드 바의 
    //구현을 담당하는 함수
}

function handleProgress(){
    const percent = (video.currentTime/video.duration)*100;//비디오 재생
                    //시간 나누기 현재시간에 100곱해서 퍼센트 구하기
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e){
    const scrubTime = (e.offsetX / progress.offsetWidth)*video.duration;
    //스크럽 타임은 재생 슬라이드 바 에서 현재 마우스 클릭된 곳을 나누고 
    //동영상 재생시간을 곱해서 영상을 클릭 지점으로 이동시킴
    video.currentTime = scrubTime;
    // 고로 현재 비디오 재생시간은 스크럽 타입으로
}

//이벤트리스너를 걸어보자
video.addEventListener('click',togglePlay);//영상 재생
video.addEventListener('play',updateButton);//재생 버튼띄우기
video.addEventListener('pause',updateButton);//정지 버튼 띄우기
video.addEventListener('timeupdate',handleProgress);//재생 슬라이드 띄우기

toggle.addEventListener('click',togglePlay);//영상 정지
skipButtons.forEach(button => button.addEventListener('click',skip));
//스킵 버든의 모든 버튼 들은 클릭이라는 이벤트를 들으면 스킵해라
ranges.forEach(range => range.addEventListener('change',handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove',handleRangeUpdate));
//위의 두 구문은 range의 모든 range들이 마우스무브와 체인지를 감지하고
//handleRangeUpdate 함수 실행해라


let mousedown =false;// 


progress.addEventListener('click',scrub);
//progress들이 클릭되면 scrub함수 실행
progress.addEventListener('mousemove',(e) => mousedown && scrub(e) );
//(마우스다운+ 스크럽 함수)드래그 하면서 동영상 재생 슬라이드 이동 가능
progress.addEventListener('mousedown',() => mousedown = true);
progress.addEventListener('mouseup',() => mousedown = false);
//마우스이 움직임은 캐치하나 직접적 실행 x
