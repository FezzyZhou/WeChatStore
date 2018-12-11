<?php  
header("Content-type:text/html;charset=utf-8");//字符编码设置  
require('mysqlconnect.php');

$ordersId=$_POST['ordersId'];
$goodsId=$_POST['goodsId'];
$goodsSelectCount=$_POST['goodsSelectCount'];
$ordersStatus=$_POST['ordersStatus'];
// 创建连接  
$con =mysqli_connect($servername, $username, $password, $dbname);  
$sql1="UPDATE orders SET goodsSelectCount='$goodsSelectCount',ordersStatus='$ordersStatus' Where ordersId='$ordersId'";
mysqli_query($con,$sql1);  

$sql2="select goodsKucun FROM goodslist  Where goodsId='$goodsId'";
$result = mysqli_query($con,$sql2);  
$data=mysqli_fetch_array($result,MYSQL_ASSOC);
$goodsKucun=intval($data['goodsKucun']);
$goodsKucun=$goodsKucun-$goodsSelectCount;

$sql4="select goodsSale FROM goodslist  Where goodsId='$goodsId'";
$result = mysqli_query($con,$sql4);  
$data=mysqli_fetch_array($result,MYSQL_ASSOC);
$goodsSale=intval($data['goodsSale']);
$goodsSale=$goodsSale+$goodsSelectCount;

$sql3="UPDATE goodslist SET goodsKucun='$goodsKucun',goodsSale='$goodsSale' Where goodsId='$goodsId'";
mysqli_query($con,$sql3);  

mysqli_close($con);

?>
