const APIURL = "https://api.github.com/users/";
const main = document.querySelector(".main");
const searchBox = document.querySelector("#search");
const getUser = async (username) => {
    const response = await fetch(APIURL + username);
    const data = await response.json();
    console.log(data);
    const box = `
    <div class="box">
    <div id="profile">
    <img src="${data.avatar_url}" alt="userImg" srcset="">
    </div>
    <div id="userData">
    <h1>${data.name}</h1>
    <h3 id="passion">${data.bio}</h3>
    <div id="reach">
    <h3>${data.followers} followers</h3>
    <h3>${data.following} following</h3>
    <h3>${data.public_repos} repos</h3>
    </div>
    <div id="skills">
    </div>
    </div>
    
    </div>
    `
    main.innerHTML = box;
    getRepos(username)
}
getUser("mahak-soni");

const getRepos = async (username) => {
    const repos = document.querySelector("#skills")
    const response = await fetch(APIURL + username + "/repos")
    const data = await response.json();
    data.forEach(
        (item) => {
            const elem = document.createElement("a");
            elem.classList.add("repo");
            elem.href = item.html_url;
            elem.innerText = item.name;
            elem.target = "_blank";
            repos.appendChild(elem)
        }
    )
}
const formSubmit = () => {
    if (searchBox.value != "") {
        getUser(searchBox.value);
        searchBox.value = ""
    }
    return false;
}
searchBox.addEventListener(
    "focusout",
    function () {
        formSubmit();
    }
)