// Sidebar and Table of Contents Module

// Toggle sidebar visibility
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
    document.body.classList.toggle('sidebar-open');
}

// Build expandable table of contents
function buildTableOfContents() {
    const nav = document.getElementById('sidebar-nav');
    if (!nav) return;

    // Get current page context
    const currentPath = window.location.pathname;

    // Check page type and build appropriate TOC
    if (currentPath === '/difficulty') {
        buildDifficultyTOC(nav);
    } else if (currentPath.startsWith('/difficulty/')) {
        // Virtual difficulty category page
        buildVirtualDifficultyTOC(nav);
    } else if (currentPath === '/complexity') {
        buildComplexityTOC(nav);
    } else if (currentPath.startsWith('/complexity/')) {
        // Virtual complexity category page
        buildVirtualComplexityTOC(nav);
    } else if (currentPath.startsWith('/docs/') && currentPath !== '/docs' && currentPath !== '/docs/') {
        buildDocumentationTOC(nav);
    } else if (currentPath === '/docs' || currentPath === '/docs/') {
        // Documentation overview page - show list of guides
        buildDocsOverviewTOC(nav);
    } else {
        // Default: category-based navigation
        buildCategoryTOC(nav, currentPath);
    }
}

// Build docs overview TOC - show available guides
async function buildDocsOverviewTOC(nav) {
    const docCards = document.querySelectorAll('.category-card-wrapper[data-category*="-doc"]');

    if (docCards.length === 0) {
        nav.innerHTML = '<p class="toc-empty">No documentation available</p>';
        return;
    }

    // Show loading state
    nav.innerHTML = '<p class="toc-loading">Loading documentation structure...</p>';

    const guides = [
        { slug: 'user-guide', title: 'User Guide' },
        { slug: 'developer-guide', title: 'Developer Guide' },
        { slug: 'upload-guide', title: 'Upload Guide' }
    ];

    let html = '<ul class="toc-list toc-docs-overview">';

    // Fetch each guide's structure
    for (const guide of guides) {
        try {
            const response = await fetch(`/docs/${guide.slug}`);
            const htmlText = await response.text();

            // Parse the HTML to extract TOC structure
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlText, 'text/html');
            const content = doc.querySelector('.doc-content');

            if (!content) continue;

            // Find the "Table of Contents" section
            const tocSection = Array.from(content.querySelectorAll('h2')).find(h =>
                h.textContent.toLowerCase().includes('table of contents')
            );

            if (!tocSection) continue;

            // Get the list following the TOC heading
            let tocList = tocSection.nextElementSibling;
            while (tocList && tocList.tagName !== 'OL' && tocList.tagName !== 'UL') {
                tocList = tocList.nextElementSibling;
            }

            if (!tocList) continue;

            // Build the guide section
            html += `
                <li class="toc-guide-section">
                    <div class="toc-guide-header" onclick="toggleGuideSection('${guide.slug}')">
                        <span class="toc-arrow" id="arrow-${guide.slug}">▶</span>
                        <a href="/docs/${guide.slug}" class="toc-guide-title">${guide.title}</a>
                    </div>
                    <ul class="toc-guide-pages" id="guide-${guide.slug}" style="display: none;">
            `;

            // Parse the TOC list items
            tocList.querySelectorAll('li').forEach(li => {
                const link = li.querySelector('a');
                if (link) {
                    const href = link.getAttribute('href');
                    const text = link.textContent;
                    const description = li.textContent.replace(text, '').replace(/^[\s\-–]+/, '').trim();

                    // Build full href
                    const fullHref = href.startsWith('/docs/') ? href : `/docs/${guide.slug}/${href}`;

                    html += `
                        <li class="toc-page-item">
                            <a href="${fullHref}" class="toc-link">
                                <strong>${text}</strong>
                                ${description ? '<br><span class="toc-desc">' + description + '</span>' : ''}
                            </a>
                        </li>
                    `;
                }
            });

            html += `
                    </ul>
                </li>
            `;

        } catch (error) {
            console.error(`Error loading ${guide.title}:`, error);
        }
    }

    html += '</ul>';
    nav.innerHTML = html;
}

// Toggle guide section in docs overview TOC
function toggleGuideSection(guideSlug) {
    const section = document.getElementById(`guide-${guideSlug}`);
    const arrow = document.getElementById(`arrow-${guideSlug}`);

    if (section.style.display === 'none') {
        section.style.display = 'block';
        arrow.style.transform = 'rotate(90deg)';
    } else {
        section.style.display = 'none';
        arrow.style.transform = 'rotate(0deg)';
    }
}

// Build category-based TOC (original behavior)
function buildCategoryTOC(nav, currentPath) {
    // Fetch all data in parallel
    Promise.all([
        fetch('/api/categories').then(r => r.json()),
        fetch('/api/stats/difficulty').then(r => r.json()),
        fetch('/api/stats/complexity').then(r => r.json())
    ])
        .then(([categories, difficultyStats, complexityStats]) => {
            let html = '';

            // Categories section (collapsible)
            html += `
                <div class="toc-section">
                    <div class="toc-section-header toc-section-toggle" onclick="toggleTOCSection('categories')">
                        <span class="toc-section-arrow" id="arrow-categories">▼</span>
                        <span>Categories</span>
                    </div>
                    <ul class="toc-list toc-section-content" id="section-categories" style="display: block;">
            `;

            categories.forEach(category => {
                const isActive = currentPath.includes(category.slug);
                html += `
                    <li class="toc-item ${isActive ? 'active' : ''}" data-category="${category.slug}">
                        <div class="toc-category" onclick="toggleCategory('${category.slug}')">
                            <span class="toc-arrow">▶</span>
                            <a href="/category/${category.slug}">${category.name}</a>
                            <span class="toc-count">${category.count}</span>
                        </div>
                        <ul class="toc-solutions" id="toc-${category.slug}" style="display: ${isActive ? 'block' : 'none'};">
                            <li class="loading">Loading...</li>
                        </ul>
                    </li>
                `;
            });

            html += `
                    </ul>
                </div>
            `;

            // By Difficulty section (collapsible)
            html += `
                <div class="toc-section">
                    <div class="toc-section-header toc-section-toggle" onclick="toggleTOCSection('difficulty')">
                        <span class="toc-section-arrow" id="arrow-difficulty">▼</span>
                        <span>By Difficulty</span>
                    </div>
                    <ul class="toc-list toc-section-content" id="section-difficulty" style="display: block;">
            `;
            const difficulties = [
                { level: 'easy', emoji: '🟢', label: 'Easy' },
                { level: 'medium', emoji: '🟡', label: 'Medium' },
                { level: 'hard', emoji: '🔴', label: 'Hard' }
            ];
            difficulties.forEach(diff => {
                const isActive = currentPath === `/difficulty/${diff.level}`;
                const count = difficultyStats[diff.level] || 0;
                html += `
                    <li class="toc-item ${isActive ? 'active' : ''}">
                        <a href="/difficulty/${diff.level}" class="toc-link">
                            ${diff.emoji} ${diff.label} <span class="toc-count">(${count})</span>
                        </a>
                    </li>
                `;
            });
            html += `
                    </ul>
                </div>
            `;

            // By Complexity section (collapsible)
            html += `
                <div class="toc-section">
                    <div class="toc-section-header toc-section-toggle" onclick="toggleTOCSection('complexity')">
                        <span class="toc-section-arrow" id="arrow-complexity">▼</span>
                        <span>By Complexity</span>
                    </div>
                    <ul class="toc-list toc-section-content" id="section-complexity" style="display: block;">
            `;
            const complexities = [
                { path: 'o1', label: 'O(1)', key: 'O(1)' },
                { path: 'ologn', label: 'O(log n)', key: 'O(log n)' },
                { path: 'on', label: 'O(n)', key: 'O(n)' },
                { path: 'on-log-n', label: 'O(n log n)', key: 'O(n log n)' },
                { path: 'on2', label: 'O(n²)', key: 'O(n²)' },
                { path: 'on3', label: 'O(n³)', key: 'O(n³)' },
                { path: 'o2n', label: 'O(2^n)', key: 'O(2^n)' }
            ];
            complexities.forEach(comp => {
                const isActive = currentPath === `/complexity/${comp.path}`;
                const count = complexityStats[comp.key] || 0;
                html += `
                    <li class="toc-item ${isActive ? 'active' : ''}">
                        <a href="/complexity/${comp.path}" class="toc-link">
                            ${comp.label} <span class="toc-count">(${count})</span>
                        </a>
                    </li>
                `;
            });
            html += `
                    </ul>
                </div>
            `;

            nav.innerHTML = html;

            // Load solutions for active category
            if (currentPath.includes('/category/')) {
                const categorySlug = currentPath.split('/category/')[1].split('/')[0];
                if (categorySlug) {
                    loadCategorySolutions(categorySlug);
                }
            }
        })
        .catch(error => {
            nav.innerHTML = '<p class="error">Failed to load navigation</p>';
        });
}

// Helper: Build TOC for virtual category pages
function buildVirtualTOC(nav, config) {
    const currentPath = window.location.pathname;

    let html = `<div class="toc-section-header">${config.header}</div>`;
    html += '<ul class="toc-list">';

    config.items.forEach(item => {
        const path = item.path || item;
        const isActive = currentPath === `/${config.basePath}/${path}`;
        const label = item.label || (typeof item === 'string' ? item : '');
        const icon = item.icon || '';

        html += `
            <li class="toc-item ${isActive ? 'active' : ''}">
                <a href="/${config.basePath}/${path}" class="toc-link">
                    ${icon} ${label}
                </a>
            </li>
        `;
    });

    html += '</ul>';
    html += '<div class="toc-divider"></div>';
    html += `<a href="/${config.basePath}" class="toc-back-link">← ${config.backText}</a>`;
    nav.innerHTML = html;
}

// Build TOC for virtual difficulty category pages
function buildVirtualDifficultyTOC(nav) {
    buildVirtualTOC(nav, {
        header: 'By Difficulty',
        basePath: 'difficulty',
        backText: 'All Difficulties Overview',
        items: [
            { path: 'easy', label: 'Easy', icon: '🟢' },
            { path: 'medium', label: 'Medium', icon: '🟡' },
            { path: 'hard', label: 'Hard', icon: '🔴' }
        ]
    });
}

// Build TOC for virtual complexity category pages
function buildVirtualComplexityTOC(nav) {
    buildVirtualTOC(nav, {
        header: 'By Complexity',
        basePath: 'complexity',
        backText: 'All Complexities Overview',
        items: [
            { path: 'o1', label: 'O(1) - Constant' },
            { path: 'ologn', label: 'O(log n) - Logarithmic' },
            { path: 'on', label: 'O(n) - Linear' },
            { path: 'on-log-n', label: 'O(n log n) - Linearithmic' },
            { path: 'on2', label: 'O(n²) - Quadratic' },
            { path: 'on3', label: 'O(n³) - Cubic' },
            { path: 'o2n', label: 'O(2^n) - Exponential' },
            { path: 'onm', label: 'O(n*m) - Polynomial' }
        ]
    });
}

// Helper: Build TOC from page sections
function buildSectionTOC(nav, sectionSelector) {
    const sections = document.querySelectorAll(sectionSelector);
    let html = '<ul class="toc-list">';

    sections.forEach(section => {
        const id = section.id;
        const heading = section.querySelector('h2');
        if (heading) {
            html += `
                <li class="toc-item">
                    <a href="#${id}" class="toc-link">${heading.textContent}</a>
                </li>
            `;
        }
    });

    html += '</ul>';
    nav.innerHTML = html;
}

// Build difficulty page TOC
function buildDifficultyTOC(nav) {
    buildSectionTOC(nav, '.difficulty-section');
}

// Build complexity page TOC
function buildComplexityTOC(nav) {
    buildSectionTOC(nav, '.complexity-section');
}

// Build documentation page TOC
function buildDocumentationTOC(nav) {
    const currentPath = window.location.pathname;
    const pathParts = currentPath.split('/');
    const category = pathParts[2]; // e.g., "user-guide"

    // Check if we're on a guide README or sub-page
    if (pathParts.length === 3 || (pathParts.length === 4 && !pathParts[3])) {
        // On main guide page - show full guide structure from README TOC
        buildGuideStructureTOC(nav, category);
    } else {
        // On a sub-page - still show full guide structure with current page highlighted
        buildGuideStructureTOC(nav, category, pathParts[3]);
    }
}

// Build guide structure TOC from README table of contents
function buildGuideStructureTOC(nav, category, currentPage) {
    const content = document.querySelector('.doc-content');
    if (!content) return;

    // Find the "Table of Contents" section
    const tocSection = Array.from(content.querySelectorAll('h2')).find(h =>
        h.textContent.toLowerCase().includes('table of contents')
    );

    if (!tocSection) {
        // Fallback to current page headings if no TOC found
        buildCurrentPageTOC(nav);
        return;
    }

    // Get the list following the TOC heading
    let tocList = tocSection.nextElementSibling;
    while (tocList && tocList.tagName !== 'OL' && tocList.tagName !== 'UL') {
        tocList = tocList.nextElementSibling;
    }

    if (!tocList) {
        buildCurrentPageTOC(nav);
        return;
    }

    let html = '<ul class="toc-list">';

    // Parse the TOC list items
    tocList.querySelectorAll('li').forEach(li => {
        const link = li.querySelector('a');
        if (link) {
            const href = link.getAttribute('href');
            const text = link.textContent;
            const description = li.textContent.replace(text, '').replace(/^[\s\-–]+/, '').trim();

            // Determine if this is the current page (strip .md for comparison)
            const pageNameWithoutExt = currentPage ? currentPage.replace('.md', '') : '';
            const hrefWithoutExt = href.replace('.md', '');
            const isActive = pageNameWithoutExt && hrefWithoutExt === pageNameWithoutExt;

            // Check if href already has the full path or is relative
            const fullHref = href.startsWith('/docs/') ? href : `/docs/${category}/${href}`;

            html += `
                <li class="toc-item ${isActive ? 'active' : ''}">
                    <a href="${fullHref}" class="toc-link">
                        <strong>${text}</strong>
                        ${description ? '<br><span class="toc-desc">' + description + '</span>' : ''}
                    </a>
                </li>
            `;
        }
    });

    html += '</ul>';
    nav.innerHTML = html;
}

// Fallback: Build TOC from current page headings
function buildCurrentPageTOC(nav) {
    const content = document.querySelector('.doc-content');
    const headings = content.querySelectorAll('h1, h2, h3');

    if (headings.length === 0) {
        nav.innerHTML = '<p class="toc-empty">No sections found</p>';
        return;
    }

    let html = '<ul class="toc-list">';

    headings.forEach((heading, index) => {
        const level = heading.tagName;
        const text = heading.textContent;
        const id = heading.id || `section-${index}`;

        if (!heading.id) {
            heading.id = id;
        }

        const className = level === 'H1' ? 'toc-h1' : level === 'H2' ? 'toc-h2' : 'toc-h3';

        html += `
            <li class="toc-item ${className}">
                <a href="#${id}" class="toc-link">${text}</a>
            </li>
        `;
    });

    html += '</ul>';
    nav.innerHTML = html;
}

// Toggle TOC section (Categories, By Difficulty, By Complexity)
function toggleTOCSection(sectionId) {
    const section = document.getElementById(`section-${sectionId}`);
    const arrow = document.getElementById(`arrow-${sectionId}`);

    if (section.style.display === 'none') {
        section.style.display = 'block';
        arrow.textContent = '▼';
    } else {
        section.style.display = 'none';
        arrow.textContent = '▶';
    }
}

// Toggle category expansion
function toggleCategory(slug) {
    const solutionsList = document.getElementById(`toc-${slug}`);
    const arrow = solutionsList.parentElement.querySelector('.toc-arrow');

    if (solutionsList.style.display === 'none') {
        solutionsList.style.display = 'block';
        arrow.style.transform = 'rotate(90deg)';
        loadCategorySolutions(slug);
    } else {
        solutionsList.style.display = 'none';
        arrow.style.transform = 'rotate(0deg)';
    }
}

// Load solutions for a category
function loadCategorySolutions(slug) {
    const solutionsList = document.getElementById(`toc-${slug}`);

    // Check if already loaded
    if (solutionsList.dataset.loaded === 'true') return;

    fetch(`/api/category/${slug}/solutions`)
        .then(response => response.json())
        .then(solutions => {
            let html = '';
            solutions.forEach(solution => {
                const cleanFilename = solution.filename.replace('.py', '');
                const currentSolution = window.location.pathname.includes(cleanFilename);
                html += `
                    <li class="${currentSolution ? 'active' : ''}">
                        <a href="/solution/${slug}/${cleanFilename}">
                            ${solution.number ? `#${solution.number} ` : ''}${solution.name}
                        </a>
                    </li>
                `;
            });
            solutionsList.innerHTML = html;
            solutionsList.dataset.loaded = 'true';
        })
        .catch(error => {
            solutionsList.innerHTML = '<li class="error">Failed to load solutions</li>';
        });
}
