$(document).ready(function(){
//creates pop up when page loads
	console.log("ready");
	hashNavigation();
	clearButtonClicked();
	hideButton();
	showButton();
	populateCategories();
	populateRecipes();
	toggleHeaders();
	liveSearch();
	loadNull();
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
			rCategoryID = rCategory.replace(/ /g, "_");
			var categoryHeaders = "<h2 id=\"h" + rCategoryID + "\" class=\"headerCategory\">" + rCategory + "    <span id=\"arrow\">\u25BE<span></h2>"; //&ring9662
			var categoryLists = "<ul id=\"r"+ rCategoryID +"\" class=\"category-list\"></ul>";
			$("#allRecipes").append(categoryHeaders);
			$("#allRecipes").append(categoryLists);
		});			
	}
//recipe tags
	function liveSearch(){
		$("#searchBar").keyup(function(){
			$('.all').hide();
			var searchField=$(this).val();
			console.log(searchField);
			if(searchField === ""){
				$('.all').show();				
				return;
			}			
			var regex = new RegExp(searchField, "i");
			var returnIDs = '';
			var count = 0;
			var titleSearch = false;
			var tagSearch = false;
			var ingredients;
			var ingredientSearch = false;
				$.each(recipes, function(key, val){
					titleSearch = val.title.search(regex);
					tagSearch = val.tags.findIndex(value => regex.test(value));
					ingredients = val.ingredients;
					$.each(ingredients, function(i, value){
						ingredientSearch = ingredients[i].item.search(regex);
						if(ingredientSearch != -1){
							return false;
						}
					});					
					if(titleSearch != -1 || tagSearch != -1 || ingredientSearch != -1){
						count = count + 1
						switch(count){
							case 1:
								returnIDs = returnIDs + " ." + val.id
								break;
							default:
								returnIDs = returnIDs + ", ." + val.id
						}
					}
				});
			console.log(returnIDs);
			$(returnIDs).show();			
		});
	}

//add recipe titles to each section
	function populateRecipes(){
		$.each(recipes, function(i, val){	
			var rID =recipes[i].id;	
			var rTitle=recipes[i].title;	
			var rCategory = recipes[i].category;
			rCategoryID = rCategory.replace(/ /g, "_");
			var thisTag = "#r" + rCategoryID;
			var linkClass = "\"all " + rID +"\"";
			var rTitleItem = "<li class=" +linkClass + "><a class="+linkClass+"href=\"https://mosthumblest.github.io/recipebox/#" + rID+ "\"><span>" + rTitle + "</span></a></li>";
			//add code to skip placeholders charAt(1)==="0"
			$(thisTag).append(rTitleItem);
		});
	}	

//testing actions on button click
	function clearButtonClicked(){
		$("#clearSearch").click(function(){
			$("#searchBar").val("");
			$("#searchBar").keyup();		
		});	
	}
//toggle headers
	function hideButton(){
		$("#hideCategories").click(function(){
			$('.category-list').hide();
		});
	}

	function showButton(){
		$("#showCategories").click(function(){
			$('.category-list').show();
		});
	}
		
//toggle recipes in each section
	function toggleHeaders(){
		$('.headerCategory').click(function(){
			var clickedID = $(this).attr('id');
			tagCapture = clickedID.slice(1);
			newID = "#r" + tagCapture;
		//get arrow type
			var headText = $(this).text();
			console.log(headText);
			var n = headText.length;
			var arrowType = headText.charCodeAt(n-1);
		//toogle arrow type
			if(arrowType == 9656){
				console.log("right arrow");
				headText = headText.replace(/\u25B8/, '\u25BE');
				$(newID).show();
			}else if(arrowType == 9662){
				console.log("down arrow");
				headText = headText.replace(/\u25BE/, '\u25B8');
				$(newID).hide();				
			}else {
				//do nothing
			}
			$("#"+clickedID).text(headText);
			console.log(clickedID);
		});	
	}	
	
//hash change event
	function hashNavigation(){
		$(window).on('hashchange', function(){
			var thisID = cleanHash();
			switch(thisID){
				case "home":				
				case "":
					loadNull();
					break;
				case "clear":
					break;
				default:
					loadRecipe(thisID);
			}
		});
	}	

//load "blank" page
	function loadNull(){
		$("#recipeTitle").text('Select a Recipe...');
		$("#searchBar").val("");
	}
	
//load recipe details
	function loadRecipe(hash){
		var thisRecipe = findRecipe(hash);
	//pull out recipe bits
		var notes = thisRecipe[0].notes;
		var ingredients = thisRecipe[0].ingredients;
		var steps = thisRecipe[0].directions;
		var title = thisRecipe[0].title;
		var yield = thisRecipe[0].yield;
		var activeTime = thisRecipe[0].time.active;
		var totalTime = thisRecipe[0].time.total;

		$(".all-info").show();
		
		$("#recipeTitle").text(title);

		$("#recipeYield").text("");
		if(yield != 0){
			yield = "Yield: " + yield;
			$("#recipeYield").text(yield);
		}
		

	//set time
		activeTime = "<li> Active: "+activeTime+"</li>";
		totalTime = "<li> Total: "+totalTime+"</li>";
		$("#recipeTime").html(activeTime+totalTime);

	//get notes
		var listNotes = "";
		$.each(notes, function(i, val){
			listNotes = listNotes + "<li>" + notes[i] + "</li>";
		});
		$("#recipeNotes").html(listNotes);

	//get ingredients
		var listIngredients = "<tr><th></th><th></th></tr>";
		$.each(ingredients, function(j, valueJ){
			listIngredients = listIngredients + "<tr><td class=\"qty\">" + ingredients[j].quantity + "</td><td class=\"item\">" + ingredients[j].item + "</td></tr>";		
		});
		$("#recipeIngredients").html(listIngredients);
		
	//get steps
		var currentStep="";
		var thisStep="";
		var stepFirstChar="";
		var hang=false;
		$.each(steps, function(i, val){
			thisStep = steps[i];
			stepFirstChar=thisStep.charAt(0);
			switch(stepFirstChar){
				case "!":				
					hang = true;
					thisStep=thisStep.slice(1);
					currentStep = currentStep + "<li><h3>" + thisStep + "</h3></li>";
					break;
				default:
					if (hang){
						currentStep = currentStep + "<li class=\"hanging\">" + thisStep + "</li>";
						break;
					}else{
						currentStep = currentStep + "<li>" + thisStep + "</li>";
					}
			}
						
		});
		$("#recipeDirections").html(currentStep);

	//get source
		var sourceTitle = thisRecipe[0].source.title;
		var sourceAuthor = thisRecipe[0].source.author;
		var sourceSource = thisRecipe[0].source.source;
		var compiledSource = sourceTitle+" by "+sourceAuthor+" - "+ sourceSource;
		$("#recipeSource").text(compiledSource);

	//get index
		var indexLetter = hash.slice(0,1);
		var indexNumber = hash.slice(1);
		indexNumber = indexNumber.padStart(3, "0");
		$("#recipeIndex").text(indexLetter + "." + indexNumber);

	//if tip/technique then don't display some info
		var firstHashChar = hash.charAt(0);
		if(firstHashChar === "A"){
			$("#recipeDirections").html("");
			$("#recipeIngredients").html("");
			$("#recipeTime").html("");
		}
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