// src/components/Assignments/index.tsx

import React, { useState } from 'react';                 
import { Header } from '../Header';                      
import { Assignment, AssignmentType } from '../Assignment';
import styles from './assignments.module.css';

export function Assignments() {
  // 1) Our list of assignments in state
  const [assignments, setAssignments] = useState<AssignmentType[]>([]);
  // 2) Simple counter for unique IDs
  const [nextId, setNextId] = useState(1);

  // Called by Header when you hit Create
  function handleAdd(title: string) {
    setAssignments(prev => [
      ...prev,
      { id: nextId, title, completed: false },
    ]);
    setNextId(prev => prev + 1);
  }

  // Called by Assignment when you click the circle
  function handleToggle(id: number) {
    setAssignments(prev =>
      prev.map(a => (a.id === id ? { ...a, completed: !a.completed } : a))
    );
  }

  // **Step 3: Called by Assignment when you click the trash icon**
  function handleDelete(id: number) {
    setAssignments(prev => prev.filter(a => a.id !== id));
  }

  return (
    <div className={styles.assignments}>
      {/* Form + Create button */}
      <Header onAdd={handleAdd} />

      {/* Stats */}
      <section className={styles.header}>
        <div>
          <p>Created</p>
          <span>{assignments.length}</span>
        </div>
        <div>
          <p className={styles.textPurple}>Completed</p>
          <span>
            {assignments.filter(a => a.completed).length} / {assignments.length}
          </span>
        </div>
      </section>

      {/* List of items */}
      <div className={styles.list}>
        {assignments.map(item => (
          <Assignment
            key={item.id}
            assignment={item}
            onToggleComplete={() => handleToggle(item.id)}
            onDelete={() => handleDelete(item.id)}   // ← delete handler wired up
          />
        ))}
      </div>
    </div>
  );
}
