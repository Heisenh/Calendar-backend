/*
  Rutas de eventos / events
  host + /v1/api/events
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { validateJWT } = require('../middlewares/validate-jwt');
const { getEvents, createEvent, updateEvent, deleteEvent, getEventsByUser } = require('../controllers/events');
const { fieldValidate } = require('../middlewares/field-validators');
const { isDate } = require('../helpers/isDate');

const router = Router();

router.use(validateJWT);


router.get('/', getEvents);

router.post('/',
  [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'La fecha de inicio es obligatoria').custom(isDate),
    check('end', 'La fecha fin es obligatorio').custom(isDate),
    fieldValidate
  ],
  createEvent
);

router.put('/:id', updateEvent);

router.delete('/:id', deleteEvent);

router.get('/getEventsByUser', getEventsByUser);


module.exports = router;
