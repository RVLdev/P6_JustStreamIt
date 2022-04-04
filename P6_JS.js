/**  Liste des affiches (source provisoire,
 * à remplacer par requête(s) API)
*/
const thumbnailsList = document.querySelectorAll('img');

// nombre d'affiches
const thumbnailsNumber = thumbnailsList.length;
// boutons 'suivant' 'précédent'
const next = document.querySelector('.nav-droite');
const previous = document.querySelector('.nav-gauche');

let count = 0;

/**
 * Série de slides suivantes : 
 * 1- 'désactivation' des vignettes affichées (on vide le 'slider')
 * 2- s'il reste des vignettes à afficher, on
 * incrémente le compteur (de 4 ?)
 * (incrémentation de 1 pour afficher 1 seule image )
 * 3- 'activation' de l'image suivante (pour afficher l'image)
 */

function nextSlides(){
    thumbnailsList[count].classList.remove('active');
    if(count < thumbnailsNumber - 1){
        count ++;
    } else {
      count = 0; // permet de revenir à la 1ère image
    }
    thumbnailsList[count].classList.add('active');
}


// AFFICHER FILMS SUIVANTS : ma version 4 images

function nextSlides(){
    //count = 0 ; 4
    thumbnailsList[count].classList.remove('active'); // count = 0
    count++; // count = 1
    thumbnailsList[count].classList.remove('active');
    count++; // count = 2
    thumbnailsList[count].classList.remove('active');
    count++; // count = 3
    thumbnailsList[count].classList.remove('active');
    // la variable count  = 3 ; 7
    if(count < thumbnailsNumber - 1){
        count++; //  count = 4 ; 8
        thumbnailsList[count].classList.add('active'); // [4] ; [8]
        thumbnailsList[count++].classList.add('active'); // [5] ; [9]
        thumbnailsList[count += 2].classList.add('active'); // [6] ; [10]
        thumbnailsList[count += 3].classList.add('active'); // [7] ; [11]
        //maintenant la variable count = 4 ; 8 etc.
    } else {
        count = 0;
        thumbnailsList[count].classList.add('active'); // affiche la 1ère image [0]
    }
}

//appel de la fonction AFFICHER FILMS SUIVANTS sur un clic de souris
next.addEventListener('click', nextSlides);

/*
 * QUE SE PASSE T IL SI  nb de films non multiple de 4 - ex. 10 films
 * qd .add('active') puis .remove('active'), renvoie quelle valeur/quel message 
 * pour films 9 et 10 ? 'null' ?
*/ 


/* 
 *A REVOIR /POURSUIVRE : 
 * AFFICHER FILMS PRECEDENTS : ma version 4 images
*/

function previousSlides(){
    //count = 0 ; 
    thumbnailsList[count].classList.remove('active'); // count = 0
    count++; // count = 1
    thumbnailsList[count].classList.remove('active');
    count++; // count = 2
    thumbnailsList[count].classList.remove('active');
    count++; // count = 3
    thumbnailsList[count].classList.remove('active');
    // la variable count  = 3 

    if(count > 4){  // si count = 11; 7; 3 cf else
        count -= 4;  // count 11-4 = 7 ; 3  - affiche les 4 images précédentes 
    
        thumbnailsList[count -=3].classList.add('active'); // 4; 0
        thumbnailsList[count -= 2].classList.add('active'); // 5; 1
        thumbnailsList[count--].classList.add('active'); // 6; 2
        thumbnailsList[count].classList.add('active'); // 7; 3
        // count = 7; 3

    } else { //affiches les derniers slides de la liste 
        count = thumbnailsNumber - 1; // count pr 12 images = 11
        thumbnailsList[count -=3].classList.add('active'); //8
        thumbnailsList[count -= 2].classList.add('active'); // 9
        thumbnailsList[count--].classList.add('active'); // 10
        thumbnailsList[count].classList.add('active'); // 11
        // count = 11
    }
}
