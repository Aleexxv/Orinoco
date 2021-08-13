let getLocStor = JSON.parse(localStorage.getItem("contactAfterSendingOrder"));

let sectionConfirm = document.getElementById('sectionConfirm');
let thanks = document.createElement('div');
let id = document.createElement('div');
id.innerHTML= localStorage.getItem("dataId");
thanks.innerHTML = `Merci Mme, Mr ${getLocStor.lastName}, ${getLocStor.firstName} pour votre commande.<br> Voici le numéro de commande qui vous sera utile pour toute réclamation au prêt de notre service clients.`;






console.log(getLocStor.firstName);

document.body.appendChild(thanks);
document.body.appendChild(id);
(sectionConfirm).appendChild(thanks);
(thanks).appendChild(id);
