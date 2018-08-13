(function(mixCalculator, $, undefined) {

	let extruderCount = 1,
		toolNo = 0;

	let addExtruders = function(newExtruderCount) {
		let container = $('#extruders');
		for (let i = extruderCount; i < newExtruderCount; i++) {
			let exNo = (i + 1),
				exId = 'extruder_' + exNo,
				exDiv = container.children().last().clone(true);

			exDiv.attr("id", exId);
			exDiv.children().first().attr("for", "extruder_ratio_" + exNo).text("Extruder " + exNo + ":");
			exDiv.children().last().children().first().attr("id", "extruder_ratio_" + exNo).val(0);

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
			sep = ''
		$('[id^=extruder_ratio_').each(function() {
			mixRatio += sep + (parseInt(this.value) / 100.0);
			sep = ':';
		});
		$('#result').text("M567 P" + toolNo + " E" + mixRatio);
	};

	let registerChangeHandlers = function() {
		$('#extruder_count').change(function() {
			adjustExtruderFields(parseInt(this.value));
		});
		$('#tool_no').change(function() {
			toolNo = parseInt(this.value);
			updateCommand();
		});
		$('#extruder_ratio_1').change(function() {
			updateCommand();
		});
	};

	mixCalculator.init = function() {
		registerChangeHandlers();
	}
}(window.mixCalculator = window.mixCalculator || {}, jQuery));

$(document).ready(function() {
	mixCalculator.init();
});
