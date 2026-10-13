CREATE DATABASE IF NOT EXISTS book_db DEFAULT CHARACTER SET utf8mb4;
USE book_db;

-- 图书分类表
CREATE TABLE IF NOT EXISTS book_type (
  id INT PRIMARY KEY AUTO_INCREMENT,
  type_name VARCHAR(50) NOT NULL
);

-- 图书信息表
CREATE TABLE IF NOT EXISTS book_info (
  id INT PRIMARY KEY AUTO_INCREMENT,
  book_name VARCHAR(100) NOT NULL,
  author VARCHAR(50),
  press VARCHAR(50),
  type_id INT,
  FOREIGN KEY (type_id) REFERENCES book_type(id)
);

-- 插入8条分类
INSERT INTO book_type(type_name) VALUES
('文学小说'),
('计算机'),
('历史'),
('哲学'),
('经济'),
('艺术'),
('科普'),
('教育');

-- 图书测试数据
INSERT INTO book_info(book_name,author,press,type_id) VALUES
('活着','余华','作家出版社',1),
('深入理解计算机系统','Randal E.Bryant','机械工业出版社',2),
('明朝那些事儿','当年明月','中国友谊出版公司',3);