// Création de la variable contenant les données du formulaire
const getProfil = JSON.parse(sessionStorage.getItem('contactAfterSendingOrder'))

// Création de la variable contenant les données de la commande
const sectionConfirm = document.getElementById('sectionConfirm')
const thanks = document.createElement('h1')
const img = document.createElement('div')
img.style.padding = '5rem'

thanks.innerHTML = `${getProfil.firstName} ${getProfil.lastName} <br> <br> Nous vous remercions pour votre commande :`
img.innerHTML = `<img src="${getProfil.img}" alt="${getProfil.name}">`

// Récuperation de l'orderId de la commande
const getUrl = window.location.search
const getOrderId = new URLSearchParams(getUrl)
const orderId = getOrderId.get('orderId')

// Création de la variable contenant L'orderId de la commande
const id = document.createElement('h2')
id.innerHTML = `${orderId}`
id.style = 'padding-bottom: 5rem;'

//Implémenttatin des information de la commande
sectionConfirm.appendChild(thanks)
thanks.appendChild(id)
id.appendChild(img)
