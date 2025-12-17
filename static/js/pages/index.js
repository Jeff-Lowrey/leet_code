// Index Page - Category Badge Loading

document.addEventListener('DOMContentLoaded', function () {
  // Fetch and display badges for each category
  const categoryCards = document.querySelectorAll('.category-card-wrapper');

  categoryCards.forEach((cardWrapper) => {
    const categorySlug = cardWrapper.getAttribute('data-category');
    const difficultyBadgesDiv = cardWrapper.querySelector('.difficulty-badges');
    const complexityBadgesDiv = cardWrapper.querySelector('.complexity-badges');

    // Fetch difficulty stats for this category
    fetchStats(
      `/api/category/${categorySlug}/stats/difficulty`,
      function (difficultyCounts) {
        const easy = difficultyCounts.easy || 0;
        const medium = difficultyCounts.medium || 0;
        const hard = difficultyCounts.hard || 0;

        // Always show all three difficulty levels with labels and emojis
        let html = '';
        html += `<span class="badge difficulty-easy">🟢 Easy: ${easy}</span> `;
        html += `<span class="badge difficulty-medium">🟡 Med: ${medium}</span> `;
        html += `<span class="badge difficulty-hard">🔴 Hard: ${hard}</span>`;

        difficultyBadgesDiv.innerHTML = html;
      },
      `Failed to load difficulty stats for ${categorySlug}:`,
      function () {
        difficultyBadgesDiv.innerHTML = '<span class="error">Failed to load</span>';
      }
    );

    // Fetch complexity stats for this category
    fetchStats(
      `/api/category/${categorySlug}/stats/complexity`,
      function (complexityCounts) {
        // Filter out 'Unknown' and get top 3
        const filtered = Object.fromEntries(
          Object.entries(complexityCounts).filter(([pattern]) => pattern !== 'Unknown')
        );

        if (Object.keys(filtered).length === 0) {
          complexityBadgesDiv.innerHTML = '<span class="no-data">No complexity data</span>';
          return;
        }

        const stats = formatTopStats(
          filtered,
          3,
          ' ',
          ([pattern, count]) => `<span class="badge complexity">${pattern}: ${count}</span>`
        );

        let finalHtml = stats.text;
        if (stats.remaining > 0) {
          finalHtml += ` <span class="badge complexity">Other: ${stats.remaining}</span>`;
        }

        complexityBadgesDiv.innerHTML = finalHtml;
      },
      `Failed to load complexity stats for ${categorySlug}:`,
      function () {
        complexityBadgesDiv.innerHTML = '<span class="error">Failed to load</span>';
      }
    );
  });
});
