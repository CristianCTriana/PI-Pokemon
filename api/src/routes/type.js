const { default: axios } = require('axios');
const { Router } = require('express');
const {Type} = require('../db');



const router = Router();

router.get('/', async (req, res) => {
    const typesApi = await axios.get('https://pokeapi.co/api/v2/type');
    typesApi.data.results.forEach(e => {
        Type.findOrCreate({
            where: {name: e.name}
        })
    });
    const types = await Type.findAll();
    res.send(types);
});


module.exports = router;
