function doFirst(){
	var button = document.getElementById('button');
	button.addEventListener('click', function(){
		var one = document.getElementById('one').value;
		var two = document.getElementById('two').value;
		sessionStorage.setItem(one, two);
		
		display();
		document.getElementById('one').value = '';
		document.getElementById('two').value = '';
	}, false);
	display();
}

function display(one){
	var rightbox = document.getElementById('rightbox');
	//var two = sessionStorage.getItem(one);
	//rightbox.innerHTML = 'Name of variable: ' + one + '<br />Value: ' + two;
	rightbox.innerHTML = '';
	for(var x=0; x<sessionStorage.length; x ++){
		var a = sessionStorage.key(x);
		var b = sessionStorage.getItem(a);
		rightbox.innerHTML += a + ' - ' + b + '<br />';
	}
}

window.addEventListener('load', doFirst, false);