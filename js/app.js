(function() {
  'use strict';

  var movies = [];

  const renderMovies = function() {
    $('#listings').empty();

    for (const movie of movies) {
      const $col = $('<div>').addClass('col s6');
      const $card = $('<div>').addClass('card hoverable');
      const $content = $('<div>').addClass('card-content center');
      const $Title = $('<h6>').addClass('card-Title truncate');

      $Title.attr({
        'data-position': 'top',
        'data-tooltip': movie.Title
      });

      $Title.tooltip({ delay: 50 }).text(movie.Title);

      const $Poster = $('<img>').addClass('Poster');

      $Poster.attr({
        src: movie.Poster,
        alt: `${movie.Poster} Poster`
      });

      $content.append($Title, $Poster);
      $card.append($content);

      const $action = $('<div>').addClass('card-action center');
      const $plot = $('<a>');

      $plot.addClass('waves-effect waves-light btn modal-trigger');
      $plot.attr('href', `#${movie.id}`);
      $plot.text('Plot Synopsis');

      $action.append($plot);
      $card.append($action);

      const $modal = $('<div>').addClass('modal').attr('id', movie.id);
      const $modalContent = $('<div>').addClass('modal-content');
      const $modalHeader = $('<h4>').text(movie.Title);
      const $movieYear = $('<h6>').text(`Released in ${movie.Year}`);
      const $modalText = $('<p>').text(movie.Plot);

      $modalContent.append($modalHeader, $movieYear, $modalText);
      $modal.append($modalContent);

      $col.append($card, $modal);

      $('#listings').append($col);

      $('.modal-trigger').leanModal();
    }
  };
  const proxy = "https://cors-anywhere.herokuapp.com/"
  var submit = document.querySelector('#submit');
  var form = document.querySelector('form');
  var input = document.querySelector('#search');
  var https = new XMLHttpRequest();
  
  submit.addEventListener('click', submission);
  function submission(event){
    event.preventDefault();
    var film = input.value;
    fetch('https://omdb-api.now.sh/?s=' + encodeURI(film))
      .then((response) => response.json())
      .then((function(result){
        for(let i = 0; i < result.Search.length; i++ ){
        movies.unshift(result.Search[i])}
        renderMovies()
      }))
      .catch((error) => console.log(error))
      console.log(movies)
      movies = []
  } 
})();

