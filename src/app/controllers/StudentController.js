/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */

import * as Yup from 'yup';

import Student from '../models/Student';

class StudentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      idade: Yup.number().required().moreThan(0),
      peso: Yup.number().min(2).moreThan(0),
      altura: Yup.number().moreThan(0),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Miss field data' });
    }

    const {
      id, name, email, idade, peso, altura,
    } = await Student.create(req.body);
    return res.json({
      id,
      name,
      email,
      idade,
      peso,
      altura,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string(),
      idade: Yup.number().moreThan(0),
      peso: Yup.number().min(2).moreThan(0),
      altura: Yup.number().moreThan(0),
    });

    const { id } = req.params;

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Fails' });
    }
    const { email } = req.body;

    const student = await Student.findByPk(id);
    if (email !== student.email) {
      const studentExists = await Student.findOne({ where: { email } });

      if (studentExists) {
        return res.status(400).json({ error: 'User already exists ' });
      }
    }

    const {
      name, idade, peso, altura,
    } = await Student.update(req.body, { where: { id } });

    return res.json({
      name,
      email,
      idade,
      peso,
      altura,
    });
  }
}

export default new StudentController();
