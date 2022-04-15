//availableThumbnails : 1er et 2e slider

let imagesBestFilms = ["pictures/image1.jpg", "pictures/image2.jpg", 
                        "pictures/image3.jpg", "pictures/image4.jpg", 
                        "pictures/image5.jpg", "pictures/image6.jpg", 
                        "pictures/image7.jpg"];

let imagesAventure = ["pictures/image6.jpg", "pictures/image7.jpg", 
                        "pictures/image8.jpg", "pictures/image9.jpg", 
                        "pictures/image10.jpg", "pictures/image11.jpg", 
                        "pictures/image12.jpg"];

//activeThumbnails : 1er et 2e slider

let activePicSlider1 = document.querySelectorAll('.category1 .slider .active');
let activePicSlider2 = document.querySelectorAll('.category2 .slider .active');

// boutons 'suivant' 'précédent': 1er et 2e slider
let nextThumbnail1 = document.querySelector('.category1 .nav-droite > img');
let previousThumbnail1 = document.querySelector('.category1 .nav-gauche > img');

let nextThumbnail2 = document.querySelector('.category2 .nav-droite > img');
let previousThumbnail2 = document.querySelector('.category2 .nav-gauche > img');

let count = 0;
console.log('compteur initial =' + count);


class Slider{
    constructor(activeThumbnails, availableThumbnails, nextThumbnail, previousThumbnail){
        this.activeThumbnails = activeThumbnails;
        this.availableThumbnails = availableThumbnails;
        this.nextThumbnail = nextThumbnail;
        this.previousThumbnail = previousThumbnail;
    }
    
    changeThumbnail(count){
        for (let pictIndex = 0; pictIndex < 4; pictIndex++){
            let pict1 = this.activeThumbnails[pictIndex];
            let pict1Src = pict1.getAttribute("src");
            console.log('count dans changeThumbnail = ' + count);
            if ((count + pictIndex) < 0){
                let newPict = this.availableThumbnails[this.availableThumbnails.length + (count + pictIndex)];
                console.log(newPict);
                pict1Src = newPict;
                pict1.setAttribute("src", pict1Src);
            } else {
                console.log(count);
                console.log(pictIndex);
                let newPict = this.availableThumbnails[count + pictIndex];
                console.log(newPict);
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
                    previousThumbnail1);

// création 2e slider (2e instance de la classe Slider)
let AventureSlider = new Slider(activePicSlider2, 
                    imagesAventure, 
                    nextThumbnail2,
                    previousThumbnail2);



/*
function changeThumbnail(count){
    for (let pictIndex = 0; pictIndex < 4; pictIndex++){
        let pict1 = this.activeThumbnails[pictIndex];
        let pict1Src = pict1.getAttribute("src");
        console.log('count dans changeThumbnail = ' + count);
        if ((count + pictIndex) < 0){
            let newPict = this.availableThumbnails[this.availableThumbnails.length + (count + pictIndex)];
            console.log(newPict);
            pict1Src = newPict;
            pict1.setAttribute("src", pict1Src);
        } else {
            console.log(count);
            console.log(pictIndex);
            let newPict = this.availableThumbnails[count + pictIndex];
            console.log(newPict);
            pict1Src = newPict;
            pict1.setAttribute("src", pict1Src);
        }
    }
}
*/

// boutons précédent/suivant 1
bestFilmsSlider.previousThumbnail.addEventListener('click', function(){
    count--;
    console.log('count1 -- = ' + count);
    if(count > 3){
        count = - 3;
    } else if (count < - 7){
        count = -1;
        }
    console.log('count1 = ' + count);
    changeThumbnail(this.activeThumbnails, this.availableThumbnails, count);
});

bestFilmsSlider.nextThumbnail.addEventListener('click', function(){
    count++;
    console.log('count1 ++ = ' + count);
    if(count > 3){ 
        count = - 3;
    } else if (count < - 7){
        count = -1;
        }
    console.log('count1 = ' + count);
    bestFilmsSlider.changeThumbnail(this.activeThumbnails, this.availableThumbnails, count);
});

// boutons précédent/suivant 2
AventureSlider.previousThumbnail.addEventListener('click', function(){
    count--;
    console.log('count2 -- = ' + count);
    if(count > 3){
        count = - 3;
    } else if (count < - 7){
        count = -1;
        }
    console.log('count2 = ' + count);
    AventureSlider.changeThumbnail(this.activeThumbnails, this.availableThumbnails, count);
});

AventureSlider.nextThumbnail.addEventListener('click', function(){
    count++;
    console.log('count2 ++ = ' + count);
    if(count > 3){ 
        count = - 3;
    } else if (count < - 7){
        count = -1;
        }
    console.log('count2 = ' + count);
    AventureSlider.changeThumbnail(this.activeThumbnails, this.availableThumbnails, count);
});
