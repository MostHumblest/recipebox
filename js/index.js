$(document).ready(function(){
	alert("ready");
	$("button").click(function(){
		//$("#rname").text(recipes.A1.title);
		//$("#rdiff").text(recipes.A1.difficulty);
		$.each(recipes, function(i, value){
			$.each(this.ingredients, function(j, value){
				var html ="<li>" + recipes[i].ingredients[j].quantity+ " " + recipes[i].ingredients[i].item + "</li>";
				$("#ring").append(html);
			});
		});
	});
	$.each(recipes, function(i, item){
		var testText = "<li>" + recipes[i].title + "</li>";
		$("#titles").append(testText);
	});
});
	
