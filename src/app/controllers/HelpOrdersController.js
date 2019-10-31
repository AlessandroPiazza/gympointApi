/* eslint-disable no-undef */
/* eslint-disable camelcase */
/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
import * as Yup from 'yup';
import {
  isBefore, parseISO, addMonths, format,
} from 'date-fns';
import HelpOrders from '../models/HelpOrders';
import Student from '../models/Student';


class HelpOrdersController {
  async store(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Invalid' });
    }

    const { id } = req.params;

    const studentExists = Student.findOne({
      where: { id },
    });

    if (!studentExists) {
      return res.status(401).json({ error: 'Student does not exists' });
    }

    const { question } = req.body;

    const helpOrders = await HelpOrders.create({
      student_id: id,
      question,
    });

    return res.json(helpOrders);
  }

  async index(req, res) {
    const { page = 1 } = req.query;

    const { id } = req.params;

    const helporders = await HelpOrders.findAll({
      order: ['id'],
      attributes: ['question', 'answer'],
      limit: 10,
      offset: (page - 1) * 10,
      where: { student_id: id },
      include: [
        {
          model: Student,
          attributes: ['name', 'email', 'idade', 'peso'],
        },
      ],

    });
    return res.json(helporders);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      answer: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Invalid' });
    }

    const { id } = req.params;

    if (!(await HelpOrders.findByPk(id))) {
      return res.status(400).json({ error: 'Help-orders not exists' });
    }

    const { answer } = req.body;

    const helpOrder = await HelpOrders.update({
      answer,
      answer_at: new Date(),
    },
    {
      where: { id },
    });


    return res.json(helpOrder);
  }
}

export default new HelpOrdersController();
