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

//boutons 'suivant' 'précédent'
const nextThumbnail = document.querySelector('.nav-droite > img'); // ok
const previousThumbnail = document.querySelector('.nav-gauche > img'); // ok

//Change les 4 images du carrousel : affichage successif de la 1ère à la dernière (fonction ok)
function changePic(availableThumbnails, activeThumbnails, count){
    for (let pictIndex = 0; pictIndex < 4; pictIndex++){
        let pict1 = activeThumbnails[pictIndex];
        let pict1Src = pict1.getAttribute("src");
        let newPict = availableThumbnails[count + pictIndex];
        pict1Src = newPict;
        pict1.setAttribute("src", pict1Src);
    }
}

//Enchaine la dernière image avec la 1ère et les suivantes (charnière fin/début de liste)
function changeEndOfListPic(availableThumbnails, activeThumbnails, count){
    for (let pictIndex = 0; pictIndex < 4; pictIndex++){
        let pict1 = activeThumbnails[pictIndex];
        let pict1Src = pict1.getAttribute("src");
        
        if ((count + pictIndex) < availableThumbnails.length){
            let newPict = availableThumbnails[count + pictIndex];
            console.log(newPict);
            pict1Src = newPict;
            pict1.setAttribute("src", pict1Src);
        } else {
            let newPict = availableThumbnails[count + pictIndex - (availableThumbnails.length)];
            console.log(newPict);
            pict1Src = newPict;
            pict1.setAttribute("src", pict1Src);
    
        }
    }
}



// affiche images suivantes quand utilisateur clique sur bouton 'suivant'
nextThumbnail.addEventListener('click', function(){
    count++;
    if(count < availableThumbnails.length - 3){
        changePic(availableThumbnails, activeThumbnails, count);
    } else {
        if (count > availableThumbnails.length - 1){
            count = 0; //
            changePic(availableThumbnails, activeThumbnails, count);
        } else {
            changeEndOfListPic(availableThumbnails, activeThumbnails, count)
        }    
    }
    console.log(count);
});


// affiche images précédentes quand utilisateur clique sur bouton 'précédent'
previousThumbnail.addEventListener('click', function(){
    count--;
    if(count < 0){
        count = 3;
        changePic(availableThumbnails, activeThumbnails, count);
    } else {
        changePic(availableThumbnails, activeThumbnails, count);
        }
    console.log(count);
});
