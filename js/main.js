(function(m567Generator, $, undefined) {

	let extruderCount = parseInt($('#extruder_count').val()),
		toolNo = parseInt($('#tool_no').val()),
		cap = parseInt($('#cap_at').val()),
		total = cap;

	let addExtruders = function(newExtruderCount) {
		let container = $('#extruders');
		for (let i = extruderCount; i < newExtruderCount; i++) {
			let exNo = (i + 1),
				exId = 'extruder_' + exNo,
				exRatioId = 'extruder_ratio_' + exNo,
				exDiv = container.children().last().clone(true),
				label = exDiv.children().first(),
				input = exDiv.children().last().children().first();

			exDiv.attr('id', exId);
			label.attr('for', exRatioId).text('Extruder ' + exNo + ':');
			input.attr('id', exRatioId).attr('data-number', exNo).val(0);

			container.append(exDiv);
		}
	};

	let removeExtruders = function(newExtruderCount) {
		let container = $('#extruders');
		for (let i = extruderCount; i > newExtruderCount; i--) {
			container.children().last().remove();
		}
	};

	let adjustExtruderFields = function(newExtruderCount) {
		if (newExtruderCount < extruderCount) {
			removeExtruders(newExtruderCount);
		} else if (newExtruderCount > extruderCount) {
			addExtruders(newExtruderCount);
		}
		extruderCount = newExtruderCount;
		updateCommand();
	};

	let updateCommand = function() {
		let mixRatio = '',
			sep = '',
			sum = 0;
		$('[id^=extruder_ratio_').each(function() {
			let v = this.valueAsNumber;
			sum += v;

			mixRatio += sep + (v / 100.0);
			sep = ':';
		});
		if (sum <= cap) {
			$('#result').text("M567 P" + toolNo + " E" + mixRatio);
		} else {
			$('#result').text("The total of values exceeds the set limit.");
		}
	};

	let registerChangeHandlers = function() {
		$('#extruder_count').change(function() {
			adjustExtruderFields(this.valueAsNumber);
		});
		$('#tool_no').change(function() {
			toolNo = this.valueAsNumber;
			updateCommand();
		});
		$('#extruder_ratio_1').change(function() {
			updateCommand();
		});
		$('#cap_at').change(function() {
			cap = this.valueAsNumber;
		});
	};

	m567Generator.init = function() {
		registerChangeHandlers();
	}
}(window.m567Generator = window.m567Generator || {}, jQuery));

$(document).ready(function() {
	m567Generator.init();
});
