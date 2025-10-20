// Difficulty Page - Expand/Collapse and Stats Loading

document.addEventListener('DOMContentLoaded', function () {
  // Setup expand/collapse all
  setupExpandCollapseAll('toggle-all-sections', '.difficulty-section details');

  // Fetch overall complexity stats for header
  fetchStats(
    '/api/stats/complexity',
    function (complexityStats) {
      const stats = formatTopStats(complexityStats, 7);
      let displayText = `Top complexities — ${stats.text}`;
      if (stats.remaining > 0) {
        displayText += `, Other: ${stats.remaining}`;
      }
      document.getElementById('complexity-stats').textContent = displayText;
    },
    'Failed to load overall complexity stats:',
    function () {
      document.getElementById('complexity-stats').textContent = 'Complexity breakdown unavailable';
    }
  );

  // Fetch per-difficulty complexity breakdowns
  const difficultyLevels = ['easy', 'medium', 'hard'];
  difficultyLevels.forEach((difficulty) => {
    fetchStats(
      `/api/stats/complexity/difficulty/${difficulty}`,
      function (complexityCounts) {
        const stats = formatTopStats(complexityCounts, 5);
        let finalText = stats.text;
        if (stats.remaining > 0) {
          finalText += `, Other: ${stats.remaining}`;
        }
        const span = document.querySelector(`.section-breakdown[data-difficulty="${difficulty}"]`);
        if (span) {
          span.textContent = finalText;
        }
      },
      `Failed to load complexity stats for ${difficulty}:`
    );
  });
});
