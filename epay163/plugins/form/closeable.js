nebase.plugins.closeablePlugin = {
	init: function(){
		$('.closeable').append('<img src="plugins/form/close.png" />');
		$('.closeable img').bind('click', function(){
			$(this).parent().hide();
		});
	}
};

$(document).ready(function(){
	nebase.plugins.closeablePlugin.init();
});