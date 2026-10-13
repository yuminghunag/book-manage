# Issue: 后端开发任务

## 描述
完成图书管理系统后端 API 开发

## 需求
- [x] 图书分类 CRUD (GET /api/booktype)
- [x] 图书列表获取 (GET /api/book)
- [x] 图书详情获取 (GET /api/book/:id)
- [x] 图书添加 (POST /api/book)
- [x] 图书修改 (PUT /api/book/:id)
- [x] 图书删除 (DELETE /api/book/:id)
- [x] 统一错误处理中间件
- [x] RESTful API 风格

## 验收标准
- 所有接口返回统一格式 {code, data/msg}
- 错误处理中间件捕获并返回错误信息
- 支持分类筛选查询
- 参数校验（如书名不能为空）
