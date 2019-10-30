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
    return res.json();
  }

  async index(req, res) { return res.json(); }
}

export default new HelpOrdersController();
