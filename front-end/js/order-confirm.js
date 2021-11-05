let getLocStor = JSON.parse(sessionStorage.getItem('contactAfterSendingOrder'));

let sectionConfirm = document.getElementById('sectionConfirm');

let thanks = document.createElement('h1');
thanks.innerHTML = `${getLocStor.firstName} ${getLocStor.lastName} <br> Nous vous remercions pour votre commande.<br> Voici le numéro de celle ci`;

let id = document.createElement('h2');
const getUrl = window.location.search;
const getOrderId = new URLSearchParams(getUrl);
console.log(getOrderId);

id.innerHTML = `${getOrderId}`

id.style = 'padding-bottom: 5rem;';

document.body.appendChild(thanks);
document.body.appendChild(id);
(sectionConfirm).appendChild(thanks);
(thanks).appendChild(id);
