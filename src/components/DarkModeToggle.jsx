// DarkModeToggle.jsx — A simple button that switches between light and dark mode.
// Shows the mode the user will switch TO when clicked.

function DarkModeToggle({ darkMode, onToggle }) {
  return (
    <button
      onClick={onToggle}
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      className="px-3 py-1.5 text-sm font-medium rounded border
        border-gray-300 dark:border-gray-600
        bg-white dark:bg-gray-700
        text-gray-700 dark:text-gray-200
        hover:bg-gray-100 dark:hover:bg-gray-600
        transition-colors"
    >
      {/* Feature 15: Ternary — label shows the mode you will switch to */}
      {darkMode ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
}

export default DarkModeToggle;
