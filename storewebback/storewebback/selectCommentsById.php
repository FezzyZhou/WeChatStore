<?php  
header("Content-type:text/html;charset=utf-8");//字符编码设置  
require('mysqlconnect.php');

$userId=$_POST['userId'];
$goodsId=$_POST['goodsId'];

//$userId=1;
//$goodsId=1;
// 创建连接  
$con =mysqli_connect($servername, $username, $password, $dbname);  

// 检测连接  
$sql1="Select * From goodslist Where goodsId='$goodsId'";
$sql2="Select * From userComment,users Where userComment.goodsId='$goodsId' and userComment.userId=users.userId";

$result1 = mysqli_query($con,$sql1);  
$result2 = mysqli_query($con,$sql2); 


if (!$result1&&!$result2) {
    printf("Error: %s\n", mysqli_error($con));
    exit();
}

$jarr1 = array();
$jarr2 = array();

while ($rows=mysqli_fetch_array($result1,MYSQL_ASSOC)){
    array_push($jarr1,$rows);
}
while ($rows=mysqli_fetch_array($result2,MYSQL_ASSOC)){
    array_push($jarr2,$rows);
}

array_push($jarr1,$jarr2);

echo json_encode($jarr1);
//$response['data1'] = $jarr1;
//$response['data2'] = $jarr2;
//echo json_encode($response);//生成json文件


mysqli_close($con);

?>
