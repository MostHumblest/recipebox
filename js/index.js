$(document).ready(function(){
	alert("ready1")
	$("button").click(function(){
		$.getJSON('demo_recipe.json', function(recipe){
			//this gets the json and save it as data
		});
		alert(recipe.a1.title);
	});
});
	
