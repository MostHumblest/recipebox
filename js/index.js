$(document).ready(function(){
	//alert("ready")
	$("button").click(function(){
		$("#rname").text(recipes.A1.title);
		$("#rdiff").text(recipes.A1.difficulty);
		$.each(recipes.A1.ingredients, function(){
				var html ="<li>" + this.quantity + " " + this.item + "</li>";
				$("#ring").append(html);
		});
	});
});
	
