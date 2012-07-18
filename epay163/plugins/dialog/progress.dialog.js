nebase.plugins.progressDialogPlugin = {
	showLoadingDialog: function(){
		if($('#bgCoverDiv').length < 1){
			this.init();
		}
		var innerHtml = '<div class="loadingImg"><img src="plugins/dialog/loading.png" /></div><div class="loadingTxt">Processing, please wait...</div>';
		$('#coverContainerDiv').html(innerHtml);
		$('#bgCoverDiv').show();
		$('#coverContainerDiv').show();
		$('body').on('touchmove', function(e){ e.preventDefault();});
		//this.hide();
		//setTimeout("nebase.plugins.progressDialogPlugin.hide()", 3000);
	},
	showToast: function(){
		
	},
	show: function(){
	}
};

$.extend(nebase.plugins.progressDialogPlugin, nebase.plugins.dialogPlugin);