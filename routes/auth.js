/*
  Rutas de usuario / Auth
  host + /v1/api/auth
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { fieldValidate } = require('../middlewares/field-validators');
const { createUser, loginUser, revalidateToken } = require('../controllers/auth');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();


router.post(
  '/new',
  [ // middlewares
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe de ser de 6 caracteres').isLength({min: 6}),
    fieldValidate
  ],
  createUser
);


router.post('/',
  [ // middlewares
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    fieldValidate
  ],
  loginUser
);


router.get('/renew', validateJWT, revalidateToken);



module.exports = router;
