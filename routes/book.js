const express = require('express');
const router = express.Router();
const pool = require('../db/db');

// 获取全部图书，可带分类筛选
router.get('/', async (req, res, next) => {
  const typeId = req.query.typeId;
  let sql = 'SELECT b.*, t.type_name FROM book_info b LEFT JOIN book_type t ON b.type_id = t.id';
  const params = [];
  if (typeId) {
    sql += ' WHERE b.type_id = ?';
    params.push(typeId);
  }
  try {
    const [rows] = await pool.query(sql, params);
    res.json({ code: 0, data: rows });
  } catch (err) {
    next(err);
  }
});

// 根据ID获取单条图书记录
router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const sql = 'SELECT b.*, t.type_name FROM book_info b LEFT JOIN book_type t ON b.type_id = t.id WHERE b.id = ?';
    const [rows] = await pool.query(sql, [id]);
    if (rows.length === 0) {
      return res.status(404).json({ code: 1, msg: '图书不存在' });
    }
    res.json({ code: 0, data: rows[0] });
  } catch (err) {
    next(err);
  }
});

// 添加图书
router.post('/', async (req, res, next) => {
  const { book_name, author, press, type_id } = req.body;
  if (!book_name) {
    return res.status(400).json({ code: 1, msg: '书名不能为空' });
  }
  try {
    const sql = 'INSERT INTO book_info(book_name, author, press, type_id) VALUES (?, ?, ?, ?)';
    const [result] = await pool.query(sql, [book_name, author, press, type_id]);
    res.json({ code: 0, msg: '添加成功', id: result.insertId });
  } catch (err) {
    next(err);
  }
});

// 修改图书
router.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  const { book_name, author, press, type_id } = req.body;
  if (!book_name) {
    return res.status(400).json({ code: 1, msg: '书名不能为空' });
  }
  try {
    const sql = 'UPDATE book_info SET book_name=?, author=?, press=?, type_id=? WHERE id=?';
    const [result] = await pool.query(sql, [book_name, author, press, type_id, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ code: 1, msg: '图书不存在' });
    }
    res.json({ code: 0, msg: '修改成功' });
  } catch (err) {
    next(err);
  }
});

// 删除图书
router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const sql = 'DELETE FROM book_info WHERE id=?';
    const [result] = await pool.query(sql, [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ code: 1, msg: '图书不存在' });
    }
    res.json({ code: 0, msg: '删除成功' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
