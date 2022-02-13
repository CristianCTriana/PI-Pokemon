const { Router } = require('express');
const pokemonRout = require('./pokemon');
const typeRout = require('./type');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/pokemons', pokemonRout);
router.use('/types', typeRout);

module.exports = router;
