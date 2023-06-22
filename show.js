import { terms } from './data.js';

const urlParams = new URLSearchParams(window.location.search);

document.addEventListener('DOMContentLoaded', loadContent);

function loadContent(){
  console.log(terms.find((term) => term.id === parseInt(urlParams.get('id'))));
}