import { useState } from "react";

export default function CharacterCreationForm() {
  const [character, setCharacter] = useState({
    name: "",
    gender: "",
    race: "",
    class: "",
    background: "",
    stats: {
      strength: 0,
      dexterity: 0,
      constitution: 0,
      intelligence: 0,
      wisdom: 0,
      charisma: 0,
    },
    inventory: [],
    personality_traits: [],
    quirks: [],
    location: [0, 0],
  });

  const [inventoryInput, setInventoryInput] = useState("");
  const [traitInput, setTraitInput] = useState("");
  const [quirkInput, setQuirkInput] = useState("");

  const updateStat = (stat, value) => {
    setCharacter((prev) => ({
      ...prev,
      stats: {
        ...prev.stats,
        [stat]: parseInt(value),
      },
    }));
  };

  const handleTagAdd = (key, value) => {
    if (!value.trim()) return;
    setCharacter((prev) => ({
      ...prev,
      [key]: [...prev[key], value.trim()],
    }));
  };

  const handleTagRemove = (key, index) => {
    setCharacter((prev) => ({
      ...prev,
      [key]: prev[key].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Character Created:", character);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto mt-10 p-8 bg-white shadow-2xl rounded-2xl space-y-10 border border-gray-200"
    >
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-4">
        🎮 Create Your Character
      </h2>

      {/* Identity Section */}
      <div>
        <h3 className="text-xl font-semibold text-gray-700 mb-3 border-b pb-1">Identity</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["name", "gender", "race", "class", "background"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-600 capitalize mb-1">
                {field}
              </label>
              <input
                type="text"
                value={character[field]}
                onChange={(e) => setCharacter({ ...character, [field]: e.target.value })}
                placeholder={`Enter ${field}`}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div>
        <h3 className="text-xl font-semibold text-gray-700 mb-3 border-b pb-1">Stats</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {Object.keys(character.stats).map((stat) => (
            <div key={stat}>
              <label className="block text-sm font-medium capitalize text-gray-600 mb-1">
                {stat}
              </label>
              <input
                type="number"
                value={character.stats[stat]}
                onChange={(e) => updateStat(stat, e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Extras Section */}
      <div>
        <h3 className="text-xl font-semibold text-gray-700 mb-3 border-b pb-1">Extra Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Inventory */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Inventory</label>
            <input
              type="text"
              value={inventoryInput}
              onChange={(e) => setInventoryInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleTagAdd("inventory", inventoryInput);
                  setInventoryInput("");
                }
              }}
              placeholder="Type item and press Enter"
              className="w-full p-2 border border-gray-300 rounded-md mb-2"
            />
            <div className="flex flex-wrap gap-2">
              {character.inventory.map((item, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full inline-flex items-center"
                >
                  {item}
                  <button
                    type="button"
                    className="ml-2 text-blue-600 hover:text-blue-800"
                    onClick={() => handleTagRemove("inventory", index)}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Personality Traits */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Personality Traits</label>
            <input
              type="text"
              value={traitInput}
              onChange={(e) => setTraitInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleTagAdd("personality_traits", traitInput);
                  setTraitInput("");
                }
              }}
              placeholder="Type trait and press Enter"
              className="w-full p-2 border border-gray-300 rounded-md mb-2"
            />
            <div className="flex flex-wrap gap-2">
              {character.personality_traits.map((trait, index) => (
                <span
                  key={index}
                  className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full inline-flex items-center"
                >
                  {trait}
                  <button
                    type="button"
                    className="ml-2 text-green-600 hover:text-green-800"
                    onClick={() => handleTagRemove("personality_traits", index)}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Quirks */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Quirks</label>
            <input
              type="text"
              value={quirkInput}
              onChange={(e) => setQuirkInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleTagAdd("quirks", quirkInput);
                  setQuirkInput("");
                }
              }}
              placeholder="Type quirk and press Enter"
              className="w-full p-2 border border-gray-300 rounded-md mb-2"
            />
            <div className="flex flex-wrap gap-2">
              {character.quirks.map((quirk, index) => (
                <span
                  key={index}
                  className="bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full inline-flex items-center"
                >
                  {quirk}
                  <button
                    type="button"
                    className="ml-2 text-yellow-600 hover:text-yellow-800"
                    onClick={() => handleTagRemove("quirks", index)}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="text-center">
        <button
          type="submit"
          className="bg-blue-600 text-white px-8 py-3 text-lg rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Start Adventure
        </button>
      </div>

      {/* Preview */}
      <div className="bg-gray-100 border rounded-xl p-4 mt-8 text-sm overflow-x-auto">
        <h4 className="font-semibold mb-2 text-gray-700">📄 Live Character JSON</h4>
        <pre className="whitespace-pre-wrap break-words">{JSON.stringify(character, null, 2)}</pre>
      </div>
    </form>
  );
}
