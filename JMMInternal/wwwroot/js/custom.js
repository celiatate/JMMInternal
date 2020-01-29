toastr.options = {
	"closeButton": false,
	"debug": false,
	"newestOnTop": false,
	"progressBar": false,
	"positionClass": "toast-top-right",
	"preventDuplicates": false,
	"onclick": null,
	"showDuration": "300",
	"hideDuration": "1000",
	"timeOut": "5000",
	"extendedTimeOut": "1000",
	"showEasing": "swing",
	"hideEasing": "linear",
	"showMethod": "fadeIn",
	"hideMethod": "fadeOut"
};

function editSummernote(btnObj, eleId, editorHeight = 200){
	$(btnObj).toggleClass('btn-outline-warning btn-success edit-summernote save-summernote').html('<i class="la la-save"></i>');
	$('#' + eleId).summernote({
		focus: true,
		height: editorHeight,
		toolbar: [
			['style', ['bold', 'italic', 'underline', 'clear']],
			['font', ['strikethrough', 'superscript', 'subscript']],
			['fontsize', ['fontsize']],
			['color', ['color']],
			['para', ['ul', 'ol', 'paragraph']],
			['height', ['height']]
		]
	});
}

function saveSummernote(btnObj, eleId) {
	$(btnObj).toggleClass('btn-outline-warning btn-success edit-summernote save-summernote').html('<i class="la la-pencil"></i>');
	$('#' + eleId).summernote('code');
	$('#' + eleId).summernote('destroy');
};


function copyToClipboard(text) {
	var d = new Date();
	var n = d.getTime();
	var targetId = "_hiddenCopyText_" + n + "_";
	// must use a temporary form element for the selection and copy
	target = document.getElementById(targetId);
	if (!target) {
		var target = document.createElement("input");
		target.style.position = "absolute";
		target.style.left = "-9999px";
		target.style.top = "0";
		target.id = targetId;
		target.value = text;
		document.body.appendChild(target);
	}
	/* Get the text field */
	var copyText = document.getElementById(targetId);

	/* Select the text field */
	copyText.select();

	/* Copy the text inside the text field */
	document.execCommand("copy");

	toastr.success("Text was copied to your clipboard!");
}

function modalAssignment(loadUrl, modalSize = 'dynamic', direction = 'up') {
	if (modalSize === 'dynamic') {
		if (window.innerWidth > 1100) {
			modalSize = 'lg';
		}
		else if (window.innerWidth > 700) {
			modalSize = 'md';
		}
		else {
			modalSize = 'sm';
		}
	}
	//search if there is a modal open already
	let openModals = $(".modal.show");
	if(openModals.length > 0){
		let openModalId = openModals.first().attr('id');
		$("#" + openModalId + " .modal-content").load(loadUrl, function(response, status, xhr) {
			if(status === 'error'){
				console.log(xhr.status + " " + xhr.statusText);
			}

			//initiate js modules
			$('.date-range-picker').daterangepicker();
			$('.modal-content .select-picker').selectpicker();
		});
	}
	else{
		$("#modal-" + modalSize + " .modal-content").load(loadUrl, function(response, status, xhr) {
			if(status === 'error'){
				console.log(xhr.status + " " + xhr.statusText);
			}
			else{
				$('.modal')
					.prop('class', 'modal fade') // revert to default
					.addClass(direction);
				$("#modal-" + modalSize).modal();

				//initiate js modules
				$('.date-range-picker').daterangepicker();
				$('.modal-content .select-picker').selectpicker();
			}
		});
	}
}

$(document).ready(function() {

	$('.jstree-container').jstree({
		"selected" : true,
		"opened" : true,
		"core" : {
			"themes" : {
				"responsive": false
			}, 
			// so that create works
			"check_callback" : true,
		},
		"types" : {
			"default" : {
				"icon" : "fa fa-folder kt-font-brand"
			},
			"file" : {
				"icon" : " flaticon2-file  kt-font-brand"
			}
		},
		"state" : { "key" : "demo2" },
		"plugins" : [ "contextmenu", "state", "types" ]
	});

	$('.modal').on('hidden.bs.modal', function(){
		$(".modal-content", this).html('');
	});

	$("body").on("click", ".edit-summernote", function () {
		editSummernote(this, this.dataset.target);
	});

	$("body").on("click", ".save-summernote", function () {
		saveSummernote(this, this.dataset.target);
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