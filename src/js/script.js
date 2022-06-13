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
      searchData.push(singleSong);
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

dataArray.push(pushGeneratedData);

/* [DONE] 3. Discover music */

function getRandomItem(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    const item = arr[randomIndex];
    return item;
  }
  
  const discoverLink = document.querySelector(select.nav.discover);
  
  discoverLink.addEventListener('click', function(){
  
    let randomSong = getRandomItem(dataArray);
  
    document.querySelector(select.containerOf.discover).innerHTML = '';
  
    document.querySelector(select.containerOf.discover).innerHTML = randomSong;
  
      GreenAudioPlayer.init({
        selector: '.discover__wrapper .player',
        stopOthersOnPlay: true
      });
  
    })
  
  };

  /* [DONE] 3. Search function */

const searchData = [];

const searchInput = document.querySelector(select.element.searchInput);

/* Filter search data */

const searchSong = function(){
  let inputValue = searchInput.value;
  let filteredSongs = searchData.filter(keyWord => keyWord.filename.toLowerCase().includes(inputValue.toLowerCase()));

  if (filteredSongs.length == 0) {
    alert('Song not found');
  }

  /* Preparing song template */

  const prepareTemplate = function(id, author, title, categories, ranking, songName, cover){
    const generatedData = {id: id, author: author, title: title, categories: categories, ranking: ranking, songName: songName, cover: cover}

    const pushGeneratedData = templates.player(generatedData);
    document.querySelector(select.containerOf.search).innerHTML += pushGeneratedData;

    /* Display options */

    document.querySelector(select.containerOf.searchResult).style.display = 'block';

    document.querySelector(select.containerOf.resultValue).innerHTML = ' '+ filteredSongs.length;

    let wordSong;

    if (filteredSongs.length > 1) {
      wordSong = ' songs.';
    } else if (filteredSongs.length == 1) {
      wordSong = ' song.';
    } else if (filteredSongs.lengt < 1) {
      wordSong = ' songs.';
    }

    document.querySelector(select.containerOf.wordSong).innerHTML = wordSong;
  };

  document.querySelector(select.containerOf.search).innerHTML = '';
  document.querySelector(select.element.searchInput).value = '';

  for (let filterSong of filteredSongs) {

      const songId = filterSong.id;
      const songTitle = filterSong.title;
      const songName = filterSong.filename;
      const songCategories = filterSong.categories;
      const songRanking = filterSong.ranking;
      const songFilename = filterSong.filename.toLowerCase();
      const songCover = filterSong.cover;

    // [DONE] Creating correct author name

      const authorAndTitle = songFilename.replaceAll('_', ' ').replace('.mp3', '').replace('-', ' ');
      const songTitleLowerCase = songTitle.toLowerCase();
      const authorNameLowerCase = authorAndTitle.split(songTitleLowerCase).join('').trim().split(" ");
      const firstName = authorNameLowerCase[0];
      const authorNameUpperCase = firstName[0].toUpperCase() + firstName.slice(1);
      const secondName = authorNameLowerCase[1];
      const authorSurameUpperCase = secondName[0].toUpperCase() + secondName.slice(1);
      const authorName = authorNameUpperCase + ' ' + authorSurameUpperCase;

      prepareTemplate(songId, authorName, songTitle, songCategories, songRanking, songName, songCover)
  }

  GreenAudioPlayer.init({
    selector: '.search__wrapper .player', // inits Green Audio Player on each audio container that has class "player"
    stopOthersOnPlay: true
  });

};

const searchMenuButton = document.querySelector('.search__nav');

searchMenuButton.addEventListener('click', function(){
  document.querySelector(select.containerOf.search).innerHTML = '';
  document.querySelector(select.containerOf.resultValue).innerHTML = ' ... ';
  document.querySelector(select.containerOf.wordSong).innerHTML = 'songs.';
})

const searchButton = document.querySelector(select.element.searchButton);

searchButton.addEventListener('click', function(){
  document.querySelector(select.containerOf.search).innerHTML = '';
  if(document.querySelector(select.element.searchInput).value != ''){
    searchSong();
  }else
  document.querySelector(select.containerOf.resultValue).innerHTML = ' 0 ';
})

/* [IN PROGRESS] To do list:
  - Categories on main site,
  - Correct search section
  - Export files
  - Publicate web on heroku
*/