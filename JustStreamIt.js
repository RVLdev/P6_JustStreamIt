// ----------------------- I - Bloc MEILLEUR FILM (classement imdb) --------------------
let bestFilmsList = [];
let bestFilmUrl;

// 1 Affiche le bloc "Meilleur Film"
getBestFilmUrl();

function getBestFilmUrl(){
    fetch("http://localhost:8000/api/v1/titles/?format=json&sort_by=imdb_score,-year")
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            bestFilmsList = data;
            bestFilmUrl = bestFilmsList.results[0].url;
            getBestFilmDetails(bestFilmUrl);
        })
        .catch(function(error){
            console.log(error.message);
        });
}

function getBestFilmDetails(bestFilmUrl){
    fetch(bestFilmUrl)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            let detailedBestFilm = data;
            getBestFilmTitle(detailedBestFilm);
        })
        .catch(function(error){
            console.log(error.message);
        });
}

// 2 Alimentation BLOC CONTENEUR "Meilleur Film"
function getBestFilmTitle(detailedBestFilm){
    let bestFilmCategoryFilmTitle = 
        document.querySelector('#best_film_description > h1');
    bestFilmCategoryFilmTitle.textContent = 
        "Meilleur film : " + detailedBestFilm.title;
    getBestFilmTitleResume(detailedBestFilm);
}

function getBestFilmTitleResume(detailedBestFilm){
    let bestFilmCategoryFilmResume = 
        document.querySelector('#best_film_description > p');
    bestFilmCategoryFilmResume.textContent = detailedBestFilm.description;
    getBestFilmThumbnail(detailedBestFilm);
}

function getBestFilmThumbnail(detailedBestFilm){
    let bestFilmThumbnail = 
        document.querySelector('.best_film_thumbnail > img');
    bestFilmThumbnail.setAttribute("src", detailedBestFilm.image_url);
    getModalBestFilmDetails(detailedBestFilm);
}

// 3 Alimentation MODALE "Meilleur Film"

// Convertit la date YYYY-MM-DD en DD MM YYYY
function convertDate(detailedBestFilm){
    let strDate = detailedBestFilm.date_published;
    let splitedDate = strDate.split('-');
    let formatedDate = splitedDate[2]+" "+splitedDate[1]+" "+splitedDate[0];
    return formatedDate;
}
// Ajoute un espace entre les noms des acteurs
function addSpaceBetweenActors(detailedBestFilm){
    let rawList = detailedBestFilm.actors;
    let formatedList = rawList.join(", ");
    return formatedList;
}
// Ajoute un espace entre les noms des genres
function addSpaceBetweenGenres(detailedBestFilm){
    let rawList = detailedBestFilm.genres;
    let formatedList = rawList.join(", ");
    return formatedList;
}
// Affiche texte "Non communiqué" si valeur du Box Office = "null"
function ifBoxOfficeNull(detailedBestFilm){
    if (detailedBestFilm.worldwide_gross_income == null){
        return "Non communiqué";
    } else {
        return detailedBestFilm.worldwide_gross_income;
    }
}
// Alimente les détails du Meilleur Film dans la fenêtre MODALE
function getModalBestFilmDetails(detailedBestFilm){
    let modalFilmImage = 
        document.querySelector('.modal-body > ul > li .floatingpic');
    modalFilmImage.setAttribute("src", detailedBestFilm.image_url);
    
    let modalFilmDetails = document.getElementsByClassName("modal-body");
    (modalFilmDetails[0].getElementsByClassName("title"))[0].innerText = 
        "Titre : "+detailedBestFilm.title;
    (modalFilmDetails[0].getElementsByClassName("date_published"))[0].innerText = 
        "Date de sortie : "+convertDate(detailedBestFilm);
    (modalFilmDetails[0].getElementsByClassName("duration"))[0].innerText = 
        "Durée (min) : "+detailedBestFilm.duration;
    (modalFilmDetails[0].getElementsByClassName("long_description"))[0].innerText = 
        "Résumé : "+detailedBestFilm.long_description;
    (modalFilmDetails[0].getElementsByClassName("imbd_score"))[0].innerText = 
        "Score Imbd : "+detailedBestFilm.imdb_score;
    (modalFilmDetails[0].getElementsByClassName("worldwclasse_gross_income"))[0].innerText = 
        "Box Office : "+ifBoxOfficeNull(detailedBestFilm);
    (modalFilmDetails[0].getElementsByClassName("actors"))[0].innerText = 
        "Acteurs : "+addSpaceBetweenActors(detailedBestFilm);
    (modalFilmDetails[0].getElementsByClassName("directors"))[0].innerText = 
        "Réalisateur(s) : "+detailedBestFilm.directors;
    (modalFilmDetails[0].getElementsByClassName("genres"))[0].innerText = 
        "Genre(s) : "+addSpaceBetweenGenres(detailedBestFilm);
    (modalFilmDetails[0].getElementsByClassName("countries"))[0].innerText = 
        "Pays d'origine : "+detailedBestFilm.countries;
    (modalFilmDetails[0].getElementsByClassName("rated"))[0].innerText = 
        "rated : "+detailedBestFilm.rated;
}

// 4 Fenetre modale du MEILLEUR FILM 

// Structure, éléments fonctionnels de la fenêtre modale (constantes)
const buttonFilmDetails = document.getElementsByClassName("bouton_details");
const modalElement = document.getElementById("modal1");
const closingCross = document.getElementsByClassName("close");

// Affiche la fenêtre modale qd clique sur bouton "Détails du film"
buttonFilmDetails[0].addEventListener('click', function(){
    modalElement.style.display = "flex";
});

// Ferme la fenêtre modale qd clique sur la croix
closingCross[0].addEventListener('click', function(){
    modalElement.style.display = "none";
});

// -----------------------------  II  CARROUSELS --------------------------

// VARIABLES

// variables pour les instances de la classe SliderModal
let newModal; 
let newModalContent;
let newModalHeader;
let modalClose;
let modalH2; 
let newModalBody;
let modalUl;
let modalNoList;
let modalImage; 
let modalTitle;
let modalPublishedDate;
let modalDuration;
let modalLong_Desc; 
let modalImdbScore;
let modalBoxOffice;
let modalActors;
let modalDirectors; 
let modalGenres;
let modalCountries;
let modalRated;
let detailedFilm;

// variables pour "Les films les mieux notés"
let urlRequetePage1;
let urlRequetePage2;
let bestFilmsCategoryList = [];
let detailedBestFilmsUrlsList = [];
let bestFilmsImages = [];
let activePicSlider1 = document.querySelectorAll('.category1 .slider .active');

let category1Elements = document.getElementsByClassName("category1");
let thumbnailsList1 = category1Elements[0].getElementsByClassName("thumbnail");
let slidersList1 = category1Elements[0].getElementsByClassName("slider");

// variables pour la catégorie Aventure
let urlRequeteAdventurePage1;
let urlRequeteAdventurePage2;
let adventureFilmsCategoryList = [];
let detailedAdventureFilmsUrlsList = [];
let adventureFilmsImages = [];
let activePicSlider2 = document.querySelectorAll('.category2 .slider .active');

let category2Elements = document.getElementsByClassName("category2");
let thumbnailsList2 = category2Elements[0].getElementsByClassName("thumbnail");
let slidersList2 = category2Elements[0].getElementsByClassName("slider");

// variables pour la catégorie Mystère
let urlRequeteMysteryPage1;
let urlRequeteMysteryPage2;
let MysteryFilmsCategoryList = [];
let detailedMysteryFilmsUrlsList = [];
let MysteryFilmsImages = [];
let activePicSlider3 = document.querySelectorAll('.category3 .slider .active');

let category3Elements = document.getElementsByClassName("category3");
let thumbnailsList3 = category3Elements[0].getElementsByClassName("thumbnail");
let slidersList3 = category3Elements[0].getElementsByClassName("slider");

// variables pour la catégorie Biographie
let urlRequeteBiographyPage1;
let urlRequeteBiographyPage2;
let biographyFilmsCategoryList = [];
let detailedBiographyFilmsUrlsList = [];
let biographyFilmsImages = [];
let activePicSlider4 = document.querySelectorAll('.category4 .slider .active');

let category4Elements = document.getElementsByClassName("category4");
let thumbnailsList4 = category4Elements[0].getElementsByClassName("thumbnail");
let slidersList4 = category4Elements[0].getElementsByClassName("slider");

// CONSTRUCTION DES CARROUSELS

/*
//listes des 4 vignettes 'actives' (activeThumbnails) des 4 sliders
category1 -> BestFilms
category2 -> Adventure
category3 -> Mystery
category4 -> Biography
*/

// boutons 'suivant' et 'précédent' des 4 sliders
let nextThumbnail1 = document.querySelector('.category1 .nav-droite > img');
let previousThumbnail1 = document.querySelector('.category1 .nav-gauche > img');

let nextThumbnail2 = document.querySelector('.category2 .nav-droite > img');
let previousThumbnail2 = document.querySelector('.category2 .nav-gauche > img');

let nextThumbnail3 = document.querySelector('.category3 .nav-droite > img');
let previousThumbnail3 = document.querySelector('.category3 .nav-gauche > img');

let nextThumbnail4 = document.querySelector('.category4 .nav-droite > img');
let previousThumbnail4 = document.querySelector('.category4 .nav-gauche > img');

let count1 = 0; 
let count2 = 0;
let count3 = 0;
let count4 = 0;

class Slider{
    constructor(activeThumbnails, availableThumbnails, nextThumbnail,
        previousThumbnail, count){
        this.activeThumbnails = activeThumbnails;
        this.availableThumbnails = availableThumbnails;
        this.nextThumbnail = nextThumbnail;
        this.previousThumbnail = previousThumbnail;
        this.count = count;
    }

    updatingCount(){
        if(this.count > 3){
            this.count = - 3;
        } else if (this.count < - 7){
            this.count = -1;
            }
        return this.count;
    }

    changeThumbnail(){
        for (let pictIndex = 0; pictIndex < 4; pictIndex++){
            let pict1 = this.activeThumbnails[pictIndex];
            let pict1Src = pict1.getAttribute("src");
            if ((this.count + pictIndex) < 0){
                let newPict = 
                    this.availableThumbnails[this.availableThumbnails.length 
                    + (this.count + pictIndex)];
                pict1Src = newPict;
                pict1.setAttribute("src", pict1Src);
            } else {
                let newPict = this.availableThumbnails[this.count + pictIndex];
                pict1Src = newPict;
                pict1.setAttribute("src", pict1Src);
            }
        }
    }
}

// création 1er slider (1ère instance de la classe Slider)
let bestFilmsSlider = new Slider(activePicSlider1, 
    bestFilmsImages,
    nextThumbnail1,
    previousThumbnail1,
    count1);

// création 2e slider (2e instance de la classe Slider)
let AdventureSlider = new Slider(activePicSlider2, 
    adventureFilmsImages, 
    nextThumbnail2,
    previousThumbnail2,
    count2);

//création 3e slider (3e instance de la classe Slider)
let MysterySlider = new Slider(activePicSlider3, 
    MysteryFilmsImages, 
    nextThumbnail3,
    previousThumbnail3,
    count3);

// création 4e slider (4e instance de la classe Slider)
let BiographySlider = new Slider(activePicSlider4, 
    biographyFilmsImages, 
    nextThumbnail4,
    previousThumbnail4,
    count4);


// détection de clic sur boutons précédent/suivant 1 et lancement réaction
bestFilmsSlider.previousThumbnail.addEventListener('click', function(){
    bestFilmsSlider.count--;
    bestFilmsSlider.updatingCount(this.count);
    bestFilmsSlider.changeThumbnail(this.activeThumbnails, 
        this.availableThumbnails, this.count);
});

bestFilmsSlider.nextThumbnail.addEventListener('click', function(){
    bestFilmsSlider.count++;
    bestFilmsSlider.updatingCount(this.count);
    bestFilmsSlider.changeThumbnail(this.activeThumbnails, 
        this.availableThumbnails, this.count);
});


// détection de clic sur boutons précédent/suivant 2 et lancement réaction
AdventureSlider.previousThumbnail.addEventListener('click', function(){
    AdventureSlider.count--;
    AdventureSlider.updatingCount(this.count);
    AdventureSlider.changeThumbnail(this.activeThumbnails, 
        this.availableThumbnails, this.count);
});

AdventureSlider.nextThumbnail.addEventListener('click', function(){
    AdventureSlider.count++;
    AdventureSlider.updatingCount(this.count);
    AdventureSlider.changeThumbnail(this.activeThumbnails, 
        this.availableThumbnails, this.count);
});


// détection de clic sur boutons précédent/suivant 3 et lancement réaction
MysterySlider.previousThumbnail.addEventListener('click', function(){
    MysterySlider.count--;
    MysterySlider.updatingCount(this.count);
    MysterySlider.changeThumbnail(this.activeThumbnails, 
        this.availableThumbnails, this.count);
});

MysterySlider.nextThumbnail.addEventListener('click', function(){
    MysterySlider.count++;
    MysterySlider.updatingCount(this.count);
    MysterySlider.changeThumbnail(this.activeThumbnails, 
        this.availableThumbnails, this.count);
});

// détection de clic sur boutons précédent/suivant 4 et lancement réaction
BiographySlider.previousThumbnail.addEventListener('click', function(){
    BiographySlider.count--;
    BiographySlider.updatingCount(this.count);
    BiographySlider.changeThumbnail(this.activeThumbnails, 
        this.availableThumbnails, this.count);
});

BiographySlider.nextThumbnail.addEventListener('click', function(){
    BiographySlider.count++;
    BiographySlider.updatingCount(this.count);
    BiographySlider.changeThumbnail(this.activeThumbnails, 
        this.availableThumbnails, this.count);
});



// *** 1ER CARROUSEL - RECUPERATION DONNEES CATEGORIE 'Films Les Mieux Notés' ***

getBestFilms();

// 1ER CARROUSEL   1- Récupération de la LISTE DES FILMS pour carrousel
function getBestFilms(){
    urlRequetePage1 = 
        "http://localhost:8000/api/v1/titles/?format=json&sort_by=imdb_score,-year";
    urlRequetePage2 = 
        "http://localhost:8000/api/v1/titles/?format=json&page=2&sort_by=imdb_score,-year";
    getFilmsList(urlRequetePage1, urlRequetePage2);
}

// 1ER CARROUSEL récupération de la  1ère page de données de la requête
/*
Pour la catégorie 'Films Les Mieux Notés', 
on supprime le 1er film car déjà présenté dans la catégorie 'MEILLEUR FILM.
*/

function getFilmsList(urlRequetePage1, urlRequetePage2){
    fetch(urlRequetePage1)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            let filmsRequest = data;
            bestFilmsCategoryList = filmsRequest.results;
            bestFilmsCategoryList.shift();
            get2ndPageFilms(bestFilmsCategoryList, urlRequetePage2);
        })
        .catch(function(error){
            console.log(error.message);
        });
}

// 1ER CARROUSEL récupération de la  2e page de données de la requête
/* 
Pour la catégorie 'Films Les Mieux Notés', 
nous avons 4 films issus de la 1ère page de données.
Il ne nous manque plus que les 3 films suivants.
*/
function get2ndPageFilms(bestFilmsCategoryList, urlRequetePage2){
    fetch(urlRequetePage2)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            let filmsRequestPage2 = data;
            let page2FilmsList = filmsRequestPage2.results;
            bestFilmsCategoryList.push(page2FilmsList[0]);
            bestFilmsCategoryList.push(page2FilmsList[1]);
            bestFilmsCategoryList.push(page2FilmsList[2]);
            getbestFilmsImages(bestFilmsCategoryList); 
            getDetailedRatedFilmsUrls(bestFilmsCategoryList);
            return bestFilmsCategoryList;
        })
        .catch(function(error){
            console.log(error.message);
        });
}

// 1ER CARROUSEL 2- récupération URLS films DETAILLES "Les films les mieux notés"
function getDetailedRatedFilmsUrls(bestFilmsCategoryList){
    for (let eachFilm of bestFilmsCategoryList){
        detailedBestFilmsUrlsList.push(eachFilm.url);
    }
    return detailedBestFilmsUrlsList;
}

// 1ER CARROUSEL 3- Récupération des images pour carrousel "Films les mieux notés"
function getbestFilmsImages(bestFilmsCategoryList){
    if (bestFilmsCategoryList.length > 0){
        for(let everyFilm in bestFilmsCategoryList){
            bestFilmsImages.push(bestFilmsCategoryList[everyFilm].image_url);
        }
        loadRatedFilmsSliderImages(bestFilmsImages);
        return bestFilmsImages;
    }
}

// ********** 1ER CARROUSEL - ETAPE : CHARGER LE SLIDER **********************

// 1ER CARROUSEL  Chargement des 4 images ds Carrousel "Films les mieux notés"
/* 
dans cette catégorie le 1er film est déjà affiché comme MEILLEUR FILM, 
ici la 1ère vignette du carrousel sera donc le 2e film de la liste 
des "Films les mieux notés" 
*/
function loadRatedFilmsSliderImages(bestFilmsImages){
    activePicSlider1[0].setAttribute("src", bestFilmsImages[0]);
    activePicSlider1[1].setAttribute("src", bestFilmsImages[1]);
    activePicSlider1[2].setAttribute("src", bestFilmsImages[2]);
    activePicSlider1[3].setAttribute("src", bestFilmsImages[3]);
}

// ******* 1ER CARROUSEL - ETAPE : CREER ET AFFICHER/FERMER LA MODALE *********

class SliderModal{
    constructor(newSliderModal, newSliderModalContent, newSliderModalHeader,
        sliderModalClose, sliderModalH2, newSliderModalBody, sliderModalUl,
        sliderModalNoList, sliderModalImage, sliderModalTitle,
        sliderModalPublishedDate, sliderModalDuration, sliderModalLong_Desc,
        sliderModalImdbScore, sliderModalBoxOffice, sliderModalActors,
        sliderModalDirectors, sliderModalGenres, sliderModalCountries, 
        sliderModalRated, slidersList, thumbnailsList, sliderDetailedFilm){
        this.newSliderModal = newSliderModal;
        this.newSliderModalContent = newSliderModalContent;
        this.newSliderModalHeader = newSliderModalHeader;
        this.sliderModalClose = sliderModalClose;
        this.sliderModalH2 = sliderModalH2;
        this.newSliderModalBody = newSliderModalBody;
        this.sliderModalUl = sliderModalUl;
        this.sliderModalNoList = sliderModalNoList;
        this.sliderModalImage = sliderModalImage;
        this.sliderModalTitle = sliderModalTitle;
        this.sliderModalPublishedDate = sliderModalPublishedDate;
        this.sliderModalDuration = sliderModalDuration;
        this.sliderModalLong_Desc = sliderModalLong_Desc;
        this.sliderModalImdbScore = sliderModalImdbScore;
        this.sliderModalBoxOffice = sliderModalBoxOffice;
        this.sliderModalActors = sliderModalActors;
        this.sliderModalDirectors = sliderModalDirectors;
        this.sliderModalGenres = sliderModalGenres;
        this.sliderModalCountries = sliderModalCountries;
        this.sliderModalRated = sliderModalRated;
        this.slidersList = slidersList;
        this.thumbnailsList = thumbnailsList;
        this.sliderDetailedFilm = sliderDetailedFilm;
    }

    // Création et assemblage des éléments de la Modale
    setThumbnailModalElements(){
        this.newSliderModal = document.createElement('aside');
        this.newSliderModalContent = document.createElement('div');
        this.newSliderModalHeader = document.createElement('div');
        this.sliderModalClose = document.createElement('div');
        this.sliderModalH2= document.createElement('h2');
        this.newSliderModalBody = document.createElement('div');
        this.sliderModalUl = document.createElement('ul');
        this.sliderModalNoList = document.createElement('li');
        this.sliderModalImage = document.createElement('img');
        this.sliderModalTitle = document.createElement('li');
        this.sliderModalPublishedDate = document.createElement('li'); 
        this.sliderModalDuration = document.createElement('li');
        this.sliderModalLong_Desc = document.createElement('li');
        this.sliderModalImdbScore = document.createElement('li');
        this.sliderModalBoxOffice = document.createElement('li');
        this.sliderModalActors = document.createElement('li');
        this.sliderModalDirectors = document.createElement('li');
        this.sliderModalGenres = document.createElement('li');
        this.sliderModalCountries = document.createElement('li');
        this.sliderModalRated = document.createElement('li');
    }

    setThumbnailModalElementsAttributes(){
        this.newSliderModal.setAttribute('class', "modal");
    
        this.newSliderModalContent.setAttribute('class', "modal-content");
    
        this.newSliderModalHeader.setAttribute('class', "modal_header");
    
        this.sliderModalClose.setAttribute('class', "close");
        this.sliderModalClose.innerText = "  X  ";
    
        this.sliderModalH2.innerText = "Catégorie"; 
    
        this.newSliderModalBody.setAttribute('class', "modal-body");
    
        this.sliderModalNoList.setAttribute('class', "no_list");
    
        this.sliderModalImage.setAttribute('src', "");
        this.sliderModalImage.setAttribute('class', "floatingpic");
        this.sliderModalImage.setAttribute('alt', "affiche film");
    
        this.sliderModalTitle.setAttribute('class', "title");
        this.sliderModalTitle.innerText = "Titre du film";
    
        this.sliderModalPublishedDate.setAttribute('class', "date_published");
        this.sliderModalPublishedDate.innerText = "Date de sortie";
    
        this.sliderModalDuration.setAttribute('class', "duration");
        this.sliderModalDuration.innerText = "Durée";
    
        this.sliderModalLong_Desc.setAttribute('class', "long_description");
        this.sliderModalLong_Desc.innerText = "Résumé long";
    
        this.sliderModalImdbScore.setAttribute('class', "imbd_score");
        this.sliderModalImdbScore.innerText = "Score imdb";
    
        this.sliderModalBoxOffice.setAttribute('class', 
            "worldwclasse_gross_income");
        this.sliderModalBoxOffice.innerText = "Box Office";
    
        this.sliderModalActors.setAttribute('class', "actors");
        this.sliderModalActors.innerText = "Acteurs";
    
        this.sliderModalDirectors.setAttribute('class', "directors");
        this.sliderModalDirectors.innerText = "Réalisateur(s)";
    
        this. sliderModalGenres.setAttribute('class', "genres");
        this.sliderModalGenres.innerText = "Genres";
    
        this.sliderModalCountries.setAttribute('class', "countries");
        this.sliderModalCountries.innerText = "Pays d'origine";
    
        this.sliderModalRated.setAttribute('class', "rated");
        this.sliderModalRated.innerText = '"Rated"';

    }

    buildThumbnailModal(){
        this.slidersList[0].insertBefore(this.newSliderModal, 
            this.thumbnailsList[0]); // emplacement de la MODALE
        this.newSliderModal.appendChild(this.newSliderModalContent);
        this.newSliderModalContent.appendChild(this.newSliderModalBody);
        this.newSliderModalContent.insertBefore(this.newSliderModalHeader, 
            this.newSliderModalBody);
        this.newSliderModalHeader.appendChild(this.sliderModalH2);
        this.newSliderModalHeader.insertBefore(this.sliderModalClose, 
            this.sliderModalH2);
        this.newSliderModalBody.appendChild(this.sliderModalUl);
        this.sliderModalUl.appendChild(this.sliderModalRated);
        this.sliderModalUl.insertBefore(this.sliderModalCountries, 
            this.sliderModalRated);
        this.sliderModalUl.insertBefore(this.sliderModalGenres, 
            this.sliderModalCountries);
        this.sliderModalUl.insertBefore(this.sliderModalDirectors, 
            this.sliderModalGenres);
        this.sliderModalUl.insertBefore(this.sliderModalActors, 
            this.sliderModalDirectors);
        this.sliderModalUl.insertBefore(this.sliderModalBoxOffice, 
            this.sliderModalActors);
        this.sliderModalUl.insertBefore(this.sliderModalImdbScore, 
            this.sliderModalBoxOffice);
        this.sliderModalUl.insertBefore(this.sliderModalLong_Desc, 
            this.sliderModalImdbScore);
        this.sliderModalUl.insertBefore(this.sliderModalDuration, 
            this.sliderModalLong_Desc);
        this.sliderModalUl.insertBefore(this.sliderModalPublishedDate, 
            this.sliderModalDuration);
        this.sliderModalUl.insertBefore(this.sliderModalTitle, 
            this.sliderModalPublishedDate);
        this.sliderModalUl.insertBefore(this.sliderModalNoList, 
            this.sliderModalTitle);
        this.sliderModalNoList.appendChild(this.sliderModalImage);
    }

    // affiche la Modale
    displaySliderModal(){
        this.newSliderModal.style.display = "flex";
    }

    // alimente la Modale avec les informations du film 'cliqué'
    setModalFilmDetails(){
        this.sliderModalH2.innerText = this.modalH2;
        this.sliderModalTitle.innerText = "Titre : "+this.detailedFilm.title;
        this.sliderModalImage.setAttribute('src', this.detailedFilm.image_url);
        this.sliderModalPublishedDate.innerText = "Date de sortie : " + 
            this.detailedFilm.date_published.split('-')[2] + 
            " " + this.detailedFilm.date_published.split('-')[1] + 
            " "+this.detailedFilm.date_published.split('-')[0];
        this.sliderModalDuration.innerText = 
            "Durée (min) : " + this.detailedFilm.duration;
        this.sliderModalLong_Desc.innerText = 
            "Résumé : " + this.detailedFilm.long_description;
        this.sliderModalImdbScore.innerText = 
            "Score Imbd : " + this.detailedFilm.imdb_score;

        if (this.detailedFilm.worldwide_gross_income == null){
            this.sliderModalBoxOffice.innerText = "Box Office : Non communiqué";
        } else {
            this.sliderModalBoxOffice.innerText = 
                "Box Office : " + this.detailedFilm.worldwide_gross_income;
        }

        this.sliderModalActors.innerText = 
            "Acteurs : "+ this.detailedFilm.actors.join(", ");

        if (this.detailedFilm.directors.length > 1){
            this.sliderModalDirectors.innerText = 
                "Réalisateur(s) : " + this.detailedFilm.directors.join(", ");
        } else {
            this.sliderModalDirectors.innerText = 
                "Réalisateur(s) : "+this.detailedFilm.directors;
        }
        
        this.sliderModalGenres.innerText = 
            "Genre(s) : " + this.detailedFilm.genres.join(", ");

        if (this.detailedFilm.countries.length > 1){
            this.sliderModalCountries.innerText = 
                "Pays d'origine : " + this.detailedFilm.countries.join(", ");
        } else {
            this.sliderModalCountries.innerText = 
                "Pays d'origine : " + this.detailedFilm.countries;
        }
        
        this.sliderModalRated.innerText = "rated : "+this.detailedFilm.rated;
    }

    // "ferme" la Modale
    closeSliderModal(){
        this.newSliderModal.style.display = "none";
    }
}

// 1ER CARROUSEL - 1 INSTANCIATION MODALE d'un carrousel et création de ses éléments
let bestFilmsSliderModal = new SliderModal(newModal, 
        newModalContent, newModalHeader, modalClose, modalH2, 
        newModalBody, modalUl, modalNoList, modalImage, 
        modalTitle, modalPublishedDate, modalDuration, modalLong_Desc, 
        modalImdbScore, modalBoxOffice, modalActors, modalDirectors, 
        modalGenres, modalCountries, modalRated, 
        slidersList1, thumbnailsList1, detailedFilm);

bestFilmsSliderModal.modalH2 = "Catégorie : Films les mieux notés";
bestFilmsSliderModal.setThumbnailModalElements();
bestFilmsSliderModal.setThumbnailModalElementsAttributes();
bestFilmsSliderModal.buildThumbnailModal();


// 1ER CARROUSEL -2 AFFICHAGE DE LA  MODALE qd clique sur une des vignettes 
for(let thumbnailIndex in [0, 1, 2, 3]){
    activePicSlider1[thumbnailIndex].addEventListener('click', function(){
        let activePicUrl = activePicSlider1[thumbnailIndex].getAttribute("src");
        let filmIndex = bestFilmsImages.indexOf(activePicUrl);
        let filmUrl = detailedBestFilmsUrlsList[filmIndex];
        getFilmDetails(filmUrl);
    });
}

// 1ER CARROUSEL récupération  LISTE des DETAILS d'UN FILM à partir de l'url du film détaillé
function getFilmDetails(filmUrl){
    fetch(filmUrl)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
        bestFilmsSliderModal.detailedFilm = data; 
        bestFilmsSliderModal.setModalFilmDetails(this.sliderDetailedFilm);
        bestFilmsSliderModal.displaySliderModal(this.newSliderModal);
        return bestFilmsSliderModal.detailedFilm;
        })
        .catch(function(error){
            console.log(error.message);
        });
}

// 1ER CARROUSEL -3 FERMETURE de la MODALE de la vignette cliquée
let bestFilmsClosingCross = (document.getElementsByClassName('close'))[1];
bestFilmsClosingCross.addEventListener('click', function(){
    bestFilmsSliderModal.closeSliderModal();
    });



// **** 2EME CARROUSEL - RECUPERATION DES DONNEES CATEGORIE : 'Aventure' ****

getAdventureFilms();

// 2EME CARROUSEL    1- Récupération de la LISTE DES FILMS pour carrousel "Aventure"
function getAdventureFilms(){
    urlRequeteAdventurePage1 = 
        "http://localhost:8000/api/v1/titles/?format=json&genre_contains=Adventure&sort_by=imdb_score,-year";
    urlRequeteAdventurePage2 = 
        "http://localhost:8000/api/v1/titles/?format=json&genre_contains=Adventure&page=2&sort_by=imdb_score,-year";
    getAdvendureFilmsList(urlRequeteAdventurePage1, urlRequeteAdventurePage2);
}

// 2EME CARROUSEL récupération de la  1ère page de données de la requête

function getAdvendureFilmsList(urlRequeteAdventurePage1, 
                                urlRequeteAdventurePage2){
    fetch(urlRequeteAdventurePage1)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            let AdvendureFilmsRequest = data;
            adventureFilmsCategoryList = AdvendureFilmsRequest.results;
            get2ndPageAdventureFilms(adventureFilmsCategoryList, 
                urlRequeteAdventurePage2);
        })
        .catch(function(error){
            console.log(error.message);
        });
}

// 2EME CARROUSEL récupération de la  2e page de données de la requête
function get2ndPageAdventureFilms(adventureFilmsCategoryList, 
                                    urlRequeteAdventurePage2){
    fetch(urlRequeteAdventurePage2)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            let AdvendurefilmsRequestPage2 = data;
            let page2AdventureFilmsList = AdvendurefilmsRequestPage2.results;
            adventureFilmsCategoryList.push(page2AdventureFilmsList[0]);
            adventureFilmsCategoryList.push(page2AdventureFilmsList[1]);
            getAdventureFilmsImages(adventureFilmsCategoryList); 
            getDetailedAdventureFilmsUrls(adventureFilmsCategoryList);
            return adventureFilmsCategoryList;
        })
        .catch(function(error){
            console.log(error.message);
        });
}

// 2EME CARROUSEL 2- récupération LISTE urls FILMS DETAILLES 
function getDetailedAdventureFilmsUrls(adventureFilmsCategoryList){
    for (let eachFilm of adventureFilmsCategoryList){
        detailedAdventureFilmsUrlsList.push(eachFilm.url);
    }
    return detailedAdventureFilmsUrlsList;
}

// 2EME CARROUSEL 3- Récupération des images pour carrousel "Aventure"
function getAdventureFilmsImages(adventureFilmsCategoryList){
    if (adventureFilmsCategoryList.length > 0){
        for(let everyFilm in adventureFilmsCategoryList){
            adventureFilmsImages.push(adventureFilmsCategoryList[everyFilm].image_url);
        }
        loadAdventureFilmsSliderImages(adventureFilmsImages);
        return adventureFilmsImages;
    }
}


// ************* 2EME CARROUSEL - ETAPE : CHARGER LE SLIDER ******************

// 2EME CARROUSEL  Chargement des 4 images ds Carrousel "Aventure"

function loadAdventureFilmsSliderImages(adventureFilmsImages){
    activePicSlider2[0].setAttribute("src", adventureFilmsImages[0]);
    activePicSlider2[1].setAttribute("src", adventureFilmsImages[1]);
    activePicSlider2[2].setAttribute("src", adventureFilmsImages[2]);
    activePicSlider2[3].setAttribute("src", adventureFilmsImages[3]);
}

// ******* 2EME CARROUSEL - ETAPE : CREER ET AFFICHER/FERMER LA MODALE *******

// 2EME CARROUSEL - 1 INSTANCIATION  MODALE d'un carrousel et création de ses éléments
let adventureFilmsSliderModal = new SliderModal(newModal, 
    newModalContent, newModalHeader, modalClose, modalH2, 
    newModalBody, modalUl, modalNoList, modalImage, 
    modalTitle, modalPublishedDate, modalDuration, modalLong_Desc, 
    modalImdbScore, modalBoxOffice, modalActors, modalDirectors, 
    modalGenres, modalCountries, modalRated, 
    slidersList2, thumbnailsList2, detailedFilm);

adventureFilmsSliderModal.modalH2 = "Catégorie : Aventure";
adventureFilmsSliderModal.setThumbnailModalElements();
adventureFilmsSliderModal.setThumbnailModalElementsAttributes();
adventureFilmsSliderModal.buildThumbnailModal();


// 2EME CARROUSEL -2 AFFICHAGE DE LA  MODALE qd clique sur une des vignettes
for(let thumbnailIndex in [0, 1, 2, 3]){
    activePicSlider2[thumbnailIndex].addEventListener('click', function(){
        let activePicUrl = activePicSlider2[thumbnailIndex].getAttribute("src");
        let filmIndex = adventureFilmsImages.indexOf(activePicUrl);
        let adventureFilmUrl = detailedAdventureFilmsUrlsList[filmIndex];
        getAdventureFilmDetails(adventureFilmUrl);
    });
}

// 2EME CARROUSEL récupération  LISTE des DETAILS d'UN FILM à partir de l'url du film détaillé

function getAdventureFilmDetails(adventureFilmUrl){
    fetch(adventureFilmUrl)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            adventureFilmsSliderModal.detailedFilm = data;
            adventureFilmsSliderModal.setModalFilmDetails(this.sliderDetailedFilm);
            adventureFilmsSliderModal.displaySliderModal(this.newSliderModal);
            return adventureFilmsSliderModal.detailedFilm;
        })
        .catch(function(error){
            console.log(error.message);
        });
}


// 2EME CARROUSEL -3 FERMETURE de la MODALE de la vignette cliquée
let adventureFilmsClosingCross = (document.getElementsByClassName('close'))[2];
adventureFilmsClosingCross.addEventListener('click', function(){
    adventureFilmsSliderModal.closeSliderModal();
    });


// **** 3EME CARROUSEL - RECUPERATION DES DONNEES CATEGORIE : 'Mystère' ****

getMysteryFilms();

// 3EME CARROUSEL    1- Récupération de la LISTE DES FILMS pour carrousel "Mystère"
function getMysteryFilms(){
    urlRequeteMysteryPage1 = 
        "http://localhost:8000/api/v1/titles/?format=json&genre_contains=Mystery&sort_by=imdb_score,-year";
    urlRequeteMysteryPage2 = 
        "http://localhost:8000/api/v1/titles/?format=json&genre_contains=Mystery&page=2&sort_by=imdb_score,-year";
    getMysteryFilmsList(urlRequeteMysteryPage1, urlRequeteMysteryPage2);
}

// 3EME CARROUSEL récupération de la  1ère page de données de la requête

function getMysteryFilmsList(urlRequeteMysteryPage1, urlRequeteMysteryPage2){
    fetch(urlRequeteMysteryPage1)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            let MysteryFilmsRequest = data;
            MysteryFilmsCategoryList = MysteryFilmsRequest.results;
            get2ndPageMysteryFilms(MysteryFilmsCategoryList, 
                                    urlRequeteMysteryPage2);
        })
        .catch(function(error){
            console.log(error.message);
        });
}

// 3EME CARROUSEL récupération de la  2e page de données de la requête
function get2ndPageMysteryFilms(MysteryFilmsCategoryList, 
                                urlRequeteMysteryPage2){
    fetch(urlRequeteMysteryPage2)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            let MysteryFilmsRequestPage2 = data;
            let page2MysteryFilmsList = MysteryFilmsRequestPage2.results;
            MysteryFilmsCategoryList.push(page2MysteryFilmsList[0]);
            MysteryFilmsCategoryList.push(page2MysteryFilmsList[1]);
            getMysteryFilmsImages(MysteryFilmsCategoryList); 
            getDetailedMysteryFilmsUrls(MysteryFilmsCategoryList);
            return MysteryFilmsCategoryList;
        })
        .catch(function(error){
            console.log(error.message);
        });
}


// 3EME CARROUSEL 2- récupération LISTE urls FILMS DETAILLES 
function getDetailedMysteryFilmsUrls(MysteryFilmsCategoryList){
    for (let eachFilm of MysteryFilmsCategoryList){
        detailedMysteryFilmsUrlsList.push(eachFilm.url);
    }
    return detailedMysteryFilmsUrlsList;
}

// 3EME CARROUSEL 3- Récupération des images pour carrousel "Mystère"
function getMysteryFilmsImages(MysteryFilmsCategoryList){
    if (MysteryFilmsCategoryList.length > 0){
        for(let everyFilm in MysteryFilmsCategoryList){
            MysteryFilmsImages.push(MysteryFilmsCategoryList[everyFilm].image_url);
        }
        loadMysteryFilmsSliderImages(MysteryFilmsImages);
        return MysteryFilmsImages;
    }
}

// *********** 3EME CARROUSEL - ETAPE : CHARGER LE SLIDER *********************

// 3EME CARROUSEL  Chargement des 4 images ds Carrousel "Mystère"
function loadMysteryFilmsSliderImages(MysteryFilmsImages){
    activePicSlider3[0].setAttribute("src", MysteryFilmsImages[0]);
    activePicSlider3[1].setAttribute("src", MysteryFilmsImages[1]);
    activePicSlider3[2].setAttribute("src", MysteryFilmsImages[2]);
    activePicSlider3[3].setAttribute("src", MysteryFilmsImages[3]);
}

// *********** 3EME CARROUSEL - CREER ET AFFICHER/FERMER LA MODALE ***********

// 3EME CARROUSEL - 1 INSTANCIATION  MODALE d'un carrousel et création de ses éléments
let MysteryFilmsSliderModal = new SliderModal(newModal, 
    newModalContent, newModalHeader, modalClose, modalH2, 
    newModalBody, modalUl, modalNoList, modalImage, 
    modalTitle, modalPublishedDate, modalDuration, modalLong_Desc, 
    modalImdbScore, modalBoxOffice, modalActors, modalDirectors, 
    modalGenres, modalCountries, modalRated, 
    slidersList3, thumbnailsList3, detailedFilm);

MysteryFilmsSliderModal.modalH2 = "Catégorie : Mystère";
MysteryFilmsSliderModal.setThumbnailModalElements();
MysteryFilmsSliderModal.setThumbnailModalElementsAttributes();
MysteryFilmsSliderModal.buildThumbnailModal();


// 3EME CARROUSEL -2 AFFICHAGE DE LA  MODALE qd clique sur une des vignettes 
for(let thumbnailIndex in [0, 1, 2, 3]){
    activePicSlider3[thumbnailIndex].addEventListener('click', function(){
        let activePicUrl = activePicSlider3[thumbnailIndex].getAttribute("src");
        let filmIndex = MysteryFilmsImages.indexOf(activePicUrl);
        let MysteryFilmUrl = detailedMysteryFilmsUrlsList[filmIndex];
        getMysteryFilmDetails(MysteryFilmUrl);
    });
}

// 3EME CARROUSEL récupération LISTE des DETAILS d'UN FILM à partir de l'url du film détaillé
function getMysteryFilmDetails(MysteryFilmUrl){
    fetch(MysteryFilmUrl)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            MysteryFilmsSliderModal.detailedFilm = data;
            MysteryFilmsSliderModal.setModalFilmDetails(this.sliderDetailedFilm);
            MysteryFilmsSliderModal.displaySliderModal(this.newSliderModal);
            return MysteryFilmsSliderModal.detailedFilm;
        })
        .catch(function(error){
            console.log(error.message);
        });
}

// 3EME CARROUSEL -3 FERMETURE de la MODALE de la vignette cliquée
let MysteryFilmsClosingCross = (document.getElementsByClassName('close'))[3];
MysteryFilmsClosingCross.addEventListener('click', function(){
    MysteryFilmsSliderModal.closeSliderModal();
    });



// *** 4EME CARROUSEL - RECUPERATION DES DONNEES CATEGORIE : 'Biographie' ****

getBiographyFilms();

// 4EME CARROUSEL    1- Récupération LISTE DES FILMS pour carrousel "Biographie"
function getBiographyFilms(){
    urlRequeteBiographyPage1 = 
        "http://localhost:8000/api/v1/titles/?format=json&genre_contains=Biography&sort_by=imdb_score,-year";
    urlRequeteBiographyPage2 = 
        "http://localhost:8000/api/v1/titles/?format=json&genre_contains=Biography&page=2&sort_by=imdb_score,-year";
    getBiographyFilmsList(urlRequeteBiographyPage1, urlRequeteBiographyPage2);
}

// 4EME CARROUSEL récupération de la  1ère page de données de la requête
function getBiographyFilmsList(urlRequeteBiographyPage1, 
                                urlRequeteBiographyPage2){
    fetch(urlRequeteBiographyPage1)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            let BiographyFilmsRequest = data;
            biographyFilmsCategoryList = BiographyFilmsRequest.results;
            get2ndPageBiographyFilms(biographyFilmsCategoryList, 
                                        urlRequeteBiographyPage2);
        })
        .catch(function(error){
            console.log(error.message);
        });
}

// 4EME CARROUSEL récupération de la  2e page de données de la requête
function get2ndPageBiographyFilms(biographyFilmsCategoryList, 
                                    urlRequeteBiographyPage2){
    fetch(urlRequeteBiographyPage2)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            let biographyFilmsRequestPage2 = data;
            let page2BiographyFilmsList = biographyFilmsRequestPage2.results;
            biographyFilmsCategoryList.push(page2BiographyFilmsList[0]);
            biographyFilmsCategoryList.push(page2BiographyFilmsList[1]);
            getBiographyFilmsImages(biographyFilmsCategoryList); 
            getDetailedBiographyFilmsUrls(biographyFilmsCategoryList);
            return biographyFilmsCategoryList;
        })
        .catch(function(error){
            console.log(error.message);
        });
}

// 4EME CARROUSEL 2- récupération LISTE urls FILMS DETAILLES 
function getDetailedBiographyFilmsUrls(biographyFilmsCategoryList){
    for (let eachFilm of biographyFilmsCategoryList){
        detailedBiographyFilmsUrlsList.push(eachFilm.url);
    }
    return detailedBiographyFilmsUrlsList;
}

// 4EME CARROUSEL 3- Récupération des images pour carrousel "Biographie"
function getBiographyFilmsImages(biographyFilmsCategoryList){
    if (biographyFilmsCategoryList.length > 0){
        for(let everyFilm in biographyFilmsCategoryList){
            biographyFilmsImages.push(biographyFilmsCategoryList[everyFilm].image_url);
        }
        loadBiographyFilmsSliderImages(biographyFilmsImages);
        return biographyFilmsImages;
    }
}

// ********** 4EME CARROUSEL - ETAPE : CHARGER LE SLIDER *********************

// 4EME CARROUSEL  Chargement des 4 images ds Carrousel "Biographie"
function loadBiographyFilmsSliderImages(biographyFilmsImages){
    activePicSlider4[0].setAttribute("src", biographyFilmsImages[0]);
    activePicSlider4[1].setAttribute("src", biographyFilmsImages[1]);
    activePicSlider4[2].setAttribute("src", biographyFilmsImages[2]);
    activePicSlider4[3].setAttribute("src", biographyFilmsImages[3]);
}

// *********** 4EME CARROUSEL - CREER ET AFFICHER/FERMER LA MODALE ***********

// 4EME CARROUSEL - 1 INSTANCIATION MODALE d'un carrousel et création de ses éléments
let biographyFilmsSliderModal = new SliderModal(newModal, 
    newModalContent, newModalHeader, modalClose, modalH2, 
    newModalBody, modalUl, modalNoList, modalImage, 
    modalTitle, modalPublishedDate, modalDuration, modalLong_Desc, 
    modalImdbScore, modalBoxOffice, modalActors, modalDirectors, 
    modalGenres, modalCountries, modalRated, 
    slidersList4, thumbnailsList4, detailedFilm);

biographyFilmsSliderModal.modalH2 = "Catégorie : Biographie";
biographyFilmsSliderModal.setThumbnailModalElements();
biographyFilmsSliderModal.setThumbnailModalElementsAttributes();
biographyFilmsSliderModal.buildThumbnailModal();


// 4EME CARROUSEL -2 AFFICHAGE DE LA  MODALE qd clique sur une des vignettes 
for(let thumbnailIndex in [0, 1, 2, 3]){
    activePicSlider4[thumbnailIndex].addEventListener('click', function(){
        let activePicUrl = activePicSlider4[thumbnailIndex].getAttribute("src");
        let filmIndex = biographyFilmsImages.indexOf(activePicUrl);
        let biographyFilmUrl = detailedBiographyFilmsUrlsList[filmIndex];
        getBiographyFilmDetails(biographyFilmUrl);
    });
}

// 4EME CARROUSEL récupération  LISTE des DETAILS d'UN FILM à partir de l'url du film détaillé
function getBiographyFilmDetails(biographyFilmUrl){
    fetch(biographyFilmUrl)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            biographyFilmsSliderModal.detailedFilm = data;
            biographyFilmsSliderModal.setModalFilmDetails(this.sliderDetailedFilm);
            biographyFilmsSliderModal.displaySliderModal(this.newSliderModal);
            return biographyFilmsSliderModal.detailedFilm;
        })
        .catch(function(error){
            console.log(error.message);
        });
}

// 4EME CARROUSEL -3 FERMETURE de la MODALE de la vignette cliquée
let biographyFilmsClosingCross = (document.getElementsByClassName('close'))[4];
biographyFilmsClosingCross.addEventListener('click', function(){
    biographyFilmsSliderModal.closeSliderModal();
    });
