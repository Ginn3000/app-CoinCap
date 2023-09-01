const superagent = require('superagent');
const base = 'https://api.coincap.io/v2/assets';

const findCoins = async (coin) => {
    try {
        const coinURL = `${base}?search=${coin}`;
        const res = await superagent.get(coinURL);

        return res.body;
    } catch (error) {
        console.log(error);
    }
};

const showCoin = async (coinID) => {
    try {
        const coinURL = `${base}/${coinID}`;
        const res = await superagent.get(coinURL);

        return res.body;
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    findCoins,
    showCoin
};