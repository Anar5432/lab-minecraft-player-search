"use client";

import { useState, useEffect } from "react";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [edition, setEdition] = useState("java");
  const [playerData, setPlayerData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);

  // Load recent searches on mount
  useEffect(() => {
    const saved = localStorage.getItem("mcRecentSearches");
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  const handleSearch = async (e, searchName = query, searchEdition = edition) => {
    if (e) e.preventDefault();
    if (!searchName.trim()) return;

    setLoading(true);
    setError("");
    setPlayerData(null);

    try {
      const res = await fetch(`https://mc-api.io/profile/${encodeURIComponent(searchName)}/${searchEdition}`);
      if (!res.ok) {
        throw new Error("Player not found.");
      }
      const data = await res.json();
      setPlayerData(data);

      // Save to recent searches
      setRecentSearches(prev => {
        const newSearches = [searchName, ...prev.filter(s => s !== searchName)].slice(0, 5);
        localStorage.setItem("mcRecentSearches", JSON.stringify(newSearches));
        return newSearches;
      });
    } catch (err) {
      setError("We couldn't find a player with that username. Please check the spelling and edition and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold text-green-400">Player Search</h1>
        <p className="mt-2 text-zinc-400">Find any Minecraft player's profile and skin.</p>
      </div>

      <div className="max-w-xl mx-auto bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-md transition-all">
        <form onSubmit={handleSearch} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-zinc-300">
              Minecraft Username
            </label>
            <input
              type="text"
              id="username"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Notch"
              className="mt-1 block w-full bg-zinc-950 border border-zinc-700 rounded-md py-2 px-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            />
          </div>
          
          <div>
            <span className="block text-sm font-medium text-zinc-300 mb-2">Edition</span>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2 cursor-pointer group">
                <input
                  type="radio"
                  name="edition"
                  value="java"
                  checked={edition === "java"}
                  onChange={() => setEdition("java")}
                  className="text-green-500 focus:ring-green-500 bg-zinc-800 border-zinc-700 cursor-pointer"
                />
                <span className="text-zinc-300 text-sm group-hover:text-white transition-colors">Java</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer group">
                <input
                  type="radio"
                  name="edition"
                  value="bedrock"
                  checked={edition === "bedrock"}
                  onChange={() => setEdition("bedrock")}
                  className="text-green-500 focus:ring-green-500 bg-zinc-800 border-zinc-700 cursor-pointer"
                />
                <span className="text-zinc-300 text-sm group-hover:text-white transition-colors">Bedrock</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-black bg-green-500 hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 focus:ring-offset-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </form>

        {recentSearches.length > 0 && (
          <div className="mt-6 border-t border-zinc-800 pt-4">
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Recent Searches</h3>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map(name => (
                <button
                  key={name}
                  onClick={() => {
                    setQuery(name);
                    handleSearch(null, name, edition);
                  }}
                  className="inline-flex items-center px-2.5 py-1.5 rounded-md text-xs font-medium bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white transition-colors border border-zinc-700"
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="max-w-xl mx-auto">
        {error && (
          <div className="bg-red-950/50 border border-red-500/50 rounded-xl p-6 text-center shadow-md animate-in slide-in-from-bottom-4 duration-300">
            <div className="text-red-400 text-4xl mb-2">👾</div>
            <p className="text-red-200">{error}</p>
          </div>
        )}

        {playerData && !loading && !error && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-md animate-in slide-in-from-bottom-4 duration-500">
            <div className="px-6 py-8 text-center sm:px-10">
              <h2 className="text-3xl font-black text-white mb-2">{playerData.name}</h2>
              <p className="text-xs font-mono text-zinc-500 mb-8 bg-zinc-950 inline-block px-3 py-1 rounded-full border border-zinc-800">
                UUID: {playerData.uuid}
              </p>
              
              {playerData.decodedTexture?.textures?.SKIN?.url ? (
                <div className="flex justify-center">
                  <div className="bg-zinc-800/50 p-4 rounded-xl border border-zinc-700 shadow-inner backdrop-blur-sm">
                    <img 
                      src={playerData.decodedTexture.textures.SKIN.url} 
                      alt={`${playerData.name}'s skin`} 
                      className="w-64 h-auto drop-shadow-lg transform hover:scale-105 transition-transform duration-300"
                      style={{ imageRendering: 'pixelated' }}
                    />
                  </div>
                </div>
              ) : (
                <div className="text-zinc-500 italic p-8 bg-zinc-950 rounded-xl border border-zinc-800">
                  No skin found for this player.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
