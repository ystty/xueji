<?php 
	$q=$_POST['q'];
	if($q==0)//查询
	{
		$text=$_POST['text'];
		$sub=$_POST['sub'];
		$con = mysqli_connect("localhost:3306","root","","xueji");
		if (!$con)	
		{
		  die('Could not connect: '.mysql_error());
		}

		//判断是按照什么查询
		switch ($sub) {
			case 'snum':
				$sub="snum='".$text."'";
				break;
			case 'sname':
				$sub="sname='".$text."'";
				break;
			case 'sclass':
				$sub="sclass='".$text."'";
				break;
		}
		//查询
		$result = mysqli_query ($con,"SELECT * FROM user WHERE ".$sub);

			$row = mysqli_fetch_array($result);//把查询结果变为数组
			if($row)
			{
				$back="<?xml version='1.0' encoding='utf-8'?><users>";
				$result = mysqli_query ($con,"SELECT * FROM user WHERE ".$sub);
				while ($row = mysqli_fetch_array($result)) //把结果变为xml
				{					
					$back = $back."<user><snum>".$row['snum']."</snum>";
					$back = $back."<sname>".$row['sname']."</sname>";
					$back = $back."<sage>".$row['sage']."</sage>";
					$back = $back."<sex>".$row['sex']."</sex>";
					$back = $back."<sclass>".$row['sclass']."</sclass></user>";
				}
				$back .= "</users>";
				echo $back;
			}
		else
			echo "没有此记录！"; //没有的话就返回提示

		mysqli_close($con);
	}

	if($q==2)//æ›´æ”¹
	{
		$cnum=$_POST['cnum'];//å­¦å·
		$cname=$_POST['cname'];//å§“å
		$cage=$_POST['cage'];//å¹´é¾„
		$csex=$_POST['csex'];//æ€§åˆ«
		$cclass=$_POST['cclass'];//ç­çº§

		if($cage=="")
			$cage="no!";
		if($cclass=="")
			$cclass="no!";

		//è¿žæŽ¥æ•°æ®åº?
		$con = mysqli_connect("localhost:3306","root","","xueji");
		if (!$con)
		{
		  die('Could not connect: '.mysql_error());
		}
		$result = mysqli_query ($con,"UPDATE user SET sname='$cname',sage='$cage',sex='$csex',sclass='$cclass' WHERE snum='$cnum'");
		//var_dump($result);die;
		if($result) {
			//
			$status=1;
		}
		else {
			//
			$status=-1;
		}
		echo $status;
	}


	if($q==3)//删除
	{
		$snum3=$_POST['snum3'];
		$con = mysqli_connect("localhost:3306","root","","xueji");
		if (!$con)	
		{
		  die('Could not connect: '.mysql_error());
		}

		$result = mysqli_query ($con,"DELETE FROM user WHERE snum='$snum3'");
		//echo "åˆ é™¤æˆåŠŸï¼?;
		if($result)
			echo "1";
		else
			echo "0";
	}


	if($q==1)//æ·»åŠ 
	{
		$snum=$_POST['snum'];//å­¦å·
		$sname=$_POST['sname'];//å§“å
		$sage=$_POST['sage'];//å¹´é¾„
		$sex=$_POST['sex'];//æ€§åˆ«
		$sclass=$_POST['sclass'];//ç­çº§

		//è¿žæŽ¥æ•°æ®åº?
		$con = mysqli_connect("localhost:3306","root","","xueji");
		if (!$con)
		{
		  	die('Could not connect: '.mysql_error());
		}
		//è¿žæŽ¥æˆåŠŸ

		$result = mysqli_query ($con,"SELECT * FROM user WHERE snum='$snum'");
		$row = mysqli_fetch_array($result);		
		if($row)
		{
			echo "没有此记录！";
		}
		else
		{
			$back="<?xml version='1.0' encoding='utf-8'?><users>";
			$result = mysqli_query($con,"INSERT INTO user VALUES ('$snum','$sname','$sage','$sex','$sclass') ");
			$result = mysqli_query ($con,"SELECT * FROM user WHERE snum='$snum'");
			while ($row = mysqli_fetch_array($result)) 
			{			
				$back = $back."<user><snum>".$row['snum']."</snum>";
				$back = $back."<sname>".$row['sname']."</sname>";
				$back = $back."<sage>".$row['sage']."</sage>";
				$back = $back."<sex>".$row['sex']."</sex>";
				$back = $back."<sclass>".$row['sclass']."</sclass></user>";
			}
			$back .= "</users>";
			echo $back;
		}
		mysqli_close($con);
	}
	
 ?>