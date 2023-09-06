const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const player = $('.player')
const cd = $('.cd')
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const playBtn = $('.btn-toggle-play')
const progress = $('#progress')
console.log(progress)
const app = {
    currentIndex: 0,
    isPlaying: false,
    songs: [
        {
            name: 'I\'ll be your man 1',
            singer: 'BTOB',
            path: './assets/music/IllBeYourManBeat-BTOB-5132418.mp3',
            image: './assets/img/illbeyourman.jpg'
        },
        {
            name: 'I\'ll be your man 2',
            singer: 'BTOB',
            path: './assets/music/IllBeYourManBeat-BTOB-5132418.mp3',
            image: './assets/img/illbeyourman.jpg'
        },
        {
            name: 'I\'ll be your man 3',
            singer: 'BTOB',
            path: './assets/music/IllBeYourManBeat-BTOB-5132418.mp3',
            image: './assets/img/illbeyourman.jpg'
        },
        {
            name: 'I\'ll be your man 4',
            singer: 'BTOB',
            path: './assets/music/IllBeYourManBeat-BTOB-5132418.mp3',
            image: './assets/img/illbeyourman.jpg'
        },
        {
            name: 'I\'ll be your man 5',
            singer: 'BTOB',
            path: './assets/music/IllBeYourManBeat-BTOB-5132418.mp3',
            image: './assets/img/illbeyourman.jpg'
        },
        {
            name: 'I\'ll be your man 6',
            singer: 'BTOB',
            path: './assets/music/IllBeYourManBeat-BTOB-5132418.mp3',
            image: './assets/img/illbeyourman.jpg'
        },
        {
            name: 'I\'ll be your man 7',
            singer: 'BTOB',
            path: './assets/music/IllBeYourManBeat-BTOB-5132418.mp3',
            image: './assets/img/illbeyourman.jpg'
        }

    ],
    render: function () {
        const htmls = this.songs.map(song => {
            return `
            <div class="song">
            <div class="thumb" style="background-image: url('${song.image}')">
            </div>
            <div class="body">
              <h3 class="title">${song.name}</h3>
              <p class="author">${song.singer}</p>
            </div>
            <div class="option">
              <i class="fas fa-ellipsis-h"></i>
            </div>
          </div>`
        });
        $('.playlist').innerHTML = htmls.join('\n')
    },
    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex]
            }
        })
    },
    handleEvents: function () {
        const _this = this;
        //Xử lý cuộn chuột, phóng to thu nhỏ CD
        const cdWidth = cd.offsetWidth
        document.onscroll = function () {
            const scrollTop = window.scrollY
            const newCdWidth = cdWidth - scrollTop

            cd.style.width = `${newCdWidth}px`

            cd.style.width = newCdWidth > 0 ? `${newCdWidth}px` : 0 //tránh trường hợp scroll quá nhanh
            cd.style.opacity = newCdWidth / cdWidth
        }

        //Xử lý khi nhấn nút play
        playBtn.onclick = function () {


            if (_this.isPlaying) {
                audio.pause()
            } else {

                audio.play();
            }

        }

        //Khi bài hát được play
        audio.onplay =  function () {
            _this.isPlaying = true
            player.classList.add('playing')
        }

        //Khi bài hát được pause
        audio.onpause = function () {
            _this.isPlaying = false;
            player.classList.remove('playing')
        }

        //Khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function(){
            if(audio.duration){
                const progressPercent = Math.floor(audio.currentTime/audio.duration * 100)
                console.log(progressPercent)
                progress.value = progressPercent
            }
            
        }

        //Xử lý khi tua bài hát
        progress.onchange = function(e){
            const seekTime = e.target.value / 100 * audio.duration
            audio.currentTime = seekTime 
            
        }
    },
    // getCurrentSong: function(){
    //     return this.songs[this.currentIndex]
    // },
    loadCurrentSong: function () {


        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path

    },

    
    start: function () {
        //Lắng nghe và xử lý các sự kiện
        this.handleEvents()
        //Định nghĩa các thuộc tính cho object

        this.defineProperties();
        //Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
        this.loadCurrentSong();
        //Render ra playlist
        this.render()
    }
}

app.start();
