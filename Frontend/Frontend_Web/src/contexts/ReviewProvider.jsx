/* Librarys */
import { createContext, useContext } from "react";
import Cookies from "js-cookie";

/* Context */
import { UserContext } from "./UserProvider";

export const ReviewContext = createContext();

const ReviewProvider = (props) => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const { checkTokenExpiration, userLoggedIn } = useContext(UserContext);

  const getReviewsByIdAndTypeAsync = async (id, type) => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(
      `https://localhost:44391/api/Review/GetReviewsByIdAndType/${id}/${type}?key=${apiKey}`,
      requestOptions
    );
    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      return null;
    }
  };

  const getLatestReviewByIdAndTypeAsync = async (id, type) => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(
      `https://localhost:44391/api/Review/GetLatestReviewByIdAndType/${id}/${type}?key=${apiKey}`,
      requestOptions
    );
    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      return null;
    }
  };

  /* User reviews */
  const getUserReviewsAsync = async () => {
    checkTokenExpiration();
    if (userLoggedIn) {
      const token = Cookies.get("userToken");
      const requestOptions = {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await fetch(
        `https://localhost:44391/api/Review/GetUserReviews?key=${apiKey}`,
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

  const getUserReviewCountAsync = async () => {
    checkTokenExpiration();
    if (userLoggedIn) {
      const token = Cookies.get("userToken");
      const requestOptions = {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await fetch(
        `https://localhost:44391/api/Review/GetUserReviewCount?key=${apiKey}`,
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

  const getUserReviewByIdAndTypeAsync = async (id, type) => {
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
        `https://localhost:44391/api/Review/GetUserReviewByIdAndType/${id}/${type}?key=${apiKey}`,
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

  const addReviewAsync = async (data = {}) => {
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
        `https://localhost:44391/api/Review/AddReview?key=${apiKey}`,
        requestOptions
      );
      if (response.status === 201) {
        return true;
      } else {
        return null;
      }
    }
  };

  const updateReviewAsync = async (data = {}) => {
    checkTokenExpiration();
    const token = Cookies.get("userToken");
    if (userLoggedIn) {
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      };
      const response = await fetch(
        `https://localhost:44391/api/Review/UpdateReview?key=${apiKey}`,
        requestOptions
      );
      if (response.status === 200) {
        return true;
      } else {
        return null;
      }
    }
  };

  const removeReviewAsync = async (id) => {
    checkTokenExpiration();
    const token = Cookies.get("userToken");
    if (userLoggedIn) {
      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(
        `https://localhost:44391/api/Review/RemoveReview/${id}?key=${apiKey}`,
        requestOptions
      );
      if (response.status === 200) {
        return true;
      } else {
        return null;
      }
    }
  };

  const getLatestUserReviewsAsync = async (amount) => {
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
        `https://localhost:44391/api/Review/GetLatestUserReviews/${amount}?key=${apiKey}`,
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

  return (
    <>
      <ReviewContext.Provider
        value={{
          getReviewsByIdAndTypeAsync,
          getLatestReviewByIdAndTypeAsync,
          getUserReviewsAsync,
          addReviewAsync,
          getUserReviewByIdAndTypeAsync,
          updateReviewAsync,
          removeReviewAsync,
          getLatestUserReviewsAsync,
          getUserReviewCountAsync,
        }}
      >
        {props.children}
      </ReviewContext.Provider>
    </>
  );
};

export default ReviewProvider;
