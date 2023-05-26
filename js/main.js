let products;

fetch('./portfolio.json')
    .then(response => response.json())
    .then(data =>{ 
        products = data;
        //console.log(products)
    }
        )
    .catch(error=>console.log('Error',error));

let portfolios;

const creatItem = (targetArr) =>{
    const portfolioWrap = document.querySelector('.portfolio_slide_wrap');
    portfolioWrap.innerHTML = ""; //함수 실행 시 일단 innerHTML 넣어준 값 초기화

    targetArr.map((el)=>{
        portfolios = document.createElement('div');
        portfolios.classList.add('swiper-slide');
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
                    `
    portfolioWrap.append(portfolios);
    })

}


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


    
 //클릭하는 변수 지정
let keywords = document.querySelectorAll('.keyword_wrap > li');
keywords.forEach((el)=>{
    el.addEventListener('click',(e)=>{ //클릭하면 전체 class 일단 삭제하고 클릭한거에만 클라스 추가
            keywords.forEach(el => el.classList.remove('active')); 
            e.target.classList.add('active');

            let targetId = e.target.id; 
            let targetArr = products[targetId]; //targetId의 배열값

            creatItem(targetArr);
            swiper2.appendSlide(portfolios);
            swiper2.update();
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



/*** GSAP ***/
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




//문의글 li 추가
const form = document.getElementById('form');
const contactListWrap = document.querySelector('.createList_fuc');

if(form){
//로컬 스토리지에서 문자열 가져와서 객체로 변환
//contactListItem에서 로컬스토리지 저장 값 가져와서 변수에 할당
//할당값이 없으면 null이 안뜨도록 배열 초기화 해주고, null이 아닌 경우 값 할당


/* let aa = localStorage.getItem('contact');
if(aa){
    JSON.parse(aa);
} else {
    aa=[];
} */

const username = document.getElementById('username');
const usermessage = document.getElementById('message');

let contactListItem = JSON.parse(localStorage.getItem('contact')) || [];
//console.log('dd',contactListItem)

//문자열로 변경한것을 로컬스토리지에 저장
const save =()=>{
    //console.log('save');
    localStorage.setItem('contact',JSON.stringify(contactListItem));
}

//로컬스토리지 저장하고 list 만들어주는 함수
const localItem = ()=>{
    const contactObj = {
        user: username.value,
        msg:usermessage.value
    };

    contactListItem.push(contactObj);
    //console.log('dd222',contact)

    save(); //로컬스토리지 저장
    createList(); //로컬스토리지 값 가져와서 li 생성
    form.reset();
    alert('상담신청이 정상적으로 접수되었습니다. 아래 신청 내역에서 접수 내역을 확인해 주시기 바랍니다.')
}

form.addEventListener('submit',(e)=>{
    e.preventDefault(e);
    localItem();
})

let num = 0; //1씩 증가하는 함수


//로컬스토리지에 저장된값 가져와서 List 생성
const createList = ()=>{
    contactListWrap.innerHTML = ''; // 기존의 요소들을 모두 삭제, 안하면 중복으로 li생성됨

    contactListItem.forEach((el, index)=>{
        const createContact = document.createElement('div');
        createContact.classList.add('contact_list_item');

        //오늘 날짜 생성
        let today = new Date();
        let year = today.getFullYear();
        let month = String(today.getMonth()+1).padStart(2,'0');
        let day =  String(today.getDate()).padStart(2,'0');
        
        createContact.innerHTML = `
        <ul class="contact_list_item_inner">
            <li id="contact_num">${num+index+1}</li>
            <li id="contact_message">${el.msg}</li>
            <li id="contact_name">${el.user}</li>
            <li id="contact_date">${year}-${month}-${day}</li>
        </ul>
        `
        contactListWrap.append(createContact);
        
    })
}
createList();
}


//portfolio detail before/after Btn
const changeBtnBefore = document.querySelector('.change_before_txt');
const changeBtnAfter = document.querySelector('.change_after_txt');
const changeBtnOn = document.querySelector('.change_btn_on');


    changeBtnBefore.addEventListener('click',()=>{
        changeBtnOn.style.right = 'auto'; 
        changeBtnOn.style.left = '0';
        document.getElementById('changeimg').src = "./img/portfolio_detail_before.jpg"
    });

    changeBtnAfter.addEventListener('click',()=>{
        changeBtnOn.style.right = '0'; 
        changeBtnOn.style.left = 'auto';
        document.getElementById('changeimg').src = "./img/portfolio_detail_after.jpg"
    });










