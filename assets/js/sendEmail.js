/* basic method to send an email with EmailJS. Code snippet from emailjs.send 
of EmailJS doc "example of using Promise". This is a self invoking function, 
so as soon as the page is refreshed, this function is going to be called
*/
function sendMail(contactForm) {
    emailjs.send("service_9jx4085", "panzek_nk2t3bv", {
        "from_name": contactForm.name.value, //name here is the same as the name that we gave this field in our contact.html form.
        "from_email": contactForm.emailaddress.value, //emailaddress is the same as the emailaddress that we gave this field in our contact.html form.
        "project_request": contactForm.projectsummary.value //projectsummary is same as the projectsummary for the field in our contact.html form.
    })
    .then(
        function(response) {
            console.log("SUCCESS", response); //console.log the word "SUCCESS" and pass in the actual response object.
        },
        function(error) {
            console.log("FAILED", error); //console.log the word "FAILED" and pass in the actual error codes we receive.
        }
    );
    return false;  // to block from loading a new page
}

/*
And that's how we link EmailJS to our project to make our resume site more interactive.
*/