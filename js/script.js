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

    const deadLine = '2024-05-25';

    function getRemainingTime(endtime) {
        const   t = Date.parse(endtime) - new Date(),
                days = Math.floor( (t / (1000 * 60 * 60 * 24))),
                hours = Math.floor( (t / (1000 * 60 * 60) % 24) ),
                minutes =  Math.floor( (t / (1000 * 60) % 60)),
                seconds =  Math.floor( (t / 1000) % 60); 
        
        return {
                'total' : t,
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

});
