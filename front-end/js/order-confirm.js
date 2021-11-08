let getProfil = JSON.parse(sessionStorage.getItem('contactAfterSendingOrder'));
let getProduct = JSON.parse(localStorage.getItem('validProduct'));

let sectionConfirm = document.getElementById('sectionConfirm');
let thanks = document.createElement('h1');
thanks.innerHTML = `${getProfil.firstName} ${getProfil.lastName} <br> <br> Nous vous remercions pour votre commande :`;

const getUrl = window.location.search;
const getOrderId = new URLSearchParams(getUrl);
const orderId = getOrderId.get('orderId');

let id = document.createElement('h2');
id.innerHTML = `${orderId}`
id.style = 'padding-bottom: 5rem;';

sectionConfirm.appendChild(thanks);
thanks.appendChild(id);

for(let i = 0; i < getProduct.length; i++){
    let divProductPaid = document.createElement('div');
    let imgProductPaid = document.createElement('img');

    divProductPaid.style.display = 'flex';
    divProductPaid.style.justifyContent = 'center';
    imgProductPaid.src = `${getProduct[i].img}`;
    imgProductPaid.style.width = '50%';
    imgProductPaid.style.marginBottom = '2rem';


    sectionConfirm.appendChild(divProductPaid);
    divProductPaid.appendChild(imgProductPaid);

}