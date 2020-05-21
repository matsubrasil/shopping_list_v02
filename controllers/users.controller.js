const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const User = require('./../models/User');
dotenv.config({ path: './../config/config.env' });

/*
400 Bad Request
    Essa resposta significa que o servidor não entendeu a requisição pois está com uma sintaxe inválida.
401 Unauthorized
    Embora o padrão HTTP especifique "unauthorized", semanticamente, essa resposta significa "unauthenticated". Ou seja, o cliente deve se autenticar para obter a resposta solicitada.
402 Payment Required 
    Este código de resposta está reservado para uso futuro. O objetivo inicial da criação deste código era usá-lo para sistemas digitais de pagamento porém ele não está sendo usado atualmente.
403 Forbidden
    O cliente não tem direitos de acesso ao conteúdo portanto o servidor está rejeitando dar a resposta. Diferente do código 401, aqui a identidade do cliente é conhecida.
404 Not Found
    O servidor não pode encontrar o recurso solicitado. Este código de resposta talvez seja o mais famoso devido à frequência com que acontece na web.
*/

// @route   POST api/users
// @desc    Register new user
// @access  Public
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Simple validation
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, msg: 'Please enter all fields' });
    }

    // Check for existing user
    const user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ success: false, msg: 'User already exists' });
    }

    const newUser = new User({
      name,
      email,
      password,
    });
    // Create salt & hash
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newUser.password, salt);
    newUser.password = hash;

    const response = await newUser.save();

    // console.log('process', process.env.JWT_SECRET);

    // console.log('response ==>', response);
    const EXPIRES_ONE_HOUR = 3600;

    const token = await jwt.sign(
      //
      { id: response._id },
      //
      process.env.JWT_SECRET,
      //
      {
        expiresIn: EXPIRES_ONE_HOUR,
      },
    );

    return res.status(200).json({
      success: true,
      token,
      user: {
        id: response._id,
        name: response.name,
        email: response.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// @route   GET api/users
// @desc    Register new user
// @access  Public

const index = async (req, res) => {
  try {
    // Check for existing user
    const users = await User.find()
      .select({ _id: 1, name: 1, email: 1, register_date: 1, register_date: 1 })
      .sort('email');
    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const UsersController = {
  register,
  index,
};
module.exports = UsersController;
