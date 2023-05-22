import products from "../portfolio.json" assert {type:'json'}
//console.log('원래',products); //json 배열로 전체값 가져옴(전체 4가지 키값의 밸류)


const creatItem = (targetArr) =>{
    const portfolioWrap = document.querySelector('.portfolio_wrap');
    portfolioWrap.innerHTML = ""; //함수 실행 시 일단 innerHTML 넣어준 값 초기화

    targetArr.map((el)=>{
        const portfolios = document.createElement('div');
        portfolios.innerHTML = `
                    <a href="#">
                        <div class="portfolio_img active">
                            <img src=${el.img} alt="">
                        </div>
                        <div class="portfolio_txt">
                            <p class="portfolio_txt_name">${el.name}</p>
                            <p class="portfolio_txt_info">${el.info}</p>
                        </div>
                    </a>
                    `
    portfolioWrap.append(portfolios);
    })

}


//클릭하는 변수 지정
let keywords = document.querySelectorAll('.keyword_wrap > li');
keywords.forEach((el)=>{
    el.addEventListener('click',(e)=>{ //클릭하면 전체 class 일단 삭제하고 클릭한거에만 클라스 추가
            keywords.forEach(el => el.classList.remove('active')); 
            e.target.classList.add('active');

            let targetId = e.target.id; 
            let targetArr = products[targetId]; //targetId의 배열값

            creatItem(targetArr);
    })
});


const swiper = new Swiper(".review_right", {
    slidesPerView : 2, // 동시에 보여줄 슬라이드 갯수
	spaceBetween : 20, // 슬라이드간 간격
	slidesPerGroup : 3, // 그룹으로 묶을 수, slidesPerView 와 같은 값을 지정하는게 좋음
	loopFillGroupWithBlank : true,// 그룹수가 맞지 않을 경우 빈칸으로 메우기
    scrollbar: {
        el: ".swiper-scrollbar",
        hide: false,
    },
    breakpoints: {
        // 화면의 넓이가 767px 이상일 때
        1200: {
          slidesPerView: 3,
          spaceBetween: 20
        },
        }
    });

/*     let animatedElements = document.querySelectorAll('.txt_main, .txt_sub_1, .txt_sub_2');
    gsap.fromTo(animatedElements, { opacity: 0, y: 100 }, { duration: 1, opacity: 1, y: 0, stagger: 0.5 });
    
    function animateElements(animateElements, onCompleteFn) {
        gsap.to(animateElements[0], { duration: 1, opacity: 1, y: 0, repeat: 0, onComplete: onCompleteFn });
    }
    
    function createScrollTrigger(triggerClass, animationElements, onCompleteFn) {
        ScrollTrigger.create({
            trigger: triggerClass,
            start: "top center",
            end: "bottom center",
            onEnter: function() {animateElements(animationElements, onCompleteFn);},
            onEnterBack: function() {animateElements(animationElements, onCompleteFn);
            }
        });
    }
    
    let sect02_animatedElements = document.querySelectorAll('.animation2');
    createScrollTrigger('.animation2scroll', sect02_animatedElements, function() {
        gsap.to(sect02_animatedElements[1], { duration: 1, opacity: 1, y: 0 });
    });
    
    let sect03_animatedElements = document.querySelectorAll('.animation3');
    createScrollTrigger('.animation3scroll', sect03_animatedElements, function() {
        gsap.to(sect03_animatedElements[1], { duration: 1, opacity: 1, y: 0 });
    }); */

    //모바일 메뉴 오픈
    const header_mo = document.querySelector('header.mobile');
    console.log('클릭')
    const menuBtn = document.querySelectorAll('.gnb_btn');
    

    menuBtn.forEach((el)=>{
        el.addEventListener('click',()=>{
            header_mo.classList.toggle('active');
            console.log('클릭')
        })
    })

    window.addEventListener('scroll',()=>{
        if(window.scrollY > 40){
            header_mo.style.backgroundColor = "rgb(245, 245, 245)"
        } else { header_mo.style.backgroundColor = "transparent"}
    }) 

/*     window.addEventListener('scroll',()=>{
        if(window.scrollY > 40){
            header_mo.style.backgroundColor = "rgb(245, 245, 245)"
        } else { header_mo.style.backgroundColor = "transparent"}
    }) 
    //const body = document.querySelector('body'); 
    if(header_mo.classList.contains('active')){
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = 'auto';
            }
    
    
    
    */




