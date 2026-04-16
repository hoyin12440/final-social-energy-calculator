// App.jsx — Root component for the Social Energy Calculator
//
// JavaScript Features used across this project (22 total):
//  1.  useState          — state management for activities, darkMode, editingId
//  2.  useEffect         — side effects (localStorage sync, dark mode class)
//  3.  localStorage.getItem — loading saved data on startup
//  4.  localStorage.setItem — saving data when state changes
//  5.  JSON.parse        — deserializing activities from localStorage
//  6.  JSON.stringify    — serializing activities before saving
//  7.  Date.now()        — generating unique IDs for each activity
//  8.  Array.reduce()    — computing total energy from all activities
//  9.  Array.filter()    — deleting items; computing gained/drained stats
// 10.  Array.map()       — rendering lists; updating a single item in array
// 11.  Array.find()      — finding the activity currently being edited
// 12.  Object.entries()  — iterating activity type definitions in the form
// 13.  Spread operator   — immutable array/object updates
// 14.  Math.max/min()    — clamping energy between 0 and 100
// 15.  Ternary operator  — conditional values, styles, and labels
// 16.  Conditional render — showing warnings, edit mode UI, empty states
// 17.  Arrow functions   — used throughout for concise callbacks
// 18.  Event handlers    — onSubmit, onClick, onChange
// 19.  Input validation  — trim() + empty string check to block bad input
// 20.  String.trim()     — stripping whitespace from user input
// 21.  setTimeout()      — brief success flash after adding an activity
// 22.  Boolean coercion  — !! to convert a value to true/false

import { useState, useEffect } from 'react';
import ActivityForm    from './components/ActivityForm';
import EnergyDisplay  from './components/EnergyDisplay';
import ActivityList   from './components/ActivityList';
import DarkModeToggle from './components/DarkModeToggle';

// ─── Activity type definitions ───────────────────────────────────────────────
// Each type has a display label and energy impact (+ = restore, - = drain)
const ACTIVITY_TYPES = {
  social:     { label: 'Social / Party',  impact: -20 },
  work:       { label: 'Work / Study',    impact: -10 },
  exercise:   { label: 'Exercise',        impact: -15 },
  rest:       { label: 'Rest / Sleep',    impact: +30 },
  hobby:      { label: 'Hobby / Fun',     impact: +10 },
  meditation: { label: 'Meditation',      impact: +20 },
};

function App() {
  // ── Feature 1 & 3 & 5: useState with lazy initializer reads from localStorage ──
  const [activities, setActivities] = useState(() => {
    const saved = localStorage.getItem('sec-activities'); // Feature 3
    return saved ? JSON.parse(saved) : [];                // Feature 5
  });

  // ── Feature 1 & 3: Load dark mode preference from localStorage ──
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('sec-darkmode') === 'true'; // Feature 3
  });

  // ── Feature 1: Which activity ID is currently being edited (null = none) ──
  const [editingId, setEditingId] = useState(null);

  // ── Feature 2 & 4 & 6: Sync activities to localStorage on every change ──
  useEffect(() => {
    localStorage.setItem('sec-activities', JSON.stringify(activities)); // Feature 4 & 6
  }, [activities]);

  // ── Feature 2 & 4: Apply dark mode class to <html> and save preference ──
  useEffect(() => {
    // Toggling the 'dark' class makes all Tailwind dark: variants activate
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('sec-darkmode', String(darkMode)); // Feature 4
  }, [darkMode]);

  // ── Feature 8 & 14: Compute current energy ──────────────────────────────────
  // Start at 100, sum all impacts, clamp result between 0 and 100
  const energy = Math.max(                                       // Feature 14
    0,
    Math.min(
      100,
      100 + activities.reduce((sum, a) => sum + ACTIVITY_TYPES[a.type].impact, 0) // Feature 8
    )
  );

  // ── Feature 9: Compute separate gained / drained totals for the stats row ──
  const energyGained = activities
    .filter(a => ACTIVITY_TYPES[a.type].impact > 0)              // Feature 9
    .reduce((sum, a) => sum + ACTIVITY_TYPES[a.type].impact, 0); // Feature 8

  const energyDrained = activities
    .filter(a => ACTIVITY_TYPES[a.type].impact < 0)              // Feature 9
    .reduce((sum, a) => sum + ACTIVITY_TYPES[a.type].impact, 0); // Feature 8

  // ── Feature 13 & 17: Add a new activity ─────────────────────────────────────
  const handleAddActivity = (newActivity) => {
    setActivities(prev => [
      ...prev,                                 // Feature 13: spread existing array
      { ...newActivity, id: Date.now() },      // Feature 7 & 13: new ID + spread data
    ]);
  };

  // ── Feature 9 & 17: Delete an activity by ID ────────────────────────────────
  const handleDeleteActivity = (id) => {
    setActivities(prev => prev.filter(a => a.id !== id)); // Feature 9
    if (editingId === id) setEditingId(null);             // cancel edit if deleted
  };

  // Start editing mode for a specific activity
  const handleEditActivity = (id) => {
    setEditingId(id);
  };

  // ── Feature 10 & 13 & 17: Save the changes from edit mode ───────────────────
  const handleSaveEdit = (updatedData) => {
    setActivities(prev =>
      prev.map(a =>                                           // Feature 10
        a.id === editingId
          ? { ...a, ...updatedData }                         // Feature 13: merge changes
          : a
      )
    );
    setEditingId(null);
  };

  // Clear all activities and cancel any active edit
  const handleClearAll = () => {
    setActivities([]);
    setEditingId(null);
  };

  // ── Feature 11: Find the activity object currently being edited ──────────────
  const editingActivity = activities.find(a => a.id === editingId) || null;

  return (
    // Dark mode styling is controlled by the 'dark' class on <html>
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-2xl mx-auto px-4 py-8">

        {/* ── Header ── */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              Social Energy Calculator
            </h1>
            <p className="text-sm mt-1 text-gray-500 dark:text-gray-400">
              Track how your daily activities affect your energy
            </p>
          </div>
          {/* Feature 17: arrow function in onToggle prop */}
          <DarkModeToggle darkMode={darkMode} onToggle={() => setDarkMode(prev => !prev)} />
        </div>

        {/* ── Energy Display ── */}
        <EnergyDisplay
          energy={energy}
          energyGained={energyGained}
          energyDrained={energyDrained}
        />

        {/* ── Add / Edit Form ── */}
        <ActivityForm
          activityTypes={ACTIVITY_TYPES}
          onAdd={handleAddActivity}
          onSaveEdit={handleSaveEdit}
          editingActivity={editingActivity}
          onCancelEdit={() => setEditingId(null)}
        />

        {/* ── Activity List ── */}
        <ActivityList
          activities={activities}
          activityTypes={ACTIVITY_TYPES}
          onDelete={handleDeleteActivity}
          onEdit={handleEditActivity}
          onClearAll={handleClearAll}
          editingId={editingId}
        />

      </div>
    </div>
  );
}

export default App;
