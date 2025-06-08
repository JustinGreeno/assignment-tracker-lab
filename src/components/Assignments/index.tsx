// src/components/Assignments/index.tsx

import React, { useState } from 'react';
import { Header } from '../Header';
import { Assignment, AssignmentType } from '../Assignment';
import styles from './assignments.module.css';

export function Assignments() {
  const [assignments, setAssignments] = useState<AssignmentType[]>([]);
  const [nextId, setNextId] = useState(1);

  function handleAdd(title: string, dueString: string) {
    const dueDate = dueString ? new Date(dueString) : undefined;
    setAssignments(prev => [
      ...prev,
      { id: nextId, title, completed: false, due: dueDate },
    ]);
    setNextId(prev => prev + 1);
  }

  function handleToggle(id: number) {
    setAssignments(prev =>
      prev.map(a =>
        a.id === id ? { ...a, completed: !a.completed } : a
      )
    );
  }

  function handleDelete(id: number) {
    setAssignments(prev => prev.filter(a => a.id !== id));
  }

  return (
    <div className={styles.container}>
      {/* form */}
      <Header onAdd={handleAdd} />

      {/* stats panel */}
      <section className={styles.stats}>
        <div className={styles.statsItem}>
          <p className={styles.createdLabel}>Created</p>
          <span className={styles.badge}>
            {assignments.length}
          </span>
        </div>
        <div className={styles.statsItem}>
          <p className={styles.completedLabel}>Completed</p>
          <span className={styles.badge}>
            {assignments.filter(a => a.completed).length} / {assignments.length}
          </span>
        </div>
      </section>

      {/* list */}
      <div className={styles.list}>
        {assignments.map(item => (
          <Assignment
            key={item.id}
            assignment={item}
            onToggleComplete={() => handleToggle(item.id)}
            onDelete={() => handleDelete(item.id)}
          />
        ))}
      </div>
    </div>
  );
}
