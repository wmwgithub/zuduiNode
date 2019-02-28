-- MySQL dump 10.13  Distrib 5.7.24, for Win64 (x86_64)
--
-- Host: localhost    Database: wechat
-- ------------------------------------------------------
-- Server version	5.7.24-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `active`
--

DROP TABLE IF EXISTS `active`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
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
  `actimage` int(2) DEFAULT '-1',
  `deleted` tinyint(2) DEFAULT '1' COMMENT '是否在回收站',
  `review` tinyint(2) DEFAULT '0' COMMENT '审核状态 0待审核 1审核通过 2审核不通过',
  `reason` text COMMENT '审核不通过的原因',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `active`
--

LOCK TABLES `active` WRITE;
/*!40000 ALTER TABLE `active` DISABLE KEYS */;
INSERT INTO `active` VALUES (1,1,'测试','测试','1550995025675','王旻伟','17356582456','','o47FG4wUNrI9wS_-3Higb1RCvLfE',1,1,1,3,1,1,NULL),(2,2,'比赛测试','比赛测试','1551330326781','王旻伟','17356582456','','o47FG4wUNrI9wS_-3Higb1RCvLfE',1,1,1,1,1,1,NULL);
/*!40000 ALTER TABLE `active` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `iscard`
--

DROP TABLE IF EXISTS `iscard`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `iscard` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `actid` int(11) DEFAULT NULL,
  `cardtime` varchar(8) CHARACTER SET utf8 DEFAULT NULL COMMENT '年月日',
  `imglength` int(1) DEFAULT '0',
  `openid` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `cardtext` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '打卡内容',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `iscard`
--

LOCK TABLES `iscard` WRITE;
/*!40000 ALTER TABLE `iscard` DISABLE KEYS */;
INSERT INTO `iscard` VALUES (1,1,'2019224',2,'o47FG4wUNrI9wS_-3Higb1RCvLfE','今日打卡，滴~~');
/*!40000 ALTER TABLE `iscard` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `name` varchar(100) NOT NULL COMMENT '用户姓名',
  `image` varchar(300) CHARACTER SET utf8 DEFAULT NULL COMMENT '用户头像',
  `openid` varchar(100) CHARACTER SET utf8 NOT NULL COMMENT '用户唯一标识',
  `city` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `province` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `country` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `studentid` varchar(10) DEFAULT NULL,
  `pwd` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `openid` (`openid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'王旻伟?','https://wx.qlogo.cn/mmopen/vi_32/52mCmfibXq0cVeouxBHDXVUDtgkr0HQUePeTv97ckwEgQn1eFwmL5f5icySyHUMetuhhT2ibF7uDSz0xANKZiaArxw/132','o47FG4wUNrI9wS_-3Higb1RCvLfE',NULL,'Anhui','China','0','0');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userjoin`
--

DROP TABLE IF EXISTS `userjoin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userjoin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL COMMENT '用户标识符',
  `open_id` varchar(100) DEFAULT NULL COMMENT '用户标识',
  `act_id` int(11) DEFAULT NULL COMMENT '活动编号',
  `iscard` int(2) DEFAULT '0',
  `time` varchar(50) DEFAULT NULL COMMENT '打卡时间',
  `creater` int(1) DEFAULT '0',
  `phone` varchar(11) DEFAULT NULL,
  `qq` varchar(20) DEFAULT NULL,
  `name` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userjoin`
--

LOCK TABLES `userjoin` WRITE;
/*!40000 ALTER TABLE `userjoin` DISABLE KEYS */;
INSERT INTO `userjoin` VALUES (1,1,'o47FG4wUNrI9wS_-3Higb1RCvLfE',1,1,'1550995025675',1,'17356582456','','王旻伟'),(2,1,'o47FG4wUNrI9wS_-3Higb1RCvLfE',2,0,'1551330326781',1,'17356582456','','王旻伟');
/*!40000 ALTER TABLE `userjoin` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-02-28 15:01:59
