Vue.use(VueLazyload)

const app = new Vue({
    el: "#app",
    data: {
        category: null,
        filterHeaderCategory: 0,
        windowWidth: 0,
        searchInput: "",
    },
    components: {
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
        },
        scrollTabs() {
            let tabsWrapper = document.querySelector('.js-general-tabs-wrapper');
            let tabsList = document.querySelector('.js-general-tabs-list');
            let buttonMoveNext = document.querySelector('.js-general-tans-button-next');
            let buttonMovePrev = document.querySelector('.js-general-tans-button-prev');
            let maxScrollLeft = tabsList.scrollWidth - tabsList.clientWidth;
            let currenScrollValue = tabsList.scrollLeft;
            buttonMoveNext.addEventListener('click',moveNext);
            buttonMovePrev.addEventListener('click',movePrev);
            
            function movePrev() {
                currenScrollValue = tabsList.scrollLeft;
                tabsList.scrollLeft -= 100;
                currenScrollValue -= 100;
                buttonMoveNext.classList.remove('hidden');
                
                if(currenScrollValue < 40) {
                    this.classList.add('hidden');
                    tabsWrapper.classList.remove('active');
                }
            }
            
            function moveNext() {
                currenScrollValue = tabsList.scrollLeft;
                tabsList.scrollLeft += 100;
                currenScrollValue += 100;

                if(currenScrollValue >= 0) {
                    buttonMovePrev.classList.remove('hidden');
                    tabsWrapper.classList.add('active');
                }
                
                if(currenScrollValue >= maxScrollLeft) {
                    this.classList.add('hidden');
                }
            }
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
        
        this.changeComents();
        this.setStar();
        this.scrollTabs();
    }
});