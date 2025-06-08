// src/components/Header/index.tsx
import React, { useState } from 'react';
import styles from './header.module.css';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { uppercase } from '../../helpers/stringHelpers';

interface HeaderProps {
  onAdd: (title: string) => void;  // parent callback
}

export function Header({ onAdd }: HeaderProps) {
  const [text, setText] = useState('');  // controlled input state

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;                // ignore empty
    onAdd(trimmed);                      // send up to parent
    setText('');                         // clear field
  };

  return (
    <header className={styles.header}>
      <h1>{uppercase('bcit')} Assignment Tracker</h1>

      <form className={styles.newAssignmentForm} onSubmit={handleSubmit}>
        {/* input field */}
        <input
          type="text"
          placeholder="Add a new assignment"
          value={text}
          onChange={e => setText(e.currentTarget.value)}
        />

        {/* disable until non-whitespace text */}
        <button type="submit" disabled={!text.trim()}>
          Create <AiOutlinePlusCircle size={20} />
        </button>
      </form>
    </header>
  );
}