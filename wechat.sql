/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50724
Source Host           : localhost:3306
Source Database       : wechat

Target Server Type    : MYSQL
Target Server Version : 50724
File Encoding         : 65001

Date: 2018-12-01 21:46:17
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for active
-- ----------------------------
DROP TABLE IF EXISTS `active`;
CREATE TABLE `active` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '活动序号',
  `type` int(2) NOT NULL COMMENT '活动类型1表示习惯',
  `head` varchar(30) NOT NULL COMMENT '活动标题',
  `text` text NOT NULL COMMENT '活动内容',
  `time` varchar(20) NOT NULL COMMENT '活动创建时间',
  `name` varchar(20) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '活动发起人姓名',
  `tel` varchar(11) DEFAULT NULL COMMENT '电话号码',
  `qq` varchar(20) DEFAULT NULL COMMENT 'qq',
  `open_id` varchar(100) DEFAULT NULL COMMENT '用户唯一标识',
  `userid` int(11) NOT NULL COMMENT '用户id和openid共同表明用户身份',
  `isend` tinyint(2) DEFAULT '1' COMMENT '是否结束;0带表结束',
  `count` int(11) NOT NULL DEFAULT '1' COMMENT '加入总人数默认1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for answer
-- ----------------------------
DROP TABLE IF EXISTS `answer`;
CREATE TABLE `answer` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `openid` varchar(100) NOT NULL,
  `answer` text NOT NULL,
  `time` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for associate
-- ----------------------------
DROP TABLE IF EXISTS `associate`;
CREATE TABLE `associate` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `openid` varchar(100) NOT NULL,
  `study` text NOT NULL,
  `time` varchar(20) NOT NULL,
  `imgUrl` varchar(30) DEFAULT '',
  `length` int(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `studyindex` (`openid`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for early
-- ----------------------------
DROP TABLE IF EXISTS `early`;
CREATE TABLE `early` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `openid` varchar(100) NOT NULL,
  `textarea` text NOT NULL,
  `time` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for gfactive
-- ----------------------------
DROP TABLE IF EXISTS `gfactive`;
CREATE TABLE `gfactive` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '活动序号',
  `time` varchar(20) NOT NULL COMMENT '活动创建时间',
  `name` varchar(20) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '活动发起人姓名',
  `avatarUrl` varchar(255) DEFAULT NULL COMMENT 'qq',
  `open_id` varchar(100) NOT NULL COMMENT '用户唯一标识',
  `count` int(11) NOT NULL DEFAULT '0' COMMENT '积分',
  PRIMARY KEY (`id`),
  UNIQUE KEY `gfindex` (`open_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for gread
-- ----------------------------
DROP TABLE IF EXISTS `gread`;
CREATE TABLE `gread` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) DEFAULT NULL COMMENT '用户身份',
  `actid` int(11) DEFAULT NULL COMMENT '活动',
  `num` int(11) DEFAULT NULL COMMENT '打卡次数',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for imgurl
-- ----------------------------
DROP TABLE IF EXISTS `imgurl`;
CREATE TABLE `imgurl` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `actid` int(11) DEFAULT NULL,
  `openid` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `index` tinyint(2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Table structure for iscard
-- ----------------------------
DROP TABLE IF EXISTS `iscard`;
CREATE TABLE `iscard` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `actid` int(11) DEFAULT NULL,
  `cardtime` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `userid` int(11) DEFAULT NULL,
  `openid` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `iscard` int(2) NOT NULL DEFAULT '1' COMMENT '成功打卡的标志',
  `cardtext` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '打卡内容',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for politics
-- ----------------------------
DROP TABLE IF EXISTS `politics`;
CREATE TABLE `politics` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `openid` varchar(100) NOT NULL,
  `study` text NOT NULL,
  `time` varchar(20) NOT NULL,
  `imgUrl` varchar(30) DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `studyindex` (`openid`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for question
-- ----------------------------
DROP TABLE IF EXISTS `question`;
CREATE TABLE `question` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `question` text NOT NULL,
  `answer` text NOT NULL,
  `time` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `quesindex` (`time`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for sport
-- ----------------------------
DROP TABLE IF EXISTS `sport`;
CREATE TABLE `sport` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `openid` varchar(100) NOT NULL,
  `textarea` text NOT NULL,
  `time` varchar(20) NOT NULL,
  `step` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for story
-- ----------------------------
DROP TABLE IF EXISTS `story`;
CREATE TABLE `story` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `openid` varchar(100) NOT NULL,
  `textarea` text NOT NULL,
  `time` varchar(20) NOT NULL,
  `imgUrl` varchar(30) DEFAULT '',
  `type` int(1) unsigned NOT NULL DEFAULT '1' COMMENT '1表示第一类2表示第二类3表示第三类',
  `title` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `studyindex` (`openid`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for study
-- ----------------------------
DROP TABLE IF EXISTS `study`;
CREATE TABLE `study` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `openid` varchar(100) NOT NULL,
  `study` text NOT NULL,
  `time` varchar(20) NOT NULL,
  `imgUrl` varchar(30) DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `studyindex` (`openid`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for teaminfo
-- ----------------------------
DROP TABLE IF EXISTS `teaminfo`;
CREATE TABLE `teaminfo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `actid` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tel` varchar(11) COLLATE utf8mb4_unicode_ci NOT NULL,
  `qq` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `openid` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `name` varchar(100) NOT NULL COMMENT '用户姓名',
  `image` varchar(300) CHARACTER SET utf8 DEFAULT NULL COMMENT '用户头像',
  `openid` varchar(100) CHARACTER SET utf8 NOT NULL COMMENT '用户唯一标识',
  `city` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `province` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `country` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `openid` (`openid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for userjoin
-- ----------------------------
DROP TABLE IF EXISTS `userjoin`;
CREATE TABLE `userjoin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL COMMENT '用户标识符',
  `open_id` varchar(100) DEFAULT NULL COMMENT '用户标识',
  `act_id` int(11) DEFAULT NULL COMMENT '活动编号',
  `iscard` int(2) DEFAULT '0',
  `time` varchar(50) DEFAULT NULL COMMENT '打卡时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Procedure structure for iscard_update
-- ----------------------------
DROP PROCEDURE IF EXISTS `iscard_update`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `iscard_update`(IN `update_iscard` int)
BEGIN
	UPDATE userjoin SET iscard=0;
END
;;
DELIMITER ;

-- ----------------------------
-- Event structure for update
-- ----------------------------
DROP EVENT IF EXISTS `update`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` EVENT `update` ON SCHEDULE EVERY 1 DAY STARTS '2018-07-24 00:00:00' ENDS '2030-07-24 00:00:00' ON COMPLETION NOT PRESERVE ENABLE DO CALL iscard_update(0)
;;
DELIMITER ;
