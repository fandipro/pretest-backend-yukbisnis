const { v4: uuidv4 } = require('uuid');
const userModel = require('../models/user.model');
const educationModel = require('../models/education.model');
const experienceModel = require('../models/experience.model');
const { success, failed } = require('../helpers/response');
const pagination = require('../utils/pagination');
const deleteFile = require('../utils/deleteFile');

module.exports = {
  // Retrieve all users from the database.
  list: async (req, res) => {
    try {
      let { field, search, sort, sortType, page, limit } = req.query;
      field = field || 'name';
      search = search || '';
      sort = sort || 'created_at';
      sortType = sortType || 'DESC';
      page = Number(page) || 1;
      limit = Number(limit) || 3;

      const offset = page * limit - limit;
      const count = await userModel.getCountUser();

      const result = await userModel.getAllUser(
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
          message: `Success get data user`,
          data: result.rows,
          pagination: paging.response,
        });
      }

      // Pagination without search
      const paging = pagination(Number(count), page, limit);
      return success(res, {
        code: 200,
        message: `Success get data user`,
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
  // Find a single user with an id
  detail: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await userModel.findBy('id', id);

      if (!user.rowCount) {
        failed(res, {
          code: 404,
          message: `User with id ${id} not found !`,
          error: 'Not Found',
        });
      }

      return success(res, {
        code: 200,
        message: 'Success get detail user',
        data: user.rows[0],
      });
    } catch (error) {
      return failed(res, {
        code: 500,
        message: error.message,
        error: 'Internal Server Error',
      });
    }
  },
  // Find education by user id
  listEducation: async (req, res) => {
    try {
      let { id } = req.params;

      const user = await userModel.findBy('id', id);
      // if user not exist
      if (!user.rowCount) {
        return failed(res, {
          code: 404,
          message: `User with id ${id} not found`,
          error: 'Not Found',
        });
      }

      const result = await recipeModel.getRecipeByUser(id);
      redis.setex(`getUserRecipe:${id}`, 3600, JSON.stringify(result.rows));
      return success(res, {
        code: 200,
        message: 'Success get recipe user',
        data: result.rows,
      });
    } catch (error) {
      return failed(res, {
        code: 500,
        message: error.message,
        error: 'Internal Server Error',
      });
    }
  },
  // Find experience by user id
  listExperience: async (req, res) => {
    try {
      const { id } = req.params;

      const user = await userModel.findBy('id', id);
      // if user not exist
      if (!user.rowCount) {
        return failed(res, {
          code: 404,
          message: `User with id ${id} not found`,
          error: 'Not Found',
        });
      }

      const result = await likedRecipeModel.findBy('liked_recipes.user_id', id);

      redis.setex(
        `getLikedRecipeUser:${id}`,
        3600,
        JSON.stringify(result.rows)
      );

      return success(res, {
        code: 200,
        message: 'Success get liked recipe user',
        data: result.rows,
      });
    } catch (error) {
      return failed(res, {
        code: 500,
        message: error.message,
        error: 'Internal Server Error',
      });
    }
  },
  // Create new user
  store: async (req, res) => {
    try {
      const checkEmail = await userModel.findBy('email', req.body.email);
      if (checkEmail.rowCount > 0) {
        if (req.file) {
          deleteFile(req.file.path);
        }
        return failed(res, {
          code: 409,
          message: 'Email already exist',
          error: 'Conflict',
        });
      }

      // check phone number already exists
      const checkPhone = await userModel.findBy('phone_number', req.body.phone);
      if (checkPhone.rowCount > 0) {
        if (req.file) {
          deleteFile(req.file.path);
        }
        return failed(res, {
          code: 409,
          message: 'Phone Number already exist',
          error: 'Conflict',
        });
      }

      let photo = null;
      if (req.file) {
        photo = req.file ? req.file.filename : null;
      }

      // create new object
      const data = {
        id: uuidv4(),
        photo,
        ...req.body,
      };

      // send object to model
      const result = await userModel.createUser(data);

      // response REST API success
      return success(res, {
        code: 200,
        message: 'Success create user',
        data: result,
      });
    } catch (error) {
      if (req.file) {
        deleteFile(req.file.path);
      }
      return failed(res, {
        code: 500,
        message: error.message,
        error: 'Internal Server Error',
      });
    }
  },
  // Update a user by the id in the request
  update: async (req, res) => {
    try {
      const { id } = req.params;

      const user = await userModel.findBy('id', id);
      // if user not exist
      if (!user.rowCount) {
        return failed(res, {
          code: 404,
          message: `User with id ${id} not found`,
          error: 'Not Found',
        });
      }

      // validation email already in use
      const checkEmail = await userModel.findBy('email', req.body.email);
      if (req.body.email !== user.rows[0].email && checkEmail.rowCount) {
        if (req.file) {
          deleteFile(req.file.path);
        }
        return failed(res, {
          code: 409,
          message: 'Email already in use',
          error: 'Conflict',
        });
      }

      // validation phone already in use
      const checkPhone = await userModel.findBy('phone_number', req.body.phone);
      if (req.body.phone !== user.rows[0].phone && checkPhone.rowCount) {
        if (req.file) {
          deleteFile(req.file.path);
        }
        return failed(res, {
          code: 409,
          message: 'Phone number already in use',
          error: 'Conflict',
        });
      }

      let { photo } = user.rows[0];
      if (req.file) {
        if (photo) {
          deleteFile(`public/uploads/${photo}`);
        }
        photo = req.file ? req.file.filename : null;
      }

      const data = {
        ...req.body,
        photo,
        updatedAt: new Date(Date.now()),
      };

      const result = await userModel.updateUser(data, id);
      return success(res, {
        code: 200,
        message: 'Success update user',
        data: result,
      });
    } catch (error) {
      if (req.file) {
        deleteFile(req.file.path);
      }
      return failed(res, {
        code: 500,
        message: error.message,
        error: 'Internal Server Error',
      });
    }
  },
  // Delete a user with the specified id in the request
  destroy: async (req, res) => {
    try {
      const { id } = req.params;

      const user = await userModel.findBy('id', id);
      if (!user.rowCount) {
        return failed(res, {
          code: 404,
          message: `User with id ${id} not found !`,
          error: 'Not Found',
        });
      }

      let { photo } = user.rows[0];
      if (req.file) {
        if (photo) {
          deleteFile(`public/uploads/${photo}`);
        }
      }

      await userModel.deleteUser(id);
      return success(res, {
        code: 200,
        message: 'Success delete user',
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
