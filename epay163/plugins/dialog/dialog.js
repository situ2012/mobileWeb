nebase.plugins.dialogPlugin = {
	init: function(){
		$('body').append('<div id="bgCoverDiv"></div><div id="coverContainerDiv"></div>'); //<div id="closeContainerDiv"></div>
		$('#bgCoverDiv').hide();
		$('#coverContainerDiv').hide();
	},
	show: function(dialogObj){
		if($('#bgCoverDiv').length < 1){
			this.init();
		}
		dialogObj = dialogObj || {title: '', content: '', footer: ''};
		dialogObj.title = dialogObj.title || '';
		dialogObj.content = dialogObj.content || '';
		dialogObj.footer = dialogObj.footer || '';
		var diaButtons = dialogObj.buttons;
		if(diaButtons && diaButtons.length > 0){
			for(var i=0; i<diaButtons.length; i++){
				dialogObj.footer += '<a id="diaBtn'+i+'" class="btn big">'+diaButtons[i]['title']+'</a>';
				if(diaButtons[i]['handler']){
					$('#coverContainerDiv').on('click', '#diaBtn' + i, diaButtons[i]['handler']);
				}
			}
		}
		
		var innerHtml = '<div class="dialogHeader">'+dialogObj.title+'</div><div class="dialogContent">'+dialogObj.content+'</div><div class="dialogFooter">'+dialogObj.footer+'</div>';
		$('#coverContainerDiv').html(innerHtml);
		$('#bgCoverDiv').show();
		$('#coverContainerDiv').show();
		$('body').on('touchmove', function(e){ e.preventDefault();});
	},
	hide: function(){
		$('#coverContainerDiv').html('');
		$('#bgCoverDiv').hide();
		$('#coverContainerDiv').hide();
		$('body').off('touchmove');
	}
};

/*$(document).ready(function(){
	nebase.plugins.dialogPlugin.init();
});*/