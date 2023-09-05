import React from "react";

function SortBar({ onSort }) {
  const handleSort = (event) => {
    onSort(event.target.value);
  };

  return (
    <div className="sort-bar">
      <label>Sort by:</label>
      <select onChange={handleSort}>
        <option value="">None</option>
        <option value="health">Health</option>
        <option value="damage">Damage</option>
        <option value="armor">Armor</option>
      </select>
    </div>
  );
}

export default SortBar;
