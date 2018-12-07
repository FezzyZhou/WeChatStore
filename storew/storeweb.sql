create database storeweb;
use  storeweb;
create table tenant(
  tenantId int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  tenantImagUrl varchar(300) NOT NULL,
  tenantName varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  tenantAccount varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  tenantPassWords varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  tenantMoney int NOT NULL
);
create table users(
  userId int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  userImagUrl varchar(300) NOT NULL,
  userName varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  usersAccount varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  usersPassWords varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
);
create table goodslist(
  goodsId int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  goodsImageUrl varchar(300) NOT NULL, 
  goodsPrice  float(2) NOT NULL, 
  goodsLocation  varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  goodsName varchar(100)CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  goodsScore float(1) NOT NULL,
  goodsSale  int NOT NULL, 
  goodsTransfee  float(1) NOT NULL,
  goodsIntroducetext varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  goodsKucun int NOT NULL,
  tenantId int NOT NULL,
  goodsType int NOT NULL,
  ifUnder int NOT NULL,
  FOREIGN KEY(tenantId) REFERENCES tenant(tenantId)
);


create table address(
   addressId int NOT NULL PRIMARY KEY AUTO_INCREMENT,
   userId int NOT NULL, 
   realname varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
   mobile varchar(20) NOT NULL,
   province varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
   city varchar(20)  CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
   region varchar(20)CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
   town varchar(20)CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
   detail varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
   isDefault int NOT NULL, 
   FOREIGN KEY(userId) REFERENCES users(userId)
);

create table orders(
  ordersId int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  goodsId int NOT NULL,
  goodsSelectCount int NOT NULL,
  ordersStatus int NOT NULL, 
  realname varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  mobile varchar(50) NOT NULL,
  addressIfo varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  userId int NOT NULL,
  FOREIGN KEY(goodsId) REFERENCES goodslist(goodsId),
  FOREIGN KEY(userId) REFERENCES users(userId)
);
create table userComment(
   commentId  int NOT NULL PRIMARY KEY AUTO_INCREMENT,
   userId int NOT NULL,
   ordersId int NOT NULL,
   goodsId int NOT NULL,
   ordersScore int NOT NULL,
   userWords varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
   FOREIGN KEY(userId)  REFERENCES users(userId),
   FOREIGN KEY(goodsId) REFERENCES goodslist(goodsId),
   FOREIGN KEY(ordersId) REFERENCES orders(ordersId)
);



INSERT INTO `tenant` (`tenantId`, `tenantImagUrl`, `tenantName`, `tenantAccount`, `tenantPassWords`, `tenantMoney`) VALUES (NULL, 'http://www.ee-quan.com/zhou/storewebback/images/goods/p1.jpg', '张洲', 'z', 'z', '0');
INSERT INTO `goodslist` (`goodsId`, `goodsImageUrl`, `goodsPrice`, `goodsLocation`, `goodsName`, `goodsScore`, `goodsSale`, `goodsTransfee`, `goodsIntroducetext`, `goodsKucun`, `tenantId`, `goodsType`,`ifUnder`) VALUES (NULL, 'http://www.ee-quan.com/zhou/storewebback/images/goods/p1.jpg', '10', '山东烟台', '红富士苹果\r\n', '10', '0', '0', '苹果是一种低热量食物，每100克只产生60千卡热量。苹果中营养成分可溶性大，易被人体吸收，故有“活水”之称。其有利于溶解硫元素，使皮肤润滑柔嫩。', '101', '1', '1','0');
INSERT INTO `goodslist` (`goodsId`, `goodsImageUrl`, `goodsPrice`, `goodsLocation`, `goodsName`, `goodsScore`, `goodsSale`, `goodsTransfee`, `goodsIntroducetext`, `goodsKucun`, `tenantId`, `goodsType`,`ifUnder`) VALUES (NULL, 'http://www.ee-quan.com/zhou/storewebback/images/goods/p2.jpg', '35', '海南三亚', '香蕉', '10', '0', '0', '果实含淀粉0.5％，蛋白质1.3％，脂肪0.6％，糖分11％，灰分1％，维生素A、B、C、E等。并含少量5-羟色胺、去甲肾上腺素和二羟基苯乙胺。叶含少量鞣质及纤维素11.55％', '28', '1', '1','0'), (NULL, 'http://www.ee-quan.com/zhou/storewebback/images/goods/p3.jpg', '25', '湖北秭归', '阳光鲜橙', '10', '0', '0', '橙子（学名：Citrus sinensis 英语：orange），是芸香科柑橘属植物橙树的果实，亦称为黄果、柑子、金环、柳丁。橙子是一种柑果，有很高的食用，药用价值。', '100', '1', '1','0');
INSERT INTO `goodslist` (`goodsId`, `goodsImageUrl`, `goodsPrice`, `goodsLocation`, `goodsName`, `goodsScore`, `goodsSale`, `goodsTransfee`, `goodsIntroducetext`, `goodsKucun`, `tenantId`, `goodsType`,`ifUnder`) VALUES (NULL, 'http://www.ee-quan.com/zhou/storewebback/images/goods/p4.jpg', '16', '山东德州', '西瓜', '10', '0', '0', '西瓜为夏季之水果，果肉味甜，能降温去暑；种子含油，可作消遣食品；果皮药用，有清热、利尿、降血压之效。', '24', '1', '1','0'), (NULL, 'http://www.ee-quan.com/zhou/storewebback/images/goods/p5.jpg', '17', '重庆忠县', '忠县柑橘', '10', '0', '0', '柑橘（Citrus reticulata Blanco）属芸香科下属植物。性喜温暖湿润气候，耐寒性较柚、酸橙、甜橙稍强。', '29', '1', '1','0');
INSERT INTO `goodslist` (`goodsId`, `goodsImageUrl`, `goodsPrice`, `goodsLocation`, `goodsName`, `goodsScore`, `goodsSale`, `goodsTransfee`, `goodsIntroducetext`, `goodsKucun`, `tenantId`, `goodsType`,`ifUnder`) VALUES (NULL, 'http://www.ee-quan.com/zhou/storewebback/images/goods/p6.jpg', '87', '海南海口', '甘蔗', '10', '0', '0', '甘蔗中含有丰富的糖分、水分，还含有对人体新陈代谢非常有益的各种维生素、脂肪、蛋白质、有机酸、钙、铁等物质，主要用于制糖，表皮一般为紫色和绿色两种常见颜色。', '128', '1', '1','0'), (NULL, 'http://www.ee-quan.com/zhou/storewebback/images/goods/p7.jpg', '10', '广西南宁', '火龙果', '10', '0', '0', '火龙果因为外表像一团愤怒的红色火球而得名。里面的果肉就像是香甜的奶油，但又布满了黑色的小籽。质地温和，口味清香。', '137', '1', '1','0');
INSERT INTO `goodslist` (`goodsId`, `goodsImageUrl`, `goodsPrice`, `goodsLocation`, `goodsName`, `goodsScore`, `goodsSale`, `goodsTransfee`, `goodsIntroducetext`, `goodsKucun`, `tenantId`, `goodsType`,`ifUnder`) VALUES (NULL, 'http://www.ee-quan.com/zhou/storewebback/images/goods/p8.jpg', '25', '四川绵阳', '鸡肉', '10', '0', '0', '，鸡的肉质细嫩，滋味鲜美，适合多种烹调方法，并富有营养，有滋补养身的作用。鸡肉不但适于热炒、炖汤，而且是比较适合冷食凉拌的肉类。', '139', '1', '2','0'), (NULL, 'http://www.ee-quan.com/zhou/storewebback/images/goods/p9.jpg', '16', '北京', '北京烤鸭', '10', '0', '0', '烤鸭是具有世界声誉的北京著名菜式，起源于中国南北朝时期，《食珍录》中已记有炙鸭，在当时是宫廷食品。用料为优质肉食鸭北京鸭，果木炭火烤制，色泽红润，肉质肥而不腻，外脆里嫩。', '100', '1', '2','0');
INSERT INTO `goodslist` (`goodsId`, `goodsImageUrl`, `goodsPrice`, `goodsLocation`, `goodsName`, `goodsScore`, `goodsSale`, `goodsTransfee`, `goodsIntroducetext`, `goodsKucun`, `tenantId`, `goodsType`,`ifUnder`) VALUES (NULL, 'http://www.ee-quan.com/zhou/storewebback/images/goods/p10.jpg', '30', '广东广州', '烤鹅', '10', '0', '0', '烤鹅是广东地方特产，很有名气，享誉海内外。其味芳香嫩酥，口味独特，对于吃惯鸡鸭的朋友来说别有一番滋味。', '11', '1', '2','0'), (NULL, 'http://www.ee-quan.com/zhou/storewebback/images/goods/p11.jpg', '80', '内蒙古', '烤全羊', '10', '0', '0', '烤全羊（Roast Whole Lamb），是一道地方特色菜肴。是新疆或者内蒙古地区少数民族膳食的一种传统风味肉制品 。色、香、味、形俱全，别有风味。', '59', '1', '2','0');
INSERT INTO `goodslist` (`goodsId`, `goodsImageUrl`, `goodsPrice`, `goodsLocation`, `goodsName`, `goodsScore`, `goodsSale`, `goodsTransfee`, `goodsIntroducetext`, `goodsKucun`, `tenantId`, `goodsType`,`ifUnder`) VALUES (NULL, 'http://www.ee-quan.com/zhou/storewebback/images/goods/p12.jpg', '25', '内蒙古', '牛肉', '10', '0', '0', '牛肉，指从牛身上获得的肉，为常见的肉品之一。来源可以是奶牛、公牛、小母牛。牛的肌肉部分可以切成牛排、牛肉块或牛仔骨，也可以与其他的肉混合做成香肠或血肠。', '83', '1', '2','0'), (NULL, 'http://www.ee-quan.com/zhou/storewebback/images/goods/p13.jpg', '16', '呼和浩特', '酱牛肉', '10', '0', '0', '酱牛肉，一种菜名，是指以牛肉为主要原料，经过多种调味料的腌制而制成的一种肉制品，是源于内蒙古呼和浩特著名的特色名菜。有补中益气、滋养脾胃、强健筋骨、化痰息风、止渴止涎的功效。', '433', '1', '2','0');
INSERT INTO `goodslist` (`goodsId`, `goodsImageUrl`, `goodsPrice`, `goodsLocation`, `goodsName`, `goodsScore`, `goodsSale`, `goodsTransfee`, `goodsIntroducetext`, `goodsKucun`, `tenantId`, `goodsType`,`ifUnder`) VALUES (NULL, 'http://www.ee-quan.com/zhou/storewebback/images/goods/p14.jpg', '42', '湖北武汉', '金龙鱼玉米油', '10', '0', '0', '玉米油中的脂肪酸特点是不饱和脂肪酸含量高达80%～85%。玉米油本身不含有胆固醇，它对于血液中胆固醇的积累具有溶解作用，故能减少对血管产生硬化影响。', '128', '1', '3','0'), (NULL, 'http://www.ee-quan.com/zhou/storewebback/images/goods/p15.jpg', '35', '山东泰州', '鲁花大豆油', '10', '0', '0', '大豆油的保质期最长也只有一年，质量越好的大豆油应该颜色越浅，为淡黄色，清澈透明．且无沉淀物，无豆腥昧，温度低于零摄氏度以下的优质大豆油会有油脂结晶析出。', '4', '1', '3','0');
INSERT INTO `goodslist` (`goodsId`, `goodsImageUrl`, `goodsPrice`, `goodsLocation`, `goodsName`, `goodsScore`, `goodsSale`, `goodsTransfee`, `goodsIntroducetext`, `goodsKucun`, `tenantId`, `goodsType`,`ifUnder`) VALUES (NULL, 'http://www.ee-quan.com/zhou/storewebback/images/goods/p16.jpg', '25', '吉林长春', '东北大米', '10', '0', '0', '东北大米主要种植于黑龙江省、吉林省、辽宁省的广大平原地区，种植在极其肥沃的黑土地中，吸收了足够的氮、磷、钾等多种矿物元素，阳光雨露充足，又有纯净无污染的灌溉用水，生长周期一般五个月左右。', '320', '1', '3','0'), (NULL, 'http://www.ee-quan.com/zhou/storewebback/images/goods/p17.jpg', '16', '湖北孝感', '云梦鱼面', '11', '100', '0', '云梦鱼面是湖北地区的特色传统名吃之一，主产于湖北省云梦县，1915年，云梦鱼面在巴拿马万国博览会参加特产比赛获优质银牌奖，产品畅销全国及国际市场。', '100', '1', '3','0');
INSERT INTO `goodslist` (`goodsId`, `goodsImageUrl`, `goodsPrice`, `goodsLocation`, `goodsName`, `goodsScore`, `goodsSale`, `goodsTransfee`, `goodsIntroducetext`, `goodsKucun`, `tenantId`, `goodsType`,`ifUnder`) VALUES (NULL, 'http://www.ee-quan.com/zhou/storewebback/images/goods/p18.jpg', '17', '甘肃兰州	', '兰州拉面', '10', '0', '0', '兰州牛肉面，又称兰州清汤牛肉面，是“中国十大面条”之一，是甘肃省兰州地区的风味小吃，被中国烹饪协会评为三大中式快餐之一，得到美誉“中华第一面”。', '45', '1', '3','0'), (NULL, 'http://www.ee-quan.com/zhou/storewebback/images/goods/p19.jpg', '18', '重庆市涪陵', '乌江榨菜', '10', '0', '0', '榨菜位居世界三大名腌菜（即涪陵榨菜、法国酸黄瓜、德国甜酸甘蓝）之首，历来被列为素菜佳品。其工艺独特，配料考究，鲜香脆嫩，回味悠长。', '2', '1', '4','0');
INSERT INTO `goodslist` (`goodsId`, `goodsImageUrl`, `goodsPrice`, `goodsLocation`, `goodsName`, `goodsScore`, `goodsSale`, `goodsTransfee`, `goodsIntroducetext`, `goodsKucun`, `tenantId`, `goodsType`,`ifUnder`) VALUES (NULL, 'http://www.ee-quan.com/zhou/storewebback/images/goods/p20.jpg', '89', '台湾台北', '手撕面包', '10', '0', '0', '以小麦粉为主要原料，以酵母、鸡蛋、油脂、糖、盐等为辅料，加水调制成面团，经过分割、成形、醒发、焙烤、冷却等过程加工而成的焙烤食品。', '422', '1', '4','0'), (NULL, 'http://www.ee-quan.com/zhou/storewebback/images/goods/p21.jpg', '25', '湖南长沙', '长沙臭豆腐', '10', '0', '0', '长沙臭豆腐是湖南长沙传统的特色名吃，长沙当地人又称臭干子。色墨黑，外焦里嫩，鲜而香辣。 焦脆而不糊、细嫩而不腻、初闻臭气扑鼻，细嗅浓香诱人。', '12', '1', '4','0');

