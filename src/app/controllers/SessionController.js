/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import authConfig from '../../config/auth';
import User from '../models/User';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });


    const { email, password } = req.body;

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Invalid User' });
    }
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'Check your user.' });
    }

    if (!(await user.checkPassWord(password))) {
      return res.status(401).json({ error: 'Invalid Password. Please try again' });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
