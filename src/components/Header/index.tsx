// src/components/Header/index.tsx

import React, { useState } from 'react';
import styles from './header.module.css';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { uppercase } from '../../helpers/stringHelpers';

interface HeaderProps {
  onAdd: (title: string, dueString: string) => void;
}

export function Header({ onAdd }: HeaderProps) {
  const [text, setText] = useState('');
  const [due, setDue] = useState('');    // yyyy-mm-dd

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const title = text.trim();
    if (!title) return;
    onAdd(title, due);
    setText('');
    setDue('');
  };

  return (
    <header className={styles.header}>
      <h1>{uppercase('bcit')} Assignment Tracker</h1>
      <form className={styles.newAssignmentForm} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add a new assignment"
          value={text}
          onChange={e => setText(e.currentTarget.value)}
        />
        <input
          type="date"
          value={due}
          onChange={e => setDue(e.currentTarget.value)}
        />
        <button type="submit" disabled={!text.trim()}>
          Create <AiOutlinePlusCircle size={20} />
        </button>
      </form>
    </header>
  );
}
