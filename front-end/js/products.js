let urlCamera = `http://localhost:3000/api/cameras/`;
fetch(urlCamera).then(respProduct => respProduct.json()).then(dataId => {
            function getCamera(dataId) {
            const getUrl = window.location.search;
            const getId = new URLSearchParams(getUrl);
            const article = getId.get('id');

            console.log(article);
            const insertProduct = dataId.find((objectArray) => objectArray._id === article);
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
            img.id = 'img';
            img.src = insertProduct.imageUrl;
            document.getElementById('divImg').appendChild(img);

            let divContent = document.createElement('div');
            divContent.id = 'divContent';
            divContent.className = 'section__page__articles divContent';
            document.getElementById('products').appendChild(divContent);

            let name = document.createElement('h2');
            name.id = 'name';
            name.innerHTML = nameProd;
            document.getElementById('divContent').appendChild(name);

            let desc = document.createElement('p');
            desc.id = 'desc';
            desc.innerHTML = descProd;
            document.getElementById('divContent').appendChild(desc);

            let selectLense = document.createElement('select');
            selectLense.id = 'selectLense';
            for (let i = 0; i < lensesProd.length; i++) {
                const option = document.createElement('option');
                option.id = 'option';
                option.innerHTML = lensesProd[i];
                document.getElementById('divContent').appendChild(selectLense).appendChild(option);
            }

            let lenseSelect = insertProduct.lenses[0];
            let lenseProd = document.querySelector('select');
            lenseProd.addEventListener('change', function () {
                lenseSelect = this.value;
                console.log(lenseSelect);
            })

            let selectQant = document.createElement('select');
            selectQant.id = 'selectQant';
            for (let i = 1; i < 6; i++) {
                const option = document.createElement('option');
                option.id = 'option';
                option.value = [i];
                option.innerHTML = [i];
                document.getElementById('divContent').appendChild(selectQant).appendChild(option);
            }

            let quantSelect = '1';
            let quantProd = document.getElementById('selectQant');
            quantProd.addEventListener('change', function () {
                quantSelect = this.value;
            })

            let price = document.createElement('h3');
            price.id = 'price';
            price.innerHTML = `${priceProd / 100} €`;
            document.getElementById('divContent').appendChild(price);

            const button = document.createElement('a');
            button.id = 'button';
            button.className = 'primary__btn';
            button.textContent = 'Ajouter au panier';
            button.type = 'submit';
            document.getElementById('divContent').appendChild(button);

            const btnSubmitClick = document.querySelector('#button');
            btnSubmitClick.addEventListener('click', () => {
            const pushProduct = JSON.parse(localStorage.getItem('validProduct')) || [];
            const basketAdd = document.createElement('p');
            basketAdd.className = 'primary__btn'
            basketAdd.style = 'background: linear-gradient(110deg, rgba(212,129,57,1) 0%, rgba(143,91,254,1) 100%); color: white; margin-top: 1.5rem;';
            basketAdd.innerHTML = 'Article ajouté au panier';
            setTimeout(function(){
                basketAdd.style.display = 'none';
            }, 1000);
            document.getElementById('divContent').appendChild(basketAdd);

            for(let i = 0; i < pushProduct.length; i++){
                if(nameProd == pushProduct[i].name && lenseSelect == pushProduct[i].lense && quantSelect == pushProduct[i].quantity){
                    basketAdd.innerHTML = 'Produit déjà dans le panier';
                    pushProduct.pop();
                } if (nameProd == pushProduct[i].name && lenseSelect == pushProduct[i].lense && quantSelect !== pushProduct[i].quantity) {
                    pushProduct[i].quantity = quantSelect;
                    localStorage.setItem('validProduct', JSON.stringify(pushProduct));
                    pushProduct.splice(i, 1);
                    basketAdd.innerHTML = 'Quantité mise à jour';
                } else {
                    pushProduct.push();
                    
                }
            }

            const productObjet = {
                name: nameProd,
                price: priceProd,
                img: imgProd,
                id: idProd,
                quantity: quantSelect,
                lense: lenseSelect,
            }
            pushProduct.push(productObjet);
            localStorage.setItem('validProduct', JSON.stringify(pushProduct));
            
            
            });
        };
        getCamera(dataId);
    })
    .catch(err => console.log(`Tu t'es planté sur la page de l'article` + ' ' + err));





// const basketAdd = document.createElement('p');
// basketAdd.style = 'background: linear-gradient(110deg, rgba(212,129,57,1) 0%, rgba(143,91,254,1) 100%); color: white; margin-top: 1.5rem;';
// basketAdd.innerHTML = 'Article ajouté au panier';
// basketAdd.className = 'primary__btn'
// document.getElementById('divContent').appendChild(basketAdd);


