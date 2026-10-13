const express = require('express');
const cors = require('cors');
const bookTypeRouter = require('./routes/booktype');
const bookRouter = require('./routes/book');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// 路由注册
app.use('/api/booktype', bookTypeRouter);
app.use('/api/book', bookRouter);

// 统一错误处理（必须放在最后）
app.use(errorHandler);

app.listen(port, () => {
  console.log(`服务启动，访问地址：http://localhost:${port}`);
});
