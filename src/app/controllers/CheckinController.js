/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable linebreak-style */
import { subDays } from 'date-fns';
import Checkin from '../schemas/Checkin';
import Student from '../models/Student';

class CheckinController {
  async store(req, res) {
    const { id } = await req.params;


    if (isNaN(id)) {
      return res.status(400).json({ error: 'there is not a parameter' });
    }

    const studentExists = await Student.findOne({
      where: { id },
    });

    if (!studentExists) {
      return res.status(401).json({ error: 'Student does not exists' });
    }

    const date = new Date();

    const count = await Checkin.countDocuments({
      student_id: id,
      createdAt: {
        $gte: subDays(date, 7),
      },
    });

    if (count >= 5) {
      return res.status(400).json({ error: 'you can check-in only 5 times in 7 days' });
    }

    await Checkin.create({
      student_id: id,
    });

    return res.json({ msg: 'criado' });
  }

  async index(req, res) {
    const { id } = await req.params;


    if (isNaN(id)) {
      return res.status(400).json({ error: 'there is not a parameter' });
    }

    const studentExists = await Student.findOne({
      where: { id },
    });

    if (!studentExists) {
      return res.status(401).json({ error: 'Student does not exists' });
    }

    const checkins = await Checkin.find({
      student_id: id,
    });

    return res.json(checkins);
  }
}


export default new CheckinController();
