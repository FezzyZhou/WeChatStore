<?php  
header("Content-type:text/html;charset=utf-8");//字符编码设置  
require('mysqlconnect.php');
// 创建连接  
$con =mysqli_connect($servername, $username, $password, $dbname);  


$ordersStatus =intval($_POST["ordersStatus"]); 
$ordersId =intval($_POST["ordersId"]); 

$sql="UPDATE orders SET ordersStatus='$ordersStatus'WHERE ordersId='$ordersId'";

mysqli_query($con,$sql);
echo $isDefault;
mysqli_close($con);

?>
