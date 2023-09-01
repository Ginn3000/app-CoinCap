const router = require('express').Router();

const database = require('../db');


router.get('/', async (req, res) => {
    try {
        const { query } = req;
        const { searchTerm = ''} = query;

        const ending = await database.find('Results', searchTerm);
        let results = ending
        if(results.length==0) {
            results = {error: "Not Found"}
        }
        res.json(results);
    } catch (error) {
        res.status(500).json(error.toString());
    }
});

module.exports = router;
