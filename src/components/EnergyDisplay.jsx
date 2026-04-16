// EnergyDisplay.jsx — Shows the current energy level as a number, progress bar,
// a summary message, a gained/drained stats row, and a low-energy warning.

// Feature 15: Ternary operator used throughout for conditional styling
// Feature 16: Conditional rendering (&&) for the warning banner

function EnergyDisplay({ energy, energyGained, energyDrained }) {

  // ── Determine the status object based on current energy level ───────────────
  // Uses a series of if-else conditions (conditional logic)
  const getStatus = (level) => {
    if (level >= 80) return {
      message:   "You're doing great! Keep it up!",
      barColor:  'bg-green-500',
      textColor: 'text-green-500',
      warning:   false,
    };
    if (level >= 60) return {
      message:   "You're doing well.",
      barColor:  'bg-blue-500',
      textColor: 'text-blue-500',
      warning:   false,
    };
    if (level >= 40) return {
      message:   "You're managing okay.",
      barColor:  'bg-yellow-400',
      textColor: 'text-yellow-500',
      warning:   false,
    };
    if (level >= 20) return {
      message:   'You need some rest.',
      barColor:  'bg-orange-500',
      textColor: 'text-orange-500',
      warning:   true,
    };
    return {
      message:   "Critical! You're running on empty.",
      barColor:  'bg-red-500',
      textColor: 'text-red-500',
      warning:   true,
    };
  };

  const status = getStatus(energy); // run the function to get current status

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-5 mb-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-3 text-gray-700 dark:text-white">
        Energy Level
      </h2>

      {/* ── Energy number ── */}
      <div className="flex items-end gap-2 mb-3">
        {/* Feature 15: textColor changes based on energy level */}
        <span className={`text-5xl font-bold transition-colors duration-500 ${status.textColor}`}>
          {energy}
        </span>
        <span className="text-xl mb-1 text-gray-400 dark:text-gray-500">/ 100</span>
      </div>

      {/* ── Animated progress bar ── */}
      {/* The track */}
      <div className="w-full h-5 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
        {/* The fill — width is set via inline style so it animates with CSS transition */}
        {/* width is set via inline style so the CSS transition can animate it */}
        <div
          className={`h-full rounded-full progress-bar ${status.barColor}`}
          style={{ width: `${energy}%` }}
        />
      </div>

      {/* ── Summary message ── */}
      <p className="mt-3 text-sm font-medium text-gray-600 dark:text-gray-300">
        {status.message}
      </p>

      {/* ── Stats row: energy gained vs drained ── */}
      <div className="flex gap-6 mt-3 text-sm font-medium">
        <span className="text-green-600 dark:text-green-400">
          Gained: +{energyGained}
        </span>
        <span className="text-red-600 dark:text-red-400">
          {/* energyDrained is already a negative number (or 0) */}
          Drained: {energyDrained}
        </span>
      </div>

      {/* ── Feature 16: Low-energy warning — only renders when status.warning is true ── */}
      {status.warning && (
        <div className={`pulse mt-4 p-3 rounded-lg border text-sm font-medium ${
          energy < 20
            // Feature 15: Ternary — red for critical, orange for just low
            ? 'border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-800 text-red-800 dark:text-red-400'
            : 'border-orange-300 bg-orange-50 dark:bg-orange-900/20 dark:border-orange-800 text-orange-800 dark:text-orange-400'
        }`}>
          {energy < 20
            ? 'Critical: You are running on empty. Please rest immediately!'
            : 'Warning: Your energy is getting low. Consider adding rest or meditation.'}
        </div>
      )}
    </div>
  );
}

export default EnergyDisplay;
