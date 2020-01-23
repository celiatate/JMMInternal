$(document).ready(function() {
	$('.modal').on('hidden.bs.modal', function(){
		$(".modal-content", this).html('');
	});

	//live search by class but only visible nodes
	$("body").on('keyup', '.live-search-class-visible', function () {
		var words = $(this).val().toLowerCase().split(" ");
		var targetClass = $(this).attr("data-target-class");
		var ele;
		$("." + targetClass + ".visible").each(function (index) {
			ele = $(this).text().replace(/<[^>]+>/g, "");
			console.log(index + ": " + ele);
			var displayStyle = "none";
			for (var i = 0; i < words.length; i++) {
				if (ele.toLowerCase().indexOf(words[i]) >= 0)
					displayStyle = "";
				else {
					displayStyle = "none";
					break;
				}
			}
			$(this).css('display', displayStyle);
		});
		$('#' + $(this).attr("name") + '-visible').text($("." + targetClass + ":visible").length);
	}).keyup();

	$("body").on('keypress', '.live-search-class-visible', function (event) {
		if (event.keyCode === 13) {
			event.preventDefault();
		}
	});

	$("body").on("click", ".clear-live-search-class", function () {
		$('input[name="' + $(this).attr("data-target-input") + '"]').val("").trigger('keyup');
		$('#' + $(this).attr("data-target-input") + '-visible').text($("#" + $(this).attr("data-target-input") + "-total").text());
    });
    
});