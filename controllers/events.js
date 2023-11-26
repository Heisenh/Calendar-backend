const {response} = require('express');
const EventModel = require('../models/EventModel');


const msgError500 = 'Por favor hable con el admin';


const getEvents = async(req, res = response) => {

  const events = await EventModel.find()
                                 .populate('user', ' name');

  try {

    res.status(201).json({
      ok: true,
      events
    });

    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: msgError500
    });
  }

};


const createEvent = async(req, res = response) => {

  const event = EventModel(req.body);

  try {
    
    event.user = req.uid;

    const eventSaved = await event.save();

    res.status(201).json({
      ok: true,
      event: eventSaved
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: msgError500
    });
  }

};


const updateEvent = async(req, res = response) => {

  const eventId = req.params.id;
  const {uid} = req;

  try {
    
    const event = await EventModel.findById(eventId);

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: 'El evento no existe'
      });
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'El usuario no tiene permisos para esta acción'
      });
    }

    const newEvent = {
      ...req.body,
      user: uid
    }

    const eventUpdated = await EventModel.findByIdAndUpdate(eventId, newEvent);

    res.json({
      ok: true,
      event: eventUpdated
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: msgError500
    });
  }

};


const deleteEvent = async(req, res = response) => {

  const eventId = req.params.id;
  const {uid} = req;

  try {
    
    const event = await EventModel.findById(eventId);

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: 'El evento no existe'
      });
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'El usuario no tiene permisos para esta acción'
      });
    }


    await EventModel.findByIdAndDelete(eventId);

    res.json({
      ok: true
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: msgError500
    });
  }

};


module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent
}
