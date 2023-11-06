import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const navigateToHome = () => {
    setTimeout(() => {
      navigate({ to: "/login" });
    }, 2000);
  };

  const handleRegistration = async () => {
    setIsLoading(true);
    setMessage("");

    if (
      !formData.email.endsWith("@noroff.no") &&
      !formData.email.endsWith("@stud.noroff.no")
    ) {
      setMessage("Email must be from @noroff.no or @stud.noroff.no");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://api.noroff.dev/api/v1/social/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      if (response.ok) {
        const data = await response.json();
        if (data && data.accessToken) {
          localStorage.setItem("accessToken", data.accessToken);
        }
        setMessage("Registration successful! Welcome aboard.");
        navigateToHome();
      } else {
        setMessage("Registration failed. Please try again later.");
      }
    } catch (error) {
      setMessage("Registration failed. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen p-5 overflow-hidden">
      <div className="w-full max-w-xl p-5 m-auto bg-white border-2 border-blue-500 py-28 rounded-xl">
        <h1 className="text-3xl font-normal text-center text-gray-700">
          Register
        </h1>
        {message && (
          <p
            className={`text-center ${
              message.includes("failed") || message.includes("Email")
                ? "text-red-500"
                : "text-green-500"
            }`}
          >
            {message}
          </p>
        )}
        <form className="max-w-sm m-auto mt-6">
          <div className="py-1 mb-2">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-2 text-blue-500 bg-white border rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
              required
            />
          </div>
          <div className="py-1 mb-2">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-2 text-blue-500 bg-white border rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
              required
            />
          </div>
          <div className="py-3 mb-2">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-2 text-blue-500 bg-white border rounded-md focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring focus:ring-opacity-40"
              required
            />
          </div>
          <div className="flex justify-center mt-6">
            <button
              type="button"
              onClick={handleRegistration}
              className="w-full px-4 py-2 tracking-wide text-center text-white transition-colors duration-200 transform bg-blue-500 rounded-3xl hover:bg-blue-700 focus:outline-none focus:bg-blue-500"
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
        <p className="mt-8 text-xs font-light text-center text-gray-700">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-500 hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterForm;
