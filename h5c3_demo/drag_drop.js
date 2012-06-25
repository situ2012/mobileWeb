function doFirst(){
	mypic = document.getElementById('facepic');
	mypic.addEventListener('dragstart', function(e){
		var code = '<img src="b.png" />';
		e.dataTransfer.setData('Text', code);
	}, false);
	
	mypic.addEventListener('dragend', function(e){
		pic = e.target;
		pic.style.visibility = 'hidden';
	}, false);
	
	leftbox = document.getElementById('leftbox');
	leftbox.addEventListener('dragenter', function(e){
		e.preventDefault();
		leftbox.style.background = 'SkyBlue';
		leftbox.style.border = '3px solid red';
	}, false);
	leftbox.addEventListener('dragleave', function(e){
		e.preventDefault();
		leftbox.style.background = 'White';
		leftbox.style.border = '3px solid blue';
	}, false);
	leftbox.addEventListener('dragover', function(e){
		e.preventDefault();
	}, false);
	leftbox.addEventListener('drop', function(e){
		e.preventDefault();
		leftbox.innerHTML = e.dataTransfer.getData('Text');
	}, false);
}
window.addEventListener('load', doFirst, false);