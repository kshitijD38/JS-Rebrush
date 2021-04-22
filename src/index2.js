const api = `https://randomuser.me/api`;

const addUser = document.getElementById("user-btn");
const sortBtn = document.getElementById("sort");
const deSortBtn = document.getElementById("de-sort");
// const mainApp = document.getElementById("app");
const userList = document.getElementById("user-list");
const searchInput = document.getElementById("search");
// console.log(addUser);
const appState = [];

addUser.addEventListener("click", async () => {
  const userData = await fetch(api, {
    method: "GET"
    // headers
    // bode:{}
  });
  const userDataJson = await userData.json();
  // console.log(userDataJson.results[0]);
  const user = userDataJson.results[0];
  appState.push(user);
  // console.log(appState);
  domRenderer(appState);
});

const domRenderer = (stateArray) => {
  userList.innerHTML = null;
  stateArray.forEach((userObj) => {
    const userEle = document.createElement("div");
    userEle.innerHTML = `<div>
  ${userObj.name.title} ${userObj.name.first} ${userObj.name.last}
    <ol> 
      <li>Gender: ${userObj.gender}</li> 
      <li>Email: ${userObj.email}</li>
    </ol>
  </div>`;

    userList.appendChild(userEle);
  });
};

searchInput.addEventListener("keyup", (e) => {
  // console.log(e);
  const filteredAppState = appState.filter(
    (user) =>
      user.name.first.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      user.name.last.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      user.gender.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchInput.value.toLowerCase())
  );
  // console.log(filteredAppState);

  domRenderer(filteredAppState);
});

sortBtn.addEventListener("click", () => {
  const sortData = [...appState];
  sortData.sort((a, b) => {
    if (a.name.first > b.name.first) {
      return 1;
    } else {
      return -1;
    }
  });

  domRenderer(sortData);
});

deSortBtn.addEventListener("click", () => {
  const sortData = [...appState];
  sortData.sort((a, b) => {
    if (a.name.first < b.name.first) {
      return 1;
    } else {
      return -1;
    }
  });

  domRenderer(sortData);
});
