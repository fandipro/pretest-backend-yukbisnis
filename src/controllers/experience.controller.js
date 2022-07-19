const { v4: uuidv4 } = require('uuid');
const userModel = require('../models/user.model');
const experienceModel = require('../models/experience.model');
const { success, failed } = require('../helpers/response');
const pagination = require('../utils/pagination');

module.exports = {
  list: async (req, res) => {
    try {
      let { field, search, sort, sortType, page, limit } = req.query;
      field = field || 'company';
      search = search || '';
      sort = sort || 'created_at';
      sortType = sortType || 'DESC';
      page = Number(page) || 1;
      limit = Number(limit) || 3;

      const offset = page * limit - limit;
      const count = await experienceModel.getCountExperience();

      const result = await experienceModel.getAllExperience(
        field,
        search,
        sort,
        sortType,
        limit,
        offset
      );

      if (!result.rowCount) {
        return failed(res, {
          code: 404,
          message: 'Data not found',
          error: 'Not Found',
        });
      }

      // Pagination with search
      if (search) {
        const paging = pagination(result.rowCount, page, limit);
        return success(res, {
          code: 200,
          message: `Success get data experience`,
          data: result.rows,
          pagination: paging.response,
        });
      }

      // Pagination without search
      const paging = pagination(Number(count), page, limit);
      return success(res, {
        code: 200,
        message: `Success get data experience`,
        data: result.rows,
        pagination: paging.response,
      });
    } catch (error) {
      return failed(res, {
        code: 500,
        message: error.message,
        error: 'Internal Server Error',
      });
    }
  },
  detail: async (req, res) => {
    try {
      const { id } = req.params;
      const experience = await experienceModel.findBy('id', id);

      if (!experience.rowCount) {
        failed(res, {
          code: 404,
          message: `Experience with id ${id} not found !`,
          error: 'Not Found',
        });
      }

      return success(res, {
        code: 200,
        message: 'Success get detail experience',
        data: experience.rows[0],
      });
    } catch (error) {
      return failed(res, {
        code: 500,
        message: error.message,
        error: 'Internal Server Error',
      });
    }
  },
  store: async (req, res) => {
    try {
      const user = await userModel.findBy('id', req.body.userId);
      // if user not exist
      if (!user.rowCount) {
        return failed(res, {
          code: 404,
          message: `User with id ${req.body.userId} not found`,
          error: 'Not Found',
        });
      }

      // create new object
      const data = {
        id: uuidv4(),
        ...req.body,
      };

      // send object to model
      const result = await experienceModel.createExperience(data);

      // response REST API success
      return success(res, {
        code: 200,
        message: 'Success create experience',
        data: result,
      });
    } catch (error) {
      return failed(res, {
        code: 500,
        message: error.message,
        error: 'Internal Server Error',
      });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      console.log(id);

      const experience = await experienceModel.findBy('id', id);
      // if experience not exist
      if (!experience.rowCount) {
        return failed(res, {
          code: 404,
          message: `Experience with id ${id} not found`,
          error: 'Not Found',
        });
      }

      const user = await userModel.findBy('id', req.body.userId);
      // if user not exist
      if (!user.rowCount) {
        return failed(res, {
          code: 404,
          message: `User with id ${req.body.userId} not found`,
          error: 'Not Found',
        });
      }

      const data = {
        ...req.body,
        updatedAt: new Date(Date.now()),
      };

      const result = await experienceModel.updateExperience(data, id);
      return success(res, {
        code: 200,
        message: 'Success update experience',
        data: result,
      });
    } catch (error) {
      return failed(res, {
        code: 500,
        message: error.message,
        error: 'Internal Server Error',
      });
    }
  },
  destroy: async (req, res) => {
    try {
      const { id } = req.params;

      const experience = await experienceModel.findBy('id', id);
      if (!experience.rowCount) {
        return failed(res, {
          code: 404,
          message: `Experience with id ${id} not found !`,
          error: 'Not Found',
        });
      }

      await experienceModel.deleteExperience(id);
      return success(res, {
        code: 200,
        message: 'Success delete experience',
        data: null,
      });
    } catch (error) {
      return failed(res, {
        code: 500,
        message: error.message,
        error: 'Internal Server Error',
      });
    }
  },
};
