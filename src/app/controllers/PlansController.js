/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */

import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlansController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required().min(0),
      price: Yup.number().required().min(0),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Invalid fields to create a plan' });
    }


    const planExists = await Plan.findOne({
      where: {
        title: req.body.title,
        duration: req.body.duration,
        price: req.body.price,
      },
    });

    if (planExists) {
      return res.status(400).json({ error: 'This plan already exists' });
    }

    const {
      id, title, duration, price,
    } = await Plan.create(req.body);


    return res.json({
      id, title, duration, price,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      duration: Yup.number(),
      price: Yup.number(),
    });

    const { id } = req.params;

    if (!(await Plan.findByPk(id))) {
      return res.status(400).json({ error: 'This plan does not exist to update' });
    }

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Invalid fields to update a Plan' });
    }

    const planExists = await Plan.findOne({
      where: {
        title: req.body.title,
        duration: req.body.duration,
        price: req.body.price,
      },
    });

    if (planExists) {
      return res.status(400).json({ error: 'You do not change any field' });
    }

    const {
      title, duration, price,
    } = await Plan.update(req.body, { where: { id } });

    return res.json({
      id,
      title,
      duration,
      price,
    });
  }

  async index(req, res) {
    const { page = 1 } = req.query;

    const plans = await Plan.findAll({
      order: ['id'],
      attributes: ['id', 'title', 'duration', 'price'],
      limit: 10,
      offset: (page - 1) * 10,
    });

    return res.json(plans);
  }

  async delete(req, res) {
    const plan = await Plan.findByPk(req.params.id);
    if (!plan) {
      return res.status(400).json({ error: 'This plan does not exists to delete' });
    }
    const {
      ìd, title, duration, price,
    } = await Plan.destroy({ where: { id: req.params.id } });

    return res.json({
      ìd, title, duration, price,
    });
  }
}

export default new PlansController();
