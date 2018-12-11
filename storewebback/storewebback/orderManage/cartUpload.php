<?php  
header("Content-type:text/html;charset=utf-8");//字符编码设置  
require('mysqlconnect.php');

$ordersId=$_POST['ordersId'];
$goodsSelectCount=$_POST['goodsSelectCount'];
$ordersStatus=$_POST['ordersStatus'];

// 创建连接  
$con =mysqli_connect($servername, $username, $password, $dbname);  
 
$sql="UPDATE orders SET goodsSelectCount='$goodsSelectCount',ordersStatus='$ordersStatus' Where ordersId='$ordersId'";

mysqli_query($con,$sql);  

mysqli_close($con);

?>
