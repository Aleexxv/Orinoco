let selectProduct = JSON.parse(localStorage.getItem('validProduct'));
let total = 0;

// **********************if else panier vide**************************

// **********************if else panier vide**************************

for (let i = 0; i < selectProduct.length; i++) {
    const product = document.getElementById('product');
    const divContent = document.createElement('div');
    divContent.className = 'basketArticle';
    const retunProduct = document.createDocumentFragment();


    let img = document.createElement('img');
    let articleName = document.createElement('h2');
    let price = document.createElement('h3');
    let removeProduct = document.createElement('div')

    img.src = selectProduct[i].img;
    articleName.innerHTML = selectProduct[i].name;
    price.innerHTML = `${selectProduct[i].price / 100} €`;
    removeProduct.innerHTML = '<button onclick="removeProduct()"><i class="fas fa-trash-alt"></i></button>';
    removeProduct.className = 'trash';

    retunProduct.appendChild(divContent);
    divContent.appendChild(img);
    divContent.appendChild(articleName);
    divContent.appendChild(price);
    divContent.appendChild(removeProduct);
    product.appendChild(retunProduct);

    total += selectProduct[i].price / 100;
}


// ********************** Revoir Trash **************************
function  removeProduct() {
localStorage.removeItem('validProduct');
}
// ********************** Revoir Trash **************************



const totalOrder = document.getElementById('totalOrder');
totalOrder.className = 'totalOrder'
totalOrder.innerHTML = `Le total de votre commande est de <strong>${total} €</strong> <br>
<br> Vérifier bien votre <strong> PANIER </strong>  avant de valider le formulaire !!<br>
<br> Voici les articles que vous avez séléctionnez : 
`;


// ********************** revoir requète **************************
const getValue = () => {
    const form = document.getElementById('formOrder');

    form.firstName.addEventListener('change', function() {
        validFirstName(this);
    });
    form.lastName.addEventListener('change', function() {
        validLastName(this);
    });
    form.email.addEventListener('change', function() {
        validEmail(this);
    });
    form.adress.addEventListener('change', function() {
        validAdress(this);
    });
    form.city.addEventListener('change', function() {
        validCity(this);
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validFirstName(form.firstName) && validLastName(form.lastName) && validEmail(form.email) && validAdress(form.adress) && validCity(form.city)) {
            form.submit();
        }
    });

    const validFirstName = function(firstName) {
        let smallFirstName = document.getElementById('smallFirstName');
        let formRegExp = new RegExp(
            '^[a-zA-Z-]{2,20}$', 'g'
        );

        if (formRegExp.test(firstName.value)) {
            smallFirstName.innerHTML = 'Nom valide';
            smallFirstName.style.color = 'green';
            console.log('ca passe');
            return true;
        } else {
            smallFirstName.innerHTML = 'Nom non valide, seulement les lettres sont autorisées';
            smallFirstName.style.color = 'red';
            console.log('ca passe PAS');
            return false;
        }
    }
    const validLastName = function(lastName) {
        let smallLastName = document.getElementById('smallLastName');
        let formRegExp = new RegExp(
            '^[a-zA-Z-]{2,20}$', 'g'
        );

        if (formRegExp.test(lastName.value)) {;
            smallLastName.innerHTML = 'Prénom valide';
            smallLastName.style.color = 'green';
            console.log('ca passe');
            return true;
        } else {
            smallLastName.innerHTML = 'Prénom non valide, seulement les lettres sont autorisées';
            smallLastName.style.color = 'red';
            console.log('ca passe PAS');
            return false;
        }
    }
    const validEmail = function(email) {
        let smallEmail = document.getElementById('smallEmail');
        let formRegExp = new RegExp(
            '^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g'
        );

        if (formRegExp.test(email.value)) {;
            smallEmail.innerHTML = 'Email valide';
            smallEmail.style.color = 'green';
            console.log('ca passe');
            return true;
        } else {
            smallEmail.innerHTML = 'Email non valide, veuillez indiquer une adress email valide';
            smallEmail.style.color = 'red';
            console.log('ca passe PAS');
            return false;
        }
    }
    const validAdress = function(adress) {
        let smallAdress = document.getElementById('smallAdress');
        let formRegExp = new RegExp(
            '^[a-zA-Z0-9À-ÿ ]{2,100}$', 'g'
        );

        if (formRegExp.test(adress.value)) {;
            smallAdress.innerHTML = 'Adress valide';
            smallAdress.style.color = 'green';
            console.log('ca passe');
            return true;
        } else {
            smallAdress.innerHTML = 'Adress non valide, veuillez saissir une adress postal valide';
            smallAdress.style.color = 'red';
            console.log('ca passe PAS');
            return false;
        }
    }
    const validCity = function(city) {
        let smallCity = document.getElementById('smallCity');
        let formRegExp = new RegExp(
            '^[a-zA-Z]{2,20}$', 'g'
        );

        if (formRegExp.test(city.value)) {;
            smallCity.innerHTML = 'Ville valide';
            smallCity.style.color = 'green';
            console.log('ca passe');
            return true;
        } else {
            smallCity.innerHTML = 'Ville non valide, seulement les lettres sont autorisées';
            smallCity.style.color = 'red';
            console.log('ca passe PAS');
            return false;
        }
    }
    sendOrder();
};
// ********************** revoir la requète**************************

// ********************** revoir objet de la requète **************************
const getContactValue = () => {
    const contact = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        adress: document.getElementById('adress').value,
        city: document.getElementById('city').value,
    };
    return contact;
}
const getProductsId = () => {
    const products = new Array();
        for (let i = 0; i < selectProduct.length; i++) {
            products.push(selectProduct[i].id);
        };
    return products;
}
// ********************** revoir objet de la requète **************************

function sendOrder() {
    const creatOrder = (contact, products) => {
        const req = {
            "contact": getContactValue(contact),
            "products": getProductsId(products),
        }
        console.log(req)
        fetch('http://localhost:3000/api/cameras/order', {
            method: 'POST',
            body: JSON.stringify(req),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(async(response) => {
            const data = await response.json()
            console.log('data', data)
            console.log('response', response)
            if (response.ok) {
                console.log(response.ok);
                console.log(data.orderId);
                // localStorage.setItem('dataId', data.orderId);
            } else {
                console.log(response.ok);
                console.log(data.orderId);
                console.log('t\'a merdé !!');
            }
        })
    };
    creatOrder();
}
