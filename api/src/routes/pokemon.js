const { Router } = require('express');
const {Pokemon, Type} = require('../db');
const axios = require('axios');

const router = Router();



module.exports = router;

const getApiPokemons = async ()=>{
    const apiInfo = await axios.get('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20');
    const pokemons = await apiInfo.data.results.map(e => {
        return {
            name: e.name
        }
    });
    return pokemons;
}

const getStatsPokemons = async (arr)=>{
    for(let i=0; i < arr.length; i++){
        const apiInfo = await axios.get('https://pokeapi.co/api/v2/pokemon/' + arr[i].name);
        arr[i] = {
            id: apiInfo.data.id,
            name: apiInfo.data.name,
            hp: apiInfo.data.stats[0].base_stat,
            attack: apiInfo.data.stats[1].base_stat,
            defense: apiInfo.data.stats[2].base_stat,
            speed: apiInfo.data.stats[5].base_stat,
            height: apiInfo.data.height,
            weight: apiInfo.data.weight,
            types: apiInfo.data.types.map(e => { return {name: e.type.name} },),
            img: apiInfo.data.sprites.other.home.front_default
        }
    }
    return arr;
}

const getDbPokemons = async () =>{
    return await Pokemon.findAll({
        include:{
            model: Type,
            attributes: ['name'],
            through: {
                attributes:[],
            }
        }
    });
}

const allPokemons = async ()=>{
    let apiPokemons = await getApiPokemons();
    let apiStatsPokemons = await getStatsPokemons(apiPokemons);

    let dbPokemons = await getDbPokemons();

    const allDataPokemons = dbPokemons.concat(apiStatsPokemons);
    return allDataPokemons;
}

//GET
router.get('/', async (req,res) =>{
    const pokemons = await allPokemons();
    let name = req.query.name;
    if(name){//url?name="..."
        let pokemonName = pokemons.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
        pokemonName.length?res.status(200).send(pokemonName):res.status(404).send("no se encontro el pokemon");
    }else{
        res.send(pokemons);
    }
});

//GET ID
router.get('/:id', async (req, res)=>{
    const id = req.params.id;
    const pokemons = await allPokemons();
    if(id){
        let pokemonId = await pokemons.filter(e => e.id == id);// ===?
        pokemonId.length?res.status(200).json(pokemonId):res.status(404).send("pokemon no encontrado");
    }
});

//POST
router.post('/', async (req,res)=>{
    let  {
        name,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        inDataBase,
        type
    } = req.body;

    let pokemonCreated = await Pokemon.create({
        name,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        inDataBase,
    });

    let dbType = await Type.findAll({
        where: {name: type}
    });

    pokemonCreated.addType(dbType);

    res.send('Pokemon creado');
});