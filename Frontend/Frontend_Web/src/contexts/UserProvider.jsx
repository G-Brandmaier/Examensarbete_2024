/* Librarys */
import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export const UserContext = createContext();

const UserProvider = (props) => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [userLoggedIn, setUserLoggedIn] = useState(!!Cookies.get("userToken"));

  useEffect(() => {
    checkTokenExpiration();
    const intervalId = setInterval(checkTokenExpiration, 15 * 60000);
    return () => clearInterval(intervalId);
  }, []);

  const checkTokenExpiration = () => {
    const token = Cookies.get("userToken");
    if (token) {
      const [_, payloadB64, __] = token.split(".");
      const payload = JSON.parse(atob(payloadB64));
      const expiryDate = new Date(payload.exp * 1000);
      if (expiryDate < new Date()) {
        Cookies.remove("userToken");
        setUserLoggedIn(false);
      }
    }
  };

  /* USER */

  const registerAsync = async (data = {}) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    const response = await fetch(
      `https://localhost:44391/api/Account/Register?key=${apiKey}`,
      requestOptions
    );

    if (response.status === 201) {
      return true;
    } else {
      throw new Error(response.status);
    }
  };

  const loginAsync = async (data = {}) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    const response = await fetch(
      `https://localhost:44391/api/Account/Login?key=${apiKey}`,
      requestOptions
    );

    if (response.status === 200) {
      const token = await response.text();
      Cookies.set("userToken", token);
      setUserLoggedIn(true);
    } else if (response.status === 400) {
      setUserLoggedIn(false);
      return response;
    } else {
      setUserLoggedIn(false);
      throw new Error(response.status);
    }
  };

  const logOutAsync = async () => {
    checkTokenExpiration();
    if (userLoggedIn) {
      const token = Cookies.get("userToken");
      const requestOptions = {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await fetch(
        `https://localhost:44391/api/Account/LogOut?key=${apiKey}`,
        requestOptions
      );
      if (response.status == 200) {
        Cookies.remove("userToken");
        setUserLoggedIn(false);
        return true;
      } else {
        setUserLoggedIn(true);
        return false;
      }
    }
  };

  const getUserProfileAsync = async () => {
    checkTokenExpiration();
    if (userLoggedIn) {
      const token = Cookies.get("userToken");
      const requestOptions = {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await fetch(
        `https://localhost:44391/api/UserProfile/GetUserProfile?key=${apiKey}`,
        requestOptions
      );
      if (response.status === 200) {
        const data = await response.json();
        return data;
      } else {
        return null;
      }
    }
  };

  const getUserAsync = async () => {
    checkTokenExpiration();
    if (userLoggedIn) {
      const token = Cookies.get("userToken");
      const requestOptions = {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await fetch(
        `https://localhost:44391/api/Account/GetUser?key=${apiKey}`,
        requestOptions
      );
      if (response.status === 200) {
        const data = await response.json();
        return data;
      } else {
        return null;
      }
    }
  };

  const updateUserProfileAsync = async (data = {}) => {
    checkTokenExpiration();
    if (userLoggedIn) {
      const token = Cookies.get("userToken");
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      };
      const response = await fetch(
        `https://localhost:44391/api/UserProfile/UpdateUserProfile?key=${apiKey}`,
        requestOptions
      );
      if (response.status === 200) {
        const data = await response.json();
        return data;
      } else {
        return null;
      }
    }
  };

  const updateUsernameAsync = async (username) => {
    checkTokenExpiration();
    if (userLoggedIn) {
      const token = Cookies.get("userToken");
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(
        `https://localhost:44391/api/Account/UpdateUsername/${username}?key=${apiKey}`,
        requestOptions
      );
      if (response.status === 200) {
        const data = await response.text();
        return data;
      } else {
        return null;
      }
    }
  };

  const changeUserPasswordAsync = async (oldPassword, newPassword) => {
    checkTokenExpiration();
    if (userLoggedIn) {
      const requestData = {
        OldPassword: oldPassword,
        NewPassword: newPassword,
      };
      const token = Cookies.get("userToken");
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestData),
      };
      const response = await fetch(
        `https://localhost:44391/api/Account/ChangeUserPassword?key=${apiKey}`,
        requestOptions
      );
      if (response.status === 200) {
        return true;
      } else {
        return false;
      }
    }
  };

  const deleteAccountAsync = async () => {
    checkTokenExpiration();
    if (userLoggedIn) {
      const token = Cookies.get("userToken");
      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(
        `https://localhost:44391/api/Account/DeleteAccount?key=${apiKey}`,
        requestOptions
      );
      if (response.status === 200) {
        Cookies.remove("userToken");
        return true;
      } else {
        return false;
      }
    }
  };

  /* USER WATCHLIST */

  const getUserWatchListAsync = async () => {
    checkTokenExpiration();
    if (userLoggedIn) {
      const token = Cookies.get("userToken");
      const requestOptions = {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await fetch(
        `https://localhost:44391/api/UserProfile/GetUserWatchList?key=${apiKey}`,
        requestOptions
      );
      if (response.status === 200) {
        const data = await response.json();
        return data;
      } else {
        return null;
      }
    }
  };

  const addToUserWatchListAsync = async (data = {}) => {
    checkTokenExpiration();
    if (userLoggedIn) {
      const token = Cookies.get("userToken");
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      };
      const response = await fetch(
        `https://localhost:44391/api/UserProfile/AddToUserWatchList?key=${apiKey}`,
        requestOptions
      );
      if (response.status === 200) {
        return true;
      } else {
        return null;
      }
    }
  };

  const removeFromUserWatchListAsync = async (mediaId, mediaType) => {
    checkTokenExpiration();
    if (userLoggedIn) {
      const token = Cookies.get("userToken");
      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(
        `https://localhost:44391/api/UserProfile/RemoveFromUserWatchList/${mediaId}/${mediaType}?key=${apiKey}`,
        requestOptions
      );
      if (response.status == 200) {
        return true;
      } else {
        return null;
      }
    }
  };

  const checkAddedToUserWatchList = async (mediaId, mediaType) => {
    checkTokenExpiration();
    if (userLoggedIn) {
      const token = Cookies.get("userToken");
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(
        `https://localhost:44391/api/UserProfile/CheckAddedToUserWatchList/${mediaId}/${mediaType}?key=${apiKey}`,
        requestOptions
      );
      if (response.status === 200) {
        return true;
      } else {
        return null;
      }
    }
  };

  return (
    <>
      <UserContext.Provider
        value={{
          registerAsync,
          loginAsync,
          checkTokenExpiration,
          userLoggedIn,
          setUserLoggedIn,
          logOutAsync,
          getUserProfileAsync,
          getUserAsync,
          updateUserProfileAsync,
          updateUsernameAsync,
          changeUserPasswordAsync,
          addToUserWatchListAsync,
          checkAddedToUserWatchList,
          removeFromUserWatchListAsync,
          getUserWatchListAsync,
          deleteAccountAsync,
        }}
      >
        {props.children}
      </UserContext.Provider>
    </>
  );
};

export default UserProvider;
