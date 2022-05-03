// variables : utilité à vérifier

let bestFilmTitle;
let bestFilmImageUrl;
let bestFilmDescription;
let bestFilmDate;
let bestFilmDuration;
let bestFilmLongDescription;
let bestFilmImbd;
let bestFilmBoxOffice;
let bestFilmActors;
let bestFilmDirectors;
let bestFilmGenres;
let bestFilmCountries;
let bestFilmRated;


// Exemple pour tests : Meilleur Film = 'film1' ------------A SUPPRIMER-------------------
let film1 = {
    "title": "The Fantasticks", 
    "date_published": "2000-09-22", 
    "duration": 86, 
    "description": "A mysterious fair that comes to a small community in the countryside could make real the illusions of two teenagers.", 
    "long_description": "Two teenagers on neighboring farms steal glances and hide their romance from their feuding fathers. However, the fathers are actually good friends who have hatched a plan--with help from a mystical roving sideshow and its equally-mysterious ringmaster--to get the two lovebirds down the aisle. But in order to bring these families together, they must first be torn apart.", 
    "avg_vote": "5.6", 
    "imdb_score": "5.6", 
    "worldwide_gross_income": 49666, 
    "image_url": "https://m.media-amazon.com/images/M/MV5BMjIyMDE0NzY1M15BMl5BanBnXkFtZTgwOTgzMzgwMzE@._V1_UX182_CR0,0,182,268_AL_.jpg", 
    "actors": ["Arturo Gil", "Barnard Hughes", "Brad Sullivan", "Dyrk Ashton",
                "Gregory Amato", "Jean Louisa Kelly", "Joel Grey", 
                "Joey McIntyre", "Jonathon Morris", "Lee Bell", 
                "Shaunery Stevens", "Teller", "Tony Cox", "Trayne Thomas", 
                "Victoria Stevens"], 
    "directors": ["Michael Ritchie"], 
    "genres": ["Musical", "Romance"], 
    "countries": ["USA"], 
    "rated": "PG"
};

// ----- 1 API - MEILLEUR FILM (classement imdb) -----
let bestFilmsList = [];
let bestFilmUrl;
let detailedbestFilmsList = [];

// 1 Affiche le bloc "Meilleur Film"
getBestFilmUrl();


function getBestFilmUrl(){
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', "http://localhost:8000/api/v1/titles/?format=json&sort_by=imdb_score,-year", true);
    httpRequest.send();
    httpRequest.onreadystatechange = function(){
        if(httpRequest.readyState === 4){
            if (httpRequest.status === 200) {
                bestFilmsList = JSON.parse(httpRequest.responseText);
                //console.log(bestFilmsList);
                bestFilmUrl =bestFilmsList.results[0].url;
                //console.log(bestFilmUrl);
                getBestFilmDetails(bestFilmUrl);
            }
        }
    };
}

function getBestFilmDetails(bestFilmUrl){
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', bestFilmUrl, true);
    httpRequest.send();
    httpRequest.onreadystatechange = function(){
        if(httpRequest.readyState === 4){
            if (httpRequest.status === 200) {
                let detailedFilm = JSON.parse(httpRequest.responseText);
                //console.log(detailedFilm);
                getBestFilmTitle(detailedFilm)
            }
        }
    };
}

// 1 Alimentation BLOC CONTENEUR "Meilleur Film"
function getBestFilmTitle(detailedFilm){
    let bestFilmCategoryFilmTitle = document.querySelector('#best_film_description > h1');
    bestFilmCategoryFilmTitle.textContent = "Meilleur film : "+detailedFilm.title;
    //console.log(bestFilmCategoryFilmTitle.textContent);
    getBestFilmTitleResume(detailedFilm);
}

function getBestFilmTitleResume(detailedFilm){
    let bestFilmCategoryFilmResume = document.querySelector('#best_film_description > p');
    bestFilmCategoryFilmResume.textContent = detailedFilm.description;
    //console.log(bestFilmCategoryFilmResume.textContent);
    getBestFilmThumbnail(detailedFilm);
}

function getBestFilmThumbnail(detailedFilm){
    let bestFilmThumbnail = document.querySelector('.best_film_thumbnail > img');
    bestFilmThumbnail.setAttribute("src", detailedFilm.image_url);
    getModalBestFilmDetails(detailedFilm);
}

// 1 Alimentation MODALE "Meilleur Film"

// Convertit la date YYYY-MM-DD en DD MM YYYY
function convertDate(detailedFilm){
    let strDate = detailedFilm.date_published;
    let splitedDate = strDate.split('-');
    let formatedDate = splitedDate[2]+" "+splitedDate[1]+" "+splitedDate[0];
    return formatedDate;
}
// Ajoute un espace entre les noms des acteurs
function addSpaceBetweenActors(detailedFilm){
    let rawList = detailedFilm.actors;
    let formatedList = rawList.join(", ");
    return formatedList;
}
// Ajoute un espace entre les noms des genres
function addSpaceBetweenGenres(detailedFilm){
    let rawList = detailedFilm.genres;
    let formatedList = rawList.join(", ");
    return formatedList;
}
// Affiche texte "Non communiqué" si valeur du Box Office = "null"
function ifBoxOfficeNull(detailedFilm){
    if (detailedFilm.worldwide_gross_income == null){
        return "Non communiqué";
    } else {
        return detailedFilm.worldwide_gross_income;
    }
}
// 1 Alimente les détails du Meilleur Film dans la fenêtre MODALE
function getModalBestFilmDetails(detailedFilm){
    let modalFilmDetails = document.getElementsByClassName("modal-body");

    (modalFilmDetails[0].getElementsByClassName("title"))[0].innerText = "Titre : "+detailedFilm.title;

    let modalFilmImage = document.querySelector('.modal-body > ul > li .floatingpic');
    modalFilmImage.setAttribute("src", detailedFilm.image_url);
    
    (modalFilmDetails[0].getElementsByClassName("date_published"))[0].innerText = "Date de sortie : "+convertDate(detailedFilm);
    (modalFilmDetails[0].getElementsByClassName("duration"))[0].innerText = "Durée (min) : "+detailedFilm.duration;
    (modalFilmDetails[0].getElementsByClassName("long_description"))[0].innerText = "Résumé : "+detailedFilm.long_description;
    (modalFilmDetails[0].getElementsByClassName("imbd_score"))[0].innerText = "Score Imbd : "+detailedFilm.imdb_score;
    (modalFilmDetails[0].getElementsByClassName("worldwclasse_gross_income"))[0].innerText = "Box Office : "+ifBoxOfficeNull(detailedFilm);
    (modalFilmDetails[0].getElementsByClassName("actors"))[0].innerText = "Acteurs : "+addSpaceBetweenActors(detailedFilm);
    (modalFilmDetails[0].getElementsByClassName("directors"))[0].innerText = "Réalisateur(s) : "+detailedFilm.directors;
    (modalFilmDetails[0].getElementsByClassName("genres"))[0].innerText = "Genre(s) : "+addSpaceBetweenGenres(detailedFilm);
    (modalFilmDetails[0].getElementsByClassName("countries"))[0].innerText = "Pays d'origine : "+detailedFilm.countries;
    (modalFilmDetails[0].getElementsByClassName("rated"))[0].innerText = "rated : "+detailedFilm.rated;
}

//  *** 1 Fenetre modale du MEILLEUR FILM ***

// 1 Structure, éléments fonctionnels de la fenêtre modale (constantes)
const buttonFilmDetails = document.getElementsByClassName("bouton_details");
const modalElement = document.getElementById("modal1");
const closingCross = document.getElementsByClassName("close");


// Affiche la fenêtre modale qd clique sur bouton "Détails du film" -- A POURSUIVRE v27 04
buttonFilmDetails[0].addEventListener('click', function(){
    modalElement.style.display = "flex";
});

// Ferme la fenêtre modale qd clique sur la croix
closingCross[0].addEventListener('click', function(){
    modalElement.style.display = "none";
});


// ----- 2 API - FILMS lES MIEUX NOTES (classement "rated") -----
let bestRatedfilmsList = [];
let bestRatedFilmsImages = [];
let activePicSlider1 = document.querySelectorAll('.category1 .slider .active'); 

// 2 Récupération des images pour carrousel "Films les mieux notés"
function getBestRatedFilmsImages(){
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', "http://localhost:8000/api/v1/titles/?format=json&sort_by=rated,-year", true);
    httpRequest.send();
    httpRequest.onreadystatechange = function(){
        if(httpRequest.readyState === 4){
            if (httpRequest.status === 200) {
                bestRatedfilmsList = JSON.parse(httpRequest.responseText);
                console.log(bestRatedfilmsList);
                getBestRatedFilmsImages(bestRatedfilmsList);
                getAvailableFilms(bestRatedFilmsImages);
                getBestRatedFilmDetails(bestRatedfilmsList);
                return bestRatedfilmsList;
            }
        }
    };
}

function getBestRatedFilmsImages(bestRatedfilmsList){
    for(let ratedFilm = 0; ratedFilm < 5; ratedFilm++){
        bestRatedFilmsImages.push(bestRatedfilmsList.results[ratedFilm].image_url);
    }
    console.log(bestRatedFilmsImages);
    loadRatedFilmsSliderImages(bestRatedFilmsImages);
    return bestRatedFilmsImages;
}

// 2 Chargement des 4 images ds Carrousel "Films les mieux notés"
function loadRatedFilmsSliderImages(bestRatedFilmsImages){
    //activePicSlider1 = document.querySelectorAll('.category1 .slider .active'); 
    activePicSlider1[0].setAttribute("src", bestRatedFilmsImages[0]);
    activePicSlider1[1].setAttribute("src", bestRatedFilmsImages[1]);
    activePicSlider1[2].setAttribute("src", bestRatedFilmsImages[2]);
    activePicSlider1[3].setAttribute("src", bestRatedFilmsImages[3]);
    console.log('Les 4 images du Carrousel sont chargées');
    createThumbnailModal();
}

// *** 2 Création fenêtre MODALE 1ère image Carrousel FILMS LES MIEUX NOTES ***

function createThumbnailModal(){
    //setThumbnailModalElements();
    setThumbnailModalElementsAttributes();
    buildThumbnailModal();
}

// 2.1 Création  éléments de la MODALE (1ère) image Carrousel FILMS LES MIEUX NOTES
//function setThumbnailModalElements(){}
let newModal = document.createElement('aside');
let newModalContent = document.createElement('div');
let newModalHeader = document.createElement('div');
let modalClose = document.createElement('div');
let modalH2= document.createElement('h2');
let newModalBody = document.createElement('div');
let modalUl = document.createElement('ul');
let modalNoList = document.createElement('li');
let modalImage = document.createElement('img');
let modalTitle = document.createElement('li');
let modalPublishedDate = document.createElement('li'); 
let modalDuration = document.createElement('li');
let modalLong_Desc = document.createElement('li');
let modalImdbScore = document.createElement('li');
let modalBoxOffice = document.createElement('li');
let modalActors = document.createElement('li');
let modalDirectors = document.createElement('li');
let modalGenres = document.createElement('li');
let modalCountries = document.createElement('li');
let modalRated = document.createElement('li');


// 2.2 ajout d'attributs aux éléménts de la MODALE (1ère image Carrousel FILMS LES MIEUX NOTES)
function setThumbnailModalElementsAttributes(){
    newModal.setAttribute('id', "modalBestRated");// utilité id ?
    newModal.setAttribute('class', "modal");

    newModalContent.setAttribute('class', "modal-content");

    newModalHeader.setAttribute('class', "modal_header");

    modalClose.setAttribute('class', "close");
    modalClose.innerText = "X";

    modalH2.innerText = "Catégorie : Films les mieux notés";

    newModalBody.setAttribute('class', "modal-body");

    modalNoList.setAttribute('class', "no_list");

    modalImage.setAttribute('src', "pictures/image1_test.jpg"); //  src pr test => A supprimer et à rajouter ds partie 'alimentation API'
    modalImage.setAttribute('class', "floatingpic");
    modalImage.setAttribute('alt', "affiche film 1"); // changer n° du film pr chq vignette (film 1 à film 4)

    modalTitle.setAttribute('class', "title");
    modalTitle.innerText = "Titre du film";

    modalPublishedDate.setAttribute('class', "date_published");
    modalPublishedDate.innerText = "Date de sortie";

    modalDuration.setAttribute('class', "duration");
    modalDuration.innerText = "Durée";

    modalLong_Desc.setAttribute('class', "long_description");
    modalLong_Desc.innerText = "Résumé long";

    modalImdbScore.setAttribute('class', "imbd_score");
    modalImdbScore.innerText = "Score imdb";

    modalBoxOffice.setAttribute('class', "worldwclasse_gross_income");
    modalBoxOffice.innerText = "Box Office";


    modalActors.setAttribute('class', "actors");
    modalActors.innerText = "Acteurs";

    modalDirectors.setAttribute('class', "directors");
    modalDirectors.innerText = "Réalisateur(s)";

    modalGenres.setAttribute('class', "genres");
    modalGenres.innerText = "Genres";

    modalCountries.setAttribute('class', "countries");
    modalCountries.innerText = "Pays d'origine";

    modalRated.setAttribute('class', "rated");
    modalRated.innerText = '"Rated"';
}

// 2.3 élaboration de la structure de la modale (assemblage des pièces du puzzle)
let category1Elements = document.getElementsByClassName("category1")
let thumbnailsList = category1Elements[0].getElementsByClassName("thumbnail");
let slidersList = category1Elements[0].getElementsByClassName("slider");

function buildThumbnailModal(){
    slidersList[0].insertBefore(newModal, thumbnailsList[0]); // emplacement de la MODALE
    newModal.appendChild(newModalContent);
    newModalContent.appendChild(newModalBody);
    newModalContent.insertBefore(newModalHeader, newModalBody);
    newModalHeader.appendChild(modalH2);
    newModalHeader.insertBefore(modalClose, modalH2);
    newModalBody.appendChild(modalUl);
    modalUl.appendChild(modalRated);
    modalUl.insertBefore(modalCountries, modalRated);
    modalUl.insertBefore(modalGenres, modalCountries);
    modalUl.insertBefore(modalDirectors, modalGenres);
    modalUl.insertBefore(modalActors, modalDirectors);
    modalUl.insertBefore(modalBoxOffice, modalActors);
    modalUl.insertBefore(modalImdbScore, modalBoxOffice);
    modalUl.insertBefore(modalLong_Desc, modalImdbScore);
    modalUl.insertBefore(modalDuration, modalLong_Desc);
    modalUl.insertBefore(modalPublishedDate, modalDuration);
    modalUl.insertBefore(modalTitle, modalPublishedDate);
    modalUl.insertBefore(modalNoList, modalTitle);
    modalNoList.appendChild(modalImage);
}

// 2.4 Ouverture / fermeture de la modale
//Affiche modale qd clique sur les vignettes du carrousel "Films les mieux notés"
for(let PicIndex in [0, 1, 2, 3]){
    activePicSlider1[PicIndex].addEventListener('click', function(){
        var filmsListIndex = PicIndex;
        getBestRatedFilmDetails(bestRatedfilmsList, filmsListIndex);
        newModal.style.display = "flex";
    });
}

// Ferme la fenêtre modale de la 1ère vignette qd clique sur la croix
modalClose.addEventListener('click', function(){
    newModal.style.display = "none";
});


// 2.5 alimentation modale 1ère image Carrousel FILMS LES MIEUX NOTES 

function getBestRatedFilmDetails(bestRatedfilmsList){
    let FilmUrl = bestRatedfilmsList.results[0].url;
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', FilmUrl, true);
    httpRequest.send();
    httpRequest.onreadystatechange = function(){
        if(httpRequest.readyState === 4){
            if (httpRequest.status === 200) {
                let detailedFilm = JSON.parse(httpRequest.responseText);
                console.log(detailedFilm);
                getModalFilmDetails(detailedFilm);
            }
        }
    };
}
function getModalFilmDetails(detailedFilm){
    modalTitle.innerText = "Titre : "+detailedFilm.title;
    modalImage.setAttribute('src', detailedFilm.image_url);
    modalPublishedDate.innerText = "Date de sortie : "+convertDate(detailedFilm);
    modalDuration.innerText = "Durée (min) : "+detailedFilm.duration;
    modalLong_Desc.innerText = "Résumé : "+detailedFilm.long_description;
    modalImdbScore.innerText = "Score Imbd : "+detailedFilm.imdb_score;
    modalBoxOffice.innerText = "Box Office : "+ifBoxOfficeNull(detailedFilm);
    modalActors.innerText = "Acteurs : "+addSpaceBetweenActors(detailedFilm);
    modalDirectors.innerText = "Réalisateur(s) : "+detailedFilm.directors;
    modalGenres.innerText = "Genre(s) : "+addSpaceBetweenGenres(detailedFilm);
    modalCountries.innerText = "Pays d'origine : "+detailedFilm.countries;
    modalRated.innerText = "rated : "+detailedFilm.rated;
}

// 2 RECUPERE LA LISTE DES FILMS DE LA CATEGORIE (ici 'Les Mieux Notés')
getBestRatedfilmsList() ;






// CARROUSELS
//Réserve de vignettes à faire défiler(AvailableThumbnails) pour les 4 carrousels 
/*let imagesBestRatedFilms = ["pictures/image1.jpg", "pictures/image2.jpg", 
                        "pictures/image3.jpg", "pictures/image4.jpg", 
                        "pictures/image5.jpg", "pictures/image6.jpg", 
                        "pictures/image7.jpg"];

let imagesAdventure = ["pictures/imageA.jpg", "pictures/imageB.jpg", 
                        "pictures/imageC.jpg", "pictures/imageD.jpg", 
                        "pictures/imageE.jpg", "pictures/imageF.jpg", 
                        "pictures/imageG.jpg"];

let imagesAnimation = ["pictures/image1.jpg", "pictures/image2.jpg", 
                        "pictures/image3.jpg", "pictures/image4.jpg", 
                        "pictures/image5.jpg", "pictures/image6.jpg", 
                        "pictures/image7.jpg"];

let imagesBiography = ["pictures/imageA.jpg", "pictures/imageB.jpg", 
                        "pictures/imageC.jpg", "pictures/imageD.jpg", 
                        "pictures/imageE.jpg", "pictures/imageF.jpg", 
                        "pictures/imageG.jpg"];
*/

//listes des 4 vignettes 'actives' (activeThumbnails) des 4 sliders
/*
category1 -> BestFilms
category2 -> Aventure
category3 -> Animation
category4 -> Biographie
*/
//let activePicSlider1 =>>redéfini, avec API, plus haut
/*let activePicSlider2 = document.querySelectorAll('.category2 .slider .active');
let activePicSlider3 = document.querySelectorAll('.category3 .slider .active');
let activePicSlider4 = document.querySelectorAll('.category4 .slider .active');*/

//vignettes à faire défiler(AvailableThumbnails) pour les 4 carrousels
var imagesBestRatedFilms = [];

function getAvailableFilms(bestRatedFilmsImages) {
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', "http://localhost:8000/api/v1/titles/?format=json&page=2&sort_by=rated,-year", true);
    httpRequest.send();
    httpRequest.onreadystatechange = function(){
        if(httpRequest.readyState === 4){
            if (httpRequest.status === 200) {
                let SecondPageFilmsList = JSON.parse(httpRequest.responseText);
                for(let ratedFilm = 0; ratedFilm < 2; ratedFilm++){
                    imagesBestRatedFilms = bestRatedFilmsImages.push(SecondPageFilmsList.results[ratedFilm].image_url);
                }
                console.log(imagesBestRatedFilms);
                return imagesBestRatedFilms;
            }
        }
    } 
}



// boutons 'suivant' 'précédent'des 4 sliders
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
    constructor(activeThumbnails, availableThumbnails, nextThumbnail, previousThumbnail, count){
        this.activeThumbnails = activeThumbnails;
        this.availableThumbnails = availableThumbnails;
        this.nextThumbnail = nextThumbnail;
        this.previousThumbnail = previousThumbnail;
        this.count = count;
    }

    UpdatingCount(){
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
                let newPict = this.availableThumbnails[this.availableThumbnails.length + (this.count + pictIndex)];
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
                        imagesBestRatedFilms, 
                        nextThumbnail1,
                        previousThumbnail1,
                        count1);

/* création 2e slider (2e instance de la classe Slider)
let AdventureSlider = new Slider(activePicSlider2, 
                        imagesAdventure, 
                        nextThumbnail2,
                        previousThumbnail2,
                        count2);

// création 3e slider (3e instance de la classe Slider)
let AnimationSlider = new Slider(activePicSlider3, 
                        imagesAnimation, 
                        nextThumbnail3,
                        previousThumbnail3,
                        count3);

// création 4e slider (4e instance de la classe Slider)
let BiographySlider = new Slider(activePicSlider4, 
                        imagesBiography, 
                        nextThumbnail4,
                        previousThumbnail4,
                        count4);
*/

// détection de clic sur boutons précédent/suivant 1 et lancement réaction
bestFilmsSlider.previousThumbnail.addEventListener('click', function(){
    bestFilmsSlider.count--;
    bestFilmsSlider.UpdatingCount(this.count);
    bestFilmsSlider.changeThumbnail(this.activeThumbnails, this.availableThumbnails, this.count);
});

bestFilmsSlider.nextThumbnail.addEventListener('click', function(){
    bestFilmsSlider.count++;
    bestFilmsSlider.UpdatingCount(this.count);
    bestFilmsSlider.changeThumbnail(this.activeThumbnails, this.availableThumbnails, this.count);
});
/*
// détection de clic sur boutons précédent/suivant 2 et lancement réaction
AdventureSlider.previousThumbnail.addEventListener('click', function(){
    AdventureSlider.count--;
    AdventureSlider.UpdatingCount(this.count);
    AdventureSlider.changeThumbnail(this.activeThumbnails, this.availableThumbnails, this.count);
});

AdventureSlider.nextThumbnail.addEventListener('click', function(){
    AdventureSlider.count++;
    AdventureSlider.UpdatingCount(this.count);
    AdventureSlider.changeThumbnail(this.activeThumbnails, this.availableThumbnails, this.count);
});

// détection de clic sur boutons précédent/suivant 3 et lancement réaction
AnimationSlider.previousThumbnail.addEventListener('click', function(){
    AnimationSlider.count--;
    AnimationSlider.UpdatingCount(this.count);
    AnimationSlider.changeThumbnail(this.activeThumbnails, this.availableThumbnails, this.count);
});

AnimationSlider.nextThumbnail.addEventListener('click', function(){
    AnimationSlider.count++;
    AnimationSlider.UpdatingCount(this.count);
    AnimationSlider.changeThumbnail(this.activeThumbnails, this.availableThumbnails, this.count);
});

// détection de clic sur boutons précédent/suivant 4 et lancement réaction
BiographySlider.previousThumbnail.addEventListener('click', function(){
    BiographySlider.count--;
    BiographySlider.UpdatingCount(this.count);
    BiographySlider.changeThumbnail(this.activeThumbnails, this.availableThumbnails, this.count);
});

BiographySlider.nextThumbnail.addEventListener('click', function(){
    BiographySlider.count++;
    BiographySlider.UpdatingCount(this.count);
    BiographySlider.changeThumbnail(this.activeThumbnails, this.availableThumbnails, this.count);
});
*/
