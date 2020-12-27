$(document).ready(function(){
	alert("ready")
	$("button").click(function(){
		$("#rname").text(recipes.A1.title);
		$("#rdiff").text(recipes.A1.difficulty);
		$("#ring").text(recipes.A1.ingredients[1].item);
	});
});
	
