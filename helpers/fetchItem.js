const url = (id) => fetch(`https://api.mercadolibre.com/items/${id}`)
.then((Response) => Response.json());

const fetchItem = async (paran) => {
  try {
  const url2 = await url(paran);
  return url2;
  } catch (e) {
    console.log(e);
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
