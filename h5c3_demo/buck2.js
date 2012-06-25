function getStuff(){
	//document.querySelector('#tuna').onclick = talk;
	var list = document.querySelectorAll('#tuna');
	//list[0].onclick = talk;
	//list[1].onclick = talk;
	for(var i=0; i<list.length; i++){
		list[i].onclick = talk;
	}
}
function talk(){
	alert('yoyoma!');
}
window.onload = getStuff;