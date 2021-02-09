const $description = document.querySelectorAll('.product');
const $searcher = document.getElementById('searcher');

const $allProducts = document.querySelector('.allProducts');

const $selection = document.querySelectorAll('.selection');


let fullDescription = Array.from($description).map(function (obj) {
    return obj.dataset.filter
});


// result = fullDescription.filter( (element, index) => element.includes('sweet') ? index : undefined );

$searcher.addEventListener('input', filterProducts);

function filterProducts() {
    search = $searcher.value;

    // mira que loco!!
    // $searcher == this
    // this.value == search

    if (search) {
        $allProducts.classList.add('filtered');
    } else {
        $allProducts.classList.remove('filtered');
    }


    let result = fullDescription.map(matchProducts).filter(String);

    function matchProducts(element, index) {
        if (element.includes(search)) {
            return index
        } else {
            return '';
        }
    };

    $description.forEach((element, index) => {
        element.classList.remove('visible');
        if (result.includes(index)) {
            element.classList.add('visible');
        }
    });
};

$selection.forEach(($boton) => {

    $boton.addEventListener('click', filterButton)

});

function filterButton() {

    $allProducts.classList.add('filtered');
    // en realidad es una mala practica la busqueda por clase y más asi por el ondragend, es muy rompible
    //jaja yo misma lo rompi mientras lo ponia más lindo con CSS 🤦‍♀️🤦‍♀️🤦
    let clase = this.classList[2];

    fullDescription.forEach((element, index) => {

        $description[index].classList.remove('visible');
        if (clase == 'all') {
            $allProducts.classList.remove('filtered');
        }

        if (clase == element) {
            $description[index].classList.add('visible');
        };
    })
}



const $modal = document.querySelector('.modal');
const $modalcontainer = document.querySelector('.modal-container');
const $imagemodal = document.getElementById('image-modal');

const images = document.querySelectorAll('.product .image');
const imagesSrc = Array.from(images).map((element) => element.src);

let n = 12;

const $controls = document.querySelectorAll('.controls');

images.forEach(($image) => {
    $image.addEventListener('click', gallery)
})


function gallery(event) {
    if (event.srcElement.alt == 'carrito') return;

    let img = event.srcElement.src;

    $imagemodal.setAttribute('src', img);
    $modal.style.display = 'block';

    // let corte = img.split('/').pop();

    n = imagesSrc.indexOf(img);


    // esa hermosa de arriba es igual al choclo de abajo, gracias profe!!
    // images.forEach((element, index)=>{
    //     if (img == element) {
    //         return n = index;
    //     }
    // });

}



$controls.forEach(($boton) => {
    $boton.addEventListener('click', changeImages)
})

function changeImages() {
    let delta = (this.classList.contains('back')) ? -1 : 1;

    if ((n + delta) >= imagesSrc.length) {
        n = -1;
    }

    if ((n + delta) < 0) {
        n = imagesSrc.length;
    }

    let img = imagesSrc[n + delta];

    $imagemodal.setAttribute('src', img);
    n = imagesSrc.indexOf(img);
}


const $closes = $modal.querySelectorAll('#closebutton, .modal-bg')

$closes.forEach(($boton) => {
    $boton.addEventListener('click', () => {
        $modal.style.display = 'none';
    });
});

window.addEventListener('keydown', (e) => {
    if (e.key == 'Escape') {
        $modal.style.display = 'none';
    }
});

const $addCart = document.querySelectorAll('.add-cart');
let cart = [];
const $cart = document.querySelector('.cart');
const $cartButtonText = document.querySelector('.cart-button-text');


$addCart.forEach((button) => {
    button.addEventListener('click', addToCart)
})

function addToCart(e) {
    e.preventDefault();
    let product = e.target.closest('.product');


    let data = {
        id: product.querySelector('.image').currentSrc, //usamos esto para que sea un valor unico, pero vendría de la base de datos, por ej product id
        img: product.querySelector('.image').currentSrc,
        description: product.querySelector('.item-description').textContent,
        price: product.querySelector('.price').dataset.price,
    }

    cart.push(data);
    updateCart();
}

$cart.addEventListener('click', removeFromCart);

function removeFromCart(e) {
    e.preventDefault();

    if (e.target.className && e.target.className == 'remove-item') {
        let id = e.target.parentNode.querySelector('.cart-image').currentSrc;
        // let id = cartItem.

        cart.forEach((element, index) => {
            if (element.id == id) {
                cart.splice(index, 1);
                updateCart();
            }
        })
    }

    if (e.target.className && e.target.className == 'cart-clear') {
        emptyCart();
        updateCart();
    }

    if (e.target.className && e.target.className == 'cart-checkout') {
        $cart.classList.remove('show');
    }
}

function updateCart() {
    printCart();
    updateButton();
}

function updateButton() {
    $cartButtonText.innerHTML = `${cart.length} ${cart.length > 1 ? 'items' : 'item'} - $${getTotalPrice()}`
}



function getTotalPrice() {
    let totalPrice = cart.reduce((accValue, element) => accValue + parseInt(element.price), 0);
    // le tuvimos que poner un 0 como primer valor, porque como cart es un array de objetos, intenta sumar
    // objetos y no puede da undefined.

    return totalPrice;
}


const $showCart = document.getElementById('cart');

//data destructuring esta es una nueva manera de llamar a una variable
// let { img:image, description, price } = data;

$showCart.addEventListener('click', () => {
    $cart.classList.add('show');
})



function printCart() {

    let cartContent = '';

    cart.forEach((element) => {

        // esto sería otra manera dentro del forEach lo de arriba:
        //  totalPrice += parseInt(element.price);

        cartContent += `
            <div class="cart-item">
                <img class="cart-image" src="${element.img}" alt="sweet1">
                <div class="cart-description">
                    <span>${element.description}</span>
                    <span>$${element.price}</span>
                </div>
                <img class="remove-item" src="./img/icons8-basura-llena-24.png" alt="trash can">
            </div>`;
    });

    $cart.innerHTML = cartContent;

    if (getTotalPrice() > 0) {
        $cart.innerHTML += `Total $${getTotalPrice()}`;
    }

    $cart.innerHTML += `<div class="cart-controls">
                            <a class="cart-clear" href="#">Clear Cart</a>
                            <a class="cart-checkout" href="#">Checkout</a>
                        </div>`;

}


function emptyCart() {
    cart = [];
}


