import { useState } from 'react';
import PersonalitySelector from '../src/components/PersonalitySelector';
import ChatInterface from '../src/components/ChatInterface';

export default function Home() {
  const [selectedPersonality, setSelectedPersonality] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">AI Personality Chat</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {!selectedPersonality ? (
          <div>
            <h2 className="text-xl font-semibold mb-4">Choose a personality to chat with:</h2>
            <PersonalitySelector onSelect={setSelectedPersonality} />
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg h-[600px] flex flex-col">
            <ChatInterface personality={selectedPersonality} />
            <button
              onClick={() => setSelectedPersonality(null)}
              className="m-4 text-sm text-gray-600 hover:text-gray-800"
            >
              ← Choose another personality
            </button>
          </div>
        )}
      </main>
    </div>
  );
}