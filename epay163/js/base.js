(function(window){
	window.nebase = {
		getDataFromJsonById: function(jsonObj, id){
			for(var i=0; i<jsonObj.length; i++){
				if(jsonObj[i].id == id){
					return jsonObj[i];
				}
			}
			return null;
		}
	};
	window.nebase.plugins = {};
})(window);