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