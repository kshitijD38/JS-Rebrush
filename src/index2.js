const api = `https://randomuser.me/api`;

const addUser = document.getElementById("user-btn");
const sortBtn = document.getElementById("sort");
const deSortBtn = document.getElementById("de-sort");
// const mainApp = document.getElementById("app");
const userList = document.getElementById("user-list");
const searchInput = document.getElementById("search");
// console.log(addUser);
const appState = [];

class User {
  constructor(title, firstName, lastName, gender, email) {
    this.title = title;
    this.name = `${firstName} ${lastName}`;
    this.gender = gender;
    this.email = email;
  }
}

addUser.addEventListener("click", async () => {
  const userData = await fetch(api, {
    method: "GET"
    // headers
    // bode:{}
  });
  const userDataJson = await userData.json();
  // console.log(userDataJson.results[0]);
  const user = userDataJson.results[0];
  const classUser = new User(
    user.name.title,
    user.name.first,
    user.name.last,
    user.gender,
    user.email
  );
  appState.push(classUser);
  // console.log(appState);
  domRenderer(appState);
});

const domRenderer = (stateArray) => {
  userList.innerHTML = null;
  stateArray.forEach((userObj) => {
    const userEle = document.createElement("div");
    // ${userObj.name.title} ${userObj.name.first} ${userObj.name.last}
    userEle.innerHTML = `<div>${userObj.title} ${userObj.name}
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
      user.name.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      // user.name.last.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      user.gender.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchInput.value.toLowerCase())
  );
  // console.log(filteredAppState);

  domRenderer(filteredAppState);
});

sortBtn.addEventListener("click", () => {
  const sortData = [...appState];
  sortData.sort((a, b) => {
    if (a.name > b.name) {
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
    if (a.name < b.name) {
      return 1;
    } else {
      return -1;
    }
  });

  domRenderer(sortData);
});

// scrollHeight = clientHeight + scrollTop
window.addEventListener("scroll", () => {
  const { clientHeight, scrollHeight, scrollTop } = document.documentElement;

  if (clientHeight + scrollTop >= scrollHeight - 50) {
    console.log({ clientHeight, scrollHeight, scrollTop });
  }
});
