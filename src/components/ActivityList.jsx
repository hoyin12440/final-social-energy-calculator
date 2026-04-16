// ActivityList.jsx — Renders all activities with edit and delete buttons.
// Also shows an empty-state illustration and a "Clear All" button.
//
// Features demonstrated here:
//  Feature 7:  Array.map — loop through activities to render each row
//  Feature 13: Spread / destructuring — { id, name, type } from each activity
//  Feature 15: Ternary operator — conditional badge colors, edit highlight
//  Feature 16: Conditional rendering — empty state, edit highlight, badge sign

function ActivityList({ activities, activityTypes, onDelete, onEdit, onClearAll, editingId }) {

  // ── Feature 16: If there are no activities, show a friendly empty state ──────
  if (activities.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-10 shadow-sm text-center">
        <p className="text-gray-400 dark:text-gray-500 text-sm mb-1">No activities yet.</p>
        <p className="text-gray-500 dark:text-gray-400">
          Add one above to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm">

      {/* ── Header row with count and Clear All button ── */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-white">
          {/* Template literal shows the live count */}
          Activities ({activities.length})
        </h2>
        <button
          onClick={onClearAll}
          className="px-3 py-1 text-sm rounded border font-medium
            border-red-300 dark:border-red-700
            text-red-600 dark:text-red-400
            hover:bg-red-50 dark:hover:bg-red-900/20
            transition-colors"
        >
          Clear All
        </button>
      </div>

      {/* ── Feature 7: Array.map — one list item per activity ── */}
      <ul className="space-y-2">
        {activities.map((activity) => {

          // ── Feature 19: Destructuring — pull out the fields we need ──
          const { id, name, type } = activity;
          const typeInfo       = activityTypes[type];
          const impact         = typeInfo.impact;
          const isPositive     = impact > 0;      // true = restores energy
          const isBeingEdited  = id === editingId; // true = this row is selected for edit

          return (
            <li
              key={id}
              className={`fade-in flex items-center gap-3 p-3 rounded-lg border transition-all
                ${isBeingEdited
                  // Feature 15: Ternary — highlight the row that is being edited
                  ? 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-600'
                  : 'border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/40 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
            >
              {/* Activity type label as a small colored tag instead of an emoji */}
              <span className="text-xs font-medium px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 flex-shrink-0">
                {typeInfo.label.split(' ')[0]}
              </span>

              {/* Activity name and type label */}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-800 dark:text-white truncate">{name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{typeInfo.label}</p>
              </div>

              {/* ── Energy impact badge ── */}
              <span className={`text-sm font-bold px-2 py-0.5 rounded-full flex-shrink-0
                ${isPositive
                  // Feature 15: Ternary — green for gain, red for drain
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400'
                  : 'bg-red-100   text-red-700   dark:bg-red-900/40   dark:text-red-400'
                }`}
              >
                {/* Feature 16: Prepend '+' for positive impacts */}
                {isPositive ? `+${impact}` : impact}
              </span>

              {/* ── Edit button ── */}
              <button
                onClick={() => onEdit(id)}
                disabled={isBeingEdited}
                title="Edit this activity"
                className={`px-2 py-1 text-xs rounded border transition-colors flex-shrink-0
                  ${isBeingEdited
                    // Feature 15: Ternary — dim if already selected
                    ? 'opacity-40 cursor-not-allowed border-gray-200 dark:border-gray-600 text-gray-400'
                    : 'border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300'
                  }`}
              >
                Edit
              </button>

              {/* ── Delete button ── */}
              <button
                onClick={() => onDelete(id)}
                title="Delete this activity"
                className="px-2 py-1 text-xs rounded border flex-shrink-0 transition-colors
                  border-red-200 dark:border-red-800
                  hover:bg-red-50 dark:hover:bg-red-900/30
                  text-red-600 dark:text-red-400"
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ActivityList;
