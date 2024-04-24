const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});
function login(event) {
    event.preventDefault();

    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    var data = {
      UserName: username,
      Password: password,
    };

    fetch("https://localhost:7103/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("Server response:", response.data.fullName);
        localStorage.setItem("user", response.data);
        window.location.href = "/index.html"
      })
      .catch(error => {
        console.log("Login Error");
      });
  }
  function register(event) {
    event.preventDefault();
    
    const fullname = document.getElementById("register-fullname").value;
    const userName = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;
    
    var data = {
      UserName: userName,
      Password: password,
      fullname : fullname
    };

    fetch("https://localhost:7103/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((data) => {
      //console.log("Server response:", data.data.fullName);
      container.classList.remove("active");
      alert("Đăng ký thành công");      
    })
      .catch(error => {
        console.log("Register Error");
      });
  }
