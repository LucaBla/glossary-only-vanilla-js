import { terms } from './data.js';

const term = { 
  id: 404,
  title: '', 
  sections:[
    {title: '', 
    description: ''
    },
  ],
  lastEdited: new Date(),
}

loadContent();

function loadContent() {

  addFunctionToSaveButton();

  addHeader(term.title)

  addSections(term);

  document.querySelectorAll("textarea").forEach((textarea) => adjustTextareaHeight(textarea))

  addAddSectionButton(term);


}

function addFunctionToSaveButton(){
  const saveButton = document.getElementsByName('save-outline')[0]

  saveButton.addEventListener("click", function(){
    term.lastEdited = new Date();
    console.log(term);
  })
}

function addHeader(title){
  const header = document.getElementById('show-header');
  const inputHeader = document.createElement("input");

  inputHeader.type = "text";
  inputHeader.value = title;

  inputHeader.addEventListener("input", function(event){
    term.title = event.target.value;
  })

  header.appendChild(inputHeader);
}

function addSections(term){
  term.sections.forEach((data, index) => {

    addSection(index ,term ,data.title, data.description);

  });
}

function addSection(index, term, title, content){
  const sectionsContainer = document.getElementById('show-sections-container');
  const section = document.createElement('section');

  addSectionHeader(index, term ,section, title);
  addSectionContent(index, term, section, content);

  sectionsContainer.appendChild(section);
}

function addSectionHeader(index, term, section, title){
  const sectionHeaderWrapper = document.createElement('div');
  const sectionHeader = document.createElement('input');
  const deleteButton = document.createElement('button');

  sectionHeaderWrapper.classList.add('section-header-wrapper');

  sectionHeader.type = "text";
  sectionHeader.value = title;

  sectionHeader.addEventListener("input", function(event){
    term.sections[index].title = event.target.value;
  })

  deleteButton.addEventListener("click", function(){
    term.sections.splice(index, 1);
    section.remove();
  })

  deleteButton.classList.add("delete-section-button");
  deleteButton.innerHTML = '<ion-icon name="trash-bin-outline"></ion-icon>'

  sectionHeaderWrapper.appendChild(sectionHeader);
  sectionHeaderWrapper.appendChild(deleteButton);

  section.appendChild(sectionHeaderWrapper);
}

function addSectionContent(index, term, section, content){
  const sectionContent = document.createElement('textarea');

  sectionContent.value = content;
  sectionContent.addEventListener("input", function(event) {
    term.sections[index].description = event.target.value;
    adjustTextareaHeight(sectionContent);
  });
  section.appendChild(sectionContent);
}

function adjustTextareaHeight(textarea) {
  textarea.style.height = "auto";
  textarea.style.height = textarea.scrollHeight + "px";
}

function addAddSectionButton(term){
  const addSectionButton = document.createElement('button');
  const buttonContainer = document.getElementById('button-container');

  addSectionButton.textContent = "Sektion hinzufügen...";
  addSectionButton.classList.add("add-section-button");
  addSectionButton.addEventListener("click", function(){
    term.sections.push({title: '', description: ''});
    addSection(term.sections.length -1, term, term.sections[term.sections.length-1].title, term.sections[term.sections.length-1].description);
  })

  buttonContainer.appendChild(addSectionButton)
}