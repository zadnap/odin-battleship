import './startScreen.scss';
import createLoading from './loading';
import createStartButton from './startButton';

function createStartScreen() {
  const startScreen = document.createElement('section');
  startScreen.className = 'start-screen';

  const desc = document.createElement('p');
  desc.className = 'description';
  desc.textContent = 'the classic naval combat game';
  startScreen.appendChild(desc);

  const title = document.createElement('h1');
  title.className = 'title';
  title.textContent = 'battleship';
  startScreen.appendChild(title);

  const credit = document.createElement('p');
  credit.className = 'credit';
  credit.innerHTML =
    'Part of <a href="https://www.theodinproject.com/">TOP curriculum</a>';
  startScreen.appendChild(credit);

  const loading = createLoading();
  startScreen.appendChild(loading);
  setTimeout(() => {
    startScreen.removeChild(loading);
    startScreen.appendChild(createStartButton());
  }, 6000);

  return startScreen;
}

export default createStartScreen;
