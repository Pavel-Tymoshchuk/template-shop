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
            
            console.log(productItemWidth);
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
        
        this.setHeightProp();
        
        this.moveProductItem();
    }
});