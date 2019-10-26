/* eslint-disable no-undef */
/* eslint-disable camelcase */
/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
import * as Yup from 'yup';
import {
  startOfHour, parseISO, isBefore, format, subHours, addMonths,
} from 'date-fns';
import Registration from '../models/Registration';
import Student from '../models/Student';
import Plan from '../models/Plan';


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

    const { plan_id, start_date, student_id } = req.body;

    const getPlan = await Plan.findOne({
      where: { id: plan_id },
    });

    const studentExists = await Student.findOne({
      where: { id: student_id },
    });

    if (!getPlan) {
      return res.status(401).json({ error: 'Plan does not exists' });
    }

    if (!studentExists) {
      return res.status(401).json({ error: 'Student does not exists' });
    }

    if (isBefore(start_date, new Date())) {
      return res.status(400).json({ error: 'past dates are not permited' });
    }

    const final_date = addMonths(parseISO(start_date), getPlan.duration);

    const full_price = getPlan.price * getPlan.duration;


    const registration = await Registration.create({
      student_id,
      plan_id,
      start_date,
      end_date: final_date.toDateString(),
      price: full_price,
    });

    return res.json(registration);
  }
}

export default new RegistrationController();
