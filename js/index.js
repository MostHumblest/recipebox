$(document).ready(function(){
//creates pop up when page loads
	console.log("ready");
	hashNavigation();
	clearButtonClicked();
	hideButton();
	showButton();
	printButton();
	populateCategories();
	populateRecipes();
	toggleHeaders();
	liveSearch();
	loadNull();
	doFormatting("lol"); //default input text
	$(window).trigger('hashchange'); //forces hash change on page load - enables bookmarking recipes
});

//cookies! but not a recipe for them
/* function setCookie(cname, cvalue, exdays){
	var d = new Date();
	d.setTime(d.getTime()+(exdays*24*60*60*1000));
	var expires = "expires+"+d.toUTCString();
	document.cookie= cname + "=" + cvalue+ ";" + expires + ";path=/";
}

function getCookie(cname){
	var name  = cname + "=";
	var ca = document.cookie.split(';');
	for(var i = 0; i < ca.length; i++){
		var c = ca[i];
	}
} */

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
			var rCategoryID = rCategory.replace(/ /g, "_");			
			if(rCategoryID != "demo"){ //skip template/demo section of json
				var categoryHeaders = "<h2 id=\"h" + rCategoryID + "\" class=\"headerCategory\">" + rCategory + "    <span class=\"arrow\">\u25BE<span></h2>"; //&ring9662
				var categoryLists = "<ul id=\"r"+ rCategoryID +"\" class=\"category-list\"></ul>";
				$("#allRecipes").append(categoryHeaders);
				$("#allRecipes").append(categoryLists);
			}			
		});			
	}

//live search
	function liveSearch(){
		$("#searchBar").keypress(function(e) {
			if(e.keyCode===13) document.activeElement.blur();
		});
		$("#searchBar").keyup(function(){
			$('.all').hide();
			$('.headerCategory').hide();
			var searchField=$(this).val();
			console.log(searchField);
			if(searchField === ""){
				$('.all').show();	
				$('.headerCategory').show();			
				return;
			}			
			var regex = new RegExp(searchField, "i");
			var returnID;
			var titleSearch = false;
			var tagSearch = false;
			var isDemo = false;
			var ingredients;
			var ingredientSearch = false;
				$.each(recipes, function(key, val){
					returnID = "."+val.id;
					isDemo = (returnID.slice(2) === "0" || returnID.slice(2) === "emo");
					if (isDemo != true){//don't search demo or place holder recipes
						titleSearch = val.title.search(regex);
						tagSearch = val.tags.findIndex(value => regex.test(value));
						ingredients = val.ingredients;
						category = val.category;
						category = "#h"+category.replace(/ /g, "_");						
						$.each(ingredients, function(i, value){
							ingredientSearch = ingredients[i].item.search(regex);
							if(ingredientSearch != -1){
								return false;
							}
						});						
						if(titleSearch != -1 || tagSearch != -1 || ingredientSearch != -1){ //if found in search one of these returns true
							$(category).show();
							$(returnID).show();							
						}
					}		
					
				});		
		});
	}

//add recipe titles to each section
	function populateRecipes(){
		var d = new Date();
		var clientYear = d.getFullYear();
		var clientMonth =  d.getMonth() + 1;
		var clientDay =  d.getDate();
		var clientDate = clientYear + clientMonth + clientDay;
		console.log(clientDate);
		$.each(recipes, function(i, val){	
			var rID=recipes[i].id;
			//var rDate=recipes[i].date;
			var rNumber=rID.charAt(1);			
			if(rID != "demo" && rNumber != "0"){//if not demo or placeholder show recipe
				var rTitle=recipes[i].title;	
				var rCategory = recipes[i].category;
				rCategoryID = rCategory.replace(/ /g, "_");
				var thisTag = "#r" + rCategoryID;
				var linkClass = "\"all " + rID +"\"";
				var rTitleItem = "<li class=" +linkClass + "><a class="+linkClass+"href=\"https://mosthumblest.github.io/recipebox/#" + rID+ "\"><span>" + rTitle + "</span></a></li>";
				$(thisTag).append(rTitleItem);
			}
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
			$('.arrow').text('\u25B8');
		});
	}

	function showButton(){
		$("#showCategories").click(function(){
			$('.category-list').show();
			$('.arrow').text('\u25BE');
		});
	}

	function printButton(){
		$("#print").click(function(){
			window.print();
		});
	}
		
//toggle recipes in each section
	function toggleHeaders(){
		$('.headerCategory').click(function(){
			var clickedID = $(this).attr('id');
			tagCapture = clickedID.slice(1);
			newID = "#r" + tagCapture;
			newArrow = "#" + clickedID + " .arrow";
		//get arrow type
			var headText = $(this).text();
			var n = headText.length;
			var arrowType = headText.charCodeAt(n-1);
		//toogle arrow type
			if(arrowType == 9656){
				$(newArrow).text('\u25BE');
				$(newID).show();
			}else if(arrowType == 9662){
				$(newArrow).text('\u25B8');
				$(newID).hide();				
			}else {
				//do nothing
			}
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
		var listNotes = "<h3>Notes:</h3>";
		var thisNote = "";
		var hang= false;
		$.each(notes, function(i, val){
			thisNote = doFormatting(notes[i]);			
			noteFirstChar=thisNote.charAt(0);
			switch(noteFirstChar){
				case "!":				
					hang = true;
					thisNote=thisNote.slice(1);
					listNotes = listNotes + "<li class=\"subsection\"><h4>" + thisNote + "</h4></li>";
					break;
				case "$":
					hang = false;
					thisNote=thisNote.slice(1);
					listNotes = listNotes + "<li>" + thisNote + "</li>";
					break;
				default:
					if (hang){
						listNotes = listNotes + "<li class=\"hanging\">" + thisNote + "</li>";
						break;
					}else{
						listNotes = listNotes + "<li>" + thisNote + "</li>";
					}
			}
		});
		$("#recipeNotes").html(listNotes);

	//get ingredients
		var listIngredients = "<h3 class=\"sectionHeader\">Ingredients</h3>";
		var thisItem;
		var thisQuantity;
		$.each(ingredients, function(j, valueJ){
			thisQuantity = ingredients[j].quantity;
			thisQuantity = doFormatting(thisQuantity);
			thisItem = ingredients[j].item;
			thisItem = doFormatting(thisItem);
			listIngredients = listIngredients + "<tr><td class=\"qty\">" + thisQuantity + "</td><td class=\"item\">" + thisItem + "</td></tr>";		
		});
		$("#recipeIngredients").html(listIngredients);
		
	//get steps
		var currentStep="<h3 class=\"sectionHeader\">Process</h3>";
		var thisStep="";
		var stepFirstChar="";
		var hang=false;
		$.each(steps, function(i, val){
			thisStep = steps[i];
			thisStep = doFormatting(thisStep);
			stepFirstChar=thisStep.charAt(0);
			switch(stepFirstChar){
				case "!":				
					hang = true;
					thisStep=thisStep.slice(1);
					currentStep = currentStep + "<li class=\"subsection\"><h4>" + thisStep + "</h4></li>";
					break;
				case "$":
					hang = false;
					thisStep=thisStep.slice(1);
					currentStep = currentStep + "<li>" + thisStep + "</li>";
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
		if (sourceAuthor === "ukn"){
			sourceAuthor = "";
		}else{
			sourceAuthor = " by " + sourceAuthor;
		}
		var sourceSource = thisRecipe[0].source.source;
		var compiledSource = sourceTitle + sourceAuthor + " - " + sourceSource;
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

	function doFormatting(inputText){
		//format temperatures
		var cookTemp = inputText.match(/([0-9]{2} ?[Ff}])/g);
		var newCookTemp;
		$.each(cookTemp, function(i, val){
			newCookTemp = cookTemp[i].replace(/ /,"");
			newCookTemp = newCookTemp.replace(/[Ff]/,"\u00B0F");
			inputText = inputText.replace(cookTemp[i], newCookTemp);
		});
		//format fractions
		var oldFraction = inputText.match(/([0-9]\/[0-9])/g);
		var newFraction;
		var re;
		$.each(oldFraction, function(i, val){
			newFraction = "<span class=\"frac\">" + oldFraction[i] + "</span>"
			re = new RegExp(oldFraction[i], 'g');
			inputText = inputText.replace(re, newFraction);
		});
		var referenceNumber = inputText.match(/(#[A-Z][0-9]?)/gi);		
		var referenceLink;
		$.each(referenceNumber, function(i, valI){
			$.each(recipes, function(j, valJ){
				returnID = "#"+valJ.id;
				if(referenceNumber[i] === returnID){
					referenceLink ="<a class=\"rlink\" href=\""+referenceNumber[i]+"\">"+ valJ.title +"</a>";
					inputText = inputText.replace(referenceNumber[i], referenceLink);
				}
			});			
		});
		return inputText;
	}