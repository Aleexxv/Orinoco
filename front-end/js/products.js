// Création de la variable contenant les données de l'API
const urlCamera = `http://localhost:3000/api/cameras/`

// Récupération des données des caméras
fetch(urlCamera)

    //Puis conversion en JSON
    .then((respProduct) => respProduct.json())

    // Puis affichage des données
    .then((dataId) => {

        // Récupération de la liste des caméras
        function getCamera(dataId) {
            
            // Récuperation de l'id de la caméra
            const getUrl = window.location.search
            const getId = new URLSearchParams(getUrl)
            const article = getId.get('id')
            
            // Création d'une variable qui contient les données du produit sélectionné
            const insertProduct = dataId.find(
                (objectArray) => objectArray._id === article
            )

            //Création des variables contenant les données du produit
            const imgProd = insertProduct.imageUrl
            const nameProd = insertProduct.name
            const descProd = insertProduct.description
            const lensesProd = insertProduct.lenses
            const priceProd = insertProduct.price
            const idProd = insertProduct._id


            // Création de la div qui contiendra les données du produit
            const divImg = document.createElement('div')
            divImg.id = 'divImg'
            divImg.className = 'section__page__articles divImg width40'
            document.body.appendChild(divImg)
            document.getElementById('products').appendChild(divImg)

            // Création de la div qui contiendra l'image du produit
            const img = document.createElement('img')
            img.id = 'img'
            img.src = insertProduct.imageUrl
            document.getElementById('divImg').appendChild(img)

            // Création de la div qui contiendra les données du produit
            const divContent = document.createElement('div')
            divContent.id = 'divContent'
            divContent.className = 'section__page__articles divContent'
            document.getElementById('products').appendChild(divContent)

            // Création de la div qui contiendra le nom du produit
            const name = document.createElement('h2')
            name.id = 'name'
            name.innerHTML = nameProd
            document.getElementById('divContent').appendChild(name)

            // Création de la div qui contiendra la description du produit
            const desc = document.createElement('p')
            desc.id = 'desc'
            desc.innerHTML = descProd
            document.getElementById('divContent').appendChild(desc)


            // Création de la div qui contiendra les lentilles du produit
            const selectLense = document.createElement('select')
            selectLense.id = 'selectLense'
            for (let i = 0; i < lensesProd.length; i++) {
                const option = document.createElement('option')
                option.id = 'option'
                option.innerHTML = lensesProd[i]
                document
                    .getElementById('divContent')
                    .appendChild(selectLense)
                    .appendChild(option)
            }

            //Récuperation des données du sélécteur de lentilles
            const lenseSelect = insertProduct.lenses[0]
            let lenseProd = document.querySelector('select')
                lenseProd.addEventListener('change', function () {
                    lenseSelect = this.value
                    console.log(lenseSelect)
                })

            // Création de la div qui contiendra la quantité du produit
            const selectQant = document.createElement('select')
            selectQant.id = 'selectQant'
            for (let i = 1; i < 6; i++) {
                const option = document.createElement('option')
                option.id = 'option'
                option.value = [i]
                option.innerHTML = [i]
                document
                    .getElementById('divContent')
                    .appendChild(selectQant)
                    .appendChild(option)
            }

            // Récuperation des données du sélécteur de quantité
            let quantSelect = '1'
            const quantProd = document.getElementById('selectQant')
                quantProd.addEventListener('change', function () {
                    quantSelect = this.value
                })

            // Création de la div qui contiendra le prix du produit
            const price = document.createElement('h3')
            price.id = 'price'
            price.innerHTML = `${priceProd / 100} €`
            document.getElementById('divContent').appendChild(price)

            // Création de la div qui contiendra le bouton d'ajout au panier
            const button = document.createElement('a')
            button.id = 'button'
            button.className = 'primary__btn'
            button.textContent = 'Ajouter au panier'
            button.type = 'submit'
            document.getElementById('divContent').appendChild(button)


            // Création de l'écouteur d'évènement qui ajoute le produit au panier
            const btnSubmitClick = document.querySelector('#button')
            btnSubmitClick.addEventListener('click', () => {

                // Création de la variable qui contiendra les données du panier
                const pushProduct =
                    JSON.parse(localStorage.getItem('validProduct')) || []

                // Création de la variable qui contiendra le format des messages de validation de l'ajout au panier 
                const basketAdd = document.createElement('p')
                basketAdd.className = 'primary__btn'
                basketAdd.style =
                    'background: linear-gradient(110deg, rgba(212,129,57,1) 0%, rgba(143,91,254,1) 100%); color: white; margin-top: 1.5rem;'
                basketAdd.innerHTML = 'Article ajouté au panier'
                setTimeout(() => {
                    basketAdd.style.display = 'none'
                }, 1000)
                document.getElementById('divContent').appendChild(basketAdd)

                
                for (let i = 0; i < pushProduct.length; i++) {
                    // Boucle qui vérifie si le produit est déjà dans le panier et si oui, il ne sera pas ajouté
                    if (
                        nameProd == pushProduct[i].name &&
                        lenseSelect == pushProduct[i].lense &&
                        quantSelect == pushProduct[i].quantity
                    ) {
                        basketAdd.innerHTML = 'Produit déjà dans le panier'
                        pushProduct.pop()
                    }
                    // Boucle qui vérifie si la quantité est pas déjà séléctionnée et si oui, elle sera mise à jour
                    if (
                        nameProd == pushProduct[i].name &&
                        lenseSelect == pushProduct[i].lense &&
                        quantSelect !== pushProduct[i].quantity
                    ) {
                        pushProduct[i].quantity = quantSelect
                        localStorage.setItem(
                            'validProduct',
                            JSON.stringify(pushProduct)
                        )
                        pushProduct.splice(i, 1)
                        basketAdd.innerHTML = 'Quantité mise à jour'
                    } else {
                        pushProduct.push()
                    }
                }

                //Variable contenant les données du produit ajouté au panier
                const productObjet = {
                    name: nameProd,
                    price: priceProd,
                    img: imgProd,
                    id: idProd,
                    quantity: quantSelect,
                    lense: lenseSelect,
                }

                // Envoie des données du produit au panier
                pushProduct.push(productObjet)
                localStorage.setItem(
                    'validProduct',
                    JSON.stringify(pushProduct)
                )
            })
        }
        getCamera(dataId)
    })
    .catch((err) =>
        console.log(`Tu t'es planté sur la page de l'article` + ' ' + err)
    )
