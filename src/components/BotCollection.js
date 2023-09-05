import React, { useState } from "react";
import BotCard from "./BotCard";
import SortBar from "./SortBar";

function BotCollection({ bots, showDetails, deleteBot }) {
  const [sortKey, setSortKey] = useState("");

  function handleSort(sortKey) {
    setSortKey(sortKey);
  }

  const sortedBots = [...bots].sort((a, b) => {
    if (sortKey === "health") {
      return b.health - a.health;
    }
    if (sortKey === "damage") {
      return b.damage - a.damage;
    }
    if (sortKey === "armor") {
      return b.armor - a.armor;
    }
    return 0;
  });

  return (
    <div className="ui four column grid">
      <div className="row">
        <SortBar onSort={handleSort} />
        {sortedBots.map((bot) => (
          <BotCard
            bot={bot}
            key={bot.id}
            toogleShow={showDetails}
            deleteBot={deleteBot}
          />
        ))}
      </div>
    </div>
  );
}

export default BotCollection;
