<?php  
header("Content-type:text/html;charset=utf-8");//字符编码设置  
require('mysqlconnect.php');
// 创建连接  
$con =mysqli_connect($servername, $username, $password, $dbname);  

$goodsId=$_POST['goodsId'];
$goodsSelectCount=$_POST['goodsSelectCount'];
$ordersStatus=$_POST['ordersStatus'];
$addressId=$_POST['addressId'];
$userId=$_POST['userId'];
 
$sql="INSERT INTO orders(goodsId,goodsSelectCount,ordersStatus,addressId,userId)
VALUES ('$goodsId','$goodsSelectCount','$ordersStatus','$addressId','$userId')";

mysqli_query($con,$sql);

mysqli_close($con);

?>
