// Création de la variable contenant les données du formulaire
const getProfil = JSON.parse(sessionStorage.getItem('contactAfterSendingOrder'))

// Création de la variable contenant les données du panier 
const getProduct = JSON.parse(sessionStorage.getItem('contactAfterSendingOrder'))

// Création de la variable contenant les données de la commande
const sectionConfirm = document.getElementById('sectionConfirm')
const thanks = document.createElement('h1')
thanks.innerHTML = `${getProfil.firstName} ${getProfil.lastName} <br> <br> Nous vous remercions pour votre commande :`

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

// Boucle pour afficher les images des produits commandés
for (let i = 0; i < getProduct.length; i++) {
    const divProductPaid = document.createElement('div')
    const imgProductPaid = document.createElement('img')

    divProductPaid.style.display = 'flex'
    divProductPaid.style.justifyContent = 'center'
    imgProductPaid.src = `${getProduct[i].img}`
    imgProductPaid.style.width = '50%'
    imgProductPaid.style.marginBottom = '2rem'

    sectionConfirm.appendChild(divProductPaid)
    divProductPaid.appendChild(imgProductPaid)
}
