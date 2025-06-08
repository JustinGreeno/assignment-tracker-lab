// src/components/Assignment/index.tsx

import React from 'react';
import { TbTrash } from 'react-icons/tb';
import { BsCircle, BsCheckCircleFill } from 'react-icons/bs';
import { differenceInCalendarDays } from 'date-fns';
import styles from './assignment.module.css';

export interface AssignmentType {
  id: number;
  title: string;
  completed: boolean;
  due?: Date;
}

interface Props {
  assignment: AssignmentType;
  onToggleComplete: () => void;
  onDelete: () => void;
}

export function Assignment({
  assignment,
  onToggleComplete,
  onDelete,
}: Props) {
  const today = new Date();
  let badgeText = '';
  let badgeColor = '';

  if (assignment.completed) {
    badgeText = 'Completed';
    badgeColor = 'green';
  } else if (assignment.due) {
    const diff = differenceInCalendarDays(assignment.due, today);
    if (diff < 0) {
      badgeText = 'Due: Now';
      badgeColor = 'red';
    } else if (diff === 1) {
      badgeText = 'Tomorrow';
      badgeColor = 'orange';
    } else if (diff <= 7) {
      badgeText = `${diff} days`;
      badgeColor = 'blue';
    } else {
      badgeText = `${diff} days`;
      badgeColor = 'grey';
    }
  }

  return (
    <div className={styles.assignment}>
      <button
        onClick={onToggleComplete}
        className={styles.checkContainer}
        aria-label={
          assignment.completed ? 'Mark incomplete' : 'Mark complete'
        }
      >
        {assignment.completed ? (
          <BsCheckCircleFill size={20} />
        ) : (
          <BsCircle size={20} />
        )}
      </button>

      <p className={assignment.completed ? styles.textCompleted : ''}>
        {assignment.title}
      </p>

      {badgeText && (
        <span
          className={styles.dueBadge}
          style={{ backgroundColor: badgeColor }}
        >
          {badgeText}
        </span>
      )}

      <button
        onClick={onDelete}
        className={styles.deleteButton}
        aria-label="Delete assignment"
      >
        <TbTrash size={20} />
      </button>
    </div>
  );
}
