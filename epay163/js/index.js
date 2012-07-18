var indexObj = function(){
};

indexObj.prototype.init = function(){
	var me = this;
	$('#btn1').bind('click', function(){
		nebase.plugins.dialogPlugin.show({
			title: 'title',
			content: 'content',
			buttons: [{title: '确定', handler: function(){
				console.log(this)	
			}}, {title: '取消', handler: function(){
				nebase.plugins.dialogPlugin.hide();
			}}]
		});
	});
	
	$('body').on('click', '#closeit', function(){
		nebase.plugins.dialogPlugin.hide();
	});
	
	$('#showProgress').bind('click', function(){
		nebase.plugins.progressDialogPlugin.showLoadingDialog();	
	});
};

$(document).ready(function(){
	new indexObj().init();
});