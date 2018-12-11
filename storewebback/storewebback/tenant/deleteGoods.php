<?php  
header("Content-type:text/html;charset=utf-8");//字符编码设置  
require('mysqlconnect.php');

// 创建连接  
$con =mysqli_connect($servername, $username, $password, $dbname);  

$goodsId=intval($_POST["goodsId"]);	

$sql="UPDATE goodslist SET ifUnder=1 WHERE goodsId='$goodsId'";
mysqli_query($con,$sql);

mysqli_close($con);

?>
