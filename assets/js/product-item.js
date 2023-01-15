const productContainer = document.getElementsByClassName('collection-card-container')[0];
const sliderItems = document.getElementsByClassName('slider-item');
const nextButton = document.getElementsByClassName('next')[0];
const prevButton = document.getElementsByClassName('prev')[0];
const baseMove = sliderItems[0].offsetWidth


if(productContainer.scrollWidth > productContainer.offsetWidth) {
    nextButton.style.display = 'block';
}

let position = {left: 0, x: 0}

const handleMouseDown = (e) => {
    position = {
        left: productContainer.scrollLeft,
        x: e.clientX
    }

    
    for(const item of sliderItems) {
        item.getElementsByTagName('A')[0].style.userSelect = 'none';      
    }

    productContainer.addEventListener('mousemove', handleMouseMove);
    productContainer.addEventListener('mouseup', handleMouseUp);
}

const handleMouseMove = (e) => {    
    const diffX = e.clientX - position.x; 
    productContainer.scrollLeft = position.left - diffX;
    handleCheckButtonView(position.left - diffX)

}

const handleMouseUp = () => {
    for(const item of sliderItems) {     
        item.getElementsByTagName('A')[0].style = '';
    }
    productContainer.removeEventListener('mousemove', handleMouseMove);
    productContainer.removeEventListener('mouseup', handleMouseUp);
}


productContainer.addEventListener('mousedown', handleMouseDown)

const handleCheckButtonView = (scrollLeft) => {
    if(scrollLeft <= 0) {
        prevButton.style.display = 'none';
        nextButton.style.display = 'block';
    } else {
        prevButton.style.display = 'block';
        if(scrollLeft >= (productContainer.scrollWidth - productContainer.offsetWidth)) {
            nextButton.style.display = 'none';
        } else {
            nextButton.style.display = 'block';
        }
    }
}


const sideScroll = (element, direction, speed = 25, distance = 100, step) => {
    let scrollAmount = 0;
    let slideTimer = setInterval(function(){
        if(direction == 'left'){
            element.scrollLeft -= step;
        } else {
            element.scrollLeft += step;
        }
        scrollAmount += step;
        if(scrollAmount >= distance){
            window.clearInterval(slideTimer);
        }
    }, speed);
}

//button events
const handleClickNextButton = () => { 
    sideScroll(productContainer, 'right', 25, 100, baseMove)
    handleCheckButtonView(productContainer.scrollLeft + baseMove)
}

const handleClickPrevButton = () => {
    productContainer.scrollLeft = productContainer.scrollLeft - baseMove;
    handleCheckButtonView(productContainer.scrollLeft - baseMove)
}

if(nextButton) {
    nextButton.addEventListener('click', handleClickNextButton)    
}

if(prevButton) {
    prevButton.addEventListener('click', handleClickPrevButton)
}

