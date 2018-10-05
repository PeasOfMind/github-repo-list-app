'use strict'

const GITHUB_URL = 'https://api.github.com';

function displayResults(responseJson){
    const resultsArray = responseJson.map((result) =>{
        return `<a href="${result.html_url}" 
        class="js-result result">${result.name}</a>`
    });
    $('#js-error-msg').empty().prop('hidden', true);
    $('.js-results').prop('hidden', false).html(resultsArray.join("\n"));
}

function getRepoList(userHandle){
    fetch(`${GITHUB_URL}/users/${userHandle}/repos`)
    .then(response => {
        if (response.ok){
            return response.json();
        }
        throw new Error (response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
        $('#js-error-msg').prop('hidden', false).html(`${err.message}`);
        $('.js-results').empty().prop('hidden', true);
    });
}

function watchSubmit(){
    $('.js-form').submit(event => {
        event.preventDefault();
        const userHandle = $('.js-entry').val();
        getRepoList(userHandle);
        $('.js-entry').val('');
    });
}

$(watchSubmit);