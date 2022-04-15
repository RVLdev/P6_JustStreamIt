/* Liste des affiches FILMS LES MIEUX NOTES (source provisoire,
à remplacer par requête(s) API)
*/
const availableThumbnails = ["pictures/image1.jpg", "pictures/image2.jpg", 
                                "pictures/image3.jpg", "pictures/image4.jpg", 
                                "pictures/image5.jpg", "pictures/image6.jpg", 
                                "pictures/image7.jpg"];
console.log(availableThumbnails);

let activeThumbnails = document.getElementsByClassName('active');
console.log(activeThumbnails);

let count = 0;
console.log('compteur =' + count);

//boutons 'suivant' 'précédent'
const nextThumbnail = document.querySelector('.nav-droite > img'); // ok
const previousThumbnail = document.querySelector('.nav-gauche > img'); // ok

/*Change les 4 images du carrousel.
pictIndex = index des 4 vignettes 'actives'
*/
function changeThumbnail(availableThumbnails, activeThumbnails, count){
    for (let pictIndex = 0; pictIndex < 4; pictIndex++){
        let pict1 = activeThumbnails[pictIndex];
        let pict1Src = pict1.getAttribute("src");
        if ((count + pictIndex) < 0){
            let newPict = availableThumbnails[availableThumbnails.length + (count + pictIndex)];
            console.log(newPict);
            pict1Src = newPict;
            pict1.setAttribute("src", pict1Src);
        } else {
            let newPict = availableThumbnails[count + pictIndex];
            console.log(newPict);
            pict1Src = newPict;
            pict1.setAttribute("src", pict1Src);
        }
    }
}

/* affiche images précédentes quand utilisateur clique sur bouton 'précédent'.
count = 3 affiche les 4 dernières images de la liste,
count = -7 affiche la position de départ (4 premières images).
*/
previousThumbnail.addEventListener('click', function(){
    count--;
    console.log('count -- = ' + count);
    if(count > 3){
        count = - 3;
    } else if (count < - 7){
        count = -1;
        }
    console.log('count = ' + count);
    changeThumbnail(availableThumbnails, activeThumbnails, count);
});

// affiche images suivantes quand utilisateur clique sur bouton 'suivant'.
nextThumbnail.addEventListener('click', function(){
    count++;
    console.log('count ++ = ' + count);
    if(count > 3){ 
        count = - 3;
    } else if (count < - 7){
        count = -1;
        }
    console.log('count = ' + count);
    changeThumbnail(availableThumbnails, activeThumbnails, count);
});
