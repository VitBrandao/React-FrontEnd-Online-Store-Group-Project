export async function getCategories() {
  const URL = 'https://api.mercadolibre.com/sites/MLB/categories';
  const response = await fetch(URL);
  const JSON = await response.json();
  return JSON;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const URL = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}_ID&q=${query}`;
  const response = await fetch(URL);
  const JSON = await response.json();
  return JSON;
}
