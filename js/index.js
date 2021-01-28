$(document).ready(function(){
//creates pop up when page loads
	console.log("ready");
	window.location.hash = "home";
	populateCategories();
	hashNavigation();
	buttonClicked();
	populateRecipes();
	toggleHeaders();
});

//create recipe list
	function populateCategories(){
		$.each(recipes, function(i, val){
			var rCat = recipes[i].category;
			//rCat = rCat.replace('', 'uncategorized');
			var categoryHeaders = "<h2 id=\"h" + rCat + "\" class=\"headCat\">" + rCat + "    \u25BE</h2>"; //&#9662
			var categoryLists = "<ul id=\"r"+ rCat +"\" class=\"rList\"></ul>";
			$("#allRecipes").append(categoryHeaders);
			$("#allRecipes").append(categoryLists);
		});				
	}

//add recipe titles to each section
	function populateRecipes(){
		$.each(recipes, function(i, val){
			var rTitles = "<li><a href=\"https://mosthumblest.github.io/recipebox/#" + recipes[i].id + "\"><li><span>" + recipes[i].title + "</span></a></li>";
			var rCat = recipes[i].category;
			var thisTag = "#r" + rCat;
			$(thisTag).append(rTitles);
		});
	}	
	
//testing actions on button click
	function buttonClicked(){
		$("button").click(function(){		
			window.location.hash = "clear";
			$("#listIng").hide();
			$("#listStep").hide();
		});	
	}
	

	
//toggle recipes in each section
	function toggleHeaders(){
		$('.headCat').click(function(){
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
			thisID = cleanHash();
			switch(thisID){
				case "home", "clear":
					break;
				default:
					loadRecipe(thisID);
			}
		});
	}				
	
//sanitize text after the hash	
	function cleanHash(){
		hash = location.hash;
		hash = hash.replace('#', '');//strip hash symbol
		hash = hash.replace(/\W/g, '');//strip non-alphanumerics
		console.log("hash changed to: " + hash);
		return hash;
	}
	
//find recipe
	function findRecipe(hash){
		//do stuff
		thisRecipe = recipes.filter(function(e){
			return e.id === hash;
		});	
		return thisRecipe;
		//console.log(selectedRecipe);
	}
	
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
		$("#listIng").show();
		$("#listIng").html(listIngr);
		
		//get steps
		var currentStep = "";
		$.each(steps, function(i, val){
			currentStep = currentStep + "<li>" + steps[i] + "</li>";			
		});
		$("#listStep").show();
		$("#listStep").html(currentStep);
	}	
	
