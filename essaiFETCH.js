// --------------- I - API - MEILLEUR FILM (classement imdb) ----------
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
            console.log(bestFilmsList);
            bestFilmUrl = bestFilmsList.results[0].url;
            //console.log(bestFilmUrl);
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
            //console.log(detailedBestFilm);
            getBestFilmTitle(detailedBestFilm);
        })
        .catch(function(error){
            console.log(error.message);
        });
}


// 2 Alimentation BLOC CONTENEUR "Meilleur Film"
function getBestFilmTitle(detailedBestFilm){
    let bestFilmCategoryFilmTitle = document.querySelector('#best_film_description > h1');
    bestFilmCategoryFilmTitle.textContent = "Meilleur film : "+detailedBestFilm.title;
    //console.log(bestFilmCategoryFilmTitle.textContent);
    getBestFilmTitleResume(detailedBestFilm);
}

function getBestFilmTitleResume(detailedBestFilm){
    let bestFilmCategoryFilmResume = document.querySelector('#best_film_description > p');
    bestFilmCategoryFilmResume.textContent = detailedBestFilm.description;
    //console.log(bestFilmCategoryFilmResume.textContent);
    getBestFilmThumbnail(detailedBestFilm);
}

function getBestFilmThumbnail(detailedBestFilm){
    let bestFilmThumbnail = document.querySelector('.best_film_thumbnail > img');
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
    let modalFilmImage = document.querySelector('.modal-body > ul > li .floatingpic');
    modalFilmImage.setAttribute("src", detailedBestFilm.image_url);
    
    let modalFilmDetails = document.getElementsByClassName("modal-body");
    (modalFilmDetails[0].getElementsByClassName("title"))[0].innerText = "Titre : "+detailedBestFilm.title;
    (modalFilmDetails[0].getElementsByClassName("date_published"))[0].innerText = "Date de sortie : "+convertDate(detailedBestFilm);
    (modalFilmDetails[0].getElementsByClassName("duration"))[0].innerText = "Durée (min) : "+detailedBestFilm.duration;
    (modalFilmDetails[0].getElementsByClassName("long_description"))[0].innerText = "Résumé : "+detailedBestFilm.long_description;
    (modalFilmDetails[0].getElementsByClassName("imbd_score"))[0].innerText = "Score Imbd : "+detailedBestFilm.imdb_score;
    (modalFilmDetails[0].getElementsByClassName("worldwclasse_gross_income"))[0].innerText = "Box Office : "+ifBoxOfficeNull(detailedBestFilm);
    (modalFilmDetails[0].getElementsByClassName("actors"))[0].innerText = "Acteurs : "+addSpaceBetweenActors(detailedBestFilm);
    (modalFilmDetails[0].getElementsByClassName("directors"))[0].innerText = "Réalisateur(s) : "+detailedBestFilm.directors;
    (modalFilmDetails[0].getElementsByClassName("genres"))[0].innerText = "Genre(s) : "+addSpaceBetweenGenres(detailedBestFilm);
    (modalFilmDetails[0].getElementsByClassName("countries"))[0].innerText = "Pays d'origine : "+detailedBestFilm.countries;
    (modalFilmDetails[0].getElementsByClassName("rated"))[0].innerText = "rated : "+detailedBestFilm.rated;
}

// 4 Fenetre modale du MEILLEUR FILM ***

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

// ---------------  II API - CARROUSELS -----------------------------

// VARIABLES toutes categories :
let urlRequetePage1;
let urlRequetePage2;

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
let bestRatedFilmsList = [];
let detailedRatedFilmsUrlsList = [];
let bestRatedFilmsImages = [];
var activePicSlider1 = document.querySelectorAll('.category1 .slider .active');

let category1Elements = document.getElementsByClassName("category1");
let thumbnailsList1 = category1Elements[0].getElementsByClassName("thumbnail");
let slidersList1 = category1Elements[0].getElementsByClassName("slider");

// variables pour la catégorie Aventure
let category2Elements = document.getElementsByClassName("category2");
let thumbnailsList2 = category2Elements[0].getElementsByClassName("thumbnail");
let slidersList2 = category2Elements[0].getElementsByClassName("slider");

// variables pour la catégorie Animation
// variables pour la catégorie Biographie

//-----------------------------------------------------------


// récupère 1ère page de données d'une requête
function getFilmsList(urlRequetePage1, urlRequetePage2){
    fetch(urlRequetePage1)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            let filmsRequest = data;
            bestRatedFilmsList = filmsRequest.results;
            console.log(bestRatedFilmsList); ///////////////////////////////////
            get2ndPageFilms(bestRatedFilmsList, urlRequetePage2)
        })
        .catch(function(error){
            console.log(error.message);
        });
}



// récupère 2e page de données d'une requête
function get2ndPageFilms(bestRatedFilmsList, urlRequetePage2){
    console.log(bestRatedFilmsList);
    fetch(urlRequetePage2)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            let filmsRequestPage2 = data;
            let page2FilmsList = filmsRequestPage2.results;
            bestRatedFilmsList.push(page2FilmsList[0]);
            bestRatedFilmsList.push(page2FilmsList[1]);
            console.log(bestRatedFilmsList);
            getbestRatedFilmsImages(bestRatedFilmsList); 
            getDetailedRatedFilmsUrls(bestRatedFilmsList);
            return bestRatedFilmsList;
        })
        .catch(function(error){
            console.log(error.message);
        });
}


// ********************* 1ERE ETAPE : CHARGER LE SLIDER *********************************
getBestRatedFilms();

// II 1 Récupération de la LISTE DES FILMS pour carrousel "Films les mieux notés"
function getBestRatedFilms(){
    urlRequetePage1 = "http://localhost:8000/api/v1/titles/?format=json&sort_by=rated,-year";
    urlRequetePage2 = "http://localhost:8000/api/v1/titles/?format=json&page=2&sort_by=rated,-year";
    getFilmsList(urlRequetePage1, urlRequetePage2);
}

// II 2 récupération LISTE urls FILMS DETAILLES pour  "Les films les mieux notés"
function getDetailedRatedFilmsUrls(bestRatedFilmsList){
    for (let eachFilm of bestRatedFilmsList){
        detailedRatedFilmsUrlsList.push(eachFilm.url);
    }
    console.log(detailedRatedFilmsUrlsList); //////////////////////////////////////
    return detailedRatedFilmsUrlsList;
}

// II 3 Récupération des images pour carrousel "Films les mieux notés"
function getbestRatedFilmsImages(bestRatedFilmsList){
    if (bestRatedFilmsList.length > 0){
        for(let everyFilm in bestRatedFilmsList){
            bestRatedFilmsImages.push(bestRatedFilmsList[everyFilm].image_url);
        }
        console.log(bestRatedFilmsImages); //////////////////////////////////////////
        loadRatedFilmsSliderImages(bestRatedFilmsImages);
        return bestRatedFilmsImages;
    }
}

// II 4 Chargement des 4 images ds Carrousel "Films les mieux notés"
function loadRatedFilmsSliderImages(bestRatedFilmsImages){
    //activePicSlider1 = document.querySelectorAll('.category1 .slider .active'); 
    activePicSlider1[0].setAttribute("src", bestRatedFilmsImages[0]);
    activePicSlider1[1].setAttribute("src", bestRatedFilmsImages[1]);
    activePicSlider1[2].setAttribute("src", bestRatedFilmsImages[2]);
    activePicSlider1[3].setAttribute("src", bestRatedFilmsImages[3]);
    console.log('Les 4 images du Carrousel sont chargées'); //////////////////////////////
}

// ********************* 2EME ETAPE : CREER ET AFFICHER/FERMER LA MODALE *********************************

class SliderModal{
    constructor(newSliderModal, newSliderModalContent, newSliderModalHeader, sliderModalClose, 
        sliderModalH2, newSliderModalBody, sliderModalUl, sliderModalNoList, sliderModalImage, 
        sliderModalTitle, sliderModalPublishedDate, sliderModalDuration, sliderModalLong_Desc, 
        sliderModalImdbScore, sliderModalBoxOffice, sliderModalActors, sliderModalDirectors, 
        sliderModalGenres, sliderModalCountries, sliderModalRated, slidersList,
        thumbnailsList, sliderDetailedFilm){
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
        this.newSliderModal.setAttribute('id', "modalBestRated");
        this.newSliderModal.setAttribute('class', "modal");
    
        this.newSliderModalContent.setAttribute('class', "modal-content");
    
        this.newSliderModalHeader.setAttribute('class', "modal_header");
    
        this.sliderModalClose.setAttribute('class', "close");
        this.sliderModalClose.innerText = "  X  ";
    
        this.sliderModalH2.innerText = "Catégorie : Films les mieux notés";
    
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
    
        this.sliderModalBoxOffice.setAttribute('class', "worldwclasse_gross_income");
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
        this.slidersList[0].insertBefore(this.newSliderModal, this.thumbnailsList[0]); // emplacement de la MODALE
        this.newSliderModal.appendChild(this.newSliderModalContent);
        this.newSliderModalContent.appendChild(this.newSliderModalBody);
        this.newSliderModalContent.insertBefore(this.newSliderModalHeader, this.newSliderModalBody);
        this.newSliderModalHeader.appendChild(this.sliderModalH2);
        this.newSliderModalHeader.insertBefore(this.sliderModalClose, this.sliderModalH2);
        this.newSliderModalBody.appendChild(this.sliderModalUl);
        this.sliderModalUl.appendChild(this.sliderModalRated);
        this.sliderModalUl.insertBefore(this.sliderModalCountries, this.sliderModalRated);
        this.sliderModalUl.insertBefore(this.sliderModalGenres, this.sliderModalCountries);
        this.sliderModalUl.insertBefore(this.sliderModalDirectors, this.sliderModalGenres);
        this.sliderModalUl.insertBefore(this.sliderModalActors, this.sliderModalDirectors);
        this.sliderModalUl.insertBefore(this.sliderModalBoxOffice, this.sliderModalActors);
        this.sliderModalUl.insertBefore(this.sliderModalImdbScore, this.sliderModalBoxOffice);
        this.sliderModalUl.insertBefore(this.sliderModalLong_Desc, this.sliderModalImdbScore);
        this.sliderModalUl.insertBefore(this.sliderModalDuration, this.sliderModalLong_Desc);
        this.sliderModalUl.insertBefore(this.sliderModalPublishedDate, this.sliderModalDuration);
        this.sliderModalUl.insertBefore(this.sliderModalTitle, this.sliderModalPublishedDate);
        this.sliderModalUl.insertBefore(this.sliderModalNoList, this.sliderModalTitle);
        this.sliderModalNoList.appendChild(this.sliderModalImage);
    }

    // affiche la Modale
    displaySliderModal(){
        this.newSliderModal.style.display = "flex";
    }

    // alimente la Modale avec les informations du film 'cliqué'
    setModalFilmDetails(){
        this.sliderModalTitle.innerText = "Titre : "+this.detailedFilm.title;
        this.sliderModalImage.setAttribute('src', this.detailedFilm.image_url);
        this.sliderModalPublishedDate.innerText = "Date de sortie : "+this.detailedFilm.date_published.split('-')[2] + 
        " " + this.detailedFilm.date_published.split('-')[1] + 
        " "+this.detailedFilm.date_published.split('-')[0];
        this.sliderModalDuration.innerText = "Durée (min) : "+this.detailedFilm.duration;
        this.sliderModalLong_Desc.innerText = "Résumé : "+this.detailedFilm.long_description;
        this.sliderModalImdbScore.innerText = "Score Imbd : "+this.detailedFilm.imdb_score;

        if (this.detailedFilm.worldwide_gross_income == null){
            this.sliderModalBoxOffice.innerText = "Box Office : Non communiqué";
        } else {
            this.sliderModalBoxOffice.innerText = "Box Office : "+this.detailedFilm.worldwide_gross_income;
        }

        this.sliderModalActors.innerText = "Acteurs : "+ this.detailedFilm.actors.join(", ");

        if (this.detailedFilm.directors.length > 1){
            this.sliderModalDirectors.innerText = "Réalisateur(s) : "+this.detailedFilm.directors.join(", ");
        } else {
            this.sliderModalDirectors.innerText = "Réalisateur(s) : "+this.detailedFilm.directors;
        }
        
        this.sliderModalGenres.innerText = "Genre(s) : "+this.detailedFilm.genres.join(", ");

        if (this.detailedFilm.countries.length > 1){
            this.sliderModalCountries.innerText = "Pays d'origine : "+this.detailedFilm.countries.join(", ");
        } else {
            this.sliderModalCountries.innerText = "Pays d'origine : "+this.detailedFilm.countries;
        }
        
        this.sliderModalRated.innerText = "rated : "+this.detailedFilm.rated;
    }

    // "ferme" la Modale
    closedisplaySliderModal(){
        this.newSliderModal.style.display = "none";
    }
}


// 1 INSTANCIATION de la MODALE d'un carrousel et création de ses éléments

let bestRatedFilmsSliderModal = new SliderModal(newModal, 
        newModalContent, newModalHeader, modalClose, modalH2, 
        newModalBody, modalUl, modalNoList, modalImage, 
        modalTitle, modalPublishedDate, modalDuration, modalLong_Desc, 
        modalImdbScore, modalBoxOffice, modalActors, modalDirectors, 
        modalGenres, modalCountries, modalRated, 
        slidersList1, thumbnailsList1, detailedFilm);

bestRatedFilmsSliderModal.setThumbnailModalElements();
bestRatedFilmsSliderModal.setThumbnailModalElementsAttributes();
bestRatedFilmsSliderModal.buildThumbnailModal();


// 2 AFFICHAGE DE LA  MODALE qd clique sur une des vignettes 
for(let thumbnailIndex in [0, 1, 2, 3]){
    activePicSlider1[thumbnailIndex].addEventListener('click', function(){
        let activePicUrl = activePicSlider1[thumbnailIndex].getAttribute("src");
        let filmIndex = bestRatedFilmsImages.indexOf(activePicUrl);
        let filmUrl = detailedRatedFilmsUrlsList[filmIndex];
        console.log(filmUrl); /////////////////////////////////////////////
        getFilmDetails(filmUrl);
    });
}

// récupération  LISTE des DETAILS d'UN FILM à partir de l'url du film détaillé

function getFilmDetails(filmUrl){
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', filmUrl, true);
    httpRequest.send();
    httpRequest.onreadystatechange = function(){
        if(httpRequest.readyState === 4){
            if (httpRequest.status === 200){
                bestRatedFilmsSliderModal.detailedFilm = JSON.parse(httpRequest.responseText);
                console.log(bestRatedFilmsSliderModal.detailedFilm);  ////////////////////////////////////
                bestRatedFilmsSliderModal.setModalFilmDetails(this.sliderDetailedFilm);
                bestRatedFilmsSliderModal.displaySliderModal(this.newSliderModal);
            return bestRatedFilmsSliderModal.detailedFilm;
            }
        }
    };
}

// 3 FERMETURE de la MODALE de la vignette cliquée
let bestRatedFilmsClosingCross = (document.getElementsByClassName('close'))[1];
bestRatedFilmsClosingCross.addEventListener('click', function(){
    bestRatedFilmsSliderModal.closedisplaySliderModal();
    });





// CARROUSELS

/*let bestRatedFilmsImages = ["pictures/image1.jpg", "pictures/image2.jpg", 
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
//let activePicSlider1 = document.querySelectorAll('.category1 .slider .active'); // redéfini, avec API, plus haut
/*let activePicSlider2 = document.querySelectorAll('.category2 .slider .active');
let activePicSlider3 = document.querySelectorAll('.category3 .slider .active');
let activePicSlider4 = document.querySelectorAll('.category4 .slider .active');*/



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

// création 1er slider (1ère instance de la classe Slider) 'availableThumbnails' = 'bestRatedFilmsImages'
let bestRatedFilmsSlider = new Slider(activePicSlider1, 
    bestRatedFilmsImages,
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
bestRatedFilmsSlider.previousThumbnail.addEventListener('click', function(){
    bestRatedFilmsSlider.count--;
    bestRatedFilmsSlider.updatingCount(this.count);
    bestRatedFilmsSlider.changeThumbnail(this.activeThumbnails, this.availableThumbnails, this.count);
});

bestRatedFilmsSlider.nextThumbnail.addEventListener('click', function(){
    bestRatedFilmsSlider.count++;
    bestRatedFilmsSlider.updatingCount(this.count);
    bestRatedFilmsSlider.changeThumbnail(this.activeThumbnails, this.availableThumbnails, this.count);
});


/* détection de clic sur boutons précédent/suivant 2 et lancement réaction
AdventureSlider.previousThumbnail.addEventListener('click', function(){
    AdventureSlider.count--;
    AdventureSlider.updatingCount(this.count);
    AdventureSlider.changeThumbnail(this.activeThumbnails, this.availableThumbnails, this.count);
});

AdventureSlider.nextThumbnail.addEventListener('click', function(){
    AdventureSlider.count++;
    AdventureSlider.updatingCount(this.count);
    AdventureSlider.changeThumbnail(this.activeThumbnails, this.availableThumbnails, this.count);
});

// détection de clic sur boutons précédent/suivant 3 et lancement réaction
AnimationSlider.previousThumbnail.addEventListener('click', function(){
    AnimationSlider.count--;
    AnimationSlider.updatingCount(this.count);
    AnimationSlider.changeThumbnail(this.activeThumbnails, this.availableThumbnails, this.count);
});

AnimationSlider.nextThumbnail.addEventListener('click', function(){
    AnimationSlider.count++;
    AnimationSlider.updatingCount(this.count);
    AnimationSlider.changeThumbnail(this.activeThumbnails, this.availableThumbnails, this.count);
});

// détection de clic sur boutons précédent/suivant 4 et lancement réaction
BiographySlider.previousThumbnail.addEventListener('click', function(){
    BiographySlider.count--;
    BiographySlider.updatingCount(this.count);
    BiographySlider.changeThumbnail(this.activeThumbnails, this.availableThumbnails, this.count);
});

BiographySlider.nextThumbnail.addEventListener('click', function(){
    BiographySlider.count++;
    BiographySlider.updatingCount(this.count);
    BiographySlider.changeThumbnail(this.activeThumbnails, this.availableThumbnails, this.count);
});
*/

