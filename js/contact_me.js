$(function() {
    $("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // En caso de error durante el submit
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // Prevenir el comportamiento por defecto del submit
            var name = $("input#name").val();
            var email = $("input#email").val();
            var message = $("textarea#message").val();
            var firstName = name;

            // Llamar al PHP para enviar el correo
            $.ajax({
                url: "./mail/contact_me.php", // Ruta a tu archivo PHP
                type: "POST",
                data: {
                    name: name,
                    email: email,
                    message: message
                },
                success: function(response) {
                    var data = JSON.parse(response);
                    if (data.status === 'success') {
                        // Mensaje de éxito
                        $('#success').html("<div class='alert alert-success'>");
                        $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>");
                        $('#success > .alert-success').append("<strong>Your message has been sent. </strong>");
                        $('#success > .alert-success').append('</div>');
                        $('#contactForm').trigger("reset"); // Limpiar el formulario
                    } else {
                        // Mensaje de error
                        $('#success').html("<div class='alert alert-danger'>");
                        $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>");
                        $('#success > .alert-danger').append("<strong>" + data.message + "</strong>");
                        $('#success > .alert-danger').append('</div>');
                    }
                },
                error: function() {
                    // En caso de error en la solicitud
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>");
                    $('#success > .alert-danger').append("<strong>Sorry, it seems there was an issue sending your message. Please try again later!</strong>");
                    $('#success > .alert-danger').append('</div>');
                },
            });
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });
});
