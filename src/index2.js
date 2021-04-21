const api = `https://randomuser.me/api`;

const addUser = document.getElementById("user-btn");
const mainApp = document.getElementById("app");
// console.log(addUser);

addUser.addEventListener("click", async () => {
  const userData = await fetch(api, {
    method: "GET"
    // headers
    // bode:{}
  });
  const userDataJson = await userData.json();
  console.log(userDataJson.results[0]);
  const user = userDataJson.results[0];

  const userEle = document.createElement("div");
  userEle.innerHTML = `<div>
  ${user.name.title} ${user.name.first} ${user.name.last}
  </div>`;

  mainApp.appendChild(userEle);
});
