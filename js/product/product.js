Vue.use(VueLazyload)

const app = new Vue({
    el: "#app",
    data: {
        category: null,
        filterHeaderCategory: 0,
        windowWidth: 0,
        searchInput: "",
        currentTab: 1,
    },
    methods: {
        setStar() {
            let starsItem = document.querySelectorAll('.js-star-item');
            let starInput = document.querySelector('.js-stars-input');
            let starList = document.querySelector('.js-star-list');
            starsItem.forEach((item) =>{
                item.addEventListener('click',function(){
                    let starValuse = item.getAttribute('data-target');
                    starInput.setAttribute('value', starValuse);
                    starList.classList.add('star__list-checked');
                    
                    for(var i = 0; starsItem.length > i; i++) {
                        starsItem[i].classList.remove('active');
                    }
                    item.classList.add('active');
                });
            });
        },
        addPhoto() {
            /* Reviews photo */

            let photoInpput = document.querySelectorAll('.add-reviews__input');
            let clearButton = document.querySelectorAll('.add-reviews__delete-img');
            
            if(photoInpput){
                photoInpput.forEach(function(item){
                    item.addEventListener('change', function(){
                        let file = item.files[0];
                        let preview = item.closest(".add-reviews__item").querySelector(".add-reviews__img");
                        
                        let reader = new FileReader();
                        reader.onloadend = function () {
                            let src = reader.result
                            preview.setAttribute("src", src);
                            
                            preview.closest('.add-reviews__item').classList.add('active');
                        }

                        if (file) {
                            reader.readAsDataURL(file);
                        } else {
                            preview.src = "";
                        }
                    });
                });
                
                clearButton.forEach(function(item){
                    item.addEventListener('click', function(){
                        let input = item.closest(".add-reviews__item").querySelector(".add-reviews__input");
                        item.closest(".add-reviews__item").classList.remove('active');
                        input.value = null;
                    });
                });
            }
            
            let openReviewsButton = document.querySelectorAll('.js-open-reviews');
            
            if(openReviewsButton) {
                openReviewsButton.forEach(function(item){
                    item.addEventListener('click', function(){
                        document.querySelector('.reviews-page__form').classList.toggle('active');
                    });
                })
                
            }
            
            /* /Reviews photo */
        },
        showImage() {
            // Show product img
    
            let allImg = document.querySelectorAll('.js-image');
            let generalImg = document.querySelectorAll('.js-general-image');
            let buttonPrev = document.querySelector('.js-image-button-prev');
            let buttonNext = document.querySelector('.js-image-button-next');
            let generalList = document.querySelector('.js-image-list');
            
            if(this.windowWidth < 768) {
                generalImg.forEach((item) => {
                    item.addEventListener('click', function() {
                        item.classList.add('show');
                    });
                });
            }
            
            function scrollListNext(activeItem) {
                var style = window.getComputedStyle(activeItem);
                let counterElem = activeItem.getAttribute('data-index');
                let itemWidth = activeItem.offsetWidth;
                generalList.scrollLeft = (itemWidth + +style.getPropertyValue("margin-right").match(/\d/g).join('')) * counterElem;
            }
            
            function scrollListPrev(activeItem) {
                var style = window.getComputedStyle(activeItem);
                let counterElem = activeItem.getAttribute('data-index');
                let itemWidth = activeItem.offsetWidth;
                
                generalList.scrollLeft = (itemWidth + +style.getPropertyValue("margin-right").match(/\d/g).join('')) * (counterElem - 1);
            }
            
            function changeImg(item) {
                let style = item.getAttribute('src');
                generalImg[0].querySelector('img').setAttribute('src', style);
            }
            
            function changeImgNext(item) {
                let style = item.querySelector('img').getAttribute('src');
                let styleNext = item.nextElementSibling.querySelector('img').getAttribute('src');
                generalImg[0].querySelector('img').setAttribute('src', style);
                generalImg[1].querySelector('img').setAttribute('src', styleNext);
            }
            
            function changeImgPrev(item) {
                let style = item.querySelector('img').getAttribute('src');
                let styleNext = item.previousElementSibling.querySelector('img').getAttribute('src');
                generalImg[0].querySelector('img').setAttribute('src', styleNext);
                generalImg[1].querySelector('img').setAttribute('src', style);
            }
            
            setTimeout(() => {
                if(document.querySelector('.js-image.active')){
                    changeImgNext(document.querySelector('.js-image.active'));
                }
            },1000);
            
            var component = this;
            
            if(generalImg) {
                allImg.forEach(function(item){
                    item.addEventListener('click', function(){
                        let getIndex = item.getAttribute('data-index');
                        if(component.windowWidth > 1024){
                            if(getIndex != allImg.length) {
                                changeImgNext(item);
                                if(getIndex == allImg.length - 1) {
                                    buttonNext.classList.add('disabled');
                                    allImg.forEach(function(item){
                                        item.classList.remove("active");
                                    });
                                    
                                    item.classList.add('active');
                                    return;
                                }
                            }else {
                                if(getIndex == allImg.length){
                                    allImg.forEach(function(item){
                                        item.classList.remove("active");
                                    });
                                    
                                    item.previousElementSibling.classList.add('active');
                                    buttonNext.classList.add('disabled');
                                    return;
                                }
                            }
                        }else {
                            changeImg(item.querySelector('img'));
                        }
                        
                        
                        allImg.forEach(function(item){
                            item.classList.remove("active");
                        });
                        
                        item.classList.add('active');
                        
                        buttonNext.classList.remove('disabled');
                        buttonPrev.classList.remove('disabled');
                        
                        if(getIndex == 1) {
                            buttonPrev.classList.add('disabled');
                        }
                    });
                });
                
                if(buttonPrev){
                    buttonPrev.addEventListener('click', function(){
                        let showImg = document.querySelector('.js-image.active');
                        
                        if(!showImg.previousElementSibling) {
                            return;
                        }
                        
                        scrollListPrev(showImg.previousElementSibling);
                        
                        showImg.previousElementSibling.classList.add("active");
                        showImg.classList.remove("active");
                        
                        if(component.windowWidth > 1024){
                            changeImgPrev(showImg);
                        }else {
                            changeImg(showImg.previousElementSibling.querySelector('img'));
                        }
                        
                        
                        
                        buttonNext.classList.remove("disabled");
                        
                        if(showImg.previousElementSibling.previousElementSibling == null) {
                            buttonPrev.classList.add('disabled');
                        }
                    });
                    
                    buttonNext.addEventListener("click", function(){
                        let showImg = document.querySelector('.js-image.active');

                        if(!showImg.nextElementSibling) {
                            return;
                        }

                        scrollListNext(showImg);
                        
                        showImg.nextElementSibling.classList.add("active");
                        showImg.classList.remove("active");
                        
                        if(component.windowWidth > 1024){
                            changeImgNext(showImg.nextElementSibling);
                        }else {
                            changeImg(showImg.nextElementSibling.querySelector('img'));
                        }
                        
                        buttonPrev.classList.remove("disabled");
                        
                        if(component.windowWidth > 1024){
                            if(showImg.nextElementSibling.nextElementSibling.nextElementSibling == null) {
                                buttonNext.classList.add('disabled');
                            }
                        }else {
                            if(showImg.nextElementSibling.nextElementSibling == null) {
                                buttonNext.classList.add('disabled');
                            }
                        }
                    });
                    
                    var startPointX;
                    var startPointY;
                    document.querySelector(".js-general-image").addEventListener("touchstart", function(event) {
                        startPointX = event.changedTouches[0].screenX;
                        startPointY = event.changedTouches[0].screenY;
                    }, false);
                    document.querySelector(".js-general-image").addEventListener("touchend", function(event){
                        var endPointX = event.changedTouches[0].screenX;
                        var endPointY = event.changedTouches[0].screenY;
                        
                        if((startPointY > endPointY && (startPointY - endPointY) > 80) || (startPointY < endPointY && (startPointY - endPointY) < -80)) {
                            if(component.windowWidth < 768) {
                                generalImg.forEach((item) => {
                                    item.classList.remove('show');
                                });
                            }
                        }
                        
                        if(startPointX - endPointX > 40) {
                            buttonNext.click();
                        } else if(endPointX - startPointX > 40) {
                            buttonPrev.click();
                        }
                    }, false);
                
                }
            }
            
            // //Show product img
        },
        mainZoom() {
            // Zoom image
            
            function imageZoom(img, resultID, showArea) {
                var result, cx, cy;
                let imgBox = img.getBoundingClientRect();
                result = document.getElementById(resultID);

                cx = result.offsetWidth / showArea.offsetWidth;
                cy = result.offsetHeight / showArea.offsetHeight;
                
                showArea.addEventListener("mousemove", moveLens);
                img.addEventListener("mousemove", moveLens);
                showArea.addEventListener("mouseleave", mouseLeave);
                img.addEventListener("mouseleave", mouseLeave);
                
                img.addEventListener("mouseover", function() {
                    result.setAttribute('style', `background-image: url(${img.getAttribute("src")});`);
                    result.style.backgroundSize = (imgBox.width * cx) + "px " + (imgBox.height * cy) + "px";
                });
                
                function moveLens(e) {
                    var pos, x, y;
                    
                    e.preventDefault();
                    
                    pos = getCursorPos(e);
                    
                    x = pos.x - (showArea.offsetWidth / 2);
                    y = pos.y - (showArea.offsetHeight / 2);
                    
                    if (x > imgBox.width - showArea.offsetWidth){
                        x = imgBox.width - showArea.offsetWidth;
                    }
                    if (x < 0){
                        x = 0;
                    }
                    if (y > imgBox.height - showArea.offsetHeight){
                        y = imgBox.height - showArea.offsetHeight;
                    }
                    if (y < 0){
                        y = 0;
                    }
                    
                    showArea.style.left = x + "px";
                    showArea.style.top = y + "px";
                    
                    result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
                    result.style.visibility = "visible";
                    showArea.style.visibility = "visible";
                }
                
                function mouseLeave() {
                    result.style.visibility = "hidden";
                    showArea.style.visibility = "hidden";
                }
                
                function getCursorPos(e) {
                    var a, x = 0, y = 0;
                    e = e || window.event;
                    
                    a = img.getBoundingClientRect();
                    
                    x = e.pageX - a.left;
                    y = e.pageY - a.top;
                    
                    x = x - window.pageXOffset;
                    y = y - window.pageYOffset;
                    return {x : x, y : y};
                }
            }
            
            if(this.windowWidth > 1200) {
                let allImg = document.querySelectorAll('.js-zoom-img');
                let allImgShowArea = document.querySelectorAll('.js-show-area');
                
                if(allImg.length) {
                    imageZoom(allImg[0], "myresult",allImgShowArea[0]);
                    imageZoom(allImg[1], "myresult",allImgShowArea[1]);
                }
            }
            // //Zoom image
        },
        changeComents() {
            let textAreaAll = document.querySelectorAll('.js-change-textarea');
            let textHideblockAll = document.querySelectorAll('.js-change-text p');
            let buttonsChange = document.querySelectorAll('.js-change-reviews');
            
            function setHightTextArea() {
                if(textHideblockAll){
                    for(let i = 0; textAreaAll.length > i; i++){
                        let textHideblockHeight = textHideblockAll[i].offsetHeight;
                        textAreaAll[i].setAttribute('style', `height: ${textHideblockHeight}px`);
                    }
                }
            }
            
            function changeReviews() {
                if(buttonsChange){
                    for(let i = 0; buttonsChange.length > i; i++){
                        buttonsChange[i].addEventListener('click', function(){
                            this.classList.toggle('active');
                            if(textAreaAll[i].hasAttribute('readonly')) {
                                textAreaAll[i].removeAttribute('readonly');
                                textAreaAll[i].focus();
                            }else {
                                textAreaAll[i].setAttribute('readonly', "");
                                textHideblockAll[i].innerHTML = textAreaAll[i].value;
                                setHightTextArea();
                            }
                        });
                    }
                }
            }
            
            window.addEventListener('resize', function() {
                changeReviews();
                setHightTextArea();
            });
            
            changeReviews();
            setHightTextArea();
        }
        
    },
    mounted() {
        this.category = [
            {
                name: "Ноутбуки и компьютеры",
                info: [{name: 'Ноутбуки', slug: 'Ноутбуки'},{name: 'Видеокарты', slug: 'Видеокарты'},{name: 'Мониторы', slug: 'Мониторы'}]
            },
            {
                name: "Детские товары",
                info: [{name: 'Ноутбуки', slug: 'Ноутбуки'},{name: 'Видеокарты', slug: 'Видеокарты'},{name: 'Мониторы', slug: 'Мониторы'},{name: 'Детские товары', slug: 'Детские товары'}]
            },
            {
                name: "Бытовая техника",
                info: [{name: 'Ноутбуки', slug: 'Ноутбуки'},{name: 'Видеокарты', slug: 'Видеокарты'},{name: 'Мониторы', slug: 'Мониторы'},{name: 'Бытовая техника', slug: 'Бытовая техника'}]
            },
            {
                name: "Спорт",
                info: [{name: 'Ноутбуки', slug: 'Ноутбуки'},{name: 'Видеокарты', slug: 'Видеокарты'},{name: 'Мониторы', slug: 'Мониторы'},{name: 'Спорт', slug: 'Спорт'}]
            },
        ]
        
        this.windowWidth = window.innerWidth;
        window.addEventListener('resize', () => {
            this.windowWidth = window.innerWidth;
        });
        
        this.showImage();
        this.mainZoom();
        this.changeComents();
        this.addPhoto();
        this.setStar();
    }
});