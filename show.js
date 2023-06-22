import { terms } from './data.js';
import {processSearchInput} from './search.js';

const urlParams = new URLSearchParams(window.location.search);

const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

document.addEventListener('DOMContentLoaded', loadContent);

searchInput.addEventListener('input', (event) => processSearchInput(event,  searchResults, terms))

function loadContent() {
  const term = terms.find((term) => term.id === parseInt(urlParams.get('id')));

  addHeader(term.title)

  addSections(term);

  addLastEdited(term);

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

  var date = term.lastEdited; 

  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();

  var hours = date.getHours();
var minutes = date.getMinutes();

  var dateString = day + '/' + month + '/' + year + ', ' + hours + ':' + minutes;

  content.textContent = dateString;

  dateContainer.appendChild(content);
}