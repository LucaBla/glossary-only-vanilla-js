import { terms } from './data.js';
import {processSearchInput} from './search.js';

loadContent();

function loadContent(){
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');

  searchInput.addEventListener('input', (event) => processSearchInput(event,  searchResults, terms))
  
  createGlossaryNav();
  createGlossarySections();
}

function createGlossaryNav(){
  const buttonContainer = document.getElementById('button-container');

  for (var i = 65; i <= 90; i++) {
    const letter = String.fromCharCode(i);
    const button = document.createElement('button');
    button.textContent = letter;
    button.addEventListener('click', ()=>scrollToSection('section-' + letter))
    buttonContainer.appendChild(button);
  }
}

function createGlossarySections(){
  const sortedTerms= terms.map(
    term => ({ id: term.id, title: term.title })).sort((a, b) => a.title.localeCompare(b.title)
  );

  const sectionsContainer = document.getElementById('sections-container');

  let firstLetter = ''
  let activeSections = [];

  sortedTerms.forEach(term => {
    let section = null;
    firstLetter = term.title[0]

    if(!activeSections.includes(firstLetter)){
      section = createSection(sectionsContainer, term);

      activeSections.push(firstLetter);
    }
    else{
      section = document.getElementById('section-'  + firstLetter);    
    }
    appendContentToSection(section, term);
});
}

function createSection(sectionsContainer, term){
  const section = document.createElement('section');

  section.id = 'section-' + term.title[0];
  section.classList.add('glossary-section');
  
  const heading = document.createElement('h2');
  heading.textContent = term.title[0];
  
  section.appendChild(heading);

  const sectionContent = document.createElement('div');
  sectionContent.classList.add('section-content');

  section.appendChild(sectionContent);
    
  sectionsContainer.appendChild(section);

  return section;
}

function appendContentToSection(section, term){
  const sectionContent = section.getElementsByClassName('section-content')[0]

  const content = document.createElement('a');
  content.textContent = term.title;
  content.href = `show.html?id=${term.id}`

  sectionContent.appendChild(content);

  const icon = document.createElement('div');
  icon.classList.add('icon-div');
  icon.innerHTML = '<ion-icon name="chevron-forward-outline"></ion-icon>'
  content.appendChild(icon);
}

function scrollToSection(sectionId){
  const section = document.getElementById(sectionId);
  if(section != null){
    section.scrollIntoView({ behavior: 'smooth' });
  }
}