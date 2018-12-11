<?php  
header("Content-type:text/html;charset=utf-8");//字符编码设置  
require('mysqlconnect.php');

// 创建连接  
$con =mysqli_connect($servername, $username, $password, $dbname);  

$addressId=intval($_POST["addressId"]);	
$userId =(int)$_POST["userId"]; 	
$realname =$_POST["realname"]; 
$mobile =$_POST["mobile"]; 		
$province=$_POST["province"]; 	
$city =$_POST["city"]; 	
$region=$_POST["region"];  
$town =$_POST["town"]; 
$detail =$_POST["detail"]; 
$isDefault =intval($_POST["isDefault"]); 
$sql="UPDATE address SET userId='$userId',realname='$realname',mobile='$mobile',province='$province',
city='$city',region='$region',town='$town',detail='$detail',isDefault='$isDefault' WHERE addressId='$addressId'";
mysqli_query($con,$sql);
echo $isDefault;
mysqli_close($con);

?>
