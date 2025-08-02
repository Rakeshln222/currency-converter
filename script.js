const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");

// Populate dropdowns with currency codes
const currencies = ["USD", "EUR", "INR", "GBP", "JPY", "CAD", "AUD", "CNY"];
currencies.forEach(cur => {
  fromCurrency.innerHTML += `<option value="${cur}">${cur}</option>`;
  toCurrency.innerHTML += `<option value="${cur}">${cur}</option>`;
});

fromCurrency.value = "USD";
toCurrency.value = "INR";

async function convertCurrency() {
  const amount = document.getElementById("amount").value;
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (!amount || amount <= 0) {
    document.getElementById("result").innerText = "Please enter a valid amount.";
    return;
  }

  try {
    const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
    const data = await res.json();
    const rate = data.rates[to];
    const converted = (amount * rate).toFixed(2);

    document.getElementById("result").innerText = `${amount} ${from} = ${converted} ${to}`;
  } catch (error) {
    document.getElementById("result").innerText = "Conversion failed. Try again.";
  }
}
