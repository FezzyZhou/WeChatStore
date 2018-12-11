<?php  
header("Content-type:text/html;charset=utf-8");//字符编码设置  
require('mysqlconnect.php');

// 创建连接  
$con =mysqli_connect($servername, $username, $password, $dbname);  

$ordersId=intval($_POST['ordersId']);
$userId=intval($_POST['userId']);
$goodsId=intval($_POST['goodsId']);
$ordersScore=(float)$_POST['ordersScore'];
$userWords=$_POST['userWords'];

$sql1="INSERT INTO userComment(ordersId,userId,ordersScore,goodsId,userWords)
VALUES ('$ordersId','$userId','$ordersScore','$goodsId','$userWords')";
mysqli_query($con,$sql1);

$sql2="Select ordersScore From userComment Where goodsId='$goodsId' ";
$result=mysqli_query($con,$sql2);
$jarr = array();
while ($rows=mysqli_fetch_array($result,MYSQL_ASSOC)){
    array_push($jarr,$rows);
}
$sum=0;
for ($i=0;  $i< count($jarr); $i++){
	$sum=$sum+$jarr[$i]['ordersScore'];
}

$goodsScore=($sum+$ordersScore)/(count($jarr)+1);
$goodsScore=round($goodsScore, 1);
//修改商品评分
$sq3="UPDATE goodslist SET goodsScore='$goodsScore' Where goodsId='$goodsId'";
mysqli_query($con,$sq3);
//修改订单状态为5
$ordersStatus=5;
$sq4="UPDATE orders SET ordersStatus='$ordersStatus' Where ordersId='$ordersId'";
mysqli_query($con,$sq4);

mysqli_close($con);

?>
