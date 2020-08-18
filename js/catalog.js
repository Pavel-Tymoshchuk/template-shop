Vue.use(VueLazyload)

const app = new Vue({
    el: "#app",
    data: {
        category: null,
        filterHeaderCategory: 0,
        windowWidth: 0,
        searchInput: "",
        calcPrice: {
            value: [0, 10],
        }
    },
    components: {
        VueSlider: window['vue-slider-component']
    },
    methods: {
        fixedSiteBar() {
            let wrapper = document.querySelector('.js-catalog-container');
            let mainContent = document.querySelector('.js-main-content');
            let headerInfoBlock = document.querySelector('.js-header-wrapper');
            let wrapperTopPosition;
            let mainContentBottomPosition;
            
            if(wrapper) {
                wrapperTopPosition = wrapper.getBoundingClientRect().top + pageYOffset;
                mainContentBottomPosition = mainContent.offsetHeight + mainContent.getBoundingClientRect().top + pageYOffset;
            }
            
            function fixedBlock() {
                let mainContentBottomPosition = mainContent.offsetHeight + mainContent.getBoundingClientRect().top + pageYOffset;
                if(mainContentBottomPosition < (window.scrollY + window.innerHeight - 100)) {
                    wrapper.classList.add("hide");
                }else {
                    if((wrapperTopPosition - (headerInfoBlock.offsetHeight + 10)) < window.scrollY) {
                        wrapper.setAttribute("style",`position:fixed; top: ${headerInfoBlock.offsetHeight}px; left: 16px; width: calc(100% - 32px); `);
                        wrapper.classList.remove("hide");
                    }else {
                        wrapper.setAttribute("style",`position:absolute; top: 0px;`);
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
            
        //     window.addEventListener('resize', function(){
        //         if(wrapper) {
        //             fixedBlock();
        //         }
        //     });
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
        
        this.fixedSiteBar();
    }
});