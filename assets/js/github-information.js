
//1. Rendering User Data
function userInformationHTML(user) { //same function we're calling when our promise resolves. 
    return `
        <h2>${user.name} 
            <span class="small-name">
                (@<a href="${user.html_url}" target="_blank">${user.login}</a>)
            </span>
        </h2>
        <div class="gh-content">
            <div class="gh-avatar">
                <a href="${user.html_url}" target="_blank">
                    <img src="${user.avatar_url}" width="80" height="80" alt="${user.login}" />
                </a>
            </div>
            <p>Followers: ${user.followers} - Following ${user.following} <br> Repos: ${user.public_repos}</p>
        </div>`;
}

/*
a. the userInformationHTML(user) function takes one parameter of user, 
which is the object that has been returned from GitHub API
b. This object has many methods, such as the user's name, login name, and links to their
profile. (If you want to see all of the properties that the user object has, then you 
could just do a console.log user and see all of the different things you could display.)
c. And we're going to return these in a formatted HTML string.

d. {user.name} return the user's public display name
e. {user.html_url} a link to the user's public profile on GitHub 
(the closing and opening brackets are not part of the code, only used to enclosed the content)
f. {user.login} user login name
g. user's avatar - GitHub automatically generates one. The source of this is going to be ${user.avatar_ URL}
h. ${user.following} - this will be a count of the number of people that our user is following.
i. ${user.followers} - this will be a count of the number of people who are following our user.
j. ${user.public_repos) - this will give us a count of the public repositories that this user has.
*/

//2. GitHub Form 
function fetchGitHubInformation() {
    var username = $("#gh-username").val();
    if(!username) {
        $("#gh-user-data").html(`<h2>Please enter a GitHub username</h2>`) //using template literal
        return; //we just return inside the if statement cos we don't want to go off looking at the GitHub API if the field is empty. 
    }

    // if text has been inputted into the field, then we're going to set our HTML to display a loader
    $("#gh-user-data").html(
        `<div id="loader">
            <img src="assets/css/loader.gif" alt="...loading" />
        </div>
        `);  
    /*
    I have div id = "loader", an image, which has the source of assets/css/loader.gif. 
    We give the an <alt> tag of loading, just in case it can't be displayed. 
    the loader.gif is simply an animated gif file that will just keep repeating itself while data has been accessed.
    
    How to download the animated gif from a GitHub repo:
    a. click the file
    b: click download
    c. right-click the file and select "save image as"
    */

    //3. Making promises
    $.when(
        $.getJSON(`https://api.github.com/users/${username}`)
    ).then(
        function(response) {
            var userData = response;
            $("#gh-user-data").html(userInformationHTML(userData))
        }, 
        function(errorResponse) { //we add error fn in case the promise doesn't work out
            if(errorResponse.status === 404) { //and in case it is a 404 (not found) error
                $("#gh-user-data").html( //select gh-user-data div, set its HTML to error message that says user wasn't found
                    `<h2> No info found for user: ${username}</h2>`) //we put the error message in an h2 heading
            } else { //but if error that comes back is not be a 404 error
                console.log(errorResponse); //console.log out the entire error response.
                $("#gh-user-data").html(
                    `<h2>Error: ${errorResponse.responseJSON.message}</h2>`);
            }
        });
}

    /*
    we're already displaying our loader. So now we can issue the promise.
    1. We do that by using $.when() and the when() method takes a function as its first argument.
    2. And that function is going to be the getJSON() function.
    3. Inside the function, we pass in the address of our GitHub API: https://api.github.com/users 
    and then the value of username that we've obtained from our input box.
    4. When that is done, then what we want to do is to display it somehow in our gh-user-data div.
    5. For that, we have another function, response(), which the first argument 
    is the response that came back from our getJSON() method.
    6. And we're going to store that in another variable called userData.
    7. Then we use our jQuery selectors to select the gh-user-data div and set the HTML 
    to the results of another function called userInformationHTML().
    */

 
