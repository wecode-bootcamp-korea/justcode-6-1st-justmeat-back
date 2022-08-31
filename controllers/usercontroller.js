const user = require("../services/userService");

const createUser = async (req, res) => {
  const { email, password, name, phone } = req.body;
  const hasKey = { email: false, password: false, name: false, phone: false };
  const requireKey = Object.keys(hasKey);

  Object.entries(req.body).forEach((keyValue) => {
    const [key, value] = keyValue;
    if (requireKey.includes(key) && value) {
      hasKey[key] = true;
    }
  })
  const hasKeyArray = Object.entries(hasKey);
  for (let i = 0; i < hasKeyArray.length; i++) {
    const [key, value] = hasKeyArray[i];
    if (!value) {
      res.status(400).json({ message: `${key}이/가 없습니다.` });
      return;
    }
  }


  try {

    const userData = await user.createUser1(email);

    if (userData) {
      return res.status(400).json({ message: "EXISTED_USER" })
    }

    if (!email.includes('@')) {
      res.status(400).json('Email_INVALID');

    }
    // if (password.length < 10) {
    //   throw new Error('PASSWORD_INVALID')
    // }

    //

    await user.createUser(email, password, name, phone);

    res.status(201).json({ message: 'userCreated' });
  }
  catch (err) {
    console.log(err)
    return res.json
    //res.status(500).json({ message: "Error userCreated " });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userData = await user.login(email, password);

    if (!userData.user.email) {
      return res.status(400).json({ message: "NO_USER" })
    }
    if (!userData.login.isPasswordCorrect) {
      return res.stauts(400).json({ message: "INVALID PASSWORD" })
    }

    const token = await user.login.token
    res.status(200).json({ message: 'LOGIN_SUCCESS', token })
  }
  catch (err) {
    console.log(err)
    res.status(err.statusCode || 500).json(err.message)
  }
}


module.exports = { createUser, login };
