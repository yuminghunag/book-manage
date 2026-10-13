const express = require('express');
const router = express.Router();
const pool = require('../db/db');

// 获取所有图书分类
router.get('/', async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT id, typeName FROM book_type ORDER BY id');
    res.json({ code: 0, data: rows });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
