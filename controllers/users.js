const {response} = require('express');
const Usuario = require('../models/UserModel');


const getUsers = async(req, res = response) => {

  try {

    const users = await Usuario.find({}, {name: 1});

    if (!users) {
      return res.status(400).json({
        ok: false,
        msg: 'No hay usuarios.'
      });
    }

    res.status(200).json({
      ok: true,
      users,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el admin'
    });
  }

};



module.exports = {
  getUsers,
};
