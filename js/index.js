$(document).ready(function(){
	alert("ready")
	$("button").click(function(){
		$.get("/js/demo_recipe.json", function(data){
			//this gets the json and save it as data
			alert("success");
			$("#rdiff").text(data.title);
		});
		$("#rname").text(recipes.A1.title);
	});
});
	
