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
