<img width="80%" src="https://github.com/Hyemin0102/apartmentary/assets/128768462/61fccd42-fdc8-45d0-a1f0-703151300c56"/>

# apartmentart
실제 존재하는 인테리어 회사의 웹사이트를 리디자인한 반응형 웹사이트입니다.

## 🔎프로젝트 소개
https://hyemin0102.github.io/apartmentary/

기본적인 웹사이트 형식에서 인테리어 디자인적인 부분을 조금 더 부각하고싶어 리디자인한 프로젝트입니다.

<br>

## ⏳개발 기간
2023.05.10 ~ 2023.05.26 (약 2주)

<br>

## ⚙개발 환경
Javascript, Swiper, GSAP

<br>

## 🚩주요 기능
- [메인페이지] fetch 이용하여 json데이타 가져와 활용
- [메인페이지] GSAP 애니메이션 구현
- [Get In Touch] 상담신청 local storage 저장
- [Portfolio] before/after 다른 이미지 구현

<br>

## 📌코드 리뷰
### 💻메인 페이지
- <b>fetch 이용하여 json데이타 가져와 활용</b>

portfolio를 컨셉별로 저장해놓은 json파일을 fetch 시켜 아이템 클릭 시 해당 키의 배열만 받아와 동적으로 포트폴리오 항목을 생성하고 이를 swiper로 적용시켜 슬라이드로 만들어준다.

keyworwd클릭 시 creatItem 함수가 발생하는데 이 때 함수의 인자로 targetArr(products[targetId]) 즉, JSON데이터 중 해당 keyword 배열만 골라 넘겨준다. 그럼 해당 배열에 해당하는 데이터만 화면에 동적으로 생성되는 것이다!
```javascript
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
            console.log(e.target)
        //클릭하면 전체 class 일단 삭제하고 클릭한거에만 클라스 추가
        keywords.forEach((el) => el.classList.remove("active"));
        e.target.classList.add("active");
    
        let targetId = e.target.id;
        let targetArr = products[targetId]; //targetId의 배열값
        console.log(targetArr)
    
        creatItem(targetArr);
        swiper2.appendSlide(portfolios);
        swiper2.update();
        });
    });
```
- <b>GSAP 애니메이션 구현</b>

애니메이션을 적용할 DOM 요소를 변수에 할당하고 triggerFuc함수에 애니메이션 요소와 스크롤 트리거를 인수로 받는다. 스크롤 트리거란 요소의 트리거가 될 요소! 즉 트리거를 설정하면 해당 지점에서 애니메이션을 구현할 수 있다. 트리거를 지정할 때 트리거에 어느 위치에서 시작할 지와 애니메이션 동작 설정도 할 수 있다.
        
```javascript
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
```
<br>

### 💻Get In Touch
- <b>상담신청 local storage 저장</b>

form submit 시 localItem()함수를 호출하는데, localItem() 함수는 입력한 내용을 local storage에 저장하고 리스트를 동적으로 생성한다. 이렇게 저장된 데이터는 getItem 메소드로 가져와 javascript 객체로 변환시키고 contactListItem 에 저장한다. 그리고 localItem()함수 실행 시 입력한 내용을 contactListItem 에 추가시키고 save() 함수를 호출해 변경된 배열을 다시 local storage에 저장하고, 리스트를 업데이트 하는 것이다.
```javascript
const form = document.getElementById('form');
const contactListWrap = document.querySelector('.createList_fuc');

if(form){
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
```
## 😊프로젝트를 마치며
- json데이터를 이용해 동적으로 아이템을 생성했는데 처음에 fetch 대신 import를 사용하였다가 크로스 브라우징에서 문제가 생겨 fetch로 전환하여 사용하였습니다.
이 과정에서 json파일을 다루는 방법에 대해 공부가 많이 되었습니다.
- 디자인적으로 웹사이트를 코딩하는 것이 쉽지는 않았지만 굉장히 재밌었습니다.
- GSAP 을 이용해 애니메이션을 구현하였는데 data-aos 보다 세부적은 효과가 가능해 재밌었습니다.


