

var totalQuestions = 0;
var data = null;
$(document).ready(function(){
	
	
	populateQuestionsAndAns(data);
	const url = new URL(window.location.href);
	let jsonPath = url.searchParams.get('path');
	if(jsonPath!= null && jsonPath.length > 3) {
		
		jsonPath = jsonPath + ".json";
		//jsonPath = 'https://mocki.io/v1/fa8f755a-318d-466e-8c45-a14c19314a64';
	
		$.getJSON(jsonPath, function(results) {
		  data = results;
		  populateQuestionsAndAns(data);
		});
	} else {
		$("#questions").html("");
	}
	
	$(".li-button").click(function(event){
		
		var refresh = window.location.protocol + "//" + window.location.host + window.location.pathname + '?path=' + event.target.valueOf().id;    
		window.history.pushState({ path: refresh }, '', refresh);

		$("#questions").show();
		var urlPath = event.target.valueOf().id+'.json';
				
		urlPath = 'https://mocki.io/v1/f08cc19a-f85e-4b67-b27a-36d4b9627675';  // 'https://mocki.io/v1/fa8f755a-318d-466e-8c45-a14c19314a64';
	
		$.getJSON(urlPath, function(results) {
		  data = results;
		  populateQuestionsAndAns(data);
		});
		
		
	});
	
		
	
});

function submitFunction(){
	
	$(":radio").each(function(){
		$( "#label_"+this.id ).css('border', '0px solid gray');
	});
	
	$(":radio:checked").each(function(){
		$( "#label_"+this.id ).css('border', '2px solid red');
	});
	$( ".answer" ).css('border', '3px solid green');


	let correctAnsCount =0;
	$(":radio:checked").filter(".answer").each(function(){
		correctAnsCount++;
	});
	
	$("#displayAns").html(correctAnsCount+"/"+totalQuestions);
}

function populateQuestionsAndAns(data) {
	if(data !== null) {
		totalQuestions = 0;
		  let questionAndAns = "";
		  data.questions.forEach(function(ques) {
			 
			  totalQuestions++;
			  let row = 0;
			   
			   questionAndAns = questionAndAns + '<br/><br/><div id="question_' + totalQuestions + '">' + totalQuestions + ") "+ ques.question + '</div>';
			   questionAndAns = questionAndAns + '<div id="radioset_' + totalQuestions + '">';
				ques.options.forEach(function(opti) {
					row++;
					let answer = '';
					ques.answers.forEach(function(ans) {
						if(ans.optionId === opti.id) {
							answer = 'answer';
						}
					});
					questionAndAns = questionAndAns + '<input type="radio" class="' + answer + '" id="radio_' + totalQuestions + '_' +row + '" name="radio_' + totalQuestions + '" value="'+ opti.id +'"><label class="' + answer + '" for="radio_' + totalQuestions + '_' +row + '" id="label_radio_' + totalQuestions + '_' +row + '" >' + opti.option +'</label>';
				});
				questionAndAns = questionAndAns +'</div> ';
				
		  });
		  questionAndAns = questionAndAns +'<br/><br/><div><button onclick="submitFunction()" id="submit-button">Submit</button> </div> <div id="displayAns" class="text-color-red"> </div>';
		  $("#questions").html(questionAndAns);
		  for(let count = 1; count <= totalQuestions; count++) {
			  $( "#radioset_" + count ).buttonset();
		  }
		  $( "#submit-button" ).button();
	}
}