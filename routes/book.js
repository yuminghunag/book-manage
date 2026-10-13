const express = require('express');
const router = express.Router();
const pool = require('../db/db');

// 获取图书列表：支持按名称模糊查询 + 分页，按入库时间降序
router.get('/', async (req, res, next) => {
  const bookName = req.query.bookName || '';
  const page = parseInt(req.query.page, 10) || 1;
  const pageSize = parseInt(req.query.pageSize, 10) || 5;
  const offset = (page - 1) * pageSize;

  try {
    // 查询总条数
    let countSql = 'SELECT COUNT(*) AS total FROM book_info b LEFT JOIN book_type t ON b.bookType = t.id';
    const countParams = [];
    if (bookName) {
      countSql += ' WHERE b.bookName LIKE ?';
      countParams.push(`%${bookName}%`);
    }
    const [countRows] = await pool.query(countSql, countParams);
    const total = countRows[0].total;
    const totalPages = Math.ceil(total / pageSize) || 1;

    // 查询当前页数据
    let sql = `SELECT b.bookId, b.bookCode, b.bookName, b.bookType, t.typeName,
                      b.bookAuthor, b.publishPress, b.publishDate, b.borrowed,
                      b.createdBy, b.creationTime, b.lastUpdatetime
               FROM book_info b LEFT JOIN book_type t ON b.bookType = t.id`;
    const params = [];
    if (bookName) {
      sql += ' WHERE b.bookName LIKE ?';
      params.push(`%${bookName}%`);
    }
    sql += ' ORDER BY b.creationTime DESC LIMIT ? OFFSET ?';
    params.push(pageSize, offset);

    const [rows] = await pool.query(sql, params);
    res.json({
      code: 0,
      data: { list: rows, total, page, pageSize, totalPages }
    });
  } catch (err) {
    next(err);
  }
});

// 根据ID获取单条图书
router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const sql = `SELECT b.bookId, b.bookCode, b.bookName, b.bookType, t.typeName,
                        b.bookAuthor, b.publishPress, b.publishDate, b.borrowed,
                        b.createdBy, b.creationTime, b.lastUpdatetime
                 FROM book_info b LEFT JOIN book_type t ON b.bookType = t.id
                 WHERE b.bookId = ?`;
    const [rows] = await pool.query(sql, [id]);
    if (rows.length === 0) {
      return res.status(404).json({ code: 1, msg: '图书不存在' });
    }
    res.json({ code: 0, data: rows[0] });
  } catch (err) {
    next(err);
  }
});

// 新增图书
router.post('/', async (req, res, next) => {
  const { bookCode, bookName, bookType, bookAuthor, publishPress, publishDate, borrowed, createdBy, creationTime } = req.body;
  if (!bookCode || !bookName || !bookType || borrowed === undefined || !createdBy || !creationTime) {
    return res.status(400).json({ code: 1, msg: '必填项不能为空' });
  }
  try {
    const sql = `INSERT INTO book_info(bookCode, bookName, bookType, bookAuthor, publishPress, publishDate, borrowed, createdBy, creationTime, lastUpdatetime)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const [result] = await pool.query(sql, [bookCode, bookName, bookType, bookAuthor, publishPress, publishDate, borrowed, createdBy, creationTime, creationTime]);
    res.json({ code: 0, msg: '新增成功', id: result.insertId });
  } catch (err) {
    next(err);
  }
});

// 修改图书（入库人、入库时间不可修改）
router.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  const { bookCode, bookName, bookType, bookAuthor, publishPress, publishDate, borrowed } = req.body;
  if (!bookCode || !bookName || !bookType || borrowed === undefined) {
    return res.status(400).json({ code: 1, msg: '必填项不能为空' });
  }
  try {
    const sql = `UPDATE book_info
                 SET bookCode=?, bookName=?, bookType=?, bookAuthor=?, publishPress=?, publishDate=?, borrowed=?, lastUpdatetime=CURDATE()
                 WHERE bookId=?`;
    const [result] = await pool.query(sql, [bookCode, bookName, bookType, bookAuthor, publishPress, publishDate, borrowed, id]);
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
    const sql = 'DELETE FROM book_info WHERE bookId=?';
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
