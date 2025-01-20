import React, { useState, useEffect } from "react";
import style from "../style/FavList.module.css";
import { FavGameTile } from "./FavGameTile";

export const FavList = () => {
  const [favGames, setFavGames] = useState([]);

  // Dummy data to simulate fetched favorite games
  const dummyFavGames = [
    {
      label: "FIFA 22",
      imgSrc:
        "https://th.bing.com/th/id/OIP.8Rbkr6V5D_F2p69ikQQGcQHaEK?rs=1&pid=ImgDetMain",
      playedFor: "10 hours",
    },
    {
      label: "Call of Duty: Modern Warfare",
      imgSrc:
        "https://assets1.ignimgs.com/2019/05/30/call-of-duty-modern-warfare---button-01-1559237615728.jpg",
      playedFor: "25 hours",
    },
    {
      label: "Minecraft",
      imgSrc:
        "https://image.api.playstation.com/vulcan/img/cfn/11307x4B5WLoVoIUtdewG4uJ_YuDRTwBxQy0qP8ylgazLLc01PBxbsFG1pGOWmqhZsxnNkrU3GXbdXIowBAstzlrhtQ4LCI4.png",
      playedFor: "100 hours",
    },
  ];

  // Simulate a fetch call with useEffect
  useEffect(() => {
    // In a real scenario, you would fetch the data from an API
    setFavGames(dummyFavGames); // Setting the dummy data as fetched data
  }, []);

  return (
    <div>
      {favGames.length > 0 ? (
        <div className={style.cardsContainer}>
          {favGames.map((game, index) => (
            <FavGameTile
              key={index}
              label={game.label}
              imgSrc={game.imgSrc}
              playedFor={game.playedFor}
            />
          ))}
        </div>
      ) : (
        <p>Loading favorite games...</p>
      )}
    </div>
  );
};
