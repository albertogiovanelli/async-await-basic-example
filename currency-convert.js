const axios = require('axios');

const getExchangeRate = async(from, to) => {
    try {
        const response = await axios.get(`http://api.fixer.io/latest?base=${from}`);
        console.log(response.data.rates);
        const rate = response.data.rates[to];
        if (rate) {
            return rate;
        } else {
            throw new Error(`Unable to get exchange rate for ${from} and ${to}`);
        }
    } catch (e) {
        throw new Error(`Unable to get exchange rate for ${from} and ${to}`);
    }
}

const getCountries = async(currencyCode) => {
    try {
        const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
        return response.data.map((country) => country.name);
    } catch (e) {
        throw new Error(`Unable to get countries that use ${currencyCode} as currency code.`);
    }

}

const convertCurrency = async(from, to, amount) => {
    const countries = await getCountries(to);
    const rate = await getExchangeRate(from, to);
    const exchangeAmount = rate * amount;

    return `${amount} ${from} is worth ${exchangeAmount} ${to}. You can spend these in the following countries : ${countries}`;
}

convertCurrency('EUR', 'AED', 20000)
    .then((response) => {
        console.log(response);
    })
    .catch((err) => console.log(err.message));