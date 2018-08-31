'use strict';

class Movie {
    MoviesList(movieName) {
        fetch('https://api.themoviedb.org/3/search/movie?api_key=f58323742f0d3b835da1b436ef1eada3&query='+movieName)
        .then((response) => response.json())
        .then((movieData) => this.domConstruct(movieData))
    }

    domConstruct(movieData) {
        let moveList = movieData.results,
            targetList = document.getElementById("moiveList"),
            listItem = targetList.getElementsByTagName("li");

            targetList.innerHTML = null;

        if (movieData.total_results !== 0) {
            moveList.forEach(function(value, i) {
                let li = document.createElement('li');

                li.className = 'list-group-item';
                li.appendChild(document.createTextNode('Movie Title:' + value.title));
                targetList.appendChild(li);
                li.setAttribute('data-id', i);

                let image = document.createElement('img');
                    
                image.src = 'http://image.tmdb.org/t/p/w185/' + value.poster_path; 
                li.appendChild(image);

                let voteCount = document.createElement('span');
                    voteCount.className = 'badge badge-primary badge-pill';

                voteCount.appendChild(document.createTextNode('Vote: ' + value.vote_count));
                li.appendChild(voteCount);

                let releaseDate = document.createElement('div');

                releaseDate.appendChild(document.createTextNode('Release Date: ' + value.release_date));
                li.appendChild(releaseDate);

                let overViewItem = document.createElement('div');
                    overViewItem.className = 'description';

                overViewItem.appendChild(document.createTextNode('Overview: ' + value.overview));
                li.appendChild(overViewItem);

                let addtoFav = document.createElement('button');
                    addtoFav.className = 'btn btn-primary js-add-favourites';
                    addtoFav.type = 'button';

                    addtoFav.appendChild(document.createTextNode('Add to favourites'));
                    li.appendChild(addtoFav);
            });

            let results = [],
                addFavDetails = document.querySelectorAll('.js-add-favourites');

            for (var i = 0; i < addFavDetails.length; i++) {
                let moviefavdata = {};
                addFavDetails[i].addEventListener('click', function (event) {
                    event.preventDefault();
                    let getListId = this.parentElement.dataset.id;
                        results.push(movieData.results[getListId]);
                        localStorage.setItem('myfavmovies', JSON.stringify(results));
                        let getMyFavMovies = localStorage.getItem('myfavmovies');
                        event.target.style.visibility = 'hidden';
                });
            } 
        } else {
            let li = document.createElement('li');

                li.className = 'list-group-item';
                li.appendChild(document.createTextNode('No Data found....'));
                targetList.appendChild(li);
        }
    }
};

const moive = new Movie();

let getMyFavMovies = localStorage.getItem('myfavmovies');

if (getMyFavMovies !== null) {
    let favData = {"results": JSON.parse(getMyFavMovies)};
    moive.domConstruct(favData);
} 

document.querySelector('#getMovieList').addEventListener('submit', function(e) {
    e.preventDefault();

    let movieName = document.getElementById('inputMoiveName').value;
        moive.MoviesList(movieName);
});

