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

//portfolio detail before/after Btn
const changeBtnBefore = document.querySelector(".change_before_txt");
const changeBtnAfter = document.querySelector(".change_after_txt");
const changeBtnOn = document.querySelector(".change_btn_on");

changeBtnBefore.addEventListener("click", () => {
  changeBtnOn.style.right = "auto";
  changeBtnOn.style.left = "0";
  document.getElementById("changeimg").src =
    "./img/portfolio_detail_before.jpg";
});

changeBtnAfter.addEventListener("click", () => {
  changeBtnOn.style.right = "0";
  changeBtnOn.style.left = "auto";
  document.getElementById("changeimg").src = "./img/portfolio_detail_after.jpg";
});
