<?php  
header("Content-type:text/html;charset=utf-8");//字符编码设置  
require('mysqlconnect.php');

// 创建连接  
$con =mysqli_connect($servername, $username, $password, $dbname);  

$usersAccount =$_POST["usersAccount"]; 	
$usersPassWords =$_POST["usersPassWords"]; 
$chooseValue =$_POST["chooseValue"]; 


if($chooseValue=="1"){
	$sql1="select userId FROM users Where usersAccount='$usersAccount' and usersPassWords='$usersPassWords'";
	$sql2="select userId FROM users Where usersAccount='$usersAccount' and usersPassWords!='$usersPassWords'";

	$result1 = mysqli_query($con,$sql1);  
	$data1=mysqli_fetch_array($result1,MYSQL_ASSOC);

	$result2 = mysqli_query($con,$sql2);  
	$data2=mysqli_fetch_array($result2,MYSQL_ASSOC);

	if(count($data1['userId'])!=0){
		echo $data1['userId'];
	}else if(count($data1['userId'])==0&&count($data2['userId'])!=0){
		echo -1;
	}else{
		echo -2;
	}
	mysqli_close($con);
}
else{
	$sql1="select tenantId FROM tenant Where tenantAccount='$usersAccount' and tenantPassWords='$usersPassWords'";
	$sql2="select tenantId FROM tenant Where tenantAccount='$usersAccount' and tenantPassWords!='$usersPassWords'";

	$result1 = mysqli_query($con,$sql1);  
	$data1=mysqli_fetch_array($result1,MYSQL_ASSOC);

	$result2 = mysqli_query($con,$sql2);  
	$data2=mysqli_fetch_array($result2,MYSQL_ASSOC);

	if(count($data1['tenantId'])!=0){
		echo $data1['tenantId'];
	}else if(count($data1['tenantId'])==0&&count($data2['tenantId'])!=0){
		echo -1;
	}else{
		echo -2;
	}
mysqli_close($con);
}


?>
