const {response} = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/UserModel');
const { generateJWT } = require('../helpers/jwt');


const createUser = async(req, res = response) => {

  const {email, password} = req.body;

  try {

    let user = await Usuario.findOne({email});

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: 'El usuario ya existe'
      });
    }

    user = new Usuario(req.body);

    // Encrypt password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    // Generar JWT
    const token = await generateJWT(user.id, user.name);

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el admin'
    });
  }

};


const loginUser = async(req, res = response) => {

  const {email, password} = req.body;

  try {

    const user = await Usuario.findOne({email});

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: 'El usuario no existe'
      });
    }

    // Confirmar el password
    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Password incorrecto'
      });
    }
    
    // Generar JWT
    const token = await generateJWT(user.id, user.name);

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token
    });

    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el admin'
    });
  }

};


const revalidateToken = async(req, res = response) => {

  const {uid, name} = req;
  const token = await generateJWT(uid, name);

  res.json({
    ok: true,
    uid,
    name,
    token
  });

};


module.exports = {
  createUser,
  loginUser,
  revalidateToken
};
