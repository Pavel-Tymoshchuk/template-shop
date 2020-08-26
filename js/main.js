document.addEventListener("DOMContentLoaded", function(){
    var dropList = document.querySelectorAll('.js-drop-item');

    document.addEventListener('click', function(e){
        let element = e.target;
        
        console.log(element);
        
        if(element.closest('.js-drop-button')){
            let isActive = element.closest('.js-drop-item').classList.contains('active')? true: false;
            
            dropList.forEach(item => {item.classList.remove('active')});
            
            if(isActive)
                element.closest('.js-drop-item').classList.remove('active');
            else
                element.closest('.js-drop-item').classList.add('active');
                
            console.log('active');
        }
        
        if(element.closest('.js-drop-contains')){
            let dropList = element.closest('.js-drop-item');
            let dropItems = dropList.querySelectorAll('.js-drop-contains');
            
            dropItems.forEach(item => {item.classList.remove('active')});
            element.closest('.js-drop-contains').classList.add('active');
            let innerContent = element.closest('.js-drop-contains').querySelector('.text').innerHTML;
            let dropInput = dropList.querySelector('.js-drop-input');
            
            if(dropInput) {
                dropInput.value = innerContent;
            }
            
            // close dropdown
            dropList.classList.remove('active');
        }
    });
    
    // document.querySelector('body').addEventListener('click', function(event){
        
    //     let dropItem = event.target.closest('.js-drop-item');
        
    //     if(!dropItem) {
    //         document.querySelectorAll('.js-drop-item').forEach(function(item){
    //             item.classList.remove('active');
    //         }); 
    //     }
    //     if(dropItem) {
    //         if(!dropItem.classList.contains("active")) {
    //             document.querySelectorAll('.js-drop-item').forEach(function(item){
    //                 item.classList.remove('active');
    //             });
    //         }
    //     }
        
    // });
    
    // Popup
        
    let overlay = document.querySelector('.overlay');
    let htmlOverflow = document.querySelector('html');
    
    document.addEventListener('click', function(e){
        let elem = e.target;
        
        if(elem.closest('.js-button')) {
            let getData = elem.closest('.js-button').getAttribute('data-target');
            let popupActive = document.querySelector('.js-popup.active');
            let popup = document.querySelector('.js-popup[data-target = ' + getData + ']');
            popup.classList.add('active');
            overlay.classList.add('active');
            htmlOverflow.classList.add('overflow');
            
            if(popupActive) {
                popupActive.classList.remove('active');
            }
        }
        
        if(elem.closest('.js-close')){
            let popupActive = document.querySelector('.js-popup.active');
            if(popupActive.classList.contains('popup-more-reviews')) {
                let reviewPopupInfo = document.querySelector('.js-popup-reviews .js-reviews-container');
                reviewPopupInfo.remove();
            }
            popupActive.classList.remove('active');
            overlay.classList.remove('active');
            htmlOverflow.classList.remove('overflow');
        }
    });

    overlay.addEventListener('click', function(){
        let popupActive = document.querySelector('.js-popup.active');
        if(popupActive.classList.contains('popup-more-reviews')) {
            let reviewPopupInfo = document.querySelector('.js-popup-reviews .js-reviews-container');
            reviewPopupInfo.remove();
        }
        popupActive.classList.remove('active');
        overlay.classList.remove('active');
        htmlOverflow.classList.remove('overflow');
    });
    
    // Popup
    
    // More info
        
      function showMoreInfo() {
            
        let info = document.querySelectorAll('.js-item-more .js-item-more-text');
        let content = document.querySelectorAll('.js-item-more .js-item-more-container');
        let moreButton = document.querySelectorAll('.js-item-more .js-more-info');
        
        if(info) {
            for(var i = 0; info.length > i; i++) {
                if(info[i].offsetHeight > content[i].offsetHeight) {
                    moreButton[i].classList.add('show');
                }else {
                    moreButton[i].classList.remove('show');
                }
            }
        }
    }
        
    showMoreInfo();
    
    window.addEventListener('resize', function(){
        showMoreInfo();
    });
    
    document.addEventListener('click', function(event) {
        let elem = event.target;
        
        if(elem.closest('.js-more-info')) {
            let fullInfo = elem.closest('.js-reviews-container').cloneNode(true);
            let reviewPopupWrapper = document.querySelector('.js-popup-reviews');
            reviewPopupWrapper.append(fullInfo);
        }
    });
    
    // /More info
    
    // Slider one elem move
    
    // Main slider 
    
    document.addEventListener('click', function(e){
        let item = e.target;
        
        if(item.closest('.js-oneMove-arrow-prev')) {
            let activeElem = item.closest('.js-oneMove-wrapper').querySelector('.js-oneMove-item.show');
            let allItems = item.closest('.js-oneMove-wrapper').querySelectorAll('.js-oneMove-item');
            
            if(activeElem.previousElementSibling == null) {
                activeElem.classList.remove('show');
                allItems[allItems.length - 1].classList.add('show');
                return;
            }
            
            activeElem.previousElementSibling.classList.add('show');
            activeElem.classList.remove('show');
        }
        
        if(item.closest('.js-oneMove-arrow-next')) {
            let activeElem = item.closest('.js-oneMove-wrapper').querySelector('.js-oneMove-item.show');
            let allItems = item.closest('.js-oneMove-wrapper').querySelectorAll('.js-oneMove-item');
            
            if(activeElem.nextElementSibling == null) {
                activeElem.classList.remove('show');
                allItems[0].classList.add('show');
                return;
            }
            
            activeElem.nextElementSibling.classList.add('show');
            activeElem.classList.remove('show');
        }
    });
    
    // /Main slider
    
    // Cookie 
    
    // setTimeout(() => {
    //     document.querySelector('.js-cookie').classList.add('active');
    // },2500);
    
    // //Cookie
    
    // Show reviews photo
    
    document.addEventListener('click', function(e){
        let item = e.target;
        
        if(item.closest('.js-reviews-photo')) {
            let reviewsWrapper = document.querySelector('.js-popup-reviews-photo');
            let imgSrc = item.closest('.js-reviews-photo').getAttribute('style');
            reviewsWrapper.setAttribute('style', imgSrc);
        }
    });
    
    // Show reviews photo
    
    // Mask tel
    
    [].forEach.call( document.querySelectorAll('input[type="tel"]'), function(input) {
        var keyCode;
        function mask(event) {
            event.keyCode && (keyCode = event.keyCode);
            var pos = this.selectionStart;
            if (pos < 3) event.preventDefault();
            var matrix = "+38(___)-___-____",
                i = 0,
                def = matrix.replace(/\D/g, ""),
                val = this.value.replace(/\D/g, ""),
                new_value = matrix.replace(/[_\d]/g, function(a) {
                    return i < val.length ? val.charAt(i++) || def.charAt(i) : a
                });
            i = new_value.indexOf("_");
            if (i != -1) {
                i < 5 && (i = 3);
                new_value = new_value.slice(0, i)
            }
            var reg = matrix.substr(0, this.value.length).replace(/_+/g,
                function(a) {
                    return "\\d{1," + a.length + "}"
                }).replace(/[+()]/g, "\\$&");
            reg = new RegExp("^" + reg + "$");
            if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
            if (event.type == "blur" && this.value.length < 5)  this.value = ""
        }
    
        input.addEventListener("input", mask, false);
        input.addEventListener("focus", mask, false);
        input.addEventListener("blur", mask, false);
        input.addEventListener("keydown", mask, false)
    
    });
        
    // Mask tel
});