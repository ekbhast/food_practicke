'use strict';

window.addEventListener('DOMContentLoaded', () => {

// Tabs

    let tabs = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items'),
        tabsHeaderItem = document.querySelectorAll('.tabheader__item');

    function hideTabs() {
        tabs.forEach((item, i) =>{
            tabs[i].classList.add('hide');
            tabs[i].classList.remove('show', 'fade');            
            tabsHeaderItem[i].classList.remove('tabheader__item_active');
        });
    }

    function showTabs(i = 0) {
        tabs[i].classList.remove('hide');
        tabs[i].classList.add('show', 'fade');
        tabsHeaderItem[i].classList.add('tabheader__item_active');
    }

    tabsParent.addEventListener('click', (event) =>{
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            // console.log(target);
            tabs.forEach((item, i) => {
                if (tabsHeaderItem[i] == target) {
                    hideTabs();
                    showTabs(i);
                }
            })
        }
    });

    hideTabs ();
    showTabs();

    // Timer 

    const deadLine = '2024-06-25';

    function getRemainingTime(endtime) {
        const   t = Date.parse(endtime) - new Date(),
                days = Math.floor( (t / (1000 * 60 * 60 * 24))),
                hours = Math.floor( (t / (1000 * 60 * 60) % 24) ),
                minutes =  Math.floor( (t / (1000 * 60) % 60)),
                seconds =  Math.floor( (t / 1000) % 60); 
        
        return {
                'totпшеal' : t,
                'days' : days,
                'hours' : hours,
                'minutes' : minutes,
                'seconds' : seconds
        }
    }

    
    function getZero(num){
        if (num >= 0 && num < 10) { 
            return '0' + num;
        } else {
            return num;
        }
    }

    function setTimer (selector, endtime){
        const   timer = document.querySelector (selector),
                days = timer.querySelector('#days'),
                hours = timer.querySelector('#hours'),
                minutes = timer.querySelector('#minutes'),
                seconds = timer.querySelector('#seconds'),
                timeInterval = setInterval(updateTimer, 1000);
        
        updateTimer();

        function  updateTimer() {
                const t = getRemainingTime(endtime);
                days.innerHTML = getZero(t.days);
                hours.innerHTML = getZero(t.hours);
                minutes.innerHTML = getZero(t.minutes);
                seconds.innerHTML = getZero(t.seconds);

                if (t.total <= 0) {
                    clearInterval(timeInterval);
            }
        }

    }

    setTimer('.timer', deadLine);

    // Modal

    const   showModalBtns = document.querySelectorAll('[data-modal]'),
            closeModalBtn = document.querySelector('[data-close]'),
            modal = document.querySelector('.modal'),
            modalTimerId = setTimeout(showModal, 3000);

    function showModal (){
        modal.classList.toggle('show');
        document.body.style.overflow = 'hidden';
        clearTimeout(modalTimerId);
        window.removeEventListener('scroll', showModalScrollEnd);
    }
    
    function closeModal (){
        modal.classList.toggle('show');
        document.body.style.overflow = '';

    }

    function showModalScrollEnd (){
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            showModal();
            window.removeEventListener('scroll', showModalScrollEnd);
        }
    }

    showModalBtns.forEach((element) => {
        element.addEventListener('click', showModal);
    })
    
    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    })

    document.addEventListener('keydown', (e) =>{
        if (e.code ==='Escape' && modal.classList.contains('show')){
            closeModal();
        }
    })

    window.addEventListener('scroll',showModalScrollEnd);


    //class for cards

    class MenuCard {
        constructor (imgSrc, alt, subtitle, descr, price, parent, ...classes) {
            this.imgSrc = imgSrc;
            this.alt = alt;
            this.subtitle = subtitle;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parent);
        }

        render () {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                element.classList.add('menu__item');
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            element.innerHTML = `            
                <img src=${this.imgSrc} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.subtitle}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;

        this.parent.append(element);
        }
    }

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        ".menu .container",
        'menu__item',
        'black'
    ).render()

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        14,
        ".menu .container"
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        21,
        ".menu .container"
    ).render();


    
});


