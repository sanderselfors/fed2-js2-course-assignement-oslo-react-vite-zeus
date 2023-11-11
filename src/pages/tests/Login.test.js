import { describe, it, expect } from "vitest";

function LoginPage(options) {
  this.email = "";
  this.password = "";
  this.fetch = options.fetch;
  this.localStorage = options.localStorage;
}

LoginPage.prototype.handleLogin = async function () {
  const loginData = {
    email: this.email,
    password: this.password,
  };

  try {
    const response = await this.fetch(
      "https://api.noroff.dev/api/v1/social/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      },
    );

    if (response.ok) {
      const userData = await response.json();
      this.localStorage.setItem("accessToken", userData.accessToken);
      this.localStorage.setItem("user_email", userData.email);
      this.localStorage.setItem("user_name", userData.name);
    } else {
      console.error(
        `Login failed: ${response.status} - ${response.errorMessage}`,
      );
    }
  } catch (error) {
    console.error("An unexpected error occurred:", error);
  }
};

describe("LoginPage", () => {
  it("should store token in localStorage on successful login", async () => {
    const mockFetch = async (url, options) => {
      if (url === "https://api.noroff.dev/api/v1/social/auth/login") {
        if (options.method === "POST") {
          const loginData = await options.body.json();
          if (
            loginData.email === "first.last@stud.noroff.no" &&
            loginData.password === "UzI1NiIsInR5cCI"
          ) {
            return {
              ok: true,
              async json() {
                return {
                  accessToken: "mockAccessToken",
                  email: "first.last@stud.noroff.no",
                  name: "my_username",
                };
              },
            };
          } else {
            return {
              ok: false,
              status: 401,
              errorMessage: "Invalid credentials",
            };
          }
        } else {
          return {
            ok: false,
            status: 405,
            errorMessage: "Invalid request method",
          };
        }
      } else {
        return {
          ok: false,
          status: 404,
          errorMessage: "Not found",
        };
      }
    };

    const mockLocalStorage = {
      setItem: () => true,
      getItem: (key) => {
        if (key === "accessToken") {
          return "mockAccessToken";
        } else if (key === "user_email") {
          return "first.last@stud.noroff.no";
        } else if (key === "user_name") {
          return "my_username";
        }

        return "";
      },
    };

    const loginPage = new LoginPage({
      fetch: mockFetch,
      localStorage: mockLocalStorage,
    });

    loginPage.email = "first.last@stud.noroff.no";
    loginPage.password = "UzI1NiIsInR5cCI";

    await loginPage.handleLogin();

    expect(mockLocalStorage.getItem("accessToken")).toBe("mockAccessToken");
    expect(mockLocalStorage.getItem("user_email")).toBe(
      "first.last@stud.noroff.no",
    );
    expect(mockLocalStorage.getItem("user_name")).toBe("my_username");
  });
});
