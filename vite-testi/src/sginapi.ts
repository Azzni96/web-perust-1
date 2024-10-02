const apiURL = 'https://media1.edu.metropolia.fi/restaurant';

interface LoginResponse {
  message: string;
  token: string;
  data: {
    username: string;
    email: string;
    favouriteRestaurant: string;
    _id: string;
    role: string;
    avatar: string;
  };
}

export const login = async (
  username: string,
  password: string
): Promise<void> => {
  const loginData = { username, password };

  try {
    const response = await fetch(apiURL + "/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });
    if (response.ok) {
      const data: LoginResponse = await response.json();
      // Handle successful login
      console.log("Login successful", data);
      // Store the token and username for future requests
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.data.username);
      // Redirect to the main page
      window.location.href = "main.html";
    } else {
      // Handle login error
      const errorData = await response.json();
      console.error("Login failed", errorData.message);
      window.location.href = "/create-profile.html";
    }
  } catch (error) {
    console.error("An error occurred during login", error);
  }
};

export const signup = async (
  username: string,
  password: string,
  email: string
): Promise<void> => {
  const signupData = { username, password, email };

  try {
    const response = await fetch(apiURL + "/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupData),
    });

    if (response.ok) {
      const data = await response.json();
      // Handle successful signup
      console.log("Signup successful", data);
      // Store the token and username for future requests
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.data.username);
      // Redirect to the main page
      window.location.href = "main.html";
    } else {
      // Handle signup error
      const errorData = await response.json();
      console.error("Signup failed", errorData.message);
    }
  } catch (error) {
    console.error("An error occurred during signup", error);
  }
};

export function setupCounter(element: HTMLButtonElement) {
  let counter = 0;
  const setCounter = (count: number) => {
    counter = count;
    element.innerHTML = `count is ${counter}`;
  };
  element.addEventListener('click', () => setCounter(counter + 1));
  setCounter(0);
}
