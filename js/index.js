$(document).ready(function(){
//creates pop up when page loads
	console.log("ready");
	hashNavigation();
	buttonClicked();
	populateCategories();
	populateRecipes();
	toggleHeaders();
	$(window).trigger('hashchange'); //forces hash change on page load - enables bookmarking recipes
});

//create recipe list
	function populateCategories(){
		var categories = [];
		var uniqueCategories = [];
		$.each(recipes, function(i, val){
			categories.push(recipes[i].category);			
		});	

		uniqueCategories = categories.filter(onlyUnique);

		$.each(uniqueCategories, function(i, val){
			var rCategory = uniqueCategories[i];
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

//testing actions on button click
	function buttonClicked(){
		$("button").click(function(){		
			window.location.hash = "clear";
			$(".all-info").hide();
		});	
	}
		
//toggle recipes in each section
	function toggleHeaders(){
		$('.headerCategory').click(function(){
			var clickedID = $(this).attr('id');
			tagCapture = clickedID.slice(1);
			newID = "#r" + tagCapture;
			$(newID).toggle();
			//get arrow type
			var headText = $(this).text();
			var n = headText.length;
			var arrowType = headText.charCodeAt(n-1);
			//toogle arrow type
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
	
//load recipe details
	function loadRecipe(hash){
		var thisRecipe = findRecipe(hash);
		//console.log(selectedRecipe[0].ingredients);
		var notes = thisRecipe[0].notes;
		var ingredients = thisRecipe[0].ingredients;
		var steps = thisRecipe[0].directions;
		var title = thisRecipe[0].title;
		var servings = thisRecipe[0].servings;
		var activeTime = thisRecipe[0].time.active;
		var totalTime = thisRecipe[0].time.total;

		$(".all-info").show();
		
		$("#recipeTitle").text(title);

		//set details
		activeTime = "<li> Active: "+activeTime+"</li>";
		totalTime = "<li> Total: "+totalTime+"</li>";
		servings = "<li> Serves: "+servings+"</li>";
		$("#recipeDetails").html(activeTime+totalTime+servings);

		//get notes
		var listNotes = "";
		$.each(notes, function(i, val){
			listNotes = listNotes + "<li>" + notes[i] + "</li>";
		});
		$("#listNotes").html(listNotes);

		//get ingredients
		var listIngredients = "<tr>";
		$.each(ingredients, function(j, valueJ){
			listIngredients = listIngredients + "<td class=\"qty\">" + ingredients[j].quantity + "</td><td class=\"item\">" + ingredients[j].item + "</td></tr>";		
		});
		$("#listIngredients").html(listIngredients);
		
		//get steps
		var currentStep = "";
		$.each(steps, function(i, val){
			currentStep = currentStep + "<li>" + steps[i] + "</li>";			
		});
		$("#listDirections").html(currentStep);

		//get source
		var sourceTitle = thisRecipe[0].source.title;
		var sourceAuthor = thisRecipe[0].source.author;
		var sourceSource = thisRecipe[0].source.source;
		var compiledSource = "\""+sourceTitle+"\", by "+sourceAuthor+" - " + sourceSource;
		$("#recipeSource").text(compiledSource);

		//get index

	}	
	
//find recipe
	function findRecipe(hash){
		//create new array for recipe ID that matches
		var thisRecipe = recipes.filter(function(e){
			return e.id === hash;
		});	
		return thisRecipe;
		//console.log(selectedRecipe);
	}

//sanitize text after the hash	
	function cleanHash(){
		//sanitize hash and get input to find recipe
		var hash = location.hash;
		hash = hash.replace('#', '');//strip hash symbol
		hash = hash.replace(/\W/g, '');//strip non-alphanumerics
		console.log("hash changed to: " + hash);
		return hash;
	}

	function onlyUnique(val, index, self){
		return self.indexOf(val) === index;
	}