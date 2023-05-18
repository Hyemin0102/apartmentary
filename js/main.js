import products from "../portfolio.json" assert {type:'json'}
console.log('원래',products); //json 배열로 전체값 가져옴(전체 4가지 키값의 밸류)


const creatItem = (targetArr) =>{
    const portfolioWrap = document.querySelector('.portfolio_wrap');
    portfolioWrap.innerHTML = ""; //함수 실행 시 일단 innerHTML 넣어준 값 초기화

    targetArr.map((el)=>{
        const portfolios = document.createElement('div');
        portfolios.innerHTML = `
                    <div class="portfolio_img active">
                        <img src=${el.img} alt="">
                    </div>
                    <div class="portfolio_txt">
                        <p class="portfolio_txt_name">${el.name}</p>
                        <p class="portfolio_txt_info">${el.info}</p>
                    </div>
                    `
    portfolioWrap.append(portfolios);
    })

}

let activeKey = document.querySelector('.active');



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
    slidesPerView : 3, // 동시에 보여줄 슬라이드 갯수
	spaceBetween : 20, // 슬라이드간 간격
	slidesPerGroup : 3, // 그룹으로 묶을 수, slidesPerView 와 같은 값을 지정하는게 좋음
	loopFillGroupWithBlank : true,// 그룹수가 맞지 않을 경우 빈칸으로 메우기
    scrollbar: {
        el: ".swiper-scrollbar",
        hide: false,
    },
  });

