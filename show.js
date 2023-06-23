import { terms } from './data.js';
import {processSearchInput} from './search.js';

loadContent();

function loadContent() {
  const urlParams = new URLSearchParams(window.location.search);
  const term = terms.find((term) => term.id === parseInt(urlParams.get('id')));

  addSearchInput()
  addHeader(term.title)
  addSections(term);
  addLastEdited(term);
  addEditLink(urlParams);
}

function addSearchInput(){
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');

  searchInput.addEventListener('input', (event) => processSearchInput(event,  searchResults, terms))
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

function addLastEdited(term){
  const dateContainer = document.getElementById('show-date-container');
  const content = document.createElement('div');

  const date = term.lastEdited; 

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const hours = date.getHours();
  const minutes = date.getMinutes();

  const dateString = day + '/' + month + '/' + year + ', ' + hours + ':' + minutes;

  content.textContent = dateString;

  dateContainer.appendChild(content);
}

function addEditLink(urlParams){
  const iconsContainer = document.getElementsByClassName('icons')[0];
  const iconLink = document.createElement('a');

  iconLink.innerHTML = '<ion-icon name="create-outline"></ion-icon>';
  iconLink.href= "edit.html?id=" + urlParams.get('id');

  iconsContainer.insertBefore(iconLink, iconsContainer.firstChild);
}