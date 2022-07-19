const db = require('../configs/pg');

module.exports = {
  findBy: (field, search) =>
    new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM experiences WHERE ${field} = $1`,
        [search],
        (err, res) => {
          if (err) {
            reject(new Error(`SQL : ${err.message}`));
          }
          resolve(res);
        }
      );
    }),
  getAllExperience: (field, search, sort, sortType, limit, offset) =>
    new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM experiences WHERE ${field} ILIKE ('%${search}%') ORDER BY ${sort} ${sortType} LIMIT $1 OFFSET $2`,
        [limit, offset],
        (err, res) => {
          if (err) {
            reject(new Error(`SQL : ${err.message}`));
          }
          resolve(res);
        }
      );
    }),
  getCountExperience: () =>
    new Promise((resolve, reject) => {
      db.query(`SELECT COUNT(*) AS total FROM experiences`, (err, res) => {
        if (err) {
          reject(new Error(`SQL : ${err.message}`));
        }
        resolve(res.rows[0].total);
      });
    }),
  createExperience: (data) =>
    new Promise((resolve, reject) => {
      const { id, userId, company, position, startDate, endDate, type } = data;
      db.query(
        `INSERT INTO experiences (id, user_id, company, position, start_date, end_date, type) VALUES($1, $2, $3, $4, $5, $6, $7)`,
        [id, userId, company, position, startDate, endDate, type],
        (err) => {
          if (err) {
            reject(new Error(`SQL : ${err.message}`));
          }
          resolve(data);
        }
      );
    }),
  updateExperience: (data, id) =>
    new Promise((resolve, reject) => {
      const {
        userId,
        company,
        position,
        startDate,
        endDate,
        type,
        updatedAt,
      } = data;
      db.query(
        `UPDATE experiences SET user_id = $1, company = $2, position = $3, start_date = $4, end_date = $5, type = $6, updated_at = $7 WHERE id = $8`,
        [userId, company, position, startDate, endDate, type, updatedAt, id],
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
  deleteExperience: (id) =>
    new Promise((resolve, reject) => {
      db.query(`DELETE FROM experiences WHERE id = $1`, [id], (err) => {
        if (err) {
          reject(new Error(`SQL : ${err.message}`));
        }
        resolve(id);
      });
    }),
};
