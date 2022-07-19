const db = require('../configs/pg');

module.exports = {
  findBy: (field, search) =>
    new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM users WHERE ${field} = $1`,
        [search],
        (err, res) => {
          if (err) {
            reject(new Error(`SQL : ${err.message}`));
          }
          resolve(res);
        }
      );
    }),
  getAllUser: (field, search, sort, sortType, limit, offset, level) =>
    new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM users WHERE ${field} ILIKE ('%${search}%') ${
          level === 1 ? 'AND is_active = true' : ''
        } ORDER BY ${sort} ${sortType} LIMIT $1 OFFSET $2`,
        [limit, offset],
        (err, res) => {
          if (err) {
            reject(new Error(`SQL : ${err.message}`));
          }
          resolve(res);
        }
      );
    }),
  getCountUser: () =>
    new Promise((resolve, reject) => {
      db.query(`SELECT COUNT(*) AS total FROM users`, (err, res) => {
        if (err) {
          reject(new Error(`SQL : ${err.message}`));
        }
        resolve(res.rows[0].total);
      });
    }),
  createUser: () => new Promise((resolve, reject) => {}),
  updateUser: (data, id) =>
    new Promise((resolve, reject) => {
      const { name, email, phone, updated_at } = data;
      db.query(
        `UPDATE users SET name = $1, email = $2, phone = $3, updated_at = $4 WHERE id = $5`,
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
  deleteUser: (id) =>
    new Promise((resolve, reject) => {
      db.query(`DELETE FROM users WHERE id = $1`, [id], (err) => {
        if (err) {
          reject(new Error(`SQL : ${err.message}`));
        }
        resolve(id);
      });
    }),
};
