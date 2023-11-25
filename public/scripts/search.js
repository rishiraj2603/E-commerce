const search_form = document.querySelector('#search_form');
const btn = document.querySelector('#btn');
const search = document.querySelector('#search');

search_form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const query = search.value;
    window.location = `/products/search?query=${query}`
    
    console.log(search.value);
})