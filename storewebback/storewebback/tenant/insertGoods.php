<?php  
header("Content-type:text/html;charset=utf-8");//字符编码设置  
require('mysqlconnect.php');

$con =mysqli_connect($servername, $username, $password, $dbname);  

$sql="Select max(goodsId) From goodslist";
$result= mysqli_query($con,$sql);  
$data=mysqli_fetch_array($result,MYSQL_ASSOC);
$maxId=intval($data['max(goodsId)']);

        $goodsName=$_POST["goodsName"];
        $goodsPrice=number_format((float)$_POST["goodsPrice"],2);
        $goodsLocation = $_POST["goodsLocation"];
		$goodsTransfee = number_format((float)$_POST["goodsTransfee"],1);
		$goodsIntroducetext = $_POST["goodsIntroducetext"];
		$goodsKucun = intval($_POST["goodsKucun"]);
		$goodsType = intval($_POST["goodsType"]);
		$tenantId = intval($_POST["tenantId"]);
		$ifUnder = intval($_POST["ifUnder"]);
		$goodsScore = number_format((float)$_POST["goodsScore"],1);
		$goodsSale = intval($_POST["goodsSale"]);

        $a = substr($_FILES['file']['type'],6);
		switch ($a){ 
		case 'image/pjpeg':
			$a  =".jpg";   
			break; 
		case 'image/jpeg':
			$a  =".jpg";   
			break; 
		case 'image/gif':
			$a  =".gif";   
			break; 
		case 'image/png':
			$a  =".png";   
			break; 
          } 
		 $file_name='p'.(string)($maxId+1).'.'.$a;//拼装存储地址path
		 $path = getenv('FSPATH');
         $path = $path."/".$file_name;//存储path

		 //$path1 = "http://localhost:8080/storewebback/images/goods/".$file_name;//存储path
		
		$goodsImageUrl=$path;
		move_uploaded_file($_FILES['file']['tmp_name'], $path);
		
        ///=$dir = iconv("UTF-8", "GBK","D:\AppServ\www\storewebback\images\goods\\".$date);//判断文件夹是否存在
        //if (!file_exists($dir)){
       //     mkdir($dir,0777,true);//不存在 创建新文件夹
        //    $panduan = move_uploaded_file($_FILES['file']['tmp_name'], $path);//存入图片	
        //} else {
       //     $panduan = move_uploaded_file($_FILES['file']['tmp_name'], $path);//存入已有文件夹
       // }	
		//插入数据库
		$sql1="INSERT INTO goodslist(goodsName,goodsPrice,goodsLocation,goodsTransfee,goodsImageUrl,goodsIntroducetext,goodsKucun,goodsType,tenantId,ifUnder,goodsScore,goodsSale)
VALUES ('$goodsName','$goodsPrice','$goodsLocation','$goodsTransfee','$goodsImageUrl','$goodsIntroducetext','$goodsKucun','$goodsType','$tenantId','$ifUnder','$goodsScore','$goodsSale')";
        mysqli_query($con,$sql1);
		echo $path;
mysqli_close($con);

?>
