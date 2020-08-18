Vue.use(VueLazyload)

const app = new Vue({
    el: "#app",
    data: {
        category: null,
        filterHeaderCategory: 0,
        banner: null,
        bannersAmount: 2,
        currentIndex: 0,
        windowWidth: 0,
        searchInput: ""
    },
    methods: {
        prevSlide: function(){
            if(this.currentIndex >= 1)
                this.currentIndex--;
            else
                this.currentIndex = this.bannersAmount - 1;
        },
        nextSlide: function(){
            if(this.currentIndex < this.bannersAmount - 1)
                this.currentIndex++;
            else
                this.currentIndex = 0;
        }
    },
    components: {
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
        
        this.banner = [
            {
                type: "sale",
                caption: "Выгодное предложение",
                sub: "Дополнительное описание"
            },
            {
                type: "top",
                caption: "Выгодное предложение",
                sub: "Дополнительное описание"
            }
        ]
        
        // Slider banner
        var sliderAutoStart;
        const component = this;
        setTimeout(function(){
            let slider = document.querySelector('.main-banner');
            if(slider) {
                if(window.innerWidth > 1160){
                    slider.addEventListener('mouseover', function(){
                        clearInterval(sliderAutoStart);
                    });
                    
                        
                    slider.addEventListener('mouseleave', () => {
                        sliderAutoStart = setInterval(component.nextSlide, 5000);
                    });
                    
                    sliderAutoStart = setInterval(component.nextSlide, 5000);
                }
                
                var startPointX;
                slider.addEventListener("touchstart", function(event) {
                    startPointX = event.changedTouches[0].screenX;
                    clearInterval(sliderAutoStart);
                }, {passive: true});
                slider.addEventListener("touchend", function(event){
                    var endPointX = event.changedTouches[0].screenX;
                    
                    if(startPointX - endPointX > 40) {
                        component.nextSlide();
                    } else if(endPointX - startPointX > 40) {
                        component.prevSlide();
                    }
                }, {passive: true});
            }
        },0)
        
        // slider banner
        
        // Set window width
        
        this.windowWidth = window.innerWidth;
        window.addEventListener('resize', () => {
            this.windowWidth = window.innerWidth;
        });
    }
});