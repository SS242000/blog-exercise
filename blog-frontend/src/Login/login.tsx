import { useNavigate } from "react-router-dom";
import ApiCaller from "../Services/apiConfig";
import { useState } from "react";

const AppLogin = () => {
  const [isValidUser, setIsValidUser] = useState(false);
  const [loginMessage, setIsLoginMessage] = useState("");
  const navigate = useNavigate();

  async function login(event) {
    setIsValidUser(true);
    event.preventDefault();
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;
    try {
      const response = await ApiCaller.post("/login", { email, password });
      const { token = null, message = null, data = null } = response || {};
      localStorage.setItem("token", token);
      sessionStorage.setItem("token",token)
      setIsLoginMessage("Login Successful");
      setIsValidUser(false);
      navigate("/home", { state: { userDetails: data } });
    } catch (error) {
      setIsValidUser(false);
      setIsLoginMessage("Invalid Username or Password");
    }
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-cover"
      style={{
        backgroundImage: `url(https://images.pexels.com/photos/68562/pexels-photo-68562.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)`,
      }}
    >
      <div className=" bg-violet-400 p-4 border rounded-lg shadow-lg max-w-sm w-full">
        <div className="text-center">
          <img
            alt="SWAYAM"
            src="https://swayamprabha.gov.in/asset/new/new_homepage/img/logo.png"
            className="mx-auto w-auto"
          />
          <h2 className="mt-6 text-2xl font-bold text-white">
            Welcome to SWAYAM Blog
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={login}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              defaultValue="john@example.com"
              placeholder="Enter your registered email address"
              autoComplete="email"
              className="block w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              defaultValue="hashed_password_123"
              required
              placeholder="Enter your password"
              autoComplete="current-password"
              className="block w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            {isValidUser ? (
              <button
                type="button"
                className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled
              >
                <svg
                  className="inline w-5 h-5 mr-3 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V2.83a.5.5 0 01.5-.5h2.34a.5.5 0 01.36.15l1.15 1.15a.5.5 0 01.15.35v2.34a.5.5 0 01-.5.5H13.17a.5.5 0 01-.35-.15l-1.15-1.15a.5.5 0 01-.15-.35V4a6 6 0 00-6 6zm16 0a8 8 0 00-8-8V2.83a.5.5 0 00-.5-.5h-2.34a.5.5 0 00-.36.15l-1.15 1.15a.5.5 0 00-.15.35v2.34a.5.5 0 00.5.5H10.83a.5.5 0 00.35-.15l1.15-1.15a.5.5 0 00.15-.35V4a6 6 0 016-6z"
                  ></path>
                </svg>
                Processing...
              </button>
            ) : (
              <button
                type="submit"
                className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppLogin;
