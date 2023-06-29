//---------------- Datos ----------------//

document.addEventListener("DOMContentLoaded", function() {
  const products = [
    { name: 'Need For Speed: Most Wanted 2012', description: 'Lanzado en 2012, es una versión reinventada del juego original de Need for Speed: Most Wanted. En este juego de carreras de mundo abierto, los jugadores compiten en carreras ilegales mientras intentan evadir a la policía. El objetivo principal es convertirse en el corredor más buscado, derrotando a otros corredores en desafíos y carreras callejeras.', price: 29.99, image: 'img/nfsmw.jpg', category: 'PC' },
    { name: 'Need For Speed: Rivals', description: 'Lanzado en 2013, NFS Rivals es un juego de carreras y persecuciones de alta velocidad. Los jugadores pueden elegir entre ser corredores ilegales o policías, cada uno con su propia línea de historia y objetivos. Los corredores compiten en carreras callejeras mientras evitan ser arrestados, mientras que los policías persiguen y arrestan a los corredores. El juego se desarrolla en un mundo abierto donde los jugadores pueden explorar libremente el mapa y participar en desafíos en línea con otros jugadores.', price: 39.99, image: 'img/nfsr.jpg', category: 'Xbox' },
    { name: 'Need For Speed', description: 'Lanzado en 2015, este juego simplemente se titula "Need for Speed". Presenta una historia centrada en el mundo de las carreras callejeras nocturnas y los equipos de corredores. Los jugadores participan en carreras, desafíos y persecuciones policiales mientras intentan construir su reputación en la escena de las carreras callejeras. El juego ofrece una amplia personalización de los vehículos y se basa en un mundo abierto para explorar.', price: 19.99, image: 'img/nfs.jpg', category: 'PlayStation' },
    { name: 'Need For Speed: Payback', description: 'Lanzado en 2017, NFS Payback sigue una historia de venganza en el mundo de las carreras ilegales. Los jugadores asumen los roles de tres personajes diferentes mientras buscan derribar a "The House", un cartel criminal que domina las carreras en la ciudad ficticia de Fortune Valley. El juego presenta un mundo abierto, carreras emocionantes, persecuciones policiales y una amplia variedad de vehículos para elegir.', price: 49.99, image: 'img/nfsp.jpg', category: 'PC' },
    { name: 'Need For Speed: Heat', description: 'Lanzado en 2019, NFS Heat combina carreras legales e ilegales en un mundo abierto lleno de acción y peligro. Los jugadores compiten en carreras callejeras durante la noche para ganar dinero y reputación, y durante el día participan en eventos legales para aumentar sus fondos. La policía es más agresiva durante la noche y los jugadores deben evitar ser arrestados para mantener sus ganancias. El juego presenta una amplia personalización de vehículos y un mundo vibrante para explorar.', price: 24.99, image: 'img/nfsh.jpg', category: 'PlayStation' },
    { name: 'Need For Speed: Unbound', description: 'Lanzado en 2022, NFS Unbound es un juego de carreras ambientado en una ciudad ficticia llamada Lakeshore City, que se basa en Chicago. El juego presenta un estilo artístico que combina elementos artísticos como la animación del sombreado plano y graffiti con el estilo artístico más realista de los otros juegos de la serie. El "sistema de calor" de Need for Speed Heat regresa en Unbound, donde el jugador intenta ganar notoriedad entre la policía. ', price: 34.99, image: 'img/nfsu.jpg', category: 'Xbox' }
  ];

  //---------------- Variables ----------------//

  let cartProducts = [];
  let cartTotalPrice = 0;

  //---------------- DOM ----------------//

  const productList = document.getElementById('product-list');
  const cartCount = document.getElementById('cart-count');
  const cartTotal = document.getElementById('cart-total-price');
  const productModal = document.getElementById('product-modal');
  const productModalTitle = document.getElementById('product-modal-title');
  const productModalDescription = document.getElementById('product-modal-description');
  const productModalPrice = document.getElementById('product-modal-price');
  const addToCartModalButton = document.getElementById('add-to-cart-modal-button');
  const cartModal = document.getElementById('cart-modal');
  const cartProductList = document.getElementById('cart-product-list');
  const cartModalTotal = document.getElementById('cart-modal-total');
  const clearCartButton = document.getElementById('clear-cart-button');
  const showCartButton = document.getElementById('show-cart-button');
  const filterButtons = document.querySelectorAll('.filter-button');
  const productModalClose = document.getElementById('product-modal-close');
  const cartModalClose = document.getElementById('cart-modal-close');

  //---------------- Iniciar la página ----------------//

  function initializePage() {
    renderProductList();
    updateCartSummary();
    addFilterListeners();
  }

  //---------------- Renderizar la lista de productos ----------------//

  function renderProductList(category = 'All') {
    while (productList.firstChild) {
      productList.firstChild.remove();
    }

    const filteredProducts = category === 'All' ? products : products.filter(product => product.category === category);

    filteredProducts.forEach((product, index) => {
      const listItem = document.createElement('li');
      const productImage = document.createElement('img');
      const productName = document.createElement('h3');
      const productDescription = document.createElement('p');
      const productPrice = document.createElement('p');
      const viewProductButton = document.createElement('button');
      const addToCartButton = document.createElement('button');

      productImage.src = product.image;
      productImage.alt = product.name;
      productImage.width = '100';

      productName.textContent = product.name;

      productDescription.textContent = product.description;

      productPrice.textContent = `Precio: $${product.price.toFixed(2)}`;

      viewProductButton.className = 'btn btn-primary view-product-button';
      viewProductButton.dataset.index = index;
      viewProductButton.textContent = 'Ver Detalles';

      addToCartButton.className = 'btn btn-success add-to-cart-button';
      addToCartButton.dataset.index = index;
      addToCartButton.textContent = 'Agregar al Carrito';

      viewProductButton.addEventListener('click', () => {
        openProductModal(index);
      });

      addToCartButton.addEventListener('click', () => {
        addToCart(index);
      });

      listItem.appendChild(productImage);
      listItem.appendChild(productName);
      listItem.appendChild(productDescription);
      listItem.appendChild(productPrice);
      listItem.appendChild(viewProductButton);
      listItem.appendChild(addToCartButton);

      productList.appendChild(listItem);
    });
  }

  //----------------  Actualizar carrito ----------------//

  function updateCartSummary() {
    cartCount.textContent = cartProducts.length;

    cartTotalPrice = cartProducts.reduce((total, product) => {
      return total + product.price;
    }, 0);

    cartTotal.textContent = cartTotalPrice.toFixed(2);
  }

  //---------------- Listeners a los botones de filtrado ----------------//

  function addFilterListeners() {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const category = button.dataset.category;
        renderProductList(category);
      });
    });
  }

  //---------------- Abrir el modal de un producto ----------------//

  function openProductModal(index) {
    const product = products[index];

    productModalTitle.textContent = product.name;
    productModalDescription.textContent = product.description;
    productModalPrice.textContent = `Precio: $${product.price.toFixed(2)}`;
    addToCartModalButton.dataset.index = index;

    productModal.style.display = 'block';
  }

  //---------------- Cerrar el modal de un producto ----------------//

  function closeProductModal() {
    productModal.style.display = 'none';
  }

  //---------------- Abrir el modal del carrito ----------------//

  function openCartModal() {
    while (cartProductList.firstChild) {
      cartProductList.firstChild.remove();
    }

    cartProducts.forEach((product, index) => {
      const listItem = document.createElement('li');
      const productName = document.createElement('h3');
      const productPrice = document.createElement('p');
      const removeFromCartButton = document.createElement('button');

      productName.textContent = product.name;

      productPrice.textContent = `Precio: $${product.price.toFixed(2)}`;

      removeFromCartButton.className = 'btn btn-danger remove-from-cart-button';
      removeFromCartButton.dataset.index = index;
      removeFromCartButton.textContent = 'Eliminar';

      removeFromCartButton.addEventListener('click', () => {
        removeFromCart(index);
      });

      listItem.appendChild(productName);
      listItem.appendChild(productPrice);
      listItem.appendChild(removeFromCartButton);

      cartProductList.appendChild(listItem);
    });

    cartModalTotal.textContent = `Total a pagar: $${cartTotalPrice.toFixed(2)}`;

    cartModal.style.display = 'block';
  }

  //---------------- Cerrar el modal del carrito ----------------//

  function closeCartModal() {
    cartModal.style.display = 'none';
  }

  //---------------- Agregar un producto ----------------//

  function addToCart(index) {
    const product = products[index];
    cartProducts.push(product);
    updateCartSummary();
  }  

  //---------------- Eliminar un producto ----------------//

  function removeFromCart(index) {
    cartProducts.splice(index, 1);
    updateCartSummary();
    openCartModal();
  }

  //---------------- Vaciar el carrito ----------------//

  function clearCart() {
    cartProducts = [];
    updateCartSummary();
    openCartModal();
  }

  //---------------- Listeners para los botones y eventos ----------------//

  addToCartModalButton.addEventListener('click', () => {
    const index = parseInt(addToCartModalButton.dataset.index);
    addToCart(index);
    updateCartSummary();
  });

  showCartButton.addEventListener('click', openCartModal);

  clearCartButton.addEventListener('click', clearCart);

  productModalClose.addEventListener('click', closeProductModal);

  cartModalClose.addEventListener('click', closeCartModal);

  //---------------- Inicializar la página ----------------//

  initializePage();
});

 //--------------------------------//
