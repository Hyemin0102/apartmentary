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