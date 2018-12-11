<?php  
header("Content-type:text/html;charset=utf-8");//字符编码设置  
require('mysqlconnect.php');

// 创建连接  
$con =mysqli_connect($servername, $username, $password, $dbname);  

$userId =(int)$_POST["userId"]; 	
$realname =$_POST["realname"]; 
$mobile ="123"; 	
$province=$_POST["province"]; 	
$city =$_POST["city"]; 	
$region=$_POST["region"];  
$town =$_POST["town"]; 
$detail =$_POST["detail"]; 
$isDefault =0; 

$sql="INSERT INTO address(userId,realname,mobile,province,city,region,town,detail,isDefault)
VALUES ('$userId','$realname','$mobile','$province','$city','$region','$town','$detail','$isDefault')";

mysqli_query($con,$sql);
echo $realname;
mysqli_close($con);

?>
