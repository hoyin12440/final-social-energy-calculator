// ActivityForm.jsx — The form for adding a new activity or editing an existing one.
//
// Features demonstrated here:
//  Feature 1:  useState — name, type, error, justAdded
//  Feature 2:  useEffect — populate form fields when editingActivity changes
//  Feature 12: Object.entries — iterate ACTIVITY_TYPES to build <option> list
//  Feature 15: Ternary operator — swap labels/colors based on edit vs add mode
//  Feature 16: Conditional rendering (&&) — show error, cancel button, success flash
//  Feature 18: Event handlers — onSubmit, onChange
//  Feature 19: Input validation — prevent empty or whitespace-only names
//  Feature 20: String.trim() — strip whitespace from the input value
//  Feature 21: setTimeout — clear the success flash after 1.5 seconds

import { useState, useEffect } from 'react';

function ActivityForm({ activityTypes, onAdd, onSaveEdit, editingActivity, onCancelEdit }) {
  // Local state for the two form fields
  const [name, setName]           = useState('');
  const [type, setType]           = useState('social');
  const [error, setError]         = useState('');     // validation error message
  const [justAdded, setJustAdded] = useState(false);  // brief success flash

  // ── Feature 2: Populate form when editing activity changes ───────────────────
  // When the user clicks Edit on an activity, this effect fills in the form data.
  useEffect(() => {
    if (editingActivity) {
      setName(editingActivity.name);
      setType(editingActivity.type);
      setError('');
    } else {
      // Reset to defaults when editing is cancelled or finished
      setName('');
      setType('social');
      setError('');
    }
  }, [editingActivity]); // runs every time editingActivity changes

  // ── Feature 18: Handle form submission ───────────────────────────────────────
  const handleSubmit = (e) => {
    e.preventDefault(); // stop the page from reloading

    // ── Feature 20 & 19: Validate — trim whitespace, then check for empty ──
    const trimmedName = name.trim(); // Feature 20
    if (!trimmedName) {              // Feature 19: block empty input
      setError('Please enter an activity name!');
      return;
    }

    setError(''); // clear any previous error

    const activityData = { name: trimmedName, type };

    if (editingActivity) {
      // Save the edit and return to view mode
      onSaveEdit(activityData);
    } else {
      // Add the new activity
      onAdd(activityData);
      setName('');       // reset form after adding
      setType('social');

      // ── Feature 21: setTimeout — show "Added!" for 1.5 s then hide it ──
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 1500);
    }
  };

  // ── Live energy impact preview ───────────────────────────────────────────────
  const impact      = activityTypes[type].impact;
  // Feature 15: Ternary — green for positive impact, red for negative
  const impactColor = impact > 0 ? 'text-green-500' : 'text-red-500';
  const impactLabel = impact > 0 ? `+${impact}` : `${impact}`;

  // Feature 22: Boolean coercion — convert editingActivity to a true/false flag
  const isEditing = !!editingActivity;

  // Shared input / select base classes (split out to keep JSX readable)
  const fieldClass =
    'w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg ' +
    'bg-white dark:bg-gray-700 text-gray-800 dark:text-white ' +
    'focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-5 mb-6 shadow-sm">
      {/* Feature 16: Heading changes based on whether we are editing or adding */}
      <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-white">
        {isEditing ? 'Edit Activity' : 'Add Activity'}
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">

        {/* ── Activity name text input ── */}
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (error) setError(''); // clear error as the user starts typing
          }}
          placeholder="e.g. Team meeting, gym session, nap..."
          className={`${fieldClass} placeholder-gray-400 dark:placeholder-gray-500`}
        />

        {/* ── Activity type dropdown + live impact preview ── */}
        <div className="flex items-center gap-3">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)} // Feature 18: onChange handler
            className={fieldClass}
          >
            {/* Feature 12: Object.entries iterates the ACTIVITY_TYPES object */}
            {Object.entries(activityTypes).map(([key, val]) => (
              // Feature 10: .map produces one <option> element per type
              <option key={key} value={key}>
                {val.label} ({val.impact > 0 ? '+' : ''}{val.impact})
              </option>
            ))}
          </select>

          {/* Shows the energy impact of the currently selected type */}
          <span className={`text-xl font-bold min-w-[52px] text-right ${impactColor}`}>
            {impactLabel}
          </span>
        </div>

        {/* ── Feature 16: Validation error — only shown when error is not empty ── */}
        {error && (
          <p className="text-red-500 text-sm fade-in">{error}</p>
        )}

        {/* ── Feature 16: Success flash — only shown right after adding ── */}
        {justAdded && (
          <p className="text-green-500 text-sm fade-in">Activity added successfully!</p>
        )}

        {/* ── Buttons ── */}
        <div className="flex gap-2">
          <button
            type="submit"
            className={`flex-1 py-2 rounded-lg font-semibold text-white
              transition-all active:scale-95
              ${isEditing
                ? 'bg-yellow-500 hover:bg-yellow-600' // Feature 15: yellow for edit
                : 'bg-blue-500 hover:bg-blue-600'     // blue for add
              }`}
          >
            {/* Feature 15: Ternary changes button label */}
            {isEditing ? 'Save Changes' : 'Add Activity'}
          </button>

          {/* Feature 16: Cancel button only visible when in edit mode */}
          {isEditing && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="px-4 py-2 rounded-lg font-semibold transition-all active:scale-95
                bg-gray-200 dark:bg-gray-700
                text-gray-700 dark:text-gray-300
                hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default ActivityForm;
