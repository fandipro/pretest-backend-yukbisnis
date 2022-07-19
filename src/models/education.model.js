const db = require('../configs/pg');

module.exports = {
  findBy: (field, search) =>
    new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM educations WHERE ${field} = $1`,
        [search],
        (err, res) => {
          if (err) {
            reject(new Error(`SQL : ${err.message}`));
          }
          resolve(res);
        }
      );
    }),
  getAllEducation: (field, search, sort, sortType, limit, offset) =>
    new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM educations WHERE ${field} ILIKE ('%${search}%') ORDER BY ${sort} ${sortType} LIMIT $1 OFFSET $2`,
        [limit, offset],
        (err, res) => {
          if (err) {
            reject(new Error(`SQL : ${err.message}`));
          }
          resolve(res);
        }
      );
    }),
  getCountEducation: () =>
    new Promise((resolve, reject) => {
      db.query(`SELECT COUNT(*) AS total FROM educations`, (err, res) => {
        if (err) {
          reject(new Error(`SQL : ${err.message}`));
        }
        resolve(res.rows[0].total);
      });
    }),
  createEducation: (data) =>
    new Promise((resolve, reject) => {
      const { id, userId, school, major, address, startDate, endDate, type } = data;
      db.query(
        `INSERT INTO educations (id, user_id, school, major, address, start_date, end_date, type) VALUES($1, $2, $3, $4, $5, $6, $7, $8)`,
        [id, userId, school, major, address, startDate, endDate, type],
        (err) => {
          if (err) {
            reject(new Error(`SQL : ${err.message}`));
          }
          resolve(data);
        }
      );
    }),
  updateEducation: (data, id) =>
    new Promise((resolve, reject) => {
      const { userId, school, major, address, startDate, endDate, type, updatedAt } =
        data;
      db.query(
        `UPDATE educations SET user_id = $1, school = $2, major = $3, address = $4, start_date = $5, end_date = $6, type = $7, updated_at = $8 WHERE id = $9`,
        [userId, school, major, address, startDate, endDate, type, updatedAt, id],
        (err) => {
          if (err) {
            reject(new Error(`SQL : ${err.message}`));
          }
          const newRes = {
            id,
            ...data,
          };
          resolve(newRes);
        }
      );
    }),
  deleteEducation: (id) =>
    new Promise((resolve, reject) => {
      db.query(`DELETE FROM educations WHERE id = $1`, [id], (err) => {
        if (err) {
          reject(new Error(`SQL : ${err.message}`));
        }
        resolve(id);
      });
    }),
};
