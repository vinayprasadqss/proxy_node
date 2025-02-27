// import express from "express";
// import cors from "cors";

// const app = express();

// app.use(express.json());
// app.use(cors("*"));

// app.get("/", (req, res) => {
//   res.status(200).json({ msg: "Server is ok" });
// });

// app.get("/secure/result", async (req, res) => {
//   try {
//     const { email, password } = req.query;
//     const result = await loginUser(email, password);

//     return res.status(200).json({ msg: "ok", data: result });
//   } catch (error) {
//     console.log(error);
//     return res.status(400).json({ msg: error });
//   }
// });

// app.listen(5000, () => {
//   console.log("Server is running on port 5000");
// });

// export const loginUser = async (email, password) => {
//   try {
//     const response = await fetch(
//       "https://ra-id-staging.azurewebsites.net/Account/Login",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//           Accept:
//             "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,/;q=0.8",
//         },
//         body: new URLSearchParams({
//           "Input.Email": email || "pankaj@qsstechnosoft.com",
//           "Input.Password": password || "P@ssw0rd",
//         }),
//         credentials: "include",
//         redirect: "manual", // Prevent automatic redirection
//       }
//     );

//     console.log("Response Status:", response.status);

//     if (response.status === 302 || response.status === 301) {
//       let redirectURL = response.headers.get("Location");

//       // If the redirect is relative (e.g., "/"), prepend the base URL
//       if (redirectURL.startsWith("/")) {
//         redirectURL = "https://ra-id-staging.azurewebsites.net" + redirectURL;
//       }

//       console.log("Redirecting to:", redirectURL);

//       // Manually follow the redirect
//       const redirectedResponse = await fetch(redirectURL, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//         credentials: "include", // Keep the session/cookies
//       });

//       const finalData = await redirectedResponse.text();
//       console.log("Final Data:", finalData);

//       return finalData;
//     } else {
//       const data = await response.text();
//       console.log("Login Successful:", data);
//       return data;
//     }
//   } catch (error) {
//     console.error("Login Failed:", error.message);
//     return error.message;
//   }
// };

import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors("*"));

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Server is ok" });
});

app.get("/secure/result", async (req, res) => {
  try {
    const { email, password } = req.query;
    const result = await loginUser(email, password);

    return res.status(200).json({ msg: "ok", data: result });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: error });
  }
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

export const loginUser = async (email, password) => {
  try {
    const response = await fetch(
      "https://ra-id-staging.azurewebsites.net/Account/Login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,/;q=0.8",
        },
        body: new URLSearchParams({
          "Input.Email": email || "pankaj@qsstechnosoft.com",
          "Input.Password": password || "P@ssw0rd",
        }),
        credentials: "include",
        redirect: "manual", // Prevent automatic redirection
      }
    );

    console.log("Response Status:", response.status);

    if (response.status === 302 || response.status === 301) {
      let redirectURL = response.headers.get("Location");

      // If the redirect is relative (e.g., "/"), prepend the base URL
      if (redirectURL.startsWith("/")) {
        redirectURL = "https://ra-id-staging.azurewebsites.net" + redirectURL;
      }

      console.log("Redirecting to:", redirectURL);

      // Manually follow the redirect
      const redirectedResponse = await fetch(redirectURL, {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        credentials: "include", // Keep the session/cookies
      });

      const finalData = await redirectedResponse.text();
      console.log("Final Data:", finalData);

      return finalData;
    } else {
      const data = await response.text();
      console.log("Login Successful:", data);
      return data;
    }
  } catch (error) {
    console.error("Login Failed:", error.message);
    return error.message;
  }
};
