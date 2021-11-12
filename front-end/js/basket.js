// Création de la variable contenant les données du panier
const selectProduct = JSON.parse(localStorage.getItem('validProduct'))

// Création de la variable "total"
let total = 0

// SI le panier est vide 
if (selectProduct == null) {
    const vaccumBasket = document.getElementById('totalOrder')
    vaccumBasket.innerHTML = 'Le panier est vide'
    vaccumBasket.style.fontSize = '2rem'
}

// Boucle pour afficher les produits dans le panier
for (let i = 0; i < selectProduct.length; i++) {

    // Céation des élélments HTML qui vont recevoir les articles
    const product = document.getElementById('product')
    const divContent = document.createElement('div')
    divContent.className = 'basketArticle'

    // Création du documentFrangment pour insérer les éléments HTML
    const returnProduct = document.createDocumentFragment()

    //Creation des élément qui vont contenir les données du produit
    const img = document.createElement('img')
    const articleName = document.createElement('h2')
    const price = document.createElement('h3')
    const lense = document.createElement('p')

    const msgQuantityMax = document.createElement('p')
    msgQuantityMax.innerHTML = '5 articles max'
    msgQuantityMax.style.paddingLeft = '1rem'

    const divQuantity = document.createElement('div')
    divQuantity.className = 'divQuantity'
    divQuantity.style.alignItems = 'center'
    divQuantity.style.display = 'flex'
    divQuantity.style.justifyContent = 'space-between'

    const divQuantitybModify = document.createElement('div')
    divQuantitybModify.style.alignItems = 'center'
    divQuantitybModify.style.display = 'flex'

    let quantity = document.createElement('input')
    quantity.value = selectProduct[i].quantity
    quantity.style.width = '1rem'
    quantity.style.padding = '.5rem'

        // Création de l'écouteur d'évenement pour la modification de la quantité
        quantity.addEventListener('change', function () {
            quantity = this.value
            selectProduct[i].quantity = quantity
        })

    const modifQuantityBtn = document.createElement('button')
    modifQuantityBtn.innerHTML = 'Modifier'
    modifQuantityBtn.className = 'primary__btn'

        // Création de l'écouteur d'évenement pour la validation de la quantité
        modifQuantityBtn.addEventListener('click', function () {
            localStorage.setItem('validProduct', JSON.stringify(selectProduct))
            window.location.reload()
        })

    const removeProduct = document.createElement('button')

        // Création de l'écouteur d'évenement pour la suppression d'un article
        removeProduct.addEventListener('click', function () {
            let articleSupp = selectProduct
            articleSupp.splice(i, 1)
            localStorage.setItem('validProduct', JSON.stringify(articleSupp))
            document.location.reload()
        })
    

    // Implémenttation des élééments contenu dans les éléments créer au dessus 
    img.src = selectProduct[i].img
    const urlToArticles = 'products.html?id='
    articleName.innerHTML = `<a href='${urlToArticles}${selectProduct[i].id}'>${selectProduct[i].name}</a>`
    price.innerHTML = `${
        (selectProduct[i].price / 100) * selectProduct[i].quantity
    } €`
    lense.innerHTML = `Vous avez séléctionnez la lentille : ${selectProduct[i].lense}`
    removeProduct.innerHTML = `<i class='fas fa-trash-alt'></i>`
    removeProduct.className = 'trashOne'

    // Ajout des éléments créer au documentFragment
    returnProduct.appendChild(divContent)
    divContent.appendChild(img)
    divContent.appendChild(articleName)
    divContent.appendChild(lense)
    divContent.appendChild(divQuantity)
    divQuantity.appendChild(divQuantitybModify)
    divQuantitybModify.appendChild(quantity)
    divQuantitybModify.appendChild(msgQuantityMax)
    divQuantity.appendChild(modifQuantityBtn)
    divContent.appendChild(price)
    divContent.appendChild(removeProduct)
    product.appendChild(returnProduct)

    // Calcul du prix total 
    total += (selectProduct[i].price / 100) * selectProduct[i].quantity

    // Création du message panier vide
    if (selectProduct == null && articleSupp == []) {
        ;(vaccumBasket = document.createElement('h2')),
            (vaccumBasket.style = 'display: inline-block;')
        document.body.appendChild(vaccumBasket)
        price.appendChild(vaccumBasket)
        vaccumBasket.innerHTML = 'Le panier est vide'
    }
}

// Suppression de la clé 'validProduct' dans le localStorage une fois vide
if (JSON.parse(localStorage.getItem('validProduct')) == 0) {
    localStorage.removeItem('validProduct')
    document.location.href = 'basket.html'
}

// Création du bouton pour vider entièrement le panier
const removeAll = document.getElementById('removeAll')
removeAll.className = 'primary__btn'
removeAll.innerHTML = 'Vider entièrement le panier'

    // Création de l'écouteur d'évenement pour la suppression du panier
    removeAll.addEventListener('click', function () {
        localStorage.removeItem('validProduct')
        document.location.href = 'basket.html'
    })

// Création du message qui va afficher le prix total
const totalOrder = document.getElementById('totalOrder')
totalOrder.className = 'totalOrder'
totalOrder.innerHTML = `Le total de votre commande est de <strong>${total} €</strong> <br>
<br> Vérifier bien votre <strong> PANIER </strong>  avant de valider le formulaire !!<br>
<br> Voici les articles que vous avez séléctionnez : 
`

// Création de la variable du formulaire
const form = document.getElementById('formOrder')

    // Création des écouteurs d'évenements pour la validation du formulaire
    form.firstName.addEventListener('change', function () {
        validFirstName(this)
    })
    form.lastName.addEventListener('change', function () {
        validLastName(this)
    })
    form.email.addEventListener('change', function () {
        validEmail(this)
    })
    form.adress.addEventListener('change', function () {
        validAdress(this)
    })
    form.city.addEventListener('change', function () {
        validCity(this)
    })

    // Création de l'écouteur d'évenement pour l'envoie du formulaire
    form.addEventListener('submit', function (e) {
        e.preventDefault()
        if (
            validFirstName(form.firstName) &&
            validLastName(form.lastName) &&
            validEmail(form.email) &&
            validAdress(form.adress) &&
            validCity(form.city)
        ) {
            sendOrder()
        }
    })

// Création de la variable validation du nom
const validFirstName = function (firstName) {
    const smallFirstName = document.getElementById('smallFirstName')
    const formRegExp = new RegExp('^[a-zA-Z-]{2,20}$', 'g')

    if (formRegExp.test(firstName.value)) {
        smallFirstName.innerHTML = 'Nom valide'
        smallFirstName.style.color = 'green'
        return true
    } else {
        smallFirstName.innerHTML =
            'Nom non valide, seulement les lettres sont autorisées'
        smallFirstName.style.color = 'red'
        return false
    }
}

// Création de la variable validation du prénom
const validLastName = function (lastName) {
    const smallLastName = document.getElementById('smallLastName')
    const formRegExp = new RegExp('^[a-zA-Z-]{2,20}$', 'g')

    if (formRegExp.test(lastName.value)) {
        smallLastName.innerHTML = 'Prénom valide'
        smallLastName.style.color = 'green'
        return true
    } else {
        smallLastName.innerHTML =
            'Prénom non valide, seulement les lettres sont autorisées'
        smallLastName.style.color = 'red'
        return false
    }
}

// Création de la variable validation de l'email
const validEmail = function (email) {
    const smallEmail = document.getElementById('smallEmail')
    const formRegExp = new RegExp(
        '^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$',
        'g'
    )

    if (formRegExp.test(email.value)) {
        smallEmail.innerHTML = 'Email valide'
        smallEmail.style.color = 'green'
        return true
    } else {
        smallEmail.innerHTML =
            'Email non valide, veuillez indiquer une adress email valide'
        smallEmail.style.color = 'red'
        return false
    }
}

// Création de la variable validation de l'adresse
const validAdress = function (adress) {
    const smallAdress = document.getElementById('smallAdress')
    const formRegExp = new RegExp('^[a-zA-Z0-9À-ÿ ]{2,100}$', 'g')

    if (formRegExp.test(adress.value)) {
        smallAdress.innerHTML = 'Adress valide'
        smallAdress.style.color = 'green'
        return true
    } else {
        smallAdress.innerHTML =
            'Adress non valide, veuillez saissir une adress postal valide'
        smallAdress.style.color = 'red'
        return false
    }
}

// Création de la variable validation de la ville
const validCity = function (city) {
    const smallCity = document.getElementById('smallCity')
    const formRegExp = new RegExp('^[a-zA-Z]{2,20}$', 'g')

    if (formRegExp.test(city.value)) {
        smallCity.innerHTML = 'Ville valide'
        smallCity.style.color = 'green'
        return true
    } else {
        smallCity.innerHTML =
            'Ville non valide, seulement les lettres sont autorisées'
        smallCity.style.color = 'red'
        return false
    }
}

// Création de la variable qui récupère les informations du formulaire
const getContactValue = () => {
    const contact = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        address: document.getElementById('adress').value,
        city: document.getElementById('city').value,
    }
    return contact
}

// Création de la variable qui envoie les informations des produits
const getProductsId = () => {
    const products = new Array()
    for (let i = 0; i < selectProduct.length; i++) {
        products.push(selectProduct[i].id)
    }
    return products
}


// Création de la fonction qui envoie les informations au serveur et qui retourne un orderId
function sendOrder() {
    const creatOrder = () => {
        const req = {
            contact: getContactValue(),
            products: getProductsId(),
        }
        fetch('http://localhost:3000/api/cameras/order', {
            method: 'POST',
            body: JSON.stringify(req),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(async (response) => {
            const data = await response.json()
            if (response.ok) {
                sessionStorage.setItem(
                    'contactAfterSendingOrder',
                    JSON.stringify(req.contact)
                )
                document.location.href = `order-confirm.html?orderId=${data.orderId}`
            }
        })
    }
    creatOrder()
}
