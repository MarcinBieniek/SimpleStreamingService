const select = {
    containerOf: {
      pages: '.page', //
      homeAudioPlayer: 'home-page',
      discover: '.discover__wrapper',
      search: '.search__wrapper',
      searchResult: '.search__result',
      resultValue: '.search___number',
      wordSong: '.search__wordSong',
    },
    templateOf: {
      oneSong: '#single-song-widget',
      searchSong: '#search-song-widget'
    },
    nav: {
      links: '.navigation a',
      discover: '.discover__nav'
    },
    element: {
      searchInput: '.search__input',
      searchButton: '.search__button'
    }
  }
  
  const classNames = {
    pages: {
      active: 'active', //
    },
    nav: {
      active: 'active', //
    }
  }
  
  const settings = {
    db: {
      url: '//localhost:3131',
      songs: 'songs',
    },
  }
  
  const templates = {
    player: Handlebars.compile(document.querySelector(select.templateOf.oneSong).innerHTML),
  }
  
  /* Start app */
  
  /* [DONE] 1. Activate page */
  
  const allNavButtons = document.querySelectorAll(select.nav.links);
  
  for(let pageButton of allNavButtons){
    pageButton.addEventListener('click', function(event) {
  
      event.preventDefault()
      const clickedElement = this;
      const id = clickedElement.getAttribute('href').replace('#', '');
  
      if (!clickedElement.classList.value.includes(classNames.nav.active)) {
        for (let pageButton of allNavButtons) {
          pageButton.classList.remove(classNames.pages.active);
          const allPages = document.querySelectorAll(select.containerOf.pages);
          for(let page of allPages){
            page.classList.remove('active');
          }
        }
        this.classList.add(classNames.nav.active);
        document.getElementById(id).classList.add(classNames.pages.active);
      }
    });
  }

/* [DONE] 2. Data agregation from API and initing Home content */

const url = settings.db.url + '/' + settings.db.songs;

fetch(url)
  .then(function(response){
    return response.json();
  })
  .then(function(parsedResponse){
    for(let singleSong of parsedResponse){
      const songId = singleSong.id;
      const songTitle = singleSong.title;
      const songName = singleSong.filename;
      const songCategories = singleSong.categories;
      const songRanking = singleSong.ranking;
      const songFilename = singleSong.filename.toLowerCase();
      const songCover = singleSong.cover;

      /* Creating correct Author name */

      const authorAndTitle = songFilename.replaceAll('_', ' ').replace('.mp3', '').replace('-', ' ');
      const songTitleLowerCase = songTitle.toLowerCase();
      const authorNameLowerCase = authorAndTitle.split(songTitleLowerCase).join('').trim().split(" ");
      const firstName = authorNameLowerCase[0];
      const authorNameUpperCase = firstName[0].toUpperCase() + firstName.slice(1);
      const secondName = authorNameLowerCase[1];
      const authorSurameUpperCase = secondName[0].toUpperCase() + secondName.slice(1);
      const authorName = authorNameUpperCase + ' ' + authorSurameUpperCase;

      /* Creating single song HTML object */
      prepareTemplate(songId, authorName, songTitle, songCategories, songRanking, songName, songCover)

    }
  })
  .then(function () {
    GreenAudioPlayer.init({
      selector: '.player',
      stopOthersOnPlay: true
    });
  });

/* prepareTemplate function */

let dataArray = [];

const prepareTemplate = function(id, author, title, categories, ranking, songName, cover){
  const generatedData = {id, author, title, categories, ranking, songName, cover};
  const pushGeneratedData = templates.player(generatedData);
document.getElementById(select.containerOf.homeAudioPlayer).innerHTML += pushGeneratedData;


dataArray.push(pushGeneratedData)};