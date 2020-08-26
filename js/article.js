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
        fixedSiteBar() {
            let mainWrapper = document.querySelector('.js-sitebar-wrapper');
            let wrapper = document.querySelector('.js-sitebar-container');
            let mainContent = document.querySelector('.js-main-content');
            let wrapperTopPosition;
            let mainContentBottomPosition;
            
            if(wrapper) {
                wrapperTopPosition = wrapper.getBoundingClientRect().top + pageYOffset;
                mainContentBottomPosition = mainContent.offsetHeight + mainContent.getBoundingClientRect().top + pageYOffset;
            }
            
            function fixedBlock() {
               
                mainContentBottomPosition = mainContent.offsetHeight + mainContent.getBoundingClientRect().top + pageYOffset;
                if(mainContentBottomPosition < (window.scrollY + window.innerHeight - 100)) {
                    wrapper.classList.add("hide");
                }else {
                    if(wrapperTopPosition < window.scrollY) {
                        wrapper.setAttribute("style",`position:fixed; top: 0px; width: ${mainWrapper.offsetWidth}px;`);
                        wrapper.classList.remove("hide");
                    }else {
                        wrapperTopPosition = wrapper.getBoundingClientRect().top + pageYOffset;
                        wrapper.setAttribute("style",`position:absolute; top: 0px; width: ${mainWrapper.offsetWidth}px;`);
                    }
                }
                
            }
            setTimeout(() => {
                if(wrapper) {
                    fixedBlock();
                }
                
            }, 1000);
            
            window.addEventListener('scroll', function(){
                if(wrapper) {
                    fixedBlock();
                }
            });
            
            window.addEventListener('resize', function(){
                if(wrapper) {
                    fixedBlock();
                }
            });
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
        this.fixedSiteBar();
    }
});