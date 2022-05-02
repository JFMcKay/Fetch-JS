// Helper function to grab single selectors
const getThatEl = (selector) => {
    const element = document.querySelector(selector);
    if(element) return element;
    throw new Error(`${selector} I can't find it.`);
}

// Function to process the data
const processData = (data) => {
    const html = data.map(data => {
        return `<li><span class="name">${data.login}</span> <img src="${data.avatar_url}"> <a href=${data.html_url}>My Github</a></li>`
    }).join("");
    document.getElementById("app").insertAdjacentHTML("beforeend",html);
}

// Search through the login user names
const filterName = (filter) => {
    console.log(filter);
    filter = filter.toUpperCase();
    const names = document.querySelectorAll(".name");
    Array.from(names).forEach(function(name) {
        upperName = name.innerHTML.toUpperCase().trim();

        if (upperName.indexOf(filter) != -1) {
            console.log(upperName);
            name.parentElement.style.display = "flex";
        } else {
            name.parentElement.style.display = "none";
        }
    });
}

// fetching from githubAPI
fetch('https://api.github.com/users')
.then(response => {
    // added for 
    if (!response.ok) {
        throw Error("Error ", response.status)
    }
    return response.json();
    })
    .then(data => {
        console.log(data);
        processData(data);

    })
    .catch(error => {
        console.log(error);
}); 

const searchFilter = getThatEl("input.search");

searchFilter.addEventListener("input",function(){
    filterName(searchFilter.value);
});