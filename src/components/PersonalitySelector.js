import { useState, useEffect } from 'react';

export default function PersonalitySelector({ onSelect, selectedId }) {
  const [personalities, setPersonalities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/personalities')
      .then(res => res.json())
      .then(data => {
        setPersonalities(data.personalities);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load personalities:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center p-4">Loading personalities...</div>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
      {personalities.map((personality) => (
        <button
          key={personality.id}
          onClick={() => onSelect(personality)}
          className={`p-4 rounded-lg border-2 transition-all ${
            selectedId === personality.id
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="text-4xl mb-2">{personality.avatar}</div>
          <h3 className="font-semibold text-sm">{personality.name}</h3>
          <p className="text-xs text-gray-600 mt-1">{personality.description}</p>
          <div className="flex flex-wrap gap-1 mt-2">
            {personality.traits.map((trait, index) => (
              <span
                key={index}
                className="text-xs bg-gray-100 px-2 py-1 rounded"
              >
                {trait}
              </span>
            ))}
          </div>
        </button>
      ))}
    </div>
  );
}