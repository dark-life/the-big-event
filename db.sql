create database api_db;
use api_db;

-- 用户表
create table ev_users(
	id int primary key auto_increment,
	username varchar(255) not null unique,
	password varchar(255) not null,
	nickname varchar(255),
	email varchar(255),
	user_pic text
);

-- 文章分类表
create table ev_article_cate(
	id int primary key auto_increment,
	name varchar(255) not null unique,
	alias varchar(255) not null unique,
	is_delete tinyint(1) not null default 0
);

-- 文章表
create table ev_articles(
	id int primary key auto_increment,
	title varchar(255) not null,
	content text not null,
	cover_img varchar(255) not null,
	pub_date varchar(255) not null,
	state varchar(255) not null,
	is_delete tinyint(1) not null default 0,
	cate_id int not null,
	author_id int not null
);



