let urlCamera = `http://localhost:3000/api/cameras/`;
fetch(urlCamera).then(respProduct => respProduct.json()).then(dataId => {
        function getCamera(dataId) {
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
            let lenseSelect = insertProduct.lenses[0];
            let quantSelect = 0;

            console.log(insertProduct._id);

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
                console.log();
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
                const pushProduct = JSON.parse(localStorage.getItem('validProduct')) || [];

                for(let i = 0; i < pushProduct.length; i++){
                    if(insertProduct._id == pushProduct[i].id){
                        console.log(pushProduct[i].id);
                        const btn = document.createElement('p');
                        btn.style = 'background: linear-gradient(110deg, rgba(212,129,57,1) 0%, rgba(143,91,254,1) 100%); color: white; margin-top: 2.5rem;';
                        btn.innerHTML = 'produit mise à jour !';
                        btn.className = 'primary__btn'
                        document.getElementById('divContent').appendChild(btn);
                        pushProduct.pop();
                    }
                } 
                
                if(quantSelect === 0) {
                    const infoQuant = document.createElement('p');
                    infoQuant.style = 'background: linear-gradient(110deg, rgba(212,129,57,1) 0%, rgba(143,91,254,1) 100%); color: white; margin-top: 2.5rem;';
                    infoQuant.innerHTML = 'Veuillez séléctionnez une quantitée';
                    infoQuant.className = 'primary__btn';
                    document.getElementById('divContent').appendChild(infoQuant);
                } else {
                        const productObjet = {
                            name: nameProd,
                            price: priceProd,
                            img: imgProd,
                            id: idProd,
                            quantity: quantSelect,
                            lense: lenseSelect
                        }
                    pushProduct.push(productObjet);
                    localStorage.setItem('validProduct', JSON.stringify(pushProduct));
                    const basketAdd = document.createElement('p');
                    basketAdd.style = 'background: linear-gradient(110deg, rgba(212,129,57,1) 0%, rgba(143,91,254,1) 100%); color: white; margin-top: 1.5rem;';
                    basketAdd.innerHTML = 'Article ajouté au panier';
                    basketAdd.className = 'primary__btn'
                    document.getElementById('divContent').appendChild(basketAdd);
                };
            });
        };
        getCamera(dataId);
    })
    .catch(err => console.log("Tu t'es planté sur la page de l'article" + " " + err));


