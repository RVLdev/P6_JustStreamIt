//availableThumbnails : 1er et 2e slider

let imagesBestFilms = ["pictures/image1.jpg", "pictures/image2.jpg", 
                        "pictures/image3.jpg", "pictures/image4.jpg", 
                        "pictures/image5.jpg", "pictures/image6.jpg", 
                        "pictures/image7.jpg"];

let imagesAventure = ["pictures/imageA.jpg", "pictures/imageB.jpg", 
                        "pictures/imageC.jpg", "pictures/imageD.jpg", 
                        "pictures/imageE.jpg", "pictures/imageF.jpg", 
                        "pictures/imageG.jpg"];

let imagesAnimation = ["pictures/image1.jpg", "pictures/image2.jpg", 
                        "pictures/image3.jpg", "pictures/image4.jpg", 
                        "pictures/image5.jpg", "pictures/image6.jpg", 
                        "pictures/image7.jpg"];

let imagesBiographie = ["pictures/imageA.jpg", "pictures/imageB.jpg", 
                        "pictures/imageC.jpg", "pictures/imageD.jpg", 
                        "pictures/imageE.jpg", "pictures/imageF.jpg", 
                        "pictures/imageG.jpg"];


//activeThumbnails des 4 sliders

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

console.log('compteur initial1 =' + count1);


class Slider{
    constructor(activeThumbnails, availableThumbnails, nextThumbnail, previousThumbnail, count){
        this.activeThumbnails = activeThumbnails;
        this.availableThumbnails = availableThumbnails;
        this.nextThumbnail = nextThumbnail;
        this.previousThumbnail = previousThumbnail;
        this.count = count;
    }
    
    incrementPreviousThumbnail(){
        this.count--;
        console.log('count1 -- = ' + this.count);
        if(this.count > 3){
            this.count = - 3;
        } else if (this.count < - 7){
            this.count = -1;
            }
        return this.count;
    }

    incrementNextThumbnail(){
        this.count++;
        console.log('count1 ++ = ' + this.count);
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
            console.log('count dans changeThumbnail = ' + this.count);
            if ((this.count + pictIndex) < 0){
                let newPict = this.availableThumbnails[this.availableThumbnails.length + (this.count + pictIndex)];
                console.log(newPict);
                pict1Src = newPict;
                pict1.setAttribute("src", pict1Src);
            } else {
                console.log(this.count);
                console.log(pictIndex);
                let newPict = this.availableThumbnails[this.count + pictIndex];
                console.log(newPict);
                pict1Src = newPict;
                pict1.setAttribute("src", pict1Src);
            }
        }
    }
}


// création des 4 sliders (4 instances de la classe Slider)
let bestFilmsSlider = new Slider(activePicSlider1, 
                        imagesBestFilms, 
                        nextThumbnail1,
                        previousThumbnail1,
                        count1);

let AventureSlider = new Slider(activePicSlider2, 
                        imagesAventure, 
                        nextThumbnail2,
                        previousThumbnail2,
                        count2);

let AnimationSlider = new Slider(activePicSlider3, 
                        imagesAnimation, 
                        nextThumbnail3,
                        previousThumbnail3,
                        count3);

let BiographieSlider = new Slider(activePicSlider4, 
                        imagesBiographie, 
                        nextThumbnail4,
                        previousThumbnail4,
                        count4);


// boutons précédent/suivant 1

bestFilmsSlider.previousThumbnail.addEventListener('click', function(){
    bestFilmsSlider.incrementPreviousThumbnail(this.count);
    console.log('count1 = ' + this.count);
    bestFilmsSlider.changeThumbnail(this.activeThumbnails, this.availableThumbnails, this.count);
});

bestFilmsSlider.nextThumbnail.addEventListener('click', function(){
    bestFilmsSlider.incrementNextThumbnail(this.count);
    console.log('count1 = ' + this.count);
    bestFilmsSlider.changeThumbnail(this.activeThumbnails, this.availableThumbnails, this.count);
});

// boutons précédent/suivant 2
AventureSlider.previousThumbnail.addEventListener('click', function(){
    AventureSlider.incrementPreviousThumbnail(this.count);
    console.log('count2 = ' + this.count);
    AventureSlider.changeThumbnail(this.activeThumbnails, this.availableThumbnails, this.count);
});

AventureSlider.nextThumbnail.addEventListener('click', function(){
    AventureSlider.incrementNextThumbnail(this.count);
    console.log('count2 = ' + this.count);
    AventureSlider.changeThumbnail(this.activeThumbnails, this.availableThumbnails, this.count);
});

// boutons précédent/suivant 3
AnimationSlider.previousThumbnail.addEventListener('click', function(){
    AnimationSlider.incrementPreviousThumbnail(this.count);
    console.log('count2 = ' + this.count);
    AnimationSlider.changeThumbnail(this.activeThumbnails, this.availableThumbnails, this.count);
});

AnimationSlider.nextThumbnail.addEventListener('click', function(){
    AnimationSlider.incrementNextThumbnail(this.count);
    console.log('count2 = ' + this.count);
    AnimationSlider.changeThumbnail(this.activeThumbnails, this.availableThumbnails, this.count);
});

// boutons précédent/suivant 4
BiographieSlider.previousThumbnail.addEventListener('click', function(){
    BiographieSlider.incrementPreviousThumbnail(this.count);
    console.log('count2 = ' + this.count);
    BiographieSlider.changeThumbnail(this.activeThumbnails, this.availableThumbnails, this.count);
});

BiographieSlider.nextThumbnail.addEventListener('click', function(){
    BiographieSlider.incrementNextThumbnail(this.count);
    console.log('count2 = ' + this.count);
    BiographieSlider.changeThumbnail(this.activeThumbnails, this.availableThumbnails, this.count);
});
