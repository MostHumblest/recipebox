$(document).ready(function(){
	alert("ready")
	$("button").click(function(){
		$("#rname").text(recipes.A1.title);
		$("#rdiff").text(recipes.A1.difficulty);
		$.each(recipes, function(i, datapt){
				var html ="<li>" + datapt.quantity + " " + datapt.item + "</li>";
				$("#ring").append(html);
		});
	});
	$.each(recipes, function(i, item){
		var testText = "<li>" + recipes[i].title + "</li>";
		$("#titles").append(testText);
	});
});
	
