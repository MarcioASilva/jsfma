// We need to make sure that our code is not global
$('document').ready(function() {

	// listen to the submit click event
	$('.drat-submit').on('click', function(e) {

		// in case the submit button is inside a form
		e.preventDefault();

		// this will eventually be our final result
		var totalRisk = 0;

		// array containing all entries that are bigger than ten
		var biggerThenTen = new Array();

		// the mapping for the causes that are bigger than ten
		var causesMap = new Array();

		causesMap['diabetesRisk1'] = 'age';
		causesMap['diabetesRisk2'] = 'BMI'
		causesMap['diabetesRisk3'] = 'family history';
		causesMap['diabetesRisk4'] = 'diet';

		// loop through all radio buttons
		$('.diabetesRisk').each(function() {

			// is it checked?
			if($(this).is(':checked')) {

				// [todo] we need to create a function to ensure its a valid int
				var curVal = $(this).val();

				// add to the biggerThanTen array
				if(curVal >= 10) {
					biggerThenTen.push($(this).attr('name'));
				}

				// then add to the final result
				totalRisk = parseInt(totalRisk) + parseInt(curVal);
			}
		});

		// ensure that our main answer box is collapsed
		$('.drat-message').slideUp(function() {

			// collapse the children too
			$('.drat-message > div').hide();

			// decide which children message should be displayed
			if(totalRisk < 16) {

				$('.drat-message1').show();

			} else if(totalRisk < 26) {

				$('.drat-message2').show();

			} else {

				/* last message box is more tricky
				 * we need to bind our data first */
				var causes = '';
				var arrSize = biggerThenTen.length;

				/* the next 'if' and 'else if' are a bit of an overkill
				 * only here for the sake of completeness */
				if(arrSize === 0) {

					// hide the entire risks sentence
					$('.drat-main-risks').hide();

				} else if(arrSize === 1) {

					// complement the risks sentence with the singular 'is'
					$('.drat-plural-sing').html(' is');

				// in practice, this is the only rule that will ever fire
				} else {

					// complement the risks sentence with the plural are
					$('.drat-plural-sing').html('s are');
				}

				/* Again, a bit of an overkill, but should make our software
				 * a bit more future proof if the number values change
				 * for instance, change one of the values to 26 in the html radio
				 * button value then select it and press calculate */
				$.each(biggerThenTen, function(index, value) {

					// we need to add the word your before each risk cause
					causes = causes + ' your ' + causesMap[value];

					if(index < arrSize - 2) {

						// separate the risks with a comma ','
						causes = causes + ', ';

					} else if(index < arrSize - 1) {

						// if it is the last risk, separate the risk with the word 'and'
						causes = causes + ' and ';
					}
				});

				// place the risks in the DOM
				$('.drat-reason').html(causes);

				// then display it
				$('.drat-message3').show();
			}

			// display the main box
			$('.drat-message').slideDown();
		});
	});
});
