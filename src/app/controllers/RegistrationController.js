/* eslint-disable camelcase */
/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
import * as Yup from 'yup';
import Registration from '../models/Registration';

class RegistrationController {
  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
      end_date: Yup.date(),
      price: Yup.number().min(0),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Invalid' });
    }

    const {
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    } = await Registration.create(req.body);

    return res.json(student_id, plan_id, start_date, end_date, price);
  }
}

export default new RegistrationController();
