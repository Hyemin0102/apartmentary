import products from "../../portfolio.json" assert {type:'json'}
console.log('원래',products); //json 배열로 전체값 가져옴(전체 4가지 키값의 밸류)

const creatItem = (key) =>{
    const portfolioWrap = document.querySelector('.portfolio_wrap');
    portfolioWrap.innerHTML = "";

    key.map((el)=>{
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


//클릭하는 변수 지정
let keywords = document.querySelectorAll('.keyword_wrap > li');
keywords.forEach((el)=>{
    el.addEventListener('click',(e)=>{
        if(e.target.classList.contains('active')){
            e.target.classList.remove('active');
        } else { //클라스가 없으면 클라스 추가
            keywords.forEach(el => el.classList.remove('active')); 
            
            e.target.classList.add('active');
            let targetId = e.target.id; 
            let targetArr = products[targetId]; //targetId의 배열값

            creatItem(targetArr);
            
        }

    })
});

