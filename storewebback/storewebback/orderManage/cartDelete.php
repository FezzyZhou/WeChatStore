<?php  
header("Content-type:text/html;charset=utf-8");//字符编码设置  
require('mysqlconnect.php');

// 创建连接  
$con =mysqli_connect($servername, $username, $password, $dbname);  

$ordersId=intval($_POST["ordersId"]);	

$sql="DELETE FROM orders WHERE ordersId='$ordersId'";
mysqli_query($con,$sql);

mysqli_close($con);

?>
