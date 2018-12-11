<?php  
header("Content-type:text/html;charset=utf-8");//字符编码设置  
require('mysqlconnect.php');

$goodsId=intval($_POST['goodsId']);
$goodsSelectCount=intval($_POST['goodsSelectCount']);

$ordersStatus=intval($_POST['ordersStatus']);

$userId=intval($_POST['userId']);
$addressIfo=$_POST['addressIfo'];
$realname=$_POST['realname'];
$mobile=$_POST['mobile'];


// 创建连接  
$con =mysqli_connect($servername, $username, $password, $dbname);  
 
if($ordersStatus==1){

}

$sql="INSERT INTO orders(goodsId,goodsSelectCount,ordersStatus,userId,addressIfo,realname,mobile)
VALUES ('$goodsId','$goodsSelectCount','$ordersStatus','$userId','$addressIfo','$realname','$mobile')";
mysqli_query($con,$sql);  

mysqli_close($con);

?>
