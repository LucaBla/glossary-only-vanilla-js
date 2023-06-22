import { terms } from './data.js';

const urlParams = new URLSearchParams(window.location.search);

document.addEventListener('DOMContentLoaded', loadContent);

function loadContent() {
  const term = terms.find((term) => term.id === parseInt(urlParams.get('id')));

  const header = document.getElementById('show-header');
  const headerText = document.createElement('h1');

  headerText.textContent = term.title;

  header.appendChild(headerText);

  const sectionsContainer = document.getElementById('show-sections-container');

  term.sections.forEach((data) => {
    const section = document.createElement('section');

    const sectionHeader = document.createElement('h2');
    const sectionContent = document.createElement('div');

    sectionHeader.textContent = data.title;
    sectionContent.innerHTML = data.description;

    section.appendChild(sectionHeader);
    section.appendChild(sectionContent);
    sectionsContainer.appendChild(section);
  });

}