// Esse tipo de comentário que estão antes de todas as funções são chamados de JSdoc,
// experimente passar o mouse sobre o nome das funções e verá que elas possuem descrições! 

// Fique a vontade para modificar o código já escrito e criar suas próprias funções!

/**
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 */

 const cartItens = document.querySelector('.cart__items');
 const sectionItens = document.querySelector('.items');
 let itensCart = [];
 
const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const handleLoading = (local) => {
  const span = document.createElement('span');
  span.className = 'loading';
  span.innerText = 'carregando...';
  local.appendChild(span);
};

const removeLoading = (local) => {
  const spanLoading = document.querySelector('.loading');
  local.removeChild(spanLoading);
};

/**
 * Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} ID do produto.
 */
 // const getIdFromProductItem = (product) => product.querySelector('span.id').innerText;

/**
 * Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
 */
const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const totalPriceItensCart = () => {
  const span = document.querySelector('.total-price');
  const lis = document.querySelectorAll('.cart__item');
  let sum = 0;
  lis.forEach((iten) => {
    sum += iten.price;
  });
  span.innerText = `Valor Total: R$ ${sum}`;
};

const cartItemClickListener = (event) => {
  itensCart = getSavedCartItems();
  const eventTarget = event.target;
  cartItens.removeChild(eventTarget);
  const idRemovedItenCart = eventTarget.innerText.substring(4, 17);
  itensCart = itensCart.filter((iten) => iten.id !== idRemovedItenCart);
  saveCartItems(JSON.stringify(itensCart));
  totalPriceItensCart();
  // console.log(spliced);
};

/**
 * Função responsável por criar e retornar um item do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @returns {Element} Elemento de um item do carrinho.
 */
const createCartItemElement = ({ id, title, price }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  li.price = price;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const addItenToCart = async (button) => {
  handleLoading(cartItens);
  const product = await fetchItem(button.itenId);
  removeLoading(cartItens);
  cartItens.appendChild(createCartItemElement(product));
  itensCart.push(product);
  totalPriceItensCart();
  saveCartItems(JSON.stringify(itensCart));
};

/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto. 
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @returns {Element} Elemento de produto.
 */
const createProductItemElement = ({ id, title, thumbnail }) => {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  const button = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  button.itenId = id;
  button.addEventListener('click', () => addItenToCart(button));
  section.appendChild(button);
  return section;
};

const objectApi = async () => {
  handleLoading(sectionItens);
  const obj = await fetchProducts('computador');
  removeLoading(sectionItens);
    obj.results.reduce((acc, { id, title, thumbnail }) => {
      sectionItens.appendChild(createProductItemElement({ id, title, thumbnail }));
      // console.log(cur.thumbnail);
      return acc;
    }, '');
};

const reloadCart = () => {
  if (!localStorage.getItem('cartItems')) {
    saveCartItems('[]');
  } else {
    const cartItensLocalStorage = getSavedCartItems();
    itensCart = getSavedCartItems();
    cartItensLocalStorage.forEach((iten) => {
    cartItens.appendChild(createCartItemElement(iten));
    });
    totalPriceItensCart();
  }
};
const buttonClear = document.querySelector('.empty-cart');

const cartCleanerButton = () => {
  cartItens.innerText = '';
  totalPriceItensCart();
  localStorage.clear();
};

buttonClear.addEventListener('click', cartCleanerButton);

window.onload = () => { 
  objectApi();
  reloadCart();
};
// comentario
