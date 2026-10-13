// 统一错误处理中间件
function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(err.status || 500).json({
    code: 1,
    msg: err.message || '服务器内部错误'
  });
}

module.exports = errorHandler;
