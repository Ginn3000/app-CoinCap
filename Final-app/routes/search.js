const router = require("express").Router();
const database = require("../db");
const api = require("Final-module");

const _formatCoins = (coins) => {
    return coins.data.map((coin) => {
        return {
            display: `${coin.name}`,
            id: `${coin.id}`,
        };
    });
};

router.use((req, res, next) => {
    const { headers, originalUrl, query } = req;
    const splitUrl = originalUrl.split('/').filter((str) => str !== '');
    const [first, second] = splitUrl;

    query.metadata = {
        agent: headers['user-agent'],
        searched: new Date()
    }
    next();
});

router.get('/', async (req, res) => {
    try {
        const { query } = req;
        const { lib = "", metadata } = query;

        const coin_list = await api.findCoins(lib);
        const coin_format = _formatCoins(coin_list);
        const searchCount = coin_format.length;
        const results = { searchTerm: lib, results: coin_format };
        const final = await database.find('Results', lib);
        res.json(results);
        if (final.length == 0) {
            database.save('Results', { searchTerm: lib, searchCount: searchCount, lastSearched: metadata.searched });
        } else {
            database.update('Results', lib, {lastSearched: metadata.searched});
        }
    } catch (error) {
        res.status(500).json(error.toString());
    }
});

router.get('/:id/details', async (req, res) => {
    try {
        const { params, query } = req;
        const { id } = params;
        const { searched = ''} = query;

        const detailed_coin = await api.showCoin(id);
        const display = detailed_coin.data.name;
        const final = await database.find('Results', searched);

        if ('selections' in final[0]) {
            const temp = [...final[0].selections, {id: id, display: display}];
            database.update('Results', searched, {selections: temp});
        } else {
            database.update('Results', searched,  { selections: [{id: id, display: display}] });
        }

        res.json(detailed_coin);
    } catch (error) {
        res.status(500).json(error.toString());
    }
});

module.exports = router;