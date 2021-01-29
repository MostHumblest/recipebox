$(document).ready(function(){
//creates pop up when page loads
	console.log("ready");
	//window.location.hash = "home"; this prevent bookmarking a meaningful hash	
	populateCategories();
	hashNavigation();
	buttonClicked();
	populateRecipes();
	toggleHeaders();
	//pageLoad();
	window.trigger('hashchange');
});

//create recipe list
	function populateCategories(){
		$.each(recipes, function(i, val){
			var rCategory = recipes[i].category;
			//rCat = rCat.replace('', 'uncategorized');
			var categoryHeaders = "<h2 id=\"h" + rCategory + "\" class=\"headerCategory\">" + rCategory + "    \u25BE</h2>"; //&ring9662
			var categoryLists = "<ul id=\"r"+ rCategory +"\" class=\"listTOC\"></ul>";
			$("#allRecipes").append(categoryHeaders);
			$("#allRecipes").append(categoryLists);
		});				
	}

//add recipe titles to each section
	function populateRecipes(){
		$.each(recipes, function(i, val){
			var rTitles = "<li><a href=\"https://mosthumblest.github.io/recipebox/#" + recipes[i].id + "\"><li><span>" + recipes[i].title + "</span></a></li>";
			var rCategory = recipes[i].category;
			var thisTag = "#r" + rCategory;
			$(thisTag).append(rTitles);
		});
	}	

//what should happen when the page loads
	function pageLoad(){
		window.trigger('hashchange');
		$("#listIngredients").show();
		$("#listDirections").show();
	}
	
//testing actions on button click
	function buttonClicked(){
		$("button").click(function(){		
			window.location.hash = "clear";
			$("#listIngredients").hide();
			$("#listDirections").hide();
		});	
	}
	

	
//toggle recipes in each section
	function toggleHeaders(){
		$('.headerCategory').click(function(){
			var clickedID = $(this).attr('id');
			tagCapture = clickedID.slice(1);
			newID = "#r" + tagCapture;
			$(newID).toggle();
			var headText = $(this).text();
			var n = headText.length;
			var arrowType = headText.charCodeAt(n-1);
			if(arrowType == 9656){
				console.log("right arrow");
				headText = headText.replace(/\u25B8/, '\u25BE');
			}else if(arrowType == 9662){
				console.log("left arrow");
				headText = headText.replace(/\u25BE/, '\u25B8');				
			}else {
				//do nothing
			}
			$("#"+clickedID).text(headText);
			console.log(arrowType);
		});	
	}
	
	
//hash change event
	function hashNavigation(){
		$(window).on('hashchange', function(){
			var thisID = cleanHash();
			switch(thisID){
				case "home":
				case "clear":
				case "":
					break;
				default:
					loadRecipe(thisID);
			}
		});
	}				
	
//sanitize text after the hash	
	function cleanHash(){
		var hash = location.hash;
		hash = hash.replace('#', '');//strip hash symbol
		hash = hash.replace(/\W/g, '');//strip non-alphanumerics
		console.log("hash changed to: " + hash);
		return hash;
	}
	
//find recipe
	function findRecipe(hash){
		//do stuff
		var thisRecipe = recipes.filter(function(e){
			return e.id === hash;
		});	
		return thisRecipe;
		//console.log(selectedRecipe);
	}
	
//load recipe details
	function loadRecipe(hash){
		var thisRecipe = findRecipe(hash);
		//console.log(selectedRecipe[0].ingredients);
		var ingredients = thisRecipe[0].ingredients;
		var steps = thisRecipe[0].directions;
		
		//get ingredients
		var listIngredients = "<tr>";
		$.each(ingredients, function(j, valueJ){
			listIngredients = listIngredients + "<td>" + ingredients[j].quantity + "</td><td>" + ingredients[j].item + "</td></tr>";		
		});
		$("#listIngredients").show();
		$("#listIngredients").html(listIngredients);
		
		//get steps
		var currentStep = "";
		$.each(steps, function(i, val){
			currentStep = currentStep + "<li>" + steps[i] + "</li>";			
		});
		$("#listDirections").show();
		$("#listDirections").html(currentStep);
	}	
	
