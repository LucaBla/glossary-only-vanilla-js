import { terms } from './data.js';

const urlParams = new URLSearchParams(window.location.search);

document.addEventListener('DOMContentLoaded', loadContent);

function loadContent() {
  const term = terms.find((term) => term.id === parseInt(urlParams.get('id')));

  addHeader(term.title)

  addSections(term);

}

function addHeader(title){
  const header = document.getElementById('show-header');
  const headerText = document.createElement('h1');

  headerText.textContent = title;

  header.appendChild(headerText);
}

function addSections(term){
  term.sections.forEach((data) => {

    addSection(data.title, data.description);

  });
}

function addSection(title, content){
  const sectionsContainer = document.getElementById('show-sections-container');
  const section = document.createElement('section');

  addSectionHeader(section, title);
  addSectionContent(section, content);

  sectionsContainer.appendChild(section);
}

function addSectionHeader(section, title){
  const sectionHeader = document.createElement('h2');

  sectionHeader.textContent = title;

  section.appendChild(sectionHeader);
}

function addSectionContent(section, content){
  const sectionContent = document.createElement('div');
  sectionContent.innerHTML = content;
  section.appendChild(sectionContent);
}