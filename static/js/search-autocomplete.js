/**
 * SearchAutocomplete - Intelligent search with context-aware suggestions
 *
 * Features:
 * - Context detection: numbers, names, filters
 * - Keyboard navigation (↑ ↓ Enter Esc)
 * - Debounced input (150ms)
 * - Grouped suggestions with metadata badges
 * - Progressive filtering
 */

class SearchAutocomplete {
    constructor(inputId, dropdownId) {
        this.input = document.getElementById(inputId);
        this.dropdown = document.getElementById(dropdownId);
        this.allProblems = [];
        this.selectedIndex = -1;
        this.debounceTimer = null;
        this.isLoading = false;

        // Filter definitions
        this.availableFilters = {
            'difficulty': {
                name: 'difficulty',
                values: ['easy', 'medium', 'hard'],
                description: 'Filter by difficulty level',
                examples: ['difficulty=easy', 'difficulty=medium']
            },
            'category': {
                name: 'category',
                values: [], // Will be populated from API
                description: 'Filter by problem category',
                examples: ['category=arrays-hashing', 'category=graphs']
            },
            'complexity': {
                name: 'complexity',
                values: ['O(1)', 'O(n)', 'O(n log n)', 'O(n²)', 'O(2^n)'],
                description: 'Filter by time complexity',
                examples: ['complexity=O(n)', 'complexity=O(n log n)']
            }
        };

        this.init();
    }

    async init() {
        // Load all problems from API
        await this.loadProblems();

        // Setup event listeners
        this.input.addEventListener('input', (e) => this.handleInput(e));
        this.input.addEventListener('keydown', (e) => this.handleKeydown(e));
        this.input.addEventListener('focus', () => this.show());

        // Close on click outside
        document.addEventListener('click', (e) => {
            if (!this.input.contains(e.target) && !this.dropdown.contains(e.target)) {
                this.hide();
            }
        });
    }

    async loadProblems() {
        try {
            this.isLoading = true;

            // Fetch all categories and their solutions
            const response = await fetch('/api/categories');
            const categories = await response.json();

            // Flatten all solutions with category metadata
            this.allProblems = [];
            for (const category of categories) {
                const solutionsResponse = await fetch(`/api/category/${category.slug}/solutions`);
                const solutions = await solutionsResponse.json();

                solutions.forEach(solution => {
                    this.allProblems.push({
                        number: solution.number,
                        name: solution.name,
                        filename: solution.filename,
                        category: category.slug,
                        categoryName: category.name,
                        // These will be fetched when needed, or can be added to API
                        difficulty: 'medium', // Placeholder
                        timeComplexity: 'O(n)', // Placeholder
                    });
                });

                // Add category to filter values
                if (!this.availableFilters.category.values.includes(category.slug)) {
                    this.availableFilters.category.values.push(category.slug);
                }
            }

            this.isLoading = false;
        } catch (error) {
            console.error('Failed to load problems:', error);
            this.isLoading = false;
        }
    }

    handleInput(e) {
        clearTimeout(this.debounceTimer);

        const query = e.target.value.trim();

        if (!query) {
            this.hide();
            return;
        }

        // Debounce the search
        this.debounceTimer = setTimeout(() => {
            this.search(query);
        }, 150);
    }

    handleKeydown(e) {
        const items = this.dropdown.querySelectorAll('.search-autocomplete-item');

        switch(e.key) {
            case 'ArrowDown':
                e.preventDefault();
                this.selectedIndex = Math.min(this.selectedIndex + 1, items.length - 1);
                this.updateSelection(items);
                break;

            case 'ArrowUp':
                e.preventDefault();
                this.selectedIndex = Math.max(this.selectedIndex - 1, 0);
                this.updateSelection(items);
                break;

            case 'Enter':
                e.preventDefault();
                if (this.selectedIndex >= 0 && items[this.selectedIndex]) {
                    items[this.selectedIndex].click();
                } else {
                    this.executeSearch(this.input.value);
                }
                break;

            case 'Escape':
                e.preventDefault();
                this.hide();
                this.input.blur();
                break;
        }
    }

    updateSelection(items) {
        items.forEach((item, index) => {
            if (index === this.selectedIndex) {
                item.classList.add('active');
                item.scrollIntoView({ block: 'nearest' });
            } else {
                item.classList.remove('active');
            }
        });
    }

    search(query) {
        const context = this.detectContext(query);
        const suggestions = this.generateSuggestions(query, context);
        this.render(suggestions, context);
        this.show();
    }

    detectContext(query) {
        const tokens = query.split(/\s+/);
        const lastToken = tokens[tokens.length - 1];

        // Check if typing a filter
        if (lastToken.includes('=')) {
            const [key, value] = lastToken.split('=');
            if (this.availableFilters[key]) {
                return {
                    type: 'filter_value_typing',
                    filterKey: key,
                    filterValue: value || '',
                    query: query
                };
            }
        }

        // Check if starting a filter key
        for (const filterKey in this.availableFilters) {
            if (lastToken && filterKey.startsWith(lastToken.toLowerCase()) && !lastToken.includes('=')) {
                return {
                    type: 'filter_key_typing',
                    partial: lastToken,
                    query: query
                };
            }
        }

        // Check if typing a number
        if (/^\d+$/.test(query)) {
            return {
                type: 'number_typing',
                number: query,
                query: query
            };
        }

        // Check if contains a number (navigate mode)
        const numberMatch = query.match(/\b(\d+)\b/);
        if (numberMatch) {
            return {
                type: 'navigate',
                number: numberMatch[1],
                filters: this.parseFilters(query),
                query: query
            };
        }

        // Default to name search
        return {
            type: 'name_typing',
            searchTerm: query,
            filters: this.parseFilters(query),
            query: query
        };
    }

    parseFilters(query) {
        const filters = {};
        const filterPattern = /(\w+)=([^\s]+)/g;
        let match;

        while ((match = filterPattern.exec(query)) !== null) {
            const [, key, value] = match;
            if (this.availableFilters[key]) {
                filters[key] = value;
            }
        }

        return filters;
    }

    generateSuggestions(query, context) {
        const suggestions = {
            problems: [],
            filters: [],
            examples: []
        };

        switch (context.type) {
            case 'number_typing':
                // Suggest problems matching the number
                suggestions.problems = this.allProblems
                    .filter(p => p.number && p.number.startsWith(context.number))
                    .slice(0, 8);

                // Suggest filter examples
                if (suggestions.problems.length > 0) {
                    suggestions.examples = [
                        { text: `${context.number} difficulty=easy`, description: 'Find similar easy problems' },
                        { text: `${context.number}`, description: 'Go to problem' }
                    ];
                }
                break;

            case 'name_typing':
                // Suggest problems matching the name
                const searchLower = context.searchTerm.toLowerCase();
                suggestions.problems = this.allProblems
                    .filter(p => p.name && p.name.toLowerCase().includes(searchLower))
                    .slice(0, 10);

                // Suggest filters
                if (context.searchTerm.length >= 2) {
                    suggestions.filters = Object.values(this.availableFilters)
                        .filter(f => f.name.includes(searchLower))
                        .slice(0, 3);
                }
                break;

            case 'filter_key_typing':
                // Suggest filter keys
                suggestions.filters = Object.values(this.availableFilters)
                    .filter(f => f.name.startsWith(context.partial.toLowerCase()));
                break;

            case 'filter_value_typing':
                // Suggest filter values
                const filter = this.availableFilters[context.filterKey];
                if (filter) {
                    const valueLower = context.filterValue.toLowerCase();
                    suggestions.filterValues = filter.values
                        .filter(v => v.toLowerCase().includes(valueLower))
                        .map(v => ({
                            key: context.filterKey,
                            value: v,
                            fullText: query.replace(/\w+=\w*$/, `${context.filterKey}=${v}`)
                        }))
                        .slice(0, 5);
                }
                break;

            case 'navigate':
                // Show the specific problem
                suggestions.problems = this.allProblems
                    .filter(p => p.number === context.number)
                    .slice(0, 1);

                // Suggest similar searches with filters
                suggestions.examples = [
                    { text: `${context.number} difficulty=easy`, description: 'Similar easy problems' },
                    { text: `${context.number} category=same`, description: 'Same category problems' }
                ];
                break;
        }

        return suggestions;
    }

    render(suggestions, context) {
        this.selectedIndex = -1;

        if (this.isLoading) {
            this.dropdown.innerHTML = '<div class="search-loading">Loading problems...</div>';
            return;
        }

        const hasResults = suggestions.problems.length > 0 ||
                          suggestions.filters.length > 0 ||
                          suggestions.filterValues?.length > 0 ||
                          suggestions.examples.length > 0;

        if (!hasResults) {
            this.dropdown.innerHTML = `
                <div class="search-no-results">
                    <div class="search-no-results-title">No results found</div>
                    <div class="search-no-results-hint">Try: problem number (443), name (palindrome), or filters (difficulty=easy)</div>
                </div>
            `;
            return;
        }

        let html = '';

        // Render problems
        if (suggestions.problems.length > 0) {
            html += '<div class="search-autocomplete-group">';
            html += '<div class="search-autocomplete-group-title">Problems</div>';
            suggestions.problems.forEach(problem => {
                html += this.renderProblemItem(problem, context.query);
            });
            html += '</div>';
        }

        // Render filter suggestions
        if (suggestions.filters.length > 0) {
            html += '<div class="search-autocomplete-group">';
            html += '<div class="search-autocomplete-group-title">Filters</div>';
            suggestions.filters.forEach(filter => {
                html += this.renderFilterItem(filter);
            });
            html += '</div>';
        }

        // Render filter values
        if (suggestions.filterValues && suggestions.filterValues.length > 0) {
            html += '<div class="search-autocomplete-group">';
            html += '<div class="search-autocomplete-group-title">Values</div>';
            suggestions.filterValues.forEach(item => {
                html += this.renderFilterValueItem(item);
            });
            html += '</div>';
        }

        // Render examples
        if (suggestions.examples.length > 0) {
            html += '<div class="search-autocomplete-group">';
            html += '<div class="search-autocomplete-group-title">Examples</div>';
            suggestions.examples.forEach(example => {
                html += this.renderExampleItem(example);
            });
            html += '</div>';
        }

        this.dropdown.innerHTML = html;
    }

    renderProblemItem(problem, query) {
        const highlightedName = this.highlightMatch(problem.name, query);

        return `
            <div class="search-autocomplete-item"
                 data-action="navigate"
                 data-category="${problem.category}"
                 data-filename="${problem.filename}">
                <div class="search-autocomplete-item-main">
                    <div class="search-autocomplete-item-title">
                        <span style="font-family: 'Monaco', 'Courier New', monospace;">#${problem.number}</span> ${highlightedName}
                    </div>
                    <div class="search-autocomplete-item-meta">
                        <span class="search-autocomplete-badge difficulty-${problem.difficulty}">${problem.difficulty}</span>
                        <span class="search-autocomplete-badge category">${problem.categoryName}</span>
                    </div>
                </div>
            </div>
        `;
    }

    renderFilterItem(filter) {
        return `
            <div class="search-autocomplete-item"
                 data-action="append"
                 data-text="${filter.name}=">
                <div class="search-autocomplete-item-main">
                    <div class="search-autocomplete-item-title" style="font-family: 'Monaco', 'Courier New', monospace;">
                        ${filter.name}=
                    </div>
                    <div class="search-autocomplete-item-meta" style="font-size: 0.85rem; color: var(--text-secondary);">
                        ${filter.description}
                    </div>
                </div>
            </div>
        `;
    }

    renderFilterValueItem(item) {
        return `
            <div class="search-autocomplete-item"
                 data-action="replace"
                 data-text="${item.fullText}">
                <div class="search-autocomplete-item-main">
                    <div class="search-autocomplete-item-title" style="font-family: 'Monaco', 'Courier New', monospace;">
                        ${item.key}=${item.value}
                    </div>
                </div>
            </div>
        `;
    }

    renderExampleItem(example) {
        return `
            <div class="search-autocomplete-item"
                 data-action="replace"
                 data-text="${example.text}">
                <div class="search-autocomplete-item-main">
                    <div class="search-autocomplete-item-title" style="font-family: 'Monaco', 'Courier New', monospace;">
                        ${example.text}
                    </div>
                    <div class="search-autocomplete-item-meta" style="font-size: 0.85rem; color: var(--text-secondary);">
                        ${example.description}
                    </div>
                </div>
            </div>
        `;
    }

    highlightMatch(text, query) {
        if (!query) return text;

        // Remove filter syntax from query for highlighting
        const cleanQuery = query.replace(/\w+=\w+/g, '').trim();
        if (!cleanQuery) return text;

        const regex = new RegExp(`(${cleanQuery})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    show() {
        this.dropdown.classList.add('show');
    }

    hide() {
        this.dropdown.classList.remove('show');
        this.selectedIndex = -1;
    }

    executeSearch(query) {
        // Navigate to search results page with query
        window.location.href = `/search?q=${encodeURIComponent(query)}`;
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchAutocomplete = document.getElementById('search-autocomplete');

    if (searchInput && searchAutocomplete) {
        const autocomplete = new SearchAutocomplete('search-input', 'search-autocomplete');

        // Handle item clicks
        searchAutocomplete.addEventListener('click', function(e) {
            const item = e.target.closest('.search-autocomplete-item');
            if (!item) return;

            const action = item.dataset.action;

            switch (action) {
                case 'navigate':
                    // Navigate to problem solution page
                    const category = item.dataset.category;
                    const filename = item.dataset.filename.replace('.py', '');
                    window.location.href = `/solution/${category}/${filename}`;
                    break;

                case 'append':
                    // Append text to search input
                    searchInput.value += item.dataset.text;
                    searchInput.focus();
                    autocomplete.search(searchInput.value);
                    break;

                case 'replace':
                    // Replace search input with text
                    searchInput.value = item.dataset.text;
                    searchInput.focus();
                    autocomplete.search(searchInput.value);
                    break;
            }
        });
    }
});
