import getPrices from './javascript/currency';

$('button').on('click', () => {
  const price = $('input').val();

  getPrices(price, (prices) => {
    const books = prices.map((price) => {
      return `<li>${price[0]}</li>`;
    });

    $('ul').html(books);
  });
});