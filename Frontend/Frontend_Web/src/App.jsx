import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import ApiProvider from "./contexts/ApiProvider";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import TvSeriesDetailsPage from "./pages/TvSeriesDetailsPage";
import SeasonDetailsPage from "./pages/SeasonDetailsPage";
import UserProvider from "./contexts/UserProvider";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserProfilePage from "./pages/UserProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import WatchlistPage from "./pages/WatchlistPage";
import ReviewPage from "./pages/ReviewPage";
import ReviewProvider from "./contexts/ReviewProvider";
import UserReviewsPage from "./pages/UserReviewPage";
import NotFoundPage from "./pages/NotFoundPage";
import ActorDetailsPage from "./pages/ActorDetailsPage";
import ListPage from "./pages/ListPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="/List/:listType/:mediaType/:page" element={<ListPage />} />
      <Route path="/MovieDetails/:id" element={<MovieDetailsPage />} />
      <Route path="/MovieDetails/Reviews/:id" element={<ReviewPage />} />
      <Route path="/TvSeriesDetails/Reviews/:id" element={<ReviewPage />} />
      <Route path="/TvSeriesDetails/:id" element={<TvSeriesDetailsPage />} />
      <Route path="/SeasonDetails/:id" element={<SeasonDetailsPage />} />
      <Route path="/ActorDetails/:id" element={<ActorDetailsPage />} />
      <Route path="/Login" element={<LoginPage />} />
      <Route path="/Register" element={<RegisterPage />} />
      <Route path="/UserProfile" element={<UserProfilePage />} />
      <Route path="/UserProfile/EditProfile" element={<EditProfilePage />} />
      <Route path="/UserProfile/Watchlist" element={<WatchlistPage />} />
      <Route path="/UserProfile/Reviews" element={<UserReviewsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <ApiProvider>
        <UserProvider>
          <ReviewProvider>
            <RouterProvider router={router} />
          </ReviewProvider>
        </UserProvider>
      </ApiProvider>
    </>
  );
}

export default App;
