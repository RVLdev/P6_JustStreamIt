// Cas pour tests : Meilleur Film = 'film1'
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
}


//Alimentation bloc conteneur "Meilleur Film" avec infos du film (exple: film1)
let bestFilmCategoryFilmTitle = document.querySelector('#best_film_description > h1');
bestFilmCategoryFilmTitle.textContent = film1["title"];

let bestFilmCategoryFilmResume = document.querySelector('#best_film_description > p');
bestFilmCategoryFilmResume.textContent = film1["description"];

let bestFilmCategoryFilmThumbnail = document.querySelector('.best_film_thumbnail > img');
let bestFilmCategoryFilmImage = bestFilmCategoryFilmThumbnail.getAttribute("src");
//bestFilmCategoryFilmImage.setAttribute("src", film1["image_url"]);  //PB 'not a fucntion'


// FENETRES MODALES

// 1 Fenetre modale du Meilleur Film


/* Détaille le contenu rédactionnel de la fenêtre modale (variables)
(en vue alimentation/remplacement par les infos du film) 
*/
let modalFilmImage = document.querySelector('.modal-body > ul > img');
let bestFilmImage = modalFilmImage.getAttribute("src");

let modalFilmDetails = document.getElementsByClassName("modal-body");
let bestFilmTitle = modalFilmDetails[0].getElementsByClassName("title");
let bestFilmDate = modalFilmDetails[0].getElementsByClassName("date_published");
let bestFilmDuration = modalFilmDetails[0].getElementsByClassName("duration");
let bestFilmLongDescription = modalFilmDetails[0].getElementsByClassName("long_description");
let bestFilmImbd = modalFilmDetails[0].getElementsByClassName("imbd_score");
let bestFilmBoxOffice = modalFilmDetails[0].getElementsByClassName("worldwclasse_gross_income");
let bestFilmActors = modalFilmDetails[0].getElementsByClassName("actors");
let bestFilmDirectors = modalFilmDetails[0].getElementsByClassName("directors");
let bestFilmGenres = modalFilmDetails[0].getElementsByClassName("genres");
let bestFilmCountries = modalFilmDetails[0].getElementsByClassName("countries");
let bestFilmRated = modalFilmDetails[0].getElementsByClassName("rated");


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


// Alimentation de la fenêtre modale : image du Meilleur Film
modalFilmImage.setAttribute("src", film1["image_url"]);

// Alimentation de la fenêtre modale : informations du Meilleur Film
// remplacement, dans le DOM, du texte existant par les informations du film
bestFilmTitle[0].textContent = "Titre : "+film1["title"];
bestFilmDate[0].textContent = "Date de sortie : "+film1["date_published"];  //Format date A REVOIR ?
bestFilmDuration[0].textContent = "Durée (min) : "+film1["duration"];
bestFilmLongDescription[0].textContent = "Résumé : "+film1["long_description"];
bestFilmImbd[0].textContent = "Score Imbd : "+film1["imdb_score"];
bestFilmBoxOffice[0].textContent = "Box Office : "+film1["worldwide_gross_income"];
bestFilmActors[0].textContent = "Acteurs : "+film1["actors"];
bestFilmDirectors[0].textContent = "Réalisateur(s) : "+film1["directors"];
bestFilmGenres[0].textContent = "Genre(s) : "+film1["genres"];
bestFilmCountries[0].textContent = "Pays d'origine : "+film1["countries"];
bestFilmRated[0].textContent = "rated"+film1["rated"];


// CARROUSELS
//Réserve de vignettes à faire défiler(AvailableThumbnails) pour les 4 carrousels 
let imagesBestFilms = ["pictures/image1.jpg", "pictures/image2.jpg", 
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

//listes des 4 vignettes 'actives' (activeThumbnails) des 4 sliders
/*
category1 -> BestFilms
category2 -> Aventure
category3 -> Animation
category4 -> Biographie
*/
let activePicSlider1 = document.querySelectorAll('.category1 .slider .active');
let activePicSlider2 = document.querySelectorAll('.category2 .slider .active');
let activePicSlider3 = document.querySelectorAll('.category3 .slider .active');
let activePicSlider4 = document.querySelectorAll('.category4 .slider .active');

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
                        imagesBestFilms, 
                        nextThumbnail1,
                        previousThumbnail1,
                        count1);

// création 2e slider (2e instance de la classe Slider)
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
