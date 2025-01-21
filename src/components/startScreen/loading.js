function createLoading() {
  const loading = document.createElement('div');
  loading.className = 'loading';

  const progressBar = document.createElement('div');
  progressBar.className = 'progress-bar';
  const progress = document.createElement('div');
  progress.className = 'progress';
  progressBar.appendChild(progress);
  loading.appendChild(progressBar);

  setTimeout(() => {
    progress.style.width = '40%';
  }, 1000);
  setTimeout(() => {
    progress.style.width = '70%';
  }, 3000);
  setTimeout(() => {
    progress.style.width = '90%';
  }, 4000);
  setTimeout(() => {
    progress.style.width = '100%';
  }, 4500);

  const descText = document.createElement('p');
  descText.className = 'desc-text';
  descText.textContent = 'loading...';
  loading.appendChild(descText);

  return loading;
}

export default createLoading;
