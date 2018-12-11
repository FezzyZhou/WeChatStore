<?php  
header("Content-type:text/html;charset=utf-8");//字符编码设置  
require('mysqlconnect.php');

$goodsType=intval($_POST['goodsType']);
// 创建连接

$con =mysqli_connect($servername, $username, $password, $dbname);  

$sql = "SELECT * FROM goodslist WHERE goodsType='$goodsType' ORDER BY goodsScore DESC";  
$result = mysqli_query($con,$sql);  

$jarr = array();
while ($rows=mysqli_fetch_array($result,MYSQL_ASSOC)){
    array_push($jarr,$rows);
}

echo json_encode($jarr);//生成json文件

mysqli_close($con);

?>
