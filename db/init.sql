CREATE DATABASE IF NOT EXISTS book_db DEFAULT CHARACTER SET utf8mb4;
USE book_db;

-- 删除旧表（按 PDF 数据库设计重建）
DROP TABLE IF EXISTS book_info;
DROP TABLE IF EXISTS book_type;

-- 图书类型表
CREATE TABLE book_type (
  id INT PRIMARY KEY AUTO_INCREMENT,
  typeName VARCHAR(50) NOT NULL
);

-- 图书信息表
CREATE TABLE book_info (
  bookId INT PRIMARY KEY AUTO_INCREMENT,
  bookCode VARCHAR(50) NOT NULL,
  bookName VARCHAR(100) NOT NULL,
  bookType INT NOT NULL,
  bookAuthor VARCHAR(50) NOT NULL,
  publishPress VARCHAR(100) NOT NULL,
  publishDate DATE NOT NULL,
  borrowed INT NOT NULL DEFAULT 0,
  createdBy VARCHAR(50) NOT NULL,
  creationTime DATE NOT NULL,
  lastUpdatetime DATE,
  FOREIGN KEY (bookType) REFERENCES book_type(id)
);

-- 图书类型测试数据（8条：小说、文学、传记、艺术、少儿、经济、管理、科技）
INSERT INTO book_type(typeName) VALUES
('小说'),
('文学'),
('传记'),
('艺术'),
('少儿'),
('经济'),
('管理'),
('科技');

-- 图书测试数据（按 PDF 图-1）
INSERT INTO book_info(bookCode, bookName, bookType, bookAuthor, publishPress, publishDate, borrowed, createdBy, creationTime, lastUpdatetime) VALUES
('BK000023','企业应用架构模式',8,'（英）Martin Fowler','机械工业出版社','2014-07-03',0,'系统管理员','2014-07-03','2014-07-03'),
('BK000024','精通Hibernate',8,'刘洋','电子工业出版社','2014-05-03',1,'系统管理员','2014-05-03','2014-05-03'),
('BK000025','天龙八部',1,'金庸','中原出版社','2014-03-12',0,'系统管理员','2014-03-12','2014-03-12'),
('BK000026','寻找家园',4,'高尔泰','北京十月文艺出版社','2014-03-01',0,'系统管理员','2014-03-01','2014-03-01'),
('BK000027','小猫莫格成长系列',5,'（英）朱迪斯·克尔','接力出版社','2014-01-01',1,'系统管理员','2014-01-01','2014-01-01');
