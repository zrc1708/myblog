/*
 Navicat Premium Data Transfer

 Date: 13/05/2020 15:25:35
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL COMMENT '标题',
  `detail` varchar(255) NOT NULL COMMENT '介绍',
  `date` datetime NOT NULL COMMENT '发布日期',
  `count` int(11) NOT NULL DEFAULT '0' COMMENT '阅读量',
  `sortid` int(11) NOT NULL DEFAULT '0' COMMENT '分类',
  `labelid` int(11) NOT NULL DEFAULT '0' COMMENT '标签',
  `content` longtext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for label
-- ----------------------------
DROP TABLE IF EXISTS `label`;
CREATE TABLE `label` (
  `labelid` int(11) NOT NULL AUTO_INCREMENT,
  `labelname` varchar(20) NOT NULL COMMENT '标签名',
  PRIMARY KEY (`labelid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for me
-- ----------------------------
DROP TABLE IF EXISTS `me`;
CREATE TABLE `me` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` longtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for sort
-- ----------------------------
DROP TABLE IF EXISTS `sort`;
CREATE TABLE `sort` (
  `sortid` int(11) NOT NULL AUTO_INCREMENT,
  `sortname` varchar(20) NOT NULL COMMENT '分类名称',
  PRIMARY KEY (`sortid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL,
  `userlevel` int(2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS = 1;
