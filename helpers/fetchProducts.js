const fetchProducts = async (paran) => {
  const url = (iten) => fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${iten}`)
  .then((Response) => Response.json());

  try {
  const url2 = await url(paran);
  // const { results } = url2;
  return url2;
  } catch (error) {
    console.log(error);
  }
};
fetchProducts('computador');

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
