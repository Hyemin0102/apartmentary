//헤더
const headerMenu = document.querySelectorAll('header.pc .inner .menu li')

headerMenu.forEach((el)=>{
    el.addEventListener('mouseover',()=>{
        el.classList.add('on');
    });
    el.addEventListener('mouseout',()=>{
        el.classList.remove('on');
    })
})

window.addEventListener('scroll',()=>{
    if(window.scrollY > 40){
        header_mo.style.backgroundColor = "rgb(245, 245, 245)"
    } else { header_mo.style.backgroundColor = "transparent"}
})

//Swiper 
let swiper = new Swiper(".review_right", {
    slidesPerView : 2, // 동시에 보여줄 슬라이드 갯수
	spaceBetween : 20, // 슬라이드간 간격
	slidesPerGroup : 3, // 그룹으로 묶을 수, slidesPerView 와 같은 값을 지정하는게 좋음
	loopFillGroupWithBlank : true,// 그룹수가 맞지 않을 경우 빈칸으로 메우기
    scrollbar: {
        el: ".swiper-scrollbar",
        hide: false,
    },
    breakpoints: {
        1200: {
        slidesPerView: 3,  //브라우저가 768보다 클 때
        spaceBetween: 20,
        },
    }
});


    let swiper2 = new Swiper(".portfolio_wrap", {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 20,
        pagination: {
            el: ".swiper-pagination",
            type: "progressbar",
        },
        breakpoints: {
            768: {
            slidesPerView: 3,  //브라우저가 768보다 클 때
            spaceBetween: 20,
            },
        }
    });



//GSAP
gsap.registerPlugin(ScrollTrigger);
if (typeof gsap !== 'undefined'){
let contactAnimate = document.querySelectorAll('.contact_trigger');
gsap.fromTo(contactAnimate,{opacity: 0, y: 100},{duration:1, opacity:1, y:0,stagger:0.5});
}

let animatedElements = document.querySelectorAll('.txt_main, .txt_sub_1, .txt_sub_2');
gsap.fromTo(animatedElements, { opacity: 0, y: 100 }, { duration: 1, opacity: 1, y: 0, stagger: 0.5 });

//scrolltrigger 만들기
const sect02TxtTop = document.querySelector('.sect_2_txt_top');
const sect02TxtBottom = document.querySelector('.sect_2_txt_bottom');
const sect03TxtTop = document.querySelector('.sect_3_txt_top');
const sect03TxtBottom = document.querySelector('.sect_3_txt_bottom');


function triggerFuc(el,triggerValue){
    gsap.fromTo(
        el,
        {opacity:0, y:100}, 
        {opacity:1, y:0,duration:1,
        scrollTrigger:{
            trigger: triggerValue,
            start:"top center",
            toggleActions: "play pause none reset"
        }
        }
    );
}

triggerFuc(sect02TxtTop,'.sect_2_txt');
triggerFuc(sect02TxtBottom, '.sect_2_txt_wrap');

triggerFuc(sect03TxtTop, '.sect_3_txt');
triggerFuc(sect03TxtBottom, '.sect_3_txt_wrap');


//모바일 메뉴 오픈
    const header_mo = document.querySelector('header.mobile');
    const menuBtn = document.querySelectorAll('.gnb_btn');
    

    menuBtn.forEach((el)=>{
        el.addEventListener('click',()=>{
            header_mo.classList.toggle('active');
            //console.log('클릭')
        })
    })


    let products;

    fetch("./portfolio.json")
        .then((response) => response.json())
        .then((data) => {
        products = data;
        //console.log(products)
        })
        .catch((error) => console.log("Error", error));
    
    let portfolios;
    
    const creatItem = (targetArr) => {
        const portfolioWrap = document.querySelector(".portfolio_slide_wrap");
        portfolioWrap.innerHTML = ""; //함수 실행 시 일단 innerHTML 넣어준 값 초기화
    
        targetArr.map((el) => {
        portfolios = document.createElement("div");
        portfolios.classList.add("swiper-slide");
        portfolios.innerHTML = `
                        <a href="./portfolio.html">
                            <div class="portfolio_img active">
                                <img src=${el.img} alt="">
                            </div>
                            <div class="portfolio_txt">
                                <p class="portfolio_txt_name">${el.name}</p>
                                <p class="portfolio_txt_info">${el.info}</p>
                            </div>
                        </a>
                        `;
        portfolioWrap.append(portfolios);
        });
    };
    
    //클릭하는 변수 지정
    let keywords = document.querySelectorAll(".keyword_wrap > li");
    keywords.forEach((el) => {
        el.addEventListener("click", (e) => {
        //클릭하면 전체 class 일단 삭제하고 클릭한거에만 클라스 추가
        keywords.forEach((el) => el.classList.remove("active"));
        e.target.classList.add("active");
    
        let targetId = e.target.id;
        let targetArr = products[targetId]; //targetId의 배열값
    
        creatItem(targetArr);
        swiper2.appendSlide(portfolios);
        swiper2.update();
        });
    });


    //const body = document.querySelector('body'); 
    /*if(header_mo.classList.contains('active')){
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = 'auto';
            }
    */












