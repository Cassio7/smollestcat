import React, { useState, useEffect } from "react";
import { Calendar, RefreshCw, Tag } from "lucide-react";

const POPULAR_TAGS = [
  "cute",
  "orange",
  "black",
  "white",
  "smol",
  "tabby",
  "kitten",
  "sleeping",
  "funny",
  "angry",
  "fluffy",
  "grumpy",
  "happy",
  "fat",
  "silly",
  "sleepy",
  "crazy",
  "siamese",
  "persian",
  "sniffing",
  "bed",
  "christmas",
  "stupid",
] as const;

export default function CatApp(): React.ReactElement {
  const [catKey, setCatKey] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentDate, setCurrentDate] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<string>("");

  const loadNewCat = (): void => {
    setLoading(true);
    setCatKey((prev) => prev + 1);
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedTag(e.target.value);
    setLoading(true);
    setCatKey((prev) => prev + 1);
  };

  useEffect(() => {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    setCurrentDate(date.toLocaleDateString("it-IT", options));
  }, []);

  const catUrl: string = selectedTag ? `https://cataas.com/cat/${selectedTag}?t=${catKey}` : `https://cataas.com/cat?t=${catKey}`;

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Calendar className="w-6 h-6 text-purple-600" />
            <h1 className="text-3xl font-bold text-gray-800">Smollest Cat Generator</h1>
          </div>
          <p className="text-lg text-gray-600 capitalize">{currentDate}</p>
        </div>

        <div className="mb-6">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
            <Tag className="w-4 h-4" />
            Seleziona un tag (opzionale):
          </label>
          <select
            value={selectedTag}
            onChange={handleTagChange}
            className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:outline-none transition-colors bg-white text-gray-700"
          >
            <option value="">Tutti i gatti (random)</option>
            {POPULAR_TAGS.map((tag) => (
              <option key={tag} value={tag}>
                {tag.charAt(0).toUpperCase() + tag.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="relative bg-gray-100 rounded-2xl overflow-hidden mb-6 h-96">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-500 border-t-transparent"></div>
            </div>
          )}
          <img
            key={catKey}
            src={catUrl}
            alt={selectedTag ? `Random ${selectedTag} cat` : "Random cat"}
            className={`w-full h-full object-cover transition-opacity duration-500 ${loading ? "opacity-0" : "opacity-100"}`}
            onLoad={() => setLoading(false)}
            onError={() => setLoading(false)}
          />
        </div>

        {selectedTag && (
          <div className="mb-4 text-center">
            <span className="inline-flex items-center gap-1 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
              <Tag className="w-4 h-4" />
              Tag: {selectedTag}
            </span>
          </div>
        )}

        <button
          onClick={loadNewCat}
          disabled={loading}
          className="w-full bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
        >
          <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
          {loading ? "Caricamento..." : "Mostra un altro gatto"}
        </button>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Per boki</p>
        </div>
      </div>
    </div>
  );
}
