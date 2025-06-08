// src/components/Header/index.tsx

import React, { useState } from 'react';
import styles from './header.module.css';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { uppercase } from '../../helpers/stringHelpers';

// Props: callback to notify parent of a new assignment
interface HeaderProps {
  onAdd: (title: string) => void;
}

export function Header({ onAdd }: HeaderProps) {
  // state to hold current input value
  const [text, setText] = useState<string>('');

  // handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();               // prevent page reload
    const trimmed = text.trim();      
    if (!trimmed) return;             // ignore empty submissions
    onAdd(trimmed);                   // tell parent about new assignment
    setText('');                      // clear the input
  };

  return (
    <header className={styles.header}>
      {/* Uppercase helper just for style */}
      <h1>{uppercase('bcit')} Assignment Tracker</h1>

      <form className={styles.newAssignmentForm} onSubmit={handleSubmit}>
        {/* Controlled input */}
        <input
          type="text"
          placeholder="Add a new assignment"
          value={text}
          onChange={e => setText(e.currentTarget.value)}
        />

    
        {/* Step 1 : Disable until there’s non-whitespace text */}
        <button type="submit" disabled={!text.trim()}>
          Create <AiOutlinePlusCircle size={20} />
        </button>
      </form>
    </header>
  );
}
