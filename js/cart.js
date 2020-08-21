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
        setNameInPopupDelete() {
            let allButton = document.querySelectorAll('.js-delete-item-button');
            
            allButton.forEach(item => {
                item.addEventListener('click', function(e) {
                    let namaProduct = item.closest('.js-delete-item').querySelector('.js-delete-item-name').innerHTML;
                    document.querySelector('.js-popup-name').innerHTML = namaProduct;
                });
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
        
        this.setNameInPopupDelete();
        
    }
});