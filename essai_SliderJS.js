/* Liste des affiches FILMS LES MIEUX NOTES (source provisoire,
à remplacer par requête(s) API)
*/
const thumbnailsFilms = document.querySelectorAll('.slider img');
let thumbnailsList = [];
for (let thumbnail in thumbnailsFilms){
    thumbnailsList.push(thumbnail);
}
console.log(thumbnailsList); //pr vérifier liste --> comment afficher résultat ds console ?


//nombre d'affiches
const thumbnailsNumber = thumbnailsList.length;
console.log(thumbnailsNumber); //pr vérif
//boutons 'suivant' 'précédent'
const next = document.querySelector('.nav-droite > img');
const previous = document.querySelector('.nav-gauche > img');

let count = 0;

//retire 4 vignettes d'affilée
function removeFilmsThumbnails(thumbnailsList, count){
    thumbnailsList[count].classList.remove('active');
    thumbnailsList[count++].classList.remove('active');
    thumbnailsList[count += 2].classList.remove('active');
    thumbnailsList[count += 3].classList.remove('active');
}

//affiche 4 vignettes d'affilée
function displayFilmsThumbnails(count){
    thumbnailsList[count].classList.add('active');
    thumbnailsList[count++].classList.add('active');
    thumbnailsList[count += 2].classList.add('active');
    thumbnailsList[count += 3].classList.add('active');
}


//AFFICHE FILMS SUIVANTS : ma version 4 images
function nextSlides(count){
    //masque les vignettes affichées et incrémente le compteur
    removeFilmsThumbnails(count);
    count += 3;

    if(count < thumbnailsNumber - 1){   //pour 12 slides : count 11 = 12-1 cf ELSE
        count++;
        displayFilmsThumbnails(count);
    } else {
        count = 0;
        displayFilmsThumbnails(count);  //count reste à 0
    }
}

//appelle la fonction AFFICHE FILMS SUIVANTS sur un clic de souris
next.addEventListener('click', nextSlides);


//AFFICHE FILMS PRECEDENTS : ma version 4 images
function previousSlides(count){
    //masque les vignettes affichées
    removeFilmsThumbnails(count);

    if(count > 0){  //count  = 0 cf ELSE 
        count -= 4;  //affiche les 4 images précédentes 
        displayFilmsThumbnails(count);
    } else { //qd count = 0,  affiche les derniers slides de la liste 
        count = thumbnailsNumber - 4; //pr 12 images, count = 12-4 = 8
        displayFilmsThumbnails(count);
    }
}

//appelle la fonction AFFICHE FILMS PRECEDENTS sur un clic de souris
previous.addEventListener('click', previousSlides);


/*
QUE SE PASSE T IL SI  nb de films non multiple de 4 - ex. 10 films
qd .add('active') puis .remove('active'), renvoie quelle valeur/quel message 
pour films 9 et 10 ? 'null' ?
*/
