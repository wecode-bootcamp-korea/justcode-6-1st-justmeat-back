const { Equal } = require("typeorm");
const user = require("../services/userservice");

const createUser = async (req, res) => {
  const { email, password, pwconfirm, name, phone, verification } = req.body;
  const hasKey = { email: false, password: false, pwconfirm: false, name: false, phone: false, verification: false };
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
      res.status(400).json({ message: `Not Found ${key}` });
      return;
    }
  }

  try {
    const userData = await user.createUser1(email);
    const userPhone = await user.existedphone(phone);

    if (userData) {
      return res.status(400).json({ message: "EXISTED_USER" })
    }
    if (userPhone) {
      return res.status(400).json({ message: "EXISTED_PHONENUMBER" })
    }

    if (!(email.includes('@'))) {
      return res.status(400).json({ message: "Email_INVALID" });
    }
    if (password.length < 8) {
      return res.status(400).json({ message: "Password_INVALID" });
    }

    if (!(password === pwconfirm)) {
      return res.status(400).json({ message: "Different_Password" })
    }

    await user.createUser(email, password, name, phone)
    res.status(201).json({ message: 'userCreated' });
  }


  catch (err) {
    console.log(err)
    res.status(err.statusCode || 500).json(err.message)
  }
};

const confirmNum = async (req, res) => {
  const { phone } = req.body;

  try {
    const userPhone = await user.existedphone(phone);

    if (userPhone) {
      return res.status(401).json({ message: "존재하는 핸드폰 번호 입니다" })
    }
    if (!userPhone) {
      return res.status(201).json({ message: "wdtpid!DUCT7mk4" })
    }
  }
  catch (err) {
    console.log(err)
    res.status(err.statusCode || 500).json(err.message)
  }
}

const login = async (req, res) => {
  const { email, password } = req.body;
  const hasKey = { email: false, password: false };
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
      res.status(400).json({ message: `Not Found ${key}` });
      return;
    }
  }

  try {
    const token = await user.login(email, password)
    console.log(token)
    res.status(200).json({ message: 'LOGIN_SUCCESS', token })
  }
  catch (err) {
    console.log(err)
    res.status(err.statusCode || 500).json(err.message)
  }
}

module.exports = { createUser, confirmNum, login };
