
$(function(){

	var addUrl="http://localhost/xueji/index.php";//添加信息地址
	//（查找）---导航
	$("#search").click(function(){  
		$("#add-box").fadeOut(0);
		$("#search-box").fadeIn(500);		
		$("#fost").html("");
		$("#text").val("");			//把显示框清空
		$(this).addClass("active");
		$("#add").removeClass("active");
		$("#delete").removeClass("active");
	});
	//
	//（添加）----导航
	$("#add").click(function(){         
		$("#search-box").fadeOut(0);
		$("#add-box").fadeIn(500);
		$("#text").val("");
		$("#fost").html("");			//把显示框清空
		$("input[name=snum]").val("");
		$("input[name=sname]").val("");
		$("input[name=sage]").val("");
		//$("input[name=sclass]").val("");
		$(this).addClass("active");
		$("#search").removeClass("active");
		$("#delete").removeClass("active");
	});
	//
	//
	//点击（查找按钮）后的操作
	$("#search-bto").click(function(){				  
		var text=$("input[name=text]").val();
		var sub=$("select[name=s-kind]").val();
		$.post(addUrl,{text:text,sub:sub,q:0},function(result){
			
			if(result=="没有此记录！")
				alert(result);
			else
				xml_Table(result);
		});
	});
	//
	//
	//点击（ 添加按钮 ）后的操作  
	$("#submit-bto").click(function()
	{				  
		var snum=$("input[name=snum]").val().trim();
		var sname=$("input[name=sname]").val().trim();
		var sage=$("input[name=sage]").val().trim();
		var sex=$("input[name=sex]:checked").val();
		var sclass=$("input[name=sclass]").val().trim();
		if(snum.length<8 || isNaN(snum))
		{
			alert("请输入正确的学号！");
			$("input[name=snum]").focus();
		}
		else if(sname=="")
		{
			alert("请输入姓名！");
			$("input[name=sname]").focus();
		}
		else
		{
			if(sage=="")
				{sage="0";}
			if(sclass=="")
				{sclss="no";}
			$.post(addUrl,{snum:snum,sname:sname,sage:sage,sex:sex,sclass:sclass,q:1},function(result){
				//接受服务器返回信息
				if(result=="已存在此学生信息!")
					{
						alert(result);
					}
				else
					{
						alert("成功添加一条信息!");
						xml_Table(result);
					}
			});
		}
	});



	//解析XML，把XML变为html
	function xml_Table(result)   
	{
		xmlDoc=result;
		try //Internet Explorer       兼容
		  {
			  xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
			  xmlDoc.async="false";
			  xmlDoc.loadXML(xmlDoc);
		  }
		catch(e)
		  {
			  try //Firefox, Mozilla, Opera, etc.
			    {
				    parser=new DOMParser();
				    xmlDoc=parser.parseFromString(xmlDoc,"text/xml");
			    }
			  catch(e) {alert(e.message)}
		  }
		x=xmlDoc.getElementsByTagName('user');
		var y ="<table class='table table-hover table-striped ' id='table-kd'>";
			y += "<thead><tr><th>序号</th><th>学号</th><th>姓名</th><th>出生日期</th><th>性别</th><th>班级</th>";
			y += "<th>编辑</th><th>删除</th></tr></thead>"
		
		for(i=0;i<x.length;i++)  //取值重组
		{
			y +="<tr>";
			y = y+"<td>"+(i+1)+"</td>";
			for(j=0;j<5;j++)
			{
				y = y+"<td>"+x[i].childNodes[j].childNodes[0].nodeValue+"</td>";
			}
			y = y+"<td><button class='edit btn btn-info' data-id='"+i+"'><span class='glyphicon glyphicon-pencil'></span></button></td>";
			y = y+"<td><button class='del btn btn-danger' data-id='"+x[i].childNodes[0].childNodes[0].nodeValue+"'><span class='glyphicon glyphicon-trash'></span></button></td></tr>";
		}
		y +="</table>";
		document.getElementById('fost').innerHTML=y;
	}


	//（编辑）模块
	var str  = "学号:<span id='cnum'></span><br />";
		str += "<div class='form-group'><label for='cname'>姓名 *</label><input type='text' name='cname' class='form-control'/></div>";
		str += "<div class='form-group'><label for='cage'>出生日期 *</label><input type='date' name='cage' class='form-control'/></div>";
		str += "<div class='radio'><label><input type='radio' name='csex' value='男' checked/>男</label><label><input type='radio' value='女' name='csex' />女</label></div>";
		str += "<div class='form-group'><label for='cclass'>班级 *</label><input type='text' name='cclass' class='form-control'/></div>";
		str += "<div class='btn-group btn-group-sm'>";
		str += "<button id='change' class='artwl_close btn btn-success'><span class='glyphicon glyphicon-ok'></span></button>";
		str += "<button class='artwl_close btn btn-warning'><span class='glyphicon glyphicon-remove'></span></button>";
		str += "</div>"
	$.artwl_bind({ showbtnid: "edit", title: "编辑学生信息", content:str,complete:function(snum)
	{	
		//弹出编辑框
		//并把该学号的学生的信息放到编辑框中
		var cnum=x[snum].childNodes[0].childNodes[0].nodeValue;
		$("#cnum").html(cnum);
		$("input[name=cname]").val(x[snum].childNodes[1].childNodes[0].nodeValue);
		$("input[name=cage]").val(x[snum].childNodes[2].childNodes[0].nodeValue);		
		$("input[name=cclass]").val(x[snum].childNodes[4].childNodes[0].nodeValue);		
	} 
	});


	//当编辑完成后提交后的操作
	$(document).on("click","#change",function(){
		var cnum=$("#cnum").html();
		var cname=($("input[name=cname]").val()).trim();
		var cage=$("input[name=cage]").val();
		var csex=$("input[name=csex]:checked").val();
		var cclass=$("input[name=cclass]").val();
		if(cname.length===0)
		{
			alert("请输入姓名！");//验证姓名是否完整
		}
		else
		{
			$.post(addUrl,{cnum:cnum,cname:cname,cage:cage,csex:csex,cclass:cclass,q:2},function(result)
			{
				//alert(result);
				if(result) {
					//更改成功，重新查找更新后的结果
					if($("#text").val()!="")//在查询页面，更新查询
					{
						var text=$("input[name=text]").val();   
						var sub=$("select[name=s-kind]").val();
						$.post(addUrl,{text:text,sub:sub,q:0},function(result){				
							if(result=="没有此记录！")
								$("#fost").html(result);
							else
								xml_Table(result);
						});
					}
					else//在添加页面，查询刚添加的学号
					{
						var text=$("input[name=snum]").val();
						var sub="snum";
						$.post(addUrl,{text:text,sub:sub,q:0},function(result){				
							if(result=="没有此记录！")
								$("#fost").html(result);
							else
								xml_Table(result);
						});
					}
				}
				else {
					//更新失败
					alert("更新失败！");
				}					
			});
		}
	});


	//删除模块
	$(document).on("click",".del",function()
	{
		if(confirm("删除学号为："+$(this).data("id")+"的信息？"))
		{
			//执行删除操作
			var snum3=$(this).data("id");
			$.post(addUrl,{snum3:snum3,q:3},function(result){
				if(result)
				{
					//重新查找更新后的结果
					var text=$("input[name=text]").val();   
					var sub=$("select[name=s-kind]").val();
					$.post(addUrl,{text:text,sub:sub,q:0},function(result){				
						if(result=="没有此记录！")
							$("#fost").html(result);
						else
							xml_Table(result);
					});
				}
				else
				{
					alert("删除失败！");
				}
			});	
		}
	});

});

