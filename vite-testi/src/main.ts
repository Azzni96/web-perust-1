import '../public/style.css';
import {signup, login} from './sginapi.ts';
import {apiURL} from './variables.ts';

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('signUpbtn')?.addEventListener('click', showSignUp);
  document.getElementById('signInbtn')?.addEventListener('click', showSignIn);
  document.getElementById('aboutLink')?.addEventListener('click', showAbout);
  checkLoginStatus();

  // Register the service worker for PWA
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('./sw.ts')
        .then((registration) => {
          console.log(
            'Service Worker registered with scope:',
            registration.scope
          );
        })
        .catch((error) => {
          console.log('Service Worker registration failed:', error);
        });
    });
  }
});

function showSignUp() {
  const content = document.getElementById('content');
  if (content) {
    content.innerHTML = `
      <h2>Sign Up</h2>
      <form id="signup-form">
        <label for="signup-username">Username:</label>
        <input type="text" id="signup-username" name="username" required />
        <label for="signup-password">Password:</label>
        <input type="password" id="signup-password" name="password" required />
        <label for="signup-email">Email:</label>
        <input type="email" id="signup-email" name="email" required />
        <button type="submit" id="submit">Sign Up</button>
      </form>
    `;
    document
      .getElementById('signup-form')
      ?.addEventListener('submit', handleSignup);
  }
}

function showSignIn() {
  const content = document.getElementById('content');
  if (content) {
    content.innerHTML = `
      <h2>Sign In</h2>
      <form id="signin-form">
        <label for="signin-username">Username:</label>
        <input type="text" id="signin-username" name="username" required />
        <label for="signin-password">Password:</label>
        <input type="password" id="signin-password" name="password" required />
        <button type="submit" id="submit">Sign In</button>
      </form>
    `;
    document
      .getElementById('signin-form')
      ?.addEventListener('submit', handleSignIn);
  }
}

function showAbout() {
  const content = document.getElementById('content');
  if (content) {
    content.innerHTML = `
  <div id="About"><h2>About Us</h2>
  <p>
    We are passionate about providing the best service for our users. Our goal is to deliver quality content and seamless experience across all platforms.
  </p>
  <ul>
    <li><a href="https://www.facebook.com/nihad.alazzam.1" target="_blank" id="Media">Facebook</a></li>
    <li><a href="https://www.instagram.com/azzni.jr" target="_blank" id="Media">Instagram</a></li>
    <li>Phone: <a>+358 458006887</a></li>
    <li>Email:<a href="mailto:nihadazzam96@gmail.com">nihadazzam96@gmail.com</a></li>
  </ul> </div>
    `;
  }
}

function handleSignup(event: Event) {
  event.preventDefault();
  const username = (
    document.getElementById('signup-username') as HTMLInputElement
  ).value;
  const email = (document.getElementById('signup-email') as HTMLInputElement)
    .value;
  const password = (
    document.getElementById('signup-password') as HTMLInputElement
  ).value;

  if (!username || !email || !password) {
    alert('All fields are required.');
    return;
  }

  if (!validateEmail(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  signup(username, password, email);
}

function handleSignIn(event: Event) {
  event.preventDefault();
  const username = (
    document.getElementById('signin-username') as HTMLInputElement
  ).value;
  const password = (
    document.getElementById('signin-password') as HTMLInputElement
  ).value;

  if (!username || !password) {
    alert('All fields are required.');
    return;
  }

  login(username, password);
}

function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function checkLoginStatus() {
  const token = localStorage.getItem('token');
  if (token) {
    fetch(apiURL + '/api/v1/auth/login', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('User data', data);
        // Update the UI with user data
        displayLoggedInMessage(data.username);
      })
      .catch((error) => {
        console.error('Error fetching user data', error);
        displayLoggedInMessage();
      });
  } else {
    // Display message if no user is logged in
    displayLoggedInMessage();
  }
}

function displayLoggedInMessage(username?: string) {
  const messageElement = document.getElementById('logged-in-message');
  if (messageElement) {
    const storedUsername = username || localStorage.getItem('username');
    if (storedUsername) {
      messageElement.textContent = `User ${storedUsername} is logged in.`;
    } else {
      messageElement.textContent = 'No user is logged in.';
    }
  }
}
