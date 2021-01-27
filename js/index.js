$(document).ready(function(){
//creates pop up when page loads
	console.log("ready");
	
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
	$(window).on('hashchange', function(){
		thisID = cleanHash();
		switch(thisID){
			case "clicked":
				alert("home");
				break;
			default:
				loadRecipe(thisID);
		}
	});
				
	
//sanitize text after the hash	
	function cleanHash(){
		hash = location.hash;
		hash = hash.replace('#', '');//strip hash symbol
		hash = hash.replace(/\W/g, '');//strip non-alphanumerics
		console.log("hash changed to: " + hash);
		return hash;
	};
	
//find recipe
	function findRecipe(hash){
		//do stuff
		thisRecipe = recipes.filter(function(e){
			return e.id === hash;
		});	
		return thisRecipe;
		//console.log(selectedRecipe);
	};
	
//load recipe details
	function loadRecipe(hash){
		thisRecipe = findRecipe(hash);
		//console.log(selectedRecipe[0].ingredients);
		ingredients = thisRecipe[0].ingredients;
		steps = thisRecipe[0].directions;
		
		//get ingredients
		var listIngr = "<tr>";
		$.each(ingredients, function(j, valueJ){
			listIngr = listIngr + "<td>" + ingredients[j].quantity + "</td><td>" + ingredients[j].item + "</td></tr>";		
		});
		$("#ingList").html(listIngr);
		
		//get steps
		var currentStep = "";
		$.each(steps, function(i, val){
			currentStep = currentStep + "<li>" + steps[i] + "</li>";			
		});
		$("#listSteps").html(currentStep);
	};	
		
});
	
