/* eslint-disable no-undef */
/* eslint-disable camelcase */
/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
import * as Yup from 'yup';
import {
  isBefore, parseISO, addMonths, format,
} from 'date-fns';
import pt from 'date-fns/locale/pt';
import Registration from '../models/Registration';
import Student from '../models/Student';
import Plan from '../models/Plan';

import Mail from '../../lib/Mail';


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

    const student = await Student.findOne({
      where: { id: student_id },
    });

    if (!getPlan) {
      return res.status(401).json({ error: 'Plan does not exists' });
    }

    if (!student) {
      return res.status(401).json({ error: 'Student does not exists' });
    }

    if (isBefore(parseISO(start_date), new Date())) {
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

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Informações de matrícula',
      template: 'registration',
      context: {
        student: student.name,
        plan: getPlan.title,
        start_date: format(
          parseISO(start_date),
          "'dia' dd 'de' MMMM' , às' H:mm'h'",
          { locale: pt },
        ),
        end_date: format(
          final_date,
          "'dia' dd 'de' MMMM' , às' H:mm'h'",
          { locale: pt },
        ),
        price: full_price,
      },
    });

    return res.json(registration);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number(),
      plan_id: Yup.number(),
      start_date: Yup.date(),
      end_date: Yup.date(),
      price: Yup.number().min(0),
    });


    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Invalid' });
    }

    const { id } = req.params;

    if (!(await Registration.findByPk(id))) {
      return res.status(400).json({ error: 'Registration not exists' });
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

    const registration = await Registration.update({
      student_id,
      plan_id,
      start_date,
      end_date: final_date.toDateString(),
      price: full_price,
    },
    {
      where: { id },
    });

    return res.json(registration);
  }

  async index(req, res) {
    const { page = 1 } = req.query;

    const { id } = req.params;

    if (!(isNaN(id))) {
      const registration = await Registration.findByPk(id);
      if (!registration) {
        return res.status(400).json({ error: 'There is no registration with this id' });
      }
      return res.json(registration);
    }
    const registrations = await Registration.findAll({
      order: ['id'],
      attributes: ['start_date', 'end_date', 'price'],
      limit: 10,
      offset: (page - 1) * 10,
      include: [
        {
          model: Student,

          attributes: ['name', 'email', 'idade', 'peso'],
        },
        {
          model: Plan,

          attributes: ['title', 'duration', 'price'],
        },
      ],

    });
    return res.json(registrations);
  }

  async delete(req, res) {
    const registration = await Registration.findByPk(req.params.id);
    if (!registration) {
      return res.status(400).json({ error: 'This registration does not exists to delete' });
    }

    const {
      id, start_date, end_date, price,
    } = await Registration.destroy({ where: { id: req.params.id } });

    return res.json({
      id, start_date, end_date, price,
    });
  }
}

export default new RegistrationController();
