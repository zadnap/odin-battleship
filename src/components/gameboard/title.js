function createTitle(content) {
  const title = document.createElement('h3');
  title.className = 'title';
  title.textContent = content;

  return title;
}

export default createTitle;
