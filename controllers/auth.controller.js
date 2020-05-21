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

// @route   POST api/auth/login
// @desc    Login user
// @access  Public
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Simple validation
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, msg: 'Please enter all fields' });
    }

    // Check for existing user
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, msg: 'User does not exists' });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);

    // password wrong
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, msg: 'Invalid credentials' });
    }

    const EXPIRES_ONE_HOUR = 3600;

    const token = await jwt.sign(
      //
      { id: user._id },
      //
      process.env.JWT_SECRET,
      {
        expiresIn: EXPIRES_ONE_HOUR,
      },
    );

    return res.status(200).json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// @route   POST api/auth/user
// @desc    Get use data
// @access  Private
const user_info = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const AuthController = {
  login,
  user_info,
};
module.exports = AuthController;
