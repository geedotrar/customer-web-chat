import db from '../models/index.js';
import { successResponse, errorResponse } from '../utils/response.js';

const { Lead } = db;

export const createLead = async (req, res) => {
  const { name, phone, email, loanType } = req.body;
  try {
    const lead = await Lead.create({ name, phone, email, loanType });
    return successResponse(res, 201, "Lead created successfully", lead, false);
  } catch (error) {
    return errorResponse(res, 500, "Internal Server Error");
  }
};

export const getLeads = async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  
  try {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const offset = (pageNumber - 1) * limitNumber; 

    const { count, rows } = await Lead.findAndCountAll({
      limit: limitNumber,
      offset: offset,
      order: [['createdAt', 'DESC']],
    });

    const totalPages = Math.ceil(count / limitNumber);

    return successResponse(res, 200, "Leads retrieved successfully", {
      leads: rows,
      pagination: {
        currentPage: pageNumber,
        totalPages: totalPages,
        totalLeads: count,
        limit: limitNumber,
      }
    }, false);

  } catch (error) {
    return errorResponse(res, 500, "Internal Server Error");
  }
};
