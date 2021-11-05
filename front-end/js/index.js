let urlCamera = `http://localhost:3000/api/cameras/`;
    fetch(urlCamera).then(respCamera => respCamera.json()).then(data => {
            function newProducts(data) {
            // Boucle for pour l'itérations des éléments 
            for (let i = 0; i < data.length; i++) {
                let importArticles = '';
                data.forEach(products => {
                    importArticles += `
                    <figure>
                        <img src='${products.imageUrl}' alt='${products.alt}'>
                        <figcaption class=''>
                            <h2>${products.name}</h2>
                            <p>${products.description}</p>
                        </figcaption>
                        <div class='btn__index'>
                            <a href='products.html?id=${products._id}' class='primary__btn'>Voir le produit</a>
                        </div>
                    </figure>
                    `;
                })
                // Placement des articles dans le HTML
                let positionArticles = document.querySelector('.section__full__articles');
                positionArticles.innerHTML = importArticles;
            }
        }
        newProducts(data);
    })
    .catch(err => console.log(`Tu t'es planté sur la page des articles` + ' ' + err));

    // module.exports = {
    //     fetch,
    // }