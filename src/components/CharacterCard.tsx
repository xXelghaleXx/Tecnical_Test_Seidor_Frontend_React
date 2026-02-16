import React from 'react';
import type { Character } from '../types';
import { Star, User, Ruler, Weight, Info } from 'lucide-react';
import './CharacterCard.css';

interface Props {
  character: Character;
  onAction: (c: Character) => void;
  isFavorite?: boolean;
}

export const CharacterCard: React.FC<Props> = ({ character, onAction, isFavorite = false }) => {
  // Validación defensiva: asegurar que character y sus propiedades existan
  if (!character) {
    console.error('CharacterCard: character is undefined');
    return null;
  }

  // Determine gender class for border color
  const getGenderClass = () => {
    const gender = (character.gender || 'unknown').toLowerCase();
    if (gender === 'male') return 'gender-male';
    if (gender === 'female') return 'gender-female';
    return 'gender-none'; // n/a, hermaphrodite, or unknown
  };

  return (
    <div className={`character-card ${isFavorite ? 'is-fav' : ''} ${getGenderClass()}`}>
      <div className="card-header-pro">
        <div className="char-info">
          <span className="char-id-badge">ID: {character.id || 'N/A'}</span>
          <h3 className="char-name">{character.name || 'Unknown'}</h3>
        </div>
        <button
          onClick={() => onAction(character)}
          className={`btn-star-pro ${isFavorite ? 'active' : ''}`}
        >
          <Star size={18} fill={isFavorite ? "#facc15" : "none"} />
        </button>
      </div>

      <div className="stat-grid-pro">
        <div className="stat-tag"><Ruler size={14} /> {character.height || 'N/A'}cm</div>
        <div className="stat-tag"><Weight size={14} /> {character.mass || 'N/A'}kg</div>
        <div className="stat-tag"><User size={14} /> <span className="capitalize">{character.gender || 'unknown'}</span></div>
        <div className="stat-tag"><Info size={14} /> {character.birth_year || 'N/A'}</div>
      </div>
    </div>
  );
};