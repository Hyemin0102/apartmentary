# apartmentart
실제 존재하는 인테리어 회사의 웹사이트를 리디자인한 반응형 웹사이트입니다.

## 🔎프로젝트 소개
기본적인 웹사이트 형식에서 인테리어 디자인적인 부분을 조금 더 부각하고싶어 리디자인한 프로젝트입니다.

## ⏳개발 기간
2023.05.10 ~ 2023.05.26 (약 2주)

## ⚙개발 환경
Javascript, Swiper, GSAP

## 🚩주요 기능
* <메인> json데이터로 키워드별 포트폴리오 내용 가져오기
* <GET IN TOUCH> 상담 신청 내역 입력 시 로컬 스토리지에 내용 저장하고, 하단 상담신청 내역에 추가해 리스트 생성
* <PORTFOLIO> 인테리어 before/after 클릭 시 이미지 변경

## 📌코드 리뷰
fetch 이용하여 json데이타 가져와 활용
```javascript
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
```
## 😊프로젝트를 마치며
- json데이터를 이용해 동적으로 아이템을 생성했는데 처음에 fetch 대신 import를 사용하였다가 크로스 브라우징에서 문제가 생겨 fetch로 전환하여 사용하였습니다.
이 과정에서 json파일을 다루는 방법에 대해 공부가 많이 되었습니다.
- 디자인적으로 웹사이트를 코딩하는 것이 쉽지는 않았지만 굉장히 재밌었습니다.
- GSAP 을 이용해 애니메이션을 구현하였는데 data-aos 보다 세부적은 효과가 가능해 재밌었습니다.
