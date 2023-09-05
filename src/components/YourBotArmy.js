import React from "react";
import BotCard from "./BotCard";

function YourBotArmy({ bots, removeFromArmy, deleteBot }) {
  return (
    <div className="ui segment inverted olive bot-army">
      <div className="ui five column grid">
        <div className="row bot-army-row">
          {bots.map((bot) => (
            <BotCard
              bot={bot}
              key={bot.id}
              deleteBot={deleteBot}
              toogleArmy={removeFromArmy}
            />
          ))}
          Your Bot Army
        </div>
      </div>
    </div>
  );
}

export default YourBotArmy;
