<?php  
header("Content-type:text/html;charset=utf-8");//字符编码设置  
require('mysqlconnect.php');
// 创建连接  
$con =mysqli_connect($servername, $username, $password, $dbname);  

$addressId=intval($_POST["addressId"]);	

$sql="DELETE FROM address WHERE addressId='$addressId'";
mysqli_query($con,$sql);

echo $addressId;
mysqli_close($con);

?>
