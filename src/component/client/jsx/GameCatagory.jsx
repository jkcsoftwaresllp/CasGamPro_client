import React from "react";
import { useEffect, useState } from "react";
import styles from "../style/Home.module.css";
import { Button } from "../../common/Button";
import { useButtonNavigation } from "../../../hooks/useButtonNavigation";
import { Loader } from "../../common/Loader";
import { ErrorPage } from "../../../pages/jsx/Error";
import { apiCall } from "../../common/apiCall";
import { toKebabCase } from "../../../utils/utils";

export const GameCatagory = ({}) => {
  const handleNavigation = useButtonNavigation();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiCall(
          `/auth-api/client/games/categories`,
          "GET"
        );
        console.log("API call for Game Categories:", response);

        if (response?.uniqueCode === "CGP0009" && response.data) {
          setCategories(response.data);
        } else {
          setError("Failed to fetch categories.");
        }
      } catch (err) {
        setError("An error occurred while fetching categories.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorPage errorCode="ERR500" errorMessage={error} />;

  return (
    <div className={styles.home}>
      <div className={styles.homeBtn}>
        {categories.map((button, index) => (
          <Button
            key={index}
            label={button.name}
            onClick={() => handleNavigation(`/${toKebabCase(button.name)}`)}
          />
        ))}
      </div>
    </div>
  );
};
