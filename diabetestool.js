// We need to make sure that our code is not global
$('document').ready(function(){

	// listen to the submit click event
	$('.drat-submit').on('click', function(){

		// this will eventually be our final result
		var totalRisk = 0;

		// used to check if a given value is bigger than ten
		var biggerThenTen = new Array();

		// the mapping for the causes that are biggen than ten
		var causesMap = new Array();
		
		causesMap['diabetesRisk1'] = 'age';
		causesMap['diabetesRisk2'] = 'BMI'
		causesMap['diabetesRisk3'] = 'family history';
		causesMap['diabetesRisk4'] = 'diet';

		// loop through all radio buttons
		$('.diabetesRisk').each(function(){

			// is it checked?
			if($(this).is(':checked')){

				// [todo] we need to create a function to ensure its a valid int
				var curVal = $(this).val();

				// add to the biggenThanTen array
				if(curVal >= 10) {
					biggerThenTen.push($(this).attr('name'));
				}

				// then add to the final result
				totalRisk = parseInt(totalRisk) + parseInt(curVal);
			}
		});

		// ensure that our main answer box is collapsed
		$('.drat-message').slideUp();

		// collapse the children too
		$('.drat-message > div').hide();

		// decide which children message should be displayed
		if(totalRisk < 16) {

			$('.drat-message1').show();

		} else if(totalRisk < 26) {

			$('.drat-message2').show();

		} else {

			var causes = '';
			var arrSize = biggerThenTen.length;

			// we need to bind our data first
			if(arrSize === 0) {

				$('.drat-main-risks').hide();

			} else if(arrSize === 1) {

				$('.drat-plural-sing').html('s are');

			} else {

				$('.drat-plural-sing').html(' is ');
			}

			// [todo] this is buggy, does not return the right answers, also amend this loop to also cater for comma ','
			for(var i = 1; i <= arrSize; i++) {

				causes = causes + ' your ' + causesMap['diabetesRisk' + i];

				if(i < arrSize) {

					causes = causes + ' and ';
				}
			}

			$('.drat-reason').html(causes);

			$('.drat-message3').show();
		}

		// display the main box
		$('.drat-message').slideDown();
	});
});
