let getLocStor = JSON.parse(localStorage.getItem("contactAfterSendingOrder"));

let sectionConfirm = document.getElementById('sectionConfirm');
let thanks = document.createElement('div');
let id = document.createElement('h2');
id.innerHTML= localStorage.getItem("dataId");
thanks.innerHTML = `${getLocStor.firstName} ${getLocStor.lastName} <br> Nous vous remercierons pour votre commande.<br> Voici le numéro de celle ci, il vous sera utile pour toute réclamation au prêt de notre service clients.`;






console.log(getLocStor.firstName);

document.body.appendChild(thanks);
document.body.appendChild(id);
(sectionConfirm).appendChild(thanks);
(thanks).appendChild(id);
