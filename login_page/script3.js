// Helper function to get stored user data from localStorage
function getStoredUserData() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users;
}

// Helper function to store user data in localStorage
function storeUserData(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// Register Form Handling
const registerForm = document.getElementById('register-form');
if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const username = document.getElementById('register-username').value;
        const password = document.getElementById('register-password').value;

        const users = getStoredUserData();
        const userExists = users.some(user => user.username === username);

        if (userExists) {
            alert('User already exists. Please login.');
        } else {
            users.push({ username, password });
            storeUserData(users);
            alert('Registration successful. Please login.');
            window.location.href = 'login.html';
        }
    });
}

// Login Form Handling
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        const users = getStoredUserData();
        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            localStorage.setItem('loggedInUser', username);
            window.location.href = 'secure.html';
        } else {
            alert('Incorrect username or password');
        }
    });
}

// Secure Page Access Handling
if (window.location.pathname.includes('secure.html')) {
    const loggedInUser = localStorage.getItem('loggedInUser');
    
    if (!loggedInUser) {
        alert('You must be logged in to access this page');
        window.location.href = 'login.html';
    }

    // Logout button functionality
    const logoutBtn = document.getElementById('logout-btn');
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('loggedInUser');
        window.location.href = 'login.html';
    });
}
