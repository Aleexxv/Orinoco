let urlCamera = `http://localhost:3000/api/cameras/`;
fetch(urlCamera).then(respProduct => respProduct.json()).then(dataId => {
        function getCamera(dataId) {
            // récuperer le tableau de l'id depuis l'url
            const getUrl = window.location.search;
            const getId = new URLSearchParams(getUrl);
            const article = getId.get("id");
            const insertProduct = dataId.find((element) => element._id === article);
            let imgProd = insertProduct.imageUrl;
            let nameProd = insertProduct.name;
            let descProd = insertProduct.description;
            let lensesProd = insertProduct.lenses;
            let priceProd = insertProduct.price;
            let idProd = insertProduct._id;

            let divImg = document.createElement('div');
            divImg.id = 'divImg';
            divImg.className = 'section__page__articles divImg width40';
            document.body.appendChild(divImg);
            document.getElementById('products').appendChild(divImg);

            let img = document.createElement('img');
            img.id = "img";
            img.src = insertProduct.imageUrl;
            document.getElementById('divImg').appendChild(img);

            let divContent = document.createElement('div');
            divContent.id = 'divContent';
            divContent.className = 'section__page__articles divContent';
            document.getElementById('products').appendChild(divContent);

            let name = document.createElement('h2');
            name.id = "name";
            name.innerHTML = nameProd;
            document.getElementById('divContent').appendChild(name);

            let desc = document.createElement('p');
            desc.id = "desc";
            desc.innerHTML = descProd;
            document.getElementById('divContent').appendChild(desc);

            let selectLense = document.createElement('select');
            selectLense.id = "selectLense";
            for (let i = 0; i < lensesProd.length; i++) {
                const option = document.createElement('option');
                option.id = "option";
                option.innerHTML = lensesProd[i];
                document.getElementById('divContent').appendChild(selectLense).appendChild(option);
            }
            let lenseProd = document.querySelector('select');
            lenseProd.addEventListener('change', function () {
                lenseSelect = this.value;
            })
            
            let selectQant = document.createElement('select');
            selectQant.id = "selectQant";
            for (let i = 0; i < 6; i++) {
                const option = document.createElement('option');
                option.id = "option";
                option.value = [i];
                option.innerHTML = [i];
                document.getElementById('divContent').appendChild(selectQant).appendChild(option);
            }
            let quantProd = document.getElementById('selectQant');
            quantProd.addEventListener('change', function () {
                quantSelect = this.value;
            })

            let price = document.createElement('h3');
            price.id = "price";
            price.innerHTML = `${priceProd / 100} €`;
            document.getElementById('divContent').appendChild(price);

            const button = document.createElement('a');
            button.id = "button";
            button.className = "primary__btn";
            button.textContent = "Ajouter au panier";
            button.type = "submit";
            document.getElementById('divContent').appendChild(button);

            const btnSubmitClick = document.querySelector("#button");
            btnSubmitClick.addEventListener("click", () => {
                const productObjet = {
                    name: nameProd,
                    price: priceProd,
                    img: imgProd,
                    id: idProd,
                    quantity: quantSelect,
                    lense: lenseSelect
                };

                const pushProduct = JSON.parse(localStorage.getItem('validProduct')) || [];
                pushProduct.push(productObjet);
                localStorage.setItem('validProduct', JSON.stringify(pushProduct));
                console.log(pushProduct);
                alert('article ajouté au panier');
            })
        }
        getCamera(dataId);
    })
    .catch(err => console.log("Tu t'es planté sur la page de l'article" + " " + err));


// envoyer les données de l'article dans le localStorage en créant une paire clé valeur via submit./// vréer un tableau avec .push mettre le tabelau dans le valeur .pop derniere element.