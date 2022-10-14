const saveCartItems = (paran) => {
  localStorage.setItem('cartItems', paran);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
