document.addEventListener("DOMContentLoaded", function(){
    var dropList = document.querySelectorAll('.js-drop-item');

    document.addEventListener('click', function(e){
        let element = e.target;
        
        if(element.closest('.js-drop-button')){
            let isActive = element.closest('.js-drop-item').classList.contains('active')? true: false;
            
            dropList.forEach(item => {item.classList.remove('active')});
            
            if(isActive)
                element.closest('.js-drop-item').classList.remove('active');
            else
                element.closest('.js-drop-item').classList.add('active');
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
    
    document.querySelector('body').addEventListener('click', function(event){
        
        let dropItem = event.target.closest('.js-drop-item');
        
        if(!dropItem) {
            document.querySelectorAll('.js-drop-item').forEach(function(item){
                item.classList.remove('active');
            }); 
        }
        if(dropItem) {
            if(!dropItem.classList.contains("active")) {
                document.querySelectorAll('.js-drop-item').forEach(function(item){
                    item.classList.remove('active');
                });
            }
        }
        
    });
    
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
});