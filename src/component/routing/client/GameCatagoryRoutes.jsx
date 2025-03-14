import { Routes, Route } from "react-router-dom";
import { ErrorPage } from "../../../pages/jsx/Error";
import { GameCatagory } from "../../client/jsx/GameCatagory";
import { GameRoutes } from "./GamesRoutes";
import { useAuth } from "../../../context/jsx/AuthContext";
import { blockLevels } from "../../../utils/blockLevers";
import { apiCall } from "../../common/apiCall";
import { Loader } from "../../common/Loader";
import { toKebabCase } from "../../../utils/utils";
import { useEffect, useState } from "react";
import { TempComp } from "../helper/TempComp";

// Define category-to-component mapping
const categoryComponentMap = {
  "indian-casino": GameRoutes,
};

export const GameCatagoryRoutes = () => {
  const { user } = useAuth();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiCall(
          "/auth-api/client/games/categories",
          "GET"
        );
        console.log("API call for Game Category Routes:", response);

        if (response?.uniqueCode === "CGP0009") {
          setCategories(response.data);
        } else {
          setError("Failed to fetch categories.");
        }
      } catch (err) {
        setError("An error occurred while fetching Game Category Routes.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (user.blockingLevel === blockLevels[3]) {
    return (
      <ErrorPage
        errorCode="ERR403"
        errorMessage="Your account is blocked to play Games. Please contact your Agent"
      />
    );
  }

  if (loading) return <Loader />;
  if (error) return <ErrorPage errorCode="ERR500" errorMessage={error} />;

  return (
    <Routes>
      {/* Home Page */}
      <Route path="/" index element={<GameCatagory />} />

      {/*  Dynamically map fetched categories */}
      {categories.map((category) => {
        const categoryPath = toKebabCase(category.name);
        const Component = categoryComponentMap[categoryPath] || TempComp; // Default to TempComp if not mapped

        return (
          <Route
            key={category.id}
            path={`/${categoryPath}/*`}
            element={<Component catagory={category} />}
          />
        );
      })}

      {/*  Catch-all for any undefined paths */}
      <Route path="*" element={<TempComp label="Unknown Category" />} />
    </Routes>
  );
};
