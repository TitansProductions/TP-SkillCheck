let intervalID, countProgressIntervalID, progressIntervalID, lineProgressIntervalID = 0;

var skillCheckName = "";

var noSuccessTitle, successTitle = "";
var warningMessage = "";

var progressCount = 0;
var removalProgressCount = 0;

var lineCount = 0;

var noDeal = 23;
var lowDeal = 24;
var mediumDeal = 50;
var successDeal = 80;

var canClick = false;
var actionType = "not_started";

function closeSellingMenu() {

	progressCount = 0;
	removalProgressCount = 0;

	lineCount = 0;

	noDeal = 23;
	lowDeal = 24;
	mediumDeal = 50;
	successDeal = 80;

	canClick = false;
	actionType = "not_started";

	if (intervalID != 0) {
		clearInterval(intervalID);
		intervalID = 0;
	}

	if (progressIntervalID != 0) {
		clearInterval(progressIntervalID);
		progressIntervalID = 0;
	}

	if (lineProgressIntervalID != 0) {
		clearInterval(lineProgressIntervalID);
		lineProgressIntervalID = 0;
	}

	if (countProgressIntervalID != 0) {
		clearInterval(countProgressIntervalID);
		countProgressIntervalID = 0;
	}

	$('.circlechart').circlechart(-1);

	document.getElementById("skillcheck_downarrow_title").innerHTML = "";
	document.getElementById("skillcheck_finish_title").innerHTML = "";

	document.getElementById("progressbar").style.width = 0;

	skillCheckName = "";

    $.post("http://tp-skillcheck/closeNUI", JSON.stringify({}));

}


$(function() {


	window.addEventListener('message', function(event) {
		var item = event.data;

		if (item.type == "enable_skillcheck") {
			document.body.style.display = item.enable ? "block" : "none";

			document.getElementById("main_menu").style.display="block";

		}
		else if (item.action === 'closeUIProperly'){
			closeSellingMenu();

		}
		else if (item.action === 'addInformation'){

			skillCheckName = item.skillcheck_name;
			noSuccessTitle = item.skillcheck_no_success;
			successTitle = item.skillcheck_success;

			var imageUrl;
			var circleImageUrl;

			switch(item.difficulty) {
				case "normal":
					imageUrl = "normal_bar.jpg";
					circleImageUrl = item.type + "_normal.png";

					noDeal = 23;
					lowDeal = 24;
					mediumDeal = 70;
					successDeal = 89;
					break;

				case "hard":
					imageUrl = "hard_bar.jpg";
					circleImageUrl = item.type + "_hard.png";
					noDeal = 51;

					lowDeal = 52;
					mediumDeal = 70;
					successDeal = 89;
					break;

				case "very_hard":
					imageUrl = "very_hard_bar.jpg";
					circleImageUrl = item.type + "_very_hard.png";
					noDeal = 80;
					lowDeal = noDeal;
					mediumDeal = 78;
					successDeal = 89;
					break;

				default: 

				imageUrl = "normal_bar.jpg";
				circleImageUrl = item.type + "_normal.png";

				noDeal = 23;
				lowDeal = 24;
				mediumDeal = 70;
				successDeal = 89;
			}

			document.getElementById("bar_image").src = `img/` + imageUrl;

			document.getElementById("image").src = `img/` + circleImageUrl;
			document.getElementById("replaceimage").src = `img/` + item.type + "_start.png";

			document.getElementById("skillcheck_title").innerHTML = item.skillcheck_title;
			document.getElementById("skillcheck_no_success").innerHTML = item.skillcheck_no_success;
			document.getElementById("skillcheck_success").innerHTML = item.skillcheck_success;
			document.getElementById("skillcheck_press_title").innerHTML = item.skillcheck_press_title;
			document.getElementById("skillcheck_stop_title").innerHTML = item.skillcheck_stop_title;


			setTimeout(function() { 

				document.getElementById("skillcheck_downarrow_title").innerHTML = "⯆";
				document.getElementById("image").src = "img/noimage.png";

				intervalID = setInterval(updateDownArrow, 1000); 
				canClick = true;
			}, 4000);


		}

	});

	function updateDownArrow() {
		if (document.getElementById("skillcheck_downarrow_title").innerHTML == "⯆"){
			document.getElementById("skillcheck_downarrow_title").innerHTML = "";
		}else{
			document.getElementById("skillcheck_downarrow_title").innerHTML = "⯆";
		}

	}
	
	$("body").on("keypress", function (key) {
		if (key.which == 32){

			if (canClick && actionType == "not_started") {

				if (actionType == "not_started"){

					actionType = "started";

					if (intervalID != 0) {
						clearInterval(intervalID);
						intervalID = 0;
						document.getElementById("skillcheck_downarrow_title").innerHTML = "";
					}

					progressIntervalID = setInterval(updateProgressBar, 10); 
					countProgressIntervalID = setInterval(updateProgressCount, 10); 

				}
	
			}
		}
	});

	$("body").on("keypress", function (key) {
		if (key.which == 13){

			if (canClick && actionType == "started") {

				actionType = "ended";

				// removing + progress counting system timers.
				clearInterval(countProgressIntervalID);
				countProgressIntervalID = 0;

				clearInterval(progressIntervalID);
				progressIntervalID = 0;

				// replacing + progress counting system timers to removal timers in order to run the line progress.
				progressIntervalID = setInterval(updateRemovalProgressBar, 10); 
				countProgressIntervalID = setInterval(removeProgressCount, 10); 

				// adding / updating line progress bar while removing circular progress.
				lineProgressIntervalID = setInterval(updateLineProgressBar, 10); 


				// removing all text and images in order to display the results.
				setTimeout(function() { 
					document.getElementById("progressbar").style.width = "0";

					document.getElementById("bar_image").src = "img/noimage.png";

					document.getElementById("image").src = "img/noimage.png";
					document.getElementById("replaceimage").src = "img/noimage.png";
	
					document.getElementById("skillcheck_title").innerHTML = "";
					document.getElementById("skillcheck_no_success").innerHTML = "";
					document.getElementById("skillcheck_press_title").innerHTML =  "";
					document.getElementById("skillcheck_stop_title").innerHTML =  "";
					document.getElementById("skillcheck_success").innerHTML = "";

					onDrugTransactionResults()
				}, 4000);

				// closing the menu after 4 seconds of displaying the results.
				setTimeout(function() { 
					closeSellingMenu();
				}, 8000);

			}
		}
	});

	$("body").on("keyup", function (key) {
		if (key.which == 27){

			if (actionType == "not_started"){

				if (canClick){
					closeSellingMenu();
				}
			}
		}
	});

	function onDrugTransactionResults(){
		if ( (progressCount <= noDeal) || (progressCount <= noDeal && noDeal == lowDeal) ){
			document.getElementById("skillcheck_finish_title").innerHTML = noSuccessTitle;

			$.post('http://tp-skillcheck/failed', JSON.stringify({
				skillcheck     : skillCheckName,
				progress : progressCount,
			}))
			
		}else{

			document.getElementById("skillcheck_finish_title").innerHTML = successTitle;

			$.post('http://tp-skillcheck/success', JSON.stringify({
				skillcheck     : skillCheckName,
				progress : progressCount,
			}))

		}
	}

	function updateLineProgressBar(){

		if (lineCount == progressCount){
			clearInterval(lineProgressIntervalID);
			lineProgressIntervalID = 0;

		}else{
			lineCount = lineCount + 1;
			document.getElementById("progressbar").style.width = lineCount + "%";
		}
	}

	function updateProgressCount(){

		progressCount = progressCount + 1;

		if (progressCount == 100){
			progressCount = 0;
		}

		removalProgressCount = progressCount;
	}

	function removeProgressCount(){
		removalProgressCount = removalProgressCount - 1;

		if (removalProgressCount == 0){
			$('.circlechart').circlechart(-1);

			removalProgressCount = 0;

			clearInterval(countProgressIntervalID);
			countProgressIntervalID = 0;

			clearInterval(progressIntervalID);
			progressIntervalID = 0;
		}
	}

	function updateProgressBar() {
		$('.circlechart').circlechart(progressCount);
	}

	function updateRemovalProgressBar() {
		$('.circlechart').circlechart(removalProgressCount);
	}

	function getRndInteger(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	}

});


