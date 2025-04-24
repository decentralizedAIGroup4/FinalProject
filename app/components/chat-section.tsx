"use client";

import { ChatSection as ChatSectionUI } from "@llamaindex/chat-ui";
import "@llamaindex/chat-ui/styles/markdown.css";
import "@llamaindex/chat-ui/styles/pdf.css";
import { useChat } from "ai/react";
import { useState } from "react";
import CustomChatInput from "./ui/chat/chat-input";
import CustomChatMessages from "./ui/chat/chat-messages";
import { useClientConfig } from "./ui/chat/hooks/use-config";

export default function ChatSection() {
  const { backend } = useClientConfig();

  const genres = [
    { emoji: "🧙", value: "Fantasy" },
    { emoji: "🕵️", value: "Mystery" },
    { emoji: "💑", value: "Romance" },
    { emoji: "🚀", value: "Sci-Fi" },
  ];
  const tones = [
    { emoji: "😊", value: "Happy" },
    { emoji: "😢", value: "Sad" },
    { emoji: "😏", value: "Sarcastic" },
    { emoji: "😂", value: "Funny" },
  ];

  const [state, setState] = useState({
    genre: "",
    tone: "",
  });

  const [characters, setCharacters] = useState([]);
  const [newCharacter, setNewCharacter] = useState({
    name: "",
    description: "",
    personality: "",
  });
  const [editingIndex, setEditingIndex] = useState(null);

  // Handle character input changes
  const handleCharacterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCharacter({
      ...newCharacter,
      [name]: value,
    });
  };

  // Add or update character
  const handleAddCharacter = () => {
    if (editingIndex !== null) {
      // Update existing character
      const updatedCharacters = [...characters];
      updatedCharacters[editingIndex] = newCharacter;
      setCharacters(updatedCharacters);
      setEditingIndex(null);
    } else {
      // Add new character
      setCharacters([...characters, newCharacter]);
    }
    setNewCharacter({ name: "", description: "", personality: "" });
  };

  // Edit character
  const handleEditCharacter = (index) => {
    setNewCharacter(characters[index]);
    setEditingIndex(index);
  };

  // Delete character
  const handleDeleteCharacter = (index) => {
    const updatedCharacters = characters.filter((_, i) => i !== index);
    setCharacters(updatedCharacters);
  };

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [name]: value,
    });
  };

  const editStory = () => {
    const characterInfo = characters
    .map(
      (char) =>
        `${char.name} is a ${char.personality} character who is ${char.description}.`
    )
    .join(" ");
    const prompt = `Generate a ${state.genre} story in a ${state.tone} tone based on the initial uploaded source story.${
      characters.length > 0
        ? `Include the following characters: ${characterInfo}`
        : ""}`;
    RAGHandler.append({
      role: "user",
      content: prompt,
    });
  };

  const RAGHandler = useChat({
    api: `${backend}/api/chat`,
    onError: (error: unknown) => {
      if (!(error instanceof Error)) throw error;
      let errorMessage: string;
      try {
        errorMessage = JSON.parse(error.message).detail;
      } catch (e) {
        errorMessage = error.message;
      }
      alert(errorMessage);
    },
  });
  return (
    <main className="mx-auto w-full p-24 flex flex-col">
      <div className="p4 m-4">
        <div className="flex flex-col items-center justify-center space-y-8 text-white">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Story Telling App</h2>
            <p className="text-zinc-500 dark:text-zinc-400">
              Customize the story by selecting the genre and tone.
            </p>
          </div>

          <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
            <h3 className="text-xl font-semibold">Genre</h3>

            <div className="flex flex-wrap justify-center">
              {genres.map(({ value, emoji }) => (
                <div
                  key={value}
                  className="p-4 m-2 bg-opacity-25 bg-gray-600 rounded-lg"
                >
                  <input
                    id={value}
                    type="radio"
                    value={value}
                    name="genre"
                    checked={state.genre === value}
                    onChange={handleChange}
                  />
                  <label className="ml-2" htmlFor={value}>
                    {`${emoji} ${value}`}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
            <h3 className="text-xl font-semibold">Tones</h3>
            <div className="flex flex-wrap justify-center">
              {tones.map(({ value, emoji }) => (
                <div
                  key={value}
                  className="p-4 m-2 bg-opacity-25 bg-gray-600 rounded-lg"
                >
                  <input
                    id={value}
                    type="radio"
                    name="tone"
                    value={value}
                    checked={state.tone === value}
                    onChange={handleChange}
                  />
                  <label className="ml-2" htmlFor={value}>
                    {`${emoji} ${value}`}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <h3 className="text-xl font-semibold">Add or Edit Characters</h3>
          <input
            className="w-full p-2 mb-2 rounded bg-gray-800 text-white"
            type="text"
            name="name"
            value={newCharacter.name}
            placeholder="Character Name"
            onChange={handleCharacterChange}
          />
          <input
            className="w-full p-2 mb-2 rounded bg-gray-800 text-white"
            type="text"
            name="description"
            value={newCharacter.description}
            placeholder="Character Description"
            onChange={handleCharacterChange}
          />
          <input
            className="w-full p-2 mb-4 rounded bg-gray-800 text-white"
            type="text"
            name="personality"
            value={newCharacter.personality}
            placeholder="Character Personality"
            onChange={handleCharacterChange}
          />
          <button
            onClick={handleAddCharacter}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            {editingIndex !== null ? "Update Character" : "Add Character"}
          </button>
        </div>

        {/* Display Characters Table */}
        {characters.length > 0 && (
          <div className="w-full max-w-lg bg-opacity-25 bg-gray-700 rounded-lg p-4 space-y-2">
            <h3 className="text-xl font-semibold">Character List</h3>
            <ul className="space-y-2">
              {characters.map((char, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-gray-800 p-2 rounded-lg"
                >
                  <div>
                    <p className="text-white font-bold">{char.name}</p>
                    <p className="text-sm text-zinc-400">
                      {char.personality} | {char.description}
                    </p>
                  </div>
                  <div className="space-x-2">
                    <button
                      onClick={() => handleEditCharacter(index)}
                      className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteCharacter(index)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          onClick={editStory}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Edit Story
        </button>
        <ChatSectionUI handler={RAGHandler} className="w-full h-full">
          <CustomChatMessages />
          <CustomChatInput />
        </ChatSectionUI>
      </div>
    </main>
  );
}
