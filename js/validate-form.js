/*
* Email Form Validation (client side)
*/

(function () {
    "use strict";
  
    let forms = document.querySelectorAll('.email-form');
  
    forms.forEach((e) => {
        e.addEventListener('submit', function (event) {
            event.preventDefault();

            let thisForm = this;

            let action = thisForm.getAttribute('action');
            /*let recaptcha = thisForm.getAttribute('data-recaptcha-site-key');*/
            if (!action) {
                displayError(thisForm, 'The form action property is not set!');
                return;
            }
            thisForm.querySelector('.loading').classList.add('d-none');
            thisForm.querySelector('.error-message').classList.remove('d-none');
            thisForm.querySelector('.sent-message').classList.remove('d-none');

            let formData = new FormData(thisForm);

            /*if ( recaptcha ) {
              if(typeof grecaptcha !== "undefined" ) {
                grecaptcha.ready(function() {
                  try {
                    grecaptcha.execute(recaptcha, {action: 'form_submit'})
                    .then(token => {
                      formData.set('recaptcha-response', token);
                      form_submit(thisForm, action, formData);
                    })
                  } catch(error) {
                    displayError(thisForm, error)
                  }
                });
              } else {
                displayError(thisForm, 'The reCaptcha javascript API url is not loaded!')
              }
            } else {*/
            form_submit(thisForm, action, formData);
            /*}*/
        });
    });
  
    function form_submit(thisForm, action, formData) {
      fetch(action, {
        method: 'POST',
        body: formData,
        headers: {'X-Requested-With': 'XMLHttpRequest'}
      })
      .then(response => {
        if( response.ok ) {
          return response.text()
        } else {
          throw new Error(`${response.status} ${response.statusText} ${response.url}`); 
        }
      })
      .then(data => {
        thisForm.querySelector('.loading').classList.remove('d-none');
        if (data.trim() == 'OK') {
          thisForm.querySelector('.sent-message').classList.add('d-none');
          thisForm.reset(); 
        } else {
          throw new Error(data ? data : 'Form submission failed and no error message returned from: ' + action); 
        }
      })
      .catch((error) => {
        displayError(thisForm, error);
      });
    }
  
    function displayError(thisForm, error) {
      thisForm.querySelector('.loading').classList.remove('d-none');
      thisForm.querySelector('.error-message').innerHTML = error;
      thisForm.querySelector('.error-message').classList.add('d-none');
    }
  
  })();