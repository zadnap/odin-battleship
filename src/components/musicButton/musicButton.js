import './musicButton.scss';
import backgroundMusic from '@/assets/audio/background-music.mp3';

function createMusicButton() {
  let isPlaying = false;
  const musicButton = document.createElement('button');
  musicButton.className = 'music-btn';
  musicButton.setAttribute('aria-label', 'Toggle background music');
  musicButton.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';

  const audio = new Audio(backgroundMusic);
  audio.loop = true;
  audio.volume = 0.7;

  musicButton.addEventListener('click', () => {
    musicButton.blur();
    if (isPlaying) {
      musicButton.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
      audio.pause();
    } else {
      musicButton.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
      audio.play();
    }
    isPlaying = !isPlaying;
  });

  return musicButton;
}

export default createMusicButton;
