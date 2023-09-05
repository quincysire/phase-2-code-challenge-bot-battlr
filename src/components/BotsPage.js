import React, { useState, useEffect } from "react";
import YourBotArmy from "./YourBotArmy";
import BotCollection from "./BotCollection";
import BotSpecs from "./BotSpecs";

function BotsPage() {
  const [bots, setBots] = useState(null);
  const [army, setArmy] = useState([]);
  const [selectedBot, setSelectedBot] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8002/bots")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((botsData) => {
        setBots(botsData);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  function showDetails(bot) {
    setSelectedBot(bot);
  }

  function backToCollection() {
    setSelectedBot(null);
  }

  function addToArmy(bot) {
    if (!army.includes(bot)) {
      setArmy([...army, bot]);
      setBots(bots.filter((b) => b.id !== bot.id));
    }
  }

  function removeFromArmy(bot) {
    setArmy(army.filter((b) => b !== bot));
    setBots([bot, ...bots]);
  }

  function deleteBot(botId) {
    // console.log(botId);
    const updatedBots = bots.filter((bot) => bot.id !== botId);
    setBots(updatedBots);

    fetch(`http://localhost:8002/bots/${botId}`, {
      method: "DELETE",
    });
  }

  return (
    <div>
      <YourBotArmy
        bots={army}
        removeFromArmy={removeFromArmy}
        deleteBot={deleteBot}
      />
      {selectedBot ? (
        <BotSpecs
          bot={selectedBot}
          addToArmy={addToArmy}
          backToCollection={backToCollection}
        />
      ) : (
        <BotCollection
          bots={bots}
          showDetails={showDetails}
          deleteBot={deleteBot}
        />
      )}
    </div>
  );
}

export default BotsPage;
