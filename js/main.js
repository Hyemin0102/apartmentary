let products;

fetch('./portfolio.json')
    .then(response => response.json())
    .then(data =>{ 
        products = data;
        //console.log(products)
    }
        )
    .catch(error=>console.log('Error',error));


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


//헤더 mouseover 이벤트
const headerMenu = document.querySelectorAll('header.pc .inner .menu li')

headerMenu.forEach((el)=>{
    el.addEventListener('mouseover',()=>{
        el.classList.add('on');
    });
    el.addEventListener('mouseout',()=>{
        el.classList.remove('on');
    })
})


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
        // 화면의 넓이가 1200px 이상일 때
        1200: {
        slidesPerView: 3,
        spaceBetween: 20
        },
        }
    });


    let animatedElements = document.querySelectorAll('.txt_main, .txt_sub_1, .txt_sub_2');

    if (typeof gsap !== 'undefined'){
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
        });
    }

    //모바일 메뉴 오픈
    const header_mo = document.querySelector('header.mobile');
    const menuBtn = document.querySelectorAll('.gnb_btn');
    

    menuBtn.forEach((el)=>{
        el.addEventListener('click',()=>{
            header_mo.classList.toggle('active');
            //console.log('클릭')
        })
    })


    window.addEventListener('scroll',()=>{
        if(window.scrollY > 40){
            header_mo.style.backgroundColor = "rgb(245, 245, 245)"
        } else { header_mo.style.backgroundColor = "transparent"}
    })


    //const body = document.querySelector('body'); 
    /*if(header_mo.classList.contains('active')){
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = 'auto';
            }
    */

//컨택 지점 선택


    const storeBtn = document.querySelector('.contactStore_btn');
    const storeList = document.querySelector('.contactStore_list');
    const sendBtn = document.getElementById('send');

    if(storeBtn){
        storeBtn.addEventListener('click',()=>{
        storeList.classList.add('active');
        })
        storeList.addEventListener('click',()=>{
                storeList.classList.remove('active');
        })

    //지점 클릭했을때 해당 html 내용 string으로 가져오기
    const storeName = document.querySelectorAll('.contactStore_list > li');
    const storeInput = document.getElementById('store');

    storeName.forEach((el)=>{
        el.addEventListener('click',()=>{
        let storeNameTxt =  el.textContent;
        storeInput.value = storeNameTxt;
        storeInput.style.backgroundColor = "#E8F0FE";
        })
    })
    }

//sendBtn.addEventListener('click',()=>alert('상담신청이 정상적으로 접수되었습니다.'))

//문의글 li 추가
const form = document.querySelector('form');
const contactListWrap = document.querySelector('.contact_list_wrap');

let num = 0; //1씩 증가하는 함수
const increase =()=>{num +=1;}

if(form){
    form.addEventListener('submit',(e)=>{
        e.preventDefault();
        increase();

        //input의 value 구해오기
        let username = document.getElementById('username').value;
        let usermessage = document.getElementById('message').value;
        
        //li생성 함수
        const createContact = document.createElement('li');
        createContact.classList.add('contact_list_item');
        //오늘 날짜 생성
        let today = new Date();
        let year = today.getFullYear();
        let month = String(today.getMonth()+1).padStart(2,'0');
        let day =  String(today.getDate()).padStart(2,'0');

        createContact.innerHTML = `
        <ul class="contact_list_item_inner">
            <li id="contact_num">${num}</li>
            <li id="contact_message">${usermessage}</li>
            <li id="contact_name">${username}</li>
            <li id="contact_date">${year}-${month}-${day}</li>
        </ul>
        `
        contactListWrap.append(createContact);
        form.reset();
    })
}












