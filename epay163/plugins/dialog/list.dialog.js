nebase.plugins.listDialogPlugin = {
	initOptionData: function(){
		var me = this;
		var obj = $('.list-select select');
		//console.log(obj)
		if(obj && obj.length > 0){
			var optObjArray = [];
			var len = obj.length;
			for(var i=0; i<len; i++){
				var optObj = {};
				var id = obj[i].id;
				//console.log(obj[i].innerHTML)
				var tmpArray = this.getJSONStrFromOptStr(obj[i].innerHTML);
				optObj.id = id;
				optObj.data = tmpArray;
				optObjArray.push(optObj);
			}
			if(optObjArray){
				sessionStorage.setItem('list-dialog-data', JSON.stringify(optObjArray));	
			}
		}
		
		/*$('body').on('cilck', '#uuuuu', function(){
			alert(88)	
		});*/
		/*$('.list-select input[type="text"]').bind('click', function(){
			console.log(this)
			var belong = this.dataset.belong;
			if(belong){
				me.showList(belong);
			}
		});*/
		
		$('.list-select div').bind('click', function(){
			var belong = this.title;
			if(belong){
				me.showList(belong);
			}
		});
		
		$('body').on('click', '#scroller .list-radio', function(e){
			$('#' + this.title).parent().find('div').html($(this).find('.name').text());
			me.hide();
		});
	},
	getJSONStrFromOptStr: function(opts){
		//console.log($(opts))
		var tmpArray = [];
		var len = $(opts).length;
		for(var i=0; i<len; i++){
			var txt = $(opts)[i].text;
			if('string' == typeof txt){
				tmpArray.push(txt);
			}
		}
		return tmpArray;
	},
	showList: function(belong){
		var data = sessionStorage.getItem('list-dialog-data');
		var listItems = '';
		if(data){
			data = JSON.parse(data);
			var tmpListData = nebase.getDataFromJsonById(data, belong);
			console.log(tmpListData)
			if(tmpListData && tmpListData.data){
				var len = tmpListData.data.length;
				for(var i=0; i<len; i++){
					listItems += '<li class="list-radio" title="'+belong+'"><span class="name">' + tmpListData.data[i] + '</span><input type="radio" id="list" name="list" /></li>';
				}
				this.show();
				$('#coverContainerDiv').html('<div class="title">请选择</div><div id="bigWrapper"><div id="scroller">' + listItems + '</div></div>');
			}
			new iScroll('bigWrapper', {
				useTransform: true,
				onBeforeScrollStart: function (e) {
					var target = e.target;
					while (target.nodeType != 1) target = target.parentNode;
		
					if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA')
						e.preventDefault();
				}	
			});
			//document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
		}
	}
};

$.extend(nebase.plugins.listDialogPlugin, nebase.plugins.dialogPlugin);

$(document).ready(function(){
	nebase.plugins.listDialogPlugin.initOptionData();
});