//根据对象数组构造游戏列表
 preTreatmentData(GAME_LIST_ARRAY);
var gameListMgr = new gameListMgr(
					{ ListArray: GAME_LIST_ARRAY,//后台传入对象数组
                      configIndex: ["firstL"] ,//配置索引项
					  configTabsIds : ["firstLetterIndexWrap"],//tab标签包裹id
					  tabHotGameClass:"hot-game-tab",//热门游戏标签
					  tabContentId:"tabContentWrap",//tab内容区域
					  iframeBgId:"gameListIframe",
					  commonURL :GAME_LIST_AJAX_URL,//内容区域URL
					  displayMode:2//显示样式
					              
					}
				  );
//外层绑定函数
/*
	$("tabContentWrap").onclick = function(e)
	{
		e = e || window.event;
	    var target = e.target || e.srcElement;
		console.debug(target)
		return false;
	}
*/

//校验是否为空
function checkIsNull(inputObj,errEl)
{
	
	if(inputObj.value  == '')
	{
		errEl.innerHTML = '&nbsp不能为空！';
	}
	else
	{
		errEl.innerHTML = '';
	}
}

function checkIsSame(a,b,errEl)
{
	if(a == b)
	{
		errEl.innerHTML = '';
	}
	else
	{
		errEl.innerHTML = '&nbsp两次输入不一致！';
	}
	
}

function checkErrFlag(ElArray)
{
	var s = true;
	for(var i=0; i<ElArray.length; i++)
	{
		if(ElArray[i].innerHTML !='' || $("accountInput1").value == '' || $("accountInput2").value == '' ||($("accountInput1").value != $("accountInput2").value) )
		{
			($("accountInput1").value == '') && ($("accountErr1").innerHTML = '&nbsp不能为空！');
			($("accountInput2").value == '') && ($("accountErr2").innerHTML = '&nbsp不能为空！');
			($("accountInput1").value != $("accountInput2").value ) && ($("accountErr2").innerHTML = '&nbsp两次输入不一致！');			
			s = false;
		}
		
		if($("accountInput3") && $("accountInput4")){
			if(ElArray[i].innerHTML !='' || $("accountInput3").value == '' || $("accountInput4").value == '' ||($("accountInput3").value != $("accountInput4").value) )
			{
				($("accountInput3").value == '') && ($("accountErr3").innerHTML = '&nbsp不能为空！');
				($("accountInput4").value == '') && ($("accountErr4").innerHTML = '&nbsp不能为空！');
				($("accountInput3").value != $("accountInput4").value ) && ($("accountErr4").innerHTML = '&nbsp两次输入不一致！');				
				s = false;
			}
		}
	}
	if(!s){return false}
	
	$("accountErr1").innerHTML = '';
	$("accountErr2").innerHTML = '';
	if($("accountErr3")){$("accountErr3").innerHTML = '';}
	if($("accountErr4")){$("accountErr4").innerHTML = '';}
	
	//用户点击充值按钮，记录用户充值历史到本地
	var currGameName = $('gameName').value;
	var historyGameName = LS.item('gameNameHistory');
	if(historyGameName) {
		historyGameName += '###' + currGameName;
	}else{
		historyGameName = currGameName;
	}
	var historyGameNameArray = historyGameName.split('###');
	var historyArrayLen = historyGameNameArray.length;
	if(historyArrayLen > 3){
		historyGameNameArray = historyGameNameArray.slice(historyArrayLen - 3);
	}	
	LS.item('gameNameHistory', historyGameNameArray.join('###'));
	//用户点击充值按钮，记录用户充值历史到本地
	
	return true;
}

//=========dom事件==========================

//对商品名称绑定事件
$("gameNameWrap").onclick = function(e)
{
	e = e || window.event;
	var pos = new customDom("gameNameWrap").getPosition();
	$("gameListWrap").style.left = pos[0]  + 'px';
	$("gameListWrap").style.top = pos[1] +  20  + 'px';
	toggleClass($("gameListWrap"),"open");
	 $("gameListIframe") && ($("gameListIframe").style.height = $("tabContentWrap").offsetHeight);
	
	e && e.stopPropagation ? e.stopPropagation():e.cancelBubble = true;//停止冒泡
	
	
}
//游戏列表点击外围也可以消失
ev.addEvent(document,"click",function(){hasClass($("gameListWrap"),"open")?removeClass($("gameListWrap"),"open"):''});//

//账号类型改变则文字改变，如游戏账号、确认游戏账号
function clickAccountKind(obj)
{
	if(obj.checked)
	{
		var spanEl = obj.nextSibling.nodeType == 1 ? obj.nextSibling :obj.nextSibling.nextSibling;
		
		$("changeAccountText1").innerHTML = spanEl.innerHTML + '：';
		$("changeAccountText2").innerHTML = '确认' + spanEl.innerHTML + '：';
		
	}
	
}


//保留N位小数
   function formatNumber(src,pos){  
           return Math.round(src*Math.pow(10, pos))/Math.pow(10, pos);  
    }  


//改变数量，则价格变化。
function changeSum(selectObj)
{
	
	var totalPriceEl = $("totalPrice");
	var priceRulerEl = $("priceRuler");
	var signalPrice = $("price").value;
	totalPriceEl.innerHTML = formatNumber( (signalPrice)*selectObj.value,2);
	priceRulerEl.innerHTML = '（'+   formatNumber(signalPrice,2) + 'x'  + selectObj.value + '='  +   formatNumber(signalPrice*parseInt(selectObj.value),2)   + '）';
}

//===============ajax事件绑定===========================
//对游戏列表绑定事件
$("gameListWrap").onclick = function(e)
{
	e = e || window.event;
	var target = e.target || e.srcElement;
	
	if(target.getAttribute("gameId"))
	{
		//填入gameid到hideen，填入name到内容
		$("gameId").value = target.getAttribute("gameId");
		$("gameName").value = target.innerHTML;
		
		//发起ajax,刷新账号类型、充值类型、区、服、单价的jsp页面
		var data = "gameId = " + $("gameId").value;
		XMLHttp.sendReq('POST', NAME_CHANGE_AJAX_URL,data,function (xmlHttpObj)
		{	
			$("nameChangeUpdate").innerHTML = xmlHttpObj.responseText;
		});
		
	}
	toggleClass($("gameListWrap"),"open");
	e && e.stopPropagation ? e.stopPropagation():e.cancelBubble = true;//停止冒泡
}
//对充值面额绑定事件,面额改变，价格部分刷新，同时单价部分更新
//写在充值面值select元素内
function changeFaceValue(selectObj)
{
	   var data = "gameId = " + $("gameIdLocal").value  + '&price=' + selectObj.value + '&listPrice=' + selectObj.options[selectObj.selectedIndex].value
	              + '&faceValue=' + selectObj.value + '&productId=' + $("productId").value;
	   
	   //更新购买单价区域
		XMLHttp.sendReq('POST', FACE_VALUE_CHANGE_AJAX_URL,data,function (xmlHttpObj)
		{	
			$("faceValueChangeUpdate").innerHTML = xmlHttpObj.responseText;
		});
	
}

//改变游戏区，则游戏服务器
function changeArea(selectObj)
{
	    var data = "gameId = " + $("gameId").value +  "&merchantId = " + $("merchantId").value + '&gameAreaId=' + selectObj.value + '&areaName =' + selectObj.options[selectObj.selectedIndex].text;
	   
	   //更新购买单价区域
		XMLHttp.sendReq('POST',AREA_CHANGE_AJAX_URL,data,function (xmlHttpObj)
		{	
			$("areaChangeUpdate").innerHTML = xmlHttpObj.responseText;
		});
}
////点击接受用户协议的ui处
clickAcceptCheckboxUISet("agreement","btnSubmitData","btn-orderbg6-disable")