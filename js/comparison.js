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
        setHeightProp() {
            let allInfoItems = document.querySelectorAll('.js-comparison-info');
            let allInfoProductItems = document.querySelectorAll('.js-comparison-info-product');
            let arrayHeights = [];
            
            
            for(let i = 0; allInfoItems.length > i; i++) {
                arrayHeights.push(allInfoItems[i].offsetHeight);
            }
            
            let counter = 0;
            allInfoProductItems.forEach((item,index) => {
                item.setAttribute('style', `height: ${arrayHeights[counter]}px;`);
                counter == arrayHeights.length - 1 ? counter = 0 : counter ++;;
            });
        },
        
        moveProductItem() {
            let productList = document.querySelector('.js-comparison-product-list');
            let productInfoList = document.querySelector('.js-comparison-info-product-list');
            let productItem = document.querySelector('.js-comparison-product-item');
            let buttonMoveNext = document.querySelector('.js-comparison-button-next');
            let buttonMovePrev = document.querySelector('.js-comparison-button-prev');
            let maxScrollLeft = productList.scrollWidth - productList.clientWidth;
            let currenScrollValue = productList.scrollLeft;
            buttonMoveNext.addEventListener('click',moveNext);
            buttonMovePrev.addEventListener('click',movePrev);
            
            let styleProductItem = window.getComputedStyle(productItem);
            let productItemWidth = productItem.offsetWidth + +styleProductItem['margin-right'].match(/\d/g).join('');
            
            function movePrev() {
                currenScrollValue = productList.scrollLeft;
                productInfoList.scrollLeft -= productItemWidth;
                productList.scrollLeft -= productItemWidth;
                currenScrollValue -= productItemWidth;
                buttonMoveNext.classList.remove('disabled');
                
                if(currenScrollValue < 40) {
                    this.classList.add('disabled');
                }
            }
            
            function moveNext() {
                currenScrollValue = productList.scrollLeft;
                productList.scrollLeft += productItemWidth;
                productInfoList.scrollLeft += productItemWidth;
                currenScrollValue += productItemWidth;

                if(currenScrollValue >= 0) {
                    buttonMovePrev.classList.remove('disabled');
                }
                
                if(currenScrollValue >= maxScrollLeft) {
                    this.classList.add('disabled');
                }
            }
        },
        showProductList() {
            function move(){
                let comparisonWrapper = document.querySelector('.js-comparison-wrapper-product');
                let comparisonContainer = document.querySelector('.js-comparison-container-product');
                let stikyBlock = document.querySelector('.js-comparison-sticky-product');
                let comparisonParam = document.querySelector('.js-comparison-param');
                let comparisonHiddenblock = document.querySelector('.js-hidden-comparison-block');
                
                let comparisonBodyBottom = document.querySelector('.js-comparison-body').getBoundingClientRect().bottom;
                
                if(comparisonBodyBottom < stikyBlock.offsetHeight) {
                    stikyBlock.classList.add('hide');
                }else {
                    stikyBlock.classList.remove('hide');
                }
                
                comparisonHiddenblock.style.width = comparisonParam.offsetWidth + 'px';
            
                if((comparisonWrapper.getBoundingClientRect().top + pageYOffset - 30) < window.scrollY) {
                    stikyBlock.setAttribute('style', `position: fixed;`);
                    stikyBlock.classList.add("fixed");
                    comparisonContainer.setAttribute('style', `width:${comparisonWrapper.offsetWidth}px;`);
                    
                }else {
                    stikyBlock.setAttribute('style', `position: absolute;`);
                    stikyBlock.classList.remove("fixed");
                    comparisonContainer.setAttribute('style', `width:${comparisonWrapper.offsetWidth}px;`);
                }
            }
        
        
            window.addEventListener("resize",function(){
                move();
            });
            
            move()
            
            document.addEventListener("scroll",function(){
                move();
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
        
        
        if(this.windowWidth > 767) {
            this.showProductList();
            setTimeout(() => {
                this.moveProductItem();
                this.setHeightProp();
            },100)
        }
    }
});