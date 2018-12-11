<?php  
header("Content-type:text/html;charset=utf-8");//字符编码设置  
require('mysqlconnect.php');

// 创建连接  
$con =mysqli_connect($servername, $username, $password, $dbname);  

$usersAccount =$_POST["usersAccount"]; 	
$usersPassWords =$_POST["usersPassWords"]; 
$userName =$_POST["userName"]; 	
$userImagUrl =$_POST["userImagUrl"]; 
$chooseValue =$_POST["chooseValue"]; 


if($chooseValue=="1"){
	$sql1="select userId FROM users Where usersAccount='$usersAccount'";
    $result1 = mysqli_query($con,$sql1);  
    $data1=mysqli_fetch_array($result1,MYSQL_ASSOC);
    if(count($data1['userId'])!=0){
	echo 0;
    }
    else{
	$sql2="INSERT INTO users(usersAccount,usersPassWords,userName,userImagUrl)
VALUES ('$usersAccount','$usersPassWords','$userName','$userImagUrl')";
    mysqli_query($con,$sql2);
	echo 1;
    }
}
else{
	$sql1="select tenantId FROM tenant Where tenantAccount='$usersAccount'";
    $result1 = mysqli_query($con,$sql1);  
    $data1=mysqli_fetch_array($result1,MYSQL_ASSOC);
    if(count($data1['tenantId'])!=0){
	echo 0;
    }
    else{
	$sql2="INSERT INTO tenant(tenantAccount,tenantPassWords,tenantName,tenantImagUrl,tenantMoney)
VALUES ('$usersAccount','$usersPassWords','$userName','$userImagUrl',0)";
    mysqli_query($con,$sql2);
	echo 1;
    }
}


mysqli_close($con);

?>
