<?php  
header("Content-type:text/html;charset=utf-8");//字符编码设置  
require('mysqlconnect.php');

$indexPost=intval($_POST['indexPost']);
$tenantId=intval($_POST['tenantId']);
// 创建连接  
$con =mysqli_connect($servername, $username, $password, $dbname);  
$sql="Select * From orders,goodslist Where 
orders.goodsId=goodslist.goodsId 
and orders.ordersStatus='$indexPost'
and goodslist.tenantId='$tenantId' ";

$result = mysqli_query($con,$sql);  
if (!$result) {
    printf("Error: %s\n", mysqli_error($con));
    exit();
}
$jarr = array();
while ($rows=mysqli_fetch_array($result,MYSQL_ASSOC)){
    array_push($jarr,$rows);
}
echo json_encode($jarr);

mysqli_close($con);
?>
