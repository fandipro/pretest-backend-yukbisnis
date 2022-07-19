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
  getAllUser: (field, search, sort, sortType, limit, offset) =>
    new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM users WHERE ${field} ILIKE ('%${search}%') ORDER BY ${sort} ${sortType} LIMIT $1 OFFSET $2`,
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
  createUser: (data) =>
    new Promise((resolve, reject) => {
      const { id, name, phoneNumber, address, email, photo } = data;
      db.query(
        `INSERT INTO users (id, name, phone_number, address, email, photo) VALUES($1, $2, $3, $4, $5, $6)`,
        [id, name, phoneNumber, address, email, photo],
        (err) => {
          if (err) {
            reject(new Error(`SQL : ${err.message}`));
          }
          resolve(data);
        }
      );
    }),
  updateUser: (data, id) =>
    new Promise((resolve, reject) => {
      const { name, phoneNumber, address, email, photo, updatedAt } = data;
      db.query(
        `UPDATE users SET name = $1, phone_number = $2, address = $3, email = $4, photo = $5, updated_at = $6 WHERE id = $7`,
        [name, phoneNumber, address, email, photo, updatedAt, id],
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
