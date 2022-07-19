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
  getAllExperience: (field, search, sort, sortType, limit, offset, level) =>
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
  createExperience: () => new Promise((resolve, reject) => {}),
  updateExperience: (data, id) =>
    new Promise((resolve, reject) => {
      const { name, email, phone, updated_at } = data;
      db.query(
        `UPDATE experiences SET name = $1, email = $2, phone = $3, updated_at = $4 WHERE id = $5`,
        [name, email, phone, updated_at, id],
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
