/*==============================================================*/
// Klev Contact Form  JS
// BY GRIDIFY.IN
/*==============================================================*/
(function ($) {
    "use strict"; // Start of use strict
    $("#contactForm").validator().on("submit", function (event) {
        if (event.isDefaultPrevented()) {
            // handle the invalid form...
            formError();
            submitMSG(false, "Did you fill in the form properly?");
        } else {
            // everything looks good!
            event.preventDefault();
            submitForm();
        }
    });


    function submitForm() {
        // Initiate Variables With Form Content
        var form = $("#contactForm");
        var url = form.attr('action');

        // Generate Ticket ID
        var ticketId = "#AK-" + Math.floor(100000 + Math.random() * 900000);
        $("#ticket_id").val(ticketId);

        var formData = form.serialize();

        // Change button text to show loading
        var btn = form.find('button[type="submit"]');
        var originalBtnText = btn.html();
        btn.prop('disabled', true).html('Sending... <i class="ri-loader-4-line"></i>');

        $.ajax({
            type: "POST",
            url: url,
            data: formData,
            success: function (text) {
                btn.prop('disabled', false).html(originalBtnText);
                showFeedback(true, ticketId);
                formSuccess();
            },
            error: function (xhr, status, error) {
                btn.prop('disabled', false).html(originalBtnText);
                showFeedback(false, "N/A");
                formError();
                submitMSG(false, "Ajax error: " + error);
            }
        });
    }

    function showFeedback(isSuccess, ticketId) {
        var popup = $("#feedbackPopup");
        var icon = $("#feedbackIcon");
        var title = $("#feedbackTitle");
        var message = $("#feedbackMessage");
        var status = $("#feedbackStatus");
        var refId = $("#feedbackRefId");

        if (isSuccess) {
            icon.removeClass('error').addClass('success').html('<i class="ri-check-line"></i>');
            title.text("Message Sent!");
            message.text("Your message has been successfully sent. I'll get back to you soon!");
            status.removeClass('error').addClass('success').html('Completed <i class="ri-checkbox-circle-line"></i>');
            refId.text(ticketId);
        } else {
            icon.removeClass('success').addClass('error').html('<i class="ri-error-warning-line"></i>');
            title.text("Submission Failed");
            message.text("Something went wrong while sending your message. Please try again later.");
            status.removeClass('success').addClass('error').html('Failed <i class="ri-close-circle-line"></i>');
            refId.text("N/A");
        }

        popup.addClass('active');
    }

    // Ensure closeFeedback is globally accessible
    window.closeFeedback = function () {
        $("#feedbackPopup").removeClass('active');
    };

    function formSuccess() {
        $("#contactForm")[0].reset();
        submitMSG(true, "Message Submitted!")
    }

    function formError() {
        $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $(this).removeClass();
        });
    }

    function submitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h4 text-left tada animated text-success";
        } else {
            var msgClasses = "h4 text-left text-danger";
        }
        $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
    }
}(jQuery)); // End of use strict
