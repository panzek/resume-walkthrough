
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

function repoInformationHTML(repos) {
    if(repos.length === 0) { 
        return `<div class="clearfix repo-list">No repos!</div>`;
    }
    var listItemsHTML = repos.map(function(repo) { //remember that map() method returns an array
        return `<li>
                    <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                </li>`;
    });

    return `<div class="clearfix repo-list">
                <p>
                    <strong>Repo List:</strong>
                </p>
                <ul>
                    ${listItemsHTML.join("\n")}
                </ul>
            </div>`;
}
/*
1. GitHub returns this object as an array. So we use a standard array method on it, which is length, 
to see if it's equal to 0. If it is, our array is empty, and there are no repositories for that user. 
2. If, however, data has been returned, then since it's an array, we want to iterate through it and get that information out.
3. To do that, we're going to create a variable called listItemsHTML. And that's going to take 
the results of the map() method that's going to be run against our repos array.
4. Remember that the map() method works like a forEach, but it returns an array with the results of this function.
5. ${repo.html_url} take us to the actual repository when we click on it.
6. ${repo.name} - the name of the repository.
7. And remember, we said that map() returns an array. So what we're going to do is use the join() method on that array 
and join everything with a new line: .join("\n"). This stops us from having to iterate through the new array once again.
*/

//2. GitHub Form 
function fetchGitHubInformation() {
    /*
    fix issue with our gh-repo-data div not being cleared when there's an empty text box.
    */
   $("#gh-user-data").html(""); //set the div to an empty string
   $("#gh-repo-data").html(""); //set the div to an empty string
   /*set both user-data and repo-date divs to an empty string
   Setting their HTML content to an empty string has the effect of emptying these divs.
   */

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

    //3. Fetch gitHub information - Making promises & Getting user Repo Data
    $.when(
        $.getJSON(`https://api.github.com/users/${username}`),
        $.getJSON(`https://api.github.com/users/${username}/repos`)//going to a diff endpoint & this'll list the repos for that individual user
    ).then(
        function(firstResponse, secondResponse) { //since we are making two getJSON calls, we need to have two responses
            var userData = firstResponse[0];
            var repoData = secondResponse[0];
            $("#gh-user-data").html(userInformationHTML(userData));
            $("#gh-repo-data").html(repoInformationHTML(repoData));
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

    //3b. Now that our user information is being displayed, we need to start retrieving repository information for that user.
    a. since we are making two getJSON calls, we need to have two responses: 1stResponse[0] & 2ndResponse[0]
    b. We have to also create 2 variables for them; one for each: userData & repoData
    c. when we do two calls like this, the .when() method packs a response up 
    into arrays. And each one is the first element of the array. So we just need to put 
    the indexes in there for these responses: 1stResponse[0] & 2ndResponse[0].
    */

$(document).ready(fetchGitHubInformation);
/*
The next thing is have the octocat profile displaying when the page is loaded, instead 
of just having an empty div. To do this, we're going to use the documentReady() function 
in jQuery and execute the fetchGitHubInformation() function when the DOM is fully loaded.
*/