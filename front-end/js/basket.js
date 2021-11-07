let selectProduct = JSON.parse(localStorage.getItem('validProduct'));
let total = 0;
const urlToArticles = 'products.html?id='

// **********************if else panier vide**************************
if (selectProduct == null ){
    const vaccumBasket = document.createElement('h2');
    vaccumBasket.style = 'display: inline-block;';
    document.body.appendChild(vaccumBasket);
    (product).appendChild(vaccumBasket)
    vaccumBasket.innerHTML = 'Le panier est vide';
}

for (let i = 0; i < selectProduct.length; i++) {
    const product = document.getElementById('product');
    const divContent = document.createElement('div');
    divContent.className = 'basketArticle';

    const returnProduct = document.createDocumentFragment();
    const img = document.createElement('img');
    const articleName = document.createElement('h2');
    const price = document.createElement('h3');
    const lense = document.createElement('p');

    const msgQuantityMax = document.createElement('p');
    msgQuantityMax.innerHTML = '5 articles max';
    msgQuantityMax.style.paddingLeft = '1rem';

    const divQuantity = document.createElement('div');
    divQuantity.className = 'divQuantity';
    divQuantity.style.alignItems = 'center';
    divQuantity.style.display = 'flex';
    divQuantity.style.justifyContent = 'space-between';

    const divQuantitybModify = document.createElement('div');
    divQuantitybModify.style.alignItems = 'center';
    divQuantitybModify.style.display = 'flex';

    let quantity = document.createElement('input');
    quantity.value = selectProduct[i].quantity;
    quantity.style.width = '1rem';
    quantity.style.padding = '.5rem';
    
    quantity.addEventListener('change', function(){
        quantity = this.value;
        selectProduct[i].quantity = quantity;
    });
    
    const modifQuantityBtn = document.createElement('button');
    modifQuantityBtn.innerHTML = 'Modifier';
    modifQuantityBtn.className = 'primary__btn';
    
    modifQuantityBtn.addEventListener('click', function() {
        localStorage.setItem('validProduct', JSON.stringify(selectProduct));
        window.location.reload();
    });

    const removeProduct = document.createElement('button');

    removeProduct.addEventListener('click', function() {
        let articleSupp = selectProduct;
        articleSupp.splice(i, 1);
        localStorage.setItem('validProduct', JSON.stringify(articleSupp));
        document.location.reload();
    });

    img.src = selectProduct[i].img;
    articleName.innerHTML = `<a href='${urlToArticles}${selectProduct[i].id}'>${selectProduct[i].name}</a>`;
    price.innerHTML = `${(selectProduct[i].price / 100) * selectProduct[i].quantity} €`;
    lense.innerHTML = `Vous avez séléctionnez la lentille : ${selectProduct[i].lense}`;
    removeProduct.innerHTML = `<i class='fas fa-trash-alt'></i>`;
    removeProduct.className = 'trashOne';

    returnProduct.appendChild(divContent);
    divContent.appendChild(img);
    divContent.appendChild(articleName);
    divContent.appendChild(lense);
    divContent.appendChild(divQuantity);
    divQuantity.appendChild(divQuantitybModify);
    divQuantitybModify.appendChild(quantity);
    divQuantitybModify.appendChild(msgQuantityMax);
    divQuantity.appendChild(modifQuantityBtn);
    divContent.appendChild(price);
    divContent.appendChild(removeProduct);
    product.appendChild(returnProduct);

    total += (selectProduct[i].price / 100) * selectProduct[i].quantity;

    if (selectProduct == null && articleSupp == []){
        vaccumBasket = document.createElement('h2'),
        vaccumBasket.style = 'display: inline-block;';
        document.body.appendChild(vaccumBasket);
        (price).appendChild(vaccumBasket)
        vaccumBasket.innerHTML = 'Le panier est vide';
    };
};

if(JSON.parse(localStorage.getItem('validProduct')) == 0) {
    localStorage.removeItem('validProduct');
    document.location.href='basket.html';
}

const removeAll = document.getElementById('removeAll')
removeAll.className = 'primary__btn';
removeAll.innerHTML = 'Vider entièrement le panier';

removeAll.addEventListener('click', function() {
    localStorage.removeItem('validProduct');
    document.location.href='basket.html'
});

const totalOrder = document.getElementById('totalOrder');
totalOrder.className = 'totalOrder'
totalOrder.innerHTML = `Le total de votre commande est de <strong>${total} €</strong> <br>
<br> Vérifier bien votre <strong> PANIER </strong>  avant de valider le formulaire !!<br>
<br> Voici les articles que vous avez séléctionnez : 
`;

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
        sendOrder();
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
        return true;
    } else {
        smallFirstName.innerHTML = 'Nom non valide, seulement les lettres sont autorisées';
        smallFirstName.style.color = 'red';
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
        return true;
    } else {
        smallLastName.innerHTML = 'Prénom non valide, seulement les lettres sont autorisées';
        smallLastName.style.color = 'red';
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
        return true;
    } else {
        smallEmail.innerHTML = 'Email non valide, veuillez indiquer une adress email valide';
        smallEmail.style.color = 'red';
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
        return true;
    } else {
        smallAdress.innerHTML = 'Adress non valide, veuillez saissir une adress postal valide';
        smallAdress.style.color = 'red';
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
        return true;
    } else {
        smallCity.innerHTML = 'Ville non valide, seulement les lettres sont autorisées';
        smallCity.style.color = 'red';
        return false;
    }
}

// ********************** revoir objet de la requète **************************
const getContactValue = () => {
    const contact = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        address: document.getElementById('adress').value,
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

function sendOrder() {
    const creatOrder = () => {
        const req = {
            'contact': getContactValue(),
            'products': getProductsId(),
        }
        fetch('http://localhost:3000/api/cameras/order', {
            method: 'POST',
            body: JSON.stringify(req),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(async(response) => {
            const data = await response.json()
            if (response.ok) {
                sessionStorage.setItem('contactAfterSendingOrder', JSON.stringify(req.contact));
                document.location.href = `order-confirm.html?orderId=${data.orderId}`;
            } else {
            }
        })
    };
    creatOrder();
}
