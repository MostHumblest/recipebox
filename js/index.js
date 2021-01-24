$(document).ready(function(){
//creates pop up when page loads
	alert("ready");
	
//testing actions on button click
	$("button").click(function(){
		//$("#rname").text(recipes.A1.title);
		//$("#rdiff").text(recipes.A1.difficulty);
		/* $.each(recipes, function(i, value){
			var html;
			$.each(this.ingredients, function(j, value){
				html = html + "<li>" + recipes[i].ingredients[j].quantity+ " " + recipes[i].ingredients[j].item + "</li>";
				$("#ring").html(html);
			});
		}); */
		window.location.hash = "clicked";
	});
//testing listing recipe titles
	/*$.each(recipes, function(i, item){
		var testText = "<li>" + recipes[i].title + "</li>";
		$("#titles").append(testText);
	});*/
	
//testing create ingredient table
	var listIng;
	$.each(recipes, function(i, valueI){
		listIngr = "<tr>";
		$.each(this.ingredients, function(j, valueJ){
			listIngr = listIngr + "<td>" + recipes[i].ingredients[j].quantity + "</td><td>" + recipes[i].ingredients[j].item + "</td></tr>";
			$("#ingList").html(listIngr);
		});
	});
	
//add recipe titles to beef section
	$.each(recipes, function(i, value){
		var rTitles = "<li><a href=\"https://mosthumblest.github.io/recipebox/#" + recipes[i].id + "\"><li><span>" + recipes[i].title + "</span></a></li>";
		$("#rBeef").append(rTitles);
	});
	
//toggle recipes in each section
	$("#hBeef").click(function(){
		$("#rBeef").toggle();
	});	
	
//hash change event
	$(window).hashchange(function() {
		var hash = this.location.hash.substr(1);
		alert("hash changed to: " + hash);
	});
		
});
	
