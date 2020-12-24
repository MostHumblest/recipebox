$(document).ready(function(){
	alert("ready")
	$("button").click(function(event){
		$.getJSON("/js/demo_recipe.json", function(data){
			//this gets the json and save it as data
			$("#rdiff").text(data.A1.title);
		});
		$("#rname").text(recipes.A1.title);
	});
});
	
