// Index Page - Category Badge Loading

document.addEventListener('DOMContentLoaded', function() {
    // Fetch and display badges for each category
    const categoryCards = document.querySelectorAll('.category-card-wrapper');

    categoryCards.forEach(cardWrapper => {
        const categorySlug = cardWrapper.getAttribute('data-category');
        const difficultyBadgesDiv = cardWrapper.querySelector('.difficulty-badges');
        const complexityBadgesDiv = cardWrapper.querySelector('.complexity-badges');

        // Fetch difficulty stats for this category
        fetchStats(
            `/api/stats/category/${categorySlug}/difficulty`,
            function(difficultyCounts) {
                const easy = difficultyCounts.easy || 0;
                const medium = difficultyCounts.medium || 0;
                const hard = difficultyCounts.hard || 0;

                let html = '';
                if (easy > 0) html += `<span class="badge difficulty-easy">🟢 ${easy}</span> `;
                if (medium > 0) html += `<span class="badge difficulty-medium">🟡 ${medium}</span> `;
                if (hard > 0) html += `<span class="badge difficulty-hard">🔴 ${hard}</span>`;

                difficultyBadgesDiv.innerHTML = html || '<span class="no-data">No difficulty data</span>';
            },
            `Failed to load difficulty stats for ${categorySlug}:`,
            function() {
                difficultyBadgesDiv.innerHTML = '<span class="error">Failed to load</span>';
            }
        );

        // Fetch complexity stats for this category
        fetchStats(
            `/api/stats/category/${categorySlug}/complexity`,
            function(complexityCounts) {
                // Filter out 'Unknown' and get top 3
                const filtered = Object.fromEntries(
                    Object.entries(complexityCounts).filter(([pattern]) => pattern !== 'Unknown')
                );

                if (Object.keys(filtered).length === 0) {
                    complexityBadgesDiv.innerHTML = '<span class="no-data">No complexity data</span>';
                    return;
                }

                const stats = formatTopStats(filtered, 3, ' ',
                    ([pattern, count]) => `<span class="badge complexity">${pattern}: ${count}</span>`
                );

                let finalHtml = stats.text;
                if (stats.remaining > 0) {
                    finalHtml += ` <span class="badge complexity">Other: ${stats.remaining}</span>`;
                }

                complexityBadgesDiv.innerHTML = finalHtml;
            },
            `Failed to load complexity stats for ${categorySlug}:`,
            function() {
                complexityBadgesDiv.innerHTML = '<span class="error">Failed to load</span>';
            }
        );
    });
});
