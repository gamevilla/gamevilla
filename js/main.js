let currentUser = localStorage.getItem("currentUser") || null;
let isRegistering = false;
let selectedGame = null;

// Show logged user in header
function updateHeader() {
  if (currentUser) {
    document.getElementById("welcomeUser").innerText = "👋 Welcome, " + currentUser;
    document.getElementById("logoutBtn").style.display = "inline-block";
  } else {
    document.getElementById("welcomeUser").innerText = "";
    document.getElementById("logoutBtn").style.display = "none";
  }
}
updateHeader();

// Open login modal if not logged in
function requireLogin(url) {
  if (!currentUser) {
    selectedGame = url;
    document.getElementById("authModal").style.display = "flex";
  } else {
    window.location.href = url;
  }
}

// Close modal
function closeAuth() {
  document.getElementById("authModal").style.display = "none";
}

// Toggle between login/register
function toggleAuthForm() {
  isRegistering = !isRegistering;
  document.getElementById("authTitle").innerText = isRegistering ? "Register" : "Login";
  document.getElementById("toggleAuth").innerHTML = isRegistering 
    ? 'Already have an account? <a href="#" onclick="toggleAuthForm()">Login</a>'
    : 'Don\'t have an account? <a href="#" onclick="toggleAuthForm()">Register</a>';
}

// Do login/register
function doAuth() {
  let user = document.getElementById("username").value;
  let pass = document.getElementById("password").value;

  let users = JSON.parse(localStorage.getItem("users")) || {};

  if (isRegistering) {
    if (users[user]) { alert("User already exists!"); return; }
    users[user] = pass;
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration successful! Please log in.");
    toggleAuthForm();
  } else {
    if (!users[user] || users[user] !== pass) {
      alert("Invalid login!");
      return;
    }
    currentUser = user;
    localStorage.setItem("currentUser", user);
    alert("Welcome, " + user);
    closeAuth();
    updateHeader();
    if (selectedGame) window.location.href = selectedGame;
  }
}

// Logout
function logout() {
  localStorage.removeItem("currentUser");
  currentUser = null;
  updateHeader();
  alert("You have logged out.");
}
