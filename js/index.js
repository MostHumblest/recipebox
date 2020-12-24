$(document).ready(function(){
	alert("ready")
	$("button").click(function(){
		$.getJSON('js/demo_recipe.json', function(data){
			//this gets the json and save it as data
		});
		alert(data.title);
	});
});
	
