# Adding Features

[← Previous: Static Files](05-static-files.md) | [🏠 Home](README.md) | [Next: Testing Procedures →](07-testing-procedures.md)

---

## Table of Contents

- [Overview](#overview)
- [Feature Planning](#feature-planning)
- [Backend Development](#backend-development)
- [Frontend Development](#frontend-development)
- [Testing New Features](#testing-new-features)
- [Documentation](#documentation)
- [Code Review Process](#code-review-process)
- [Deployment](#deployment)

## Overview

This guide walks through adding new features to the LeetCode Learning Tool, from planning to deployment. Follow these guidelines to ensure consistent, high-quality contributions.

## Feature Development Workflow

### 1. Planning Phase

**Before writing code**:

1. **Define the feature clearly**
   - What problem does it solve?
   - Who will use it?
   - How does it fit into existing functionality?

2. **Design the interface**
   - What routes are needed?
   - What templates will display it?
   - What data structures are required?

3. **Check existing code**
   - Can existing functions be reused?
   - Will this break existing features?
   - Are there similar features to learn from?

4. **Plan the implementation**
   - List the files that need changes
   - Identify dependencies
   - Estimate complexity

### 2. Implementation Phase

**Step-by-step process**:

1. **Create feature branch** (if using git)
   ```bash
   git checkout -b feature/new-feature-name
   ```

2. **Backend changes** (`app.py`, data models)
3. **Frontend changes** (templates, static files)
4. **Documentation updates**
5. **Testing**
6. **Code review and refinement**

### 3. Testing Phase

**Required tests**:

1. **Syntax check**: Python and JavaScript
2. **Type checking**: `mypy --strict`
3. **Linting**: `ruff check`
4. **Formatting**: `ruff format --check`
5. **Manual testing**: All workflows
6. **Edge cases**: Error handling
7. **Browser testing**: Chrome, Firefox, Safari

### 4. Documentation Phase

**Update documentation**:

1. **Code comments**: Docstrings for all functions
2. **User guide**: If user-facing
3. **Developer guide**: If developer-facing
4. **README**: If changes project structure
5. **CHANGELOG**: Record the change

## Example: Adding a Search Feature

### Step 1: Define Requirements

**Feature**: Global search across all solutions

**Requirements**:
- Search by problem name or number
- Filter results by category
- Display results with highlighting
- Support autocomplete

### Step 2: Design Routes

**New routes needed**:
```python
@app.route("/search")
def search():
    """Search page with form."""

@app.route("/api/search")
def api_search():
    """API endpoint for search results (JSON)."""
```

### Step 3: Implement Backend

**Add route handler in `app.py`**:

```python
@app.route("/search")
def search() -> str:
    """Search page."""
    query = request.args.get("q", "")
    category_filter = request.args.get("category")

    if not query:
        return render_template("search.html", results=None, query="")

    # Get all solutions
    categories = category_manager.get_categories()
    results = []

    for category in categories:
        # Skip if category filter active
        if category_filter and category.slug != category_filter:
            continue

        for solution in category.solutions:
            # Match on number or name
            if (query.lower() in solution.name.lower() or
                query in solution.number):
                results.append({
                    "category": category.slug,
                    "category_name": category.name,
                    "solution": solution
                })

    return render_template(
        "search.html",
        results=results,
        query=query,
        total_results=len(results)
    )


@app.route("/api/search")
def api_search() -> Response:
    """API endpoint for autocomplete."""
    query = request.args.get("q", "")

    if len(query) < 2:
        return jsonify([])

    categories = category_manager.get_categories()
    suggestions = []

    for category in categories:
        for solution in category.solutions:
            if (query.lower() in solution.name.lower() or
                query in solution.number):
                suggestions.append({
                    "number": solution.number,
                    "name": solution.name,
                    "category": category.slug,
                    "url": url_for("solution_view",
                                  category=category.slug,
                                  filename=solution.filename.replace(".py", ""))
                })

                if len(suggestions) >= 10:
                    break
        if len(suggestions) >= 10:
            break

    return jsonify(suggestions)
```

### Step 4: Create Template

**Create `templates/search.html`**:

```jinja2
{% extends "base.html" %}

{% block title %}Search Solutions{% endblock %}

{% block content %}
<div class="search-page">
    <h1>Search Solutions</h1>

    <form action="{{ url_for('search') }}" method="get" class="search-form">
        <input type="text"
               name="q"
               value="{{ query }}"
               placeholder="Search by number or name..."
               autocomplete="off"
               id="search-input">
        <button type="submit">Search</button>
    </form>

    {% if results is not none %}
        {% if results %}
            <div class="search-results">
                <p>Found {{ total_results }} result(s) for "{{ query }}"</p>

                {% for result in results %}
                <div class="result-card">
                    <span class="badge">{{ result.category_name }}</span>
                    <a href="{{ url_for('solution_view',
                                       category=result.category,
                                       filename=result.solution.filename.replace('.py', '')) }}">
                        {{ result.solution.number }}. {{ result.solution.name }}
                    </a>
                    <span class="difficulty {{ result.solution.difficulty.lower() }}">
                        {{ result.solution.difficulty }}
                    </span>
                </div>
                {% endfor %}
            </div>
        {% else %}
            <p>No results found for "{{ query }}"</p>
        {% endif %}
    {% endif %}
</div>

<!-- Autocomplete suggestions -->
<div id="autocomplete-suggestions"></div>
{% endblock %}

{% block extra_js %}
<script>
    const searchInput = document.getElementById('search-input');
    const suggestionsDiv = document.getElementById('autocomplete-suggestions');

    searchInput.addEventListener('input', async (e) => {
        const query = e.target.value;

        if (query.length < 2) {
            suggestionsDiv.innerHTML = '';
            return;
        }

        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const suggestions = await response.json();

        if (suggestions.length > 0) {
            suggestionsDiv.innerHTML = suggestions.map(s =>
                `<div class="suggestion" onclick="window.location.href='${s.url}'">
                    ${s.number}. ${s.name}
                </div>`
            ).join('');
        } else {
            suggestionsDiv.innerHTML = '';
        }
    });

    // Hide suggestions on outside click
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target)) {
            suggestionsDiv.innerHTML = '';
        }
    });
</script>
{% endblock %}
```

### Step 5: Add Styling

**Add to `static/css/style.css`**:

```css
.search-form {
    display: flex;
    gap: 10px;
    margin: 20px 0;
}

.search-form input {
    flex: 1;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
}

.search-form button {
    padding: 12px 24px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.result-card {
    padding: 15px;
    margin: 10px 0;
    border: 1px solid #ddd;
    border-radius: 4px;
    display: flex;
    align-items: center;
    gap: 10px;
}

.result-card a {
    flex: 1;
    text-decoration: none;
    color: #333;
    font-weight: 500;
}

#autocomplete-suggestions {
    position: absolute;
    background: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    max-height: 300px;
    overflow-y: auto;
    width: calc(100% - 40px);
    z-index: 1000;
}

.suggestion {
    padding: 10px;
    cursor: pointer;
    border-bottom: 1px solid #f0f0f0;
}

.suggestion:hover {
    background: #f5f5f5;
}
```

### Step 6: Add Navigation Link

**Update `templates/base.html`**:

```jinja2
<nav>
    <a href="{{ url_for('index') }}">Home</a>
    <a href="{{ url_for('search') }}">Search</a>  <!-- NEW -->
    <a href="{{ url_for('docs_index') }}">Docs</a>
</nav>
```

### Step 7: Test

```bash
# Start development server
pdm run python -m src.leet_code.app

# Test searches:
# - "two sum"
# - "001"
# - "array"
# - Edge cases: empty query, special characters
```

### Step 8: Document

**Update user guide** (`docs/user-guide/03-browsing-solutions.md`):

```markdown
### Using Search

The global search feature allows you to find solutions quickly:

1. Click "Search" in the navigation
2. Enter problem name or number
3. Select from autocomplete suggestions
4. Or press Enter to see full results

**Search Tips**:
- Enter at least 2 characters for autocomplete
- Searches are case-insensitive
- Numbers match exactly (e.g., "001" finds "001. Two Sum")
```

## Common Feature Patterns

### Adding a New View

**Pattern**:
```python
@app.route("/new-view")
@app.route("/new-view/<parameter>")
def new_view(parameter: str | None = None) -> str:
    """Description of what this view does."""
    # 1. Get request parameters
    param = request.args.get("param")

    # 2. Fetch data
    data = category_manager.get_something()

    # 3. Process data
    processed = process_data(data)

    # 4. Render template
    return render_template(
        "new_template.html",
        data=processed,
        param=param
    )
```

### Adding an API Endpoint

**Pattern**:
```python
@app.route("/api/resource")
@app.route("/api/resource/<id>")
def api_resource(id: str | None = None) -> Response:
    """API endpoint for resource data."""
    # 1. Validate input
    if id and not validate_id(id):
        return jsonify({"error": "Invalid ID"}), 400

    # 2. Fetch data
    data = get_resource_data(id)

    # 3. Check if found
    if not data:
        return jsonify({"error": "Not found"}), 404

    # 4. Return JSON
    return jsonify(data)
```

### Adding Data Processing

**Pattern**:
```python
def process_solutions(solutions: list[Solution]) -> dict[str, list[Solution]]:
    """Group solutions by some criteria.

    Args:
        solutions: List of Solution objects

    Returns:
        Dictionary mapping criteria to solution lists
    """
    grouped: dict[str, list[Solution]] = {}

    for solution in solutions:
        key = get_grouping_key(solution)
        if key not in grouped:
            grouped[key] = []
        grouped[key].append(solution)

    return grouped
```

## Best Practices

### Code Style

1. **Follow PEP 8**: Python style guide
2. **Type hints**: Use for all function signatures
3. **Docstrings**: Document all public functions
4. **Naming**: Descriptive variable and function names
5. **DRY**: Don't Repeat Yourself - extract common code

### Error Handling

```python
@app.route("/solution/<category>/<filename>")
def solution_view(category: str, filename: str) -> str:
    """View a specific solution."""
    # Validate input
    if not category or not filename:
        abort(400)  # Bad request

    # Try to fetch data
    solution = category_manager.get_solution(category, filename)
    if not solution:
        abort(404)  # Not found

    # Process data with error handling
    try:
        code = process_solution(solution)
    except Exception as e:
        app.logger.error(f"Error processing solution: {e}")
        abort(500)  # Internal server error

    return render_template("solution.html", code=code)
```

### Performance

1. **Cache expensive operations**: Use `@lru_cache` decorator
2. **Minimize database queries**: Fetch data once
3. **Lazy loading**: Only load data when needed
4. **Pagination**: For large result sets
5. **Efficient algorithms**: Use appropriate data structures

```python
from functools import lru_cache

@lru_cache(maxsize=128)
def expensive_operation(param: str) -> dict:
    """Cached expensive operation."""
    # This result is cached for repeated calls
    return perform_expensive_calculation(param)
```

### Security

1. **Validate input**: Never trust user input
2. **Escape output**: Prevent XSS attacks
3. **Use CSRF protection**: For forms
4. **Sanitize file paths**: Prevent directory traversal
5. **Rate limiting**: Prevent abuse

```python
# Input validation
if not re.match(r'^[a-z0-9-]+$', category):
    abort(400)  # Invalid category format

# Path sanitization
safe_path = Path(category).resolve()
if not str(safe_path).startswith(str(base_path)):
    abort(403)  # Forbidden - path traversal attempt
```

## Testing Your Feature

### Manual Testing Checklist

- [ ] Feature works as expected
- [ ] All edge cases handled
- [ ] No console errors
- [ ] No Python exceptions
- [ ] Responsive on mobile
- [ ] Works in different browsers
- [ ] Error messages are clear
- [ ] Navigation works correctly
- [ ] Data persists correctly
- [ ] Performance is acceptable

### Automated Testing

```python
# tests/test_search.py
import pytest
from src.leet_code.app import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_search_empty_query(client):
    """Test search with no query."""
    rv = client.get('/search')
    assert rv.status_code == 200
    assert b'Search Solutions' in rv.data

def test_search_with_query(client):
    """Test search with valid query."""
    rv = client.get('/search?q=two+sum')
    assert rv.status_code == 200
    assert b'Two Sum' in rv.data

def test_api_search(client):
    """Test search API endpoint."""
    rv = client.get('/api/search?q=two')
    assert rv.status_code == 200
    data = rv.get_json()
    assert isinstance(data, list)
```

## Deployment

### Pre-Deployment Checklist

- [ ] All tests pass
- [ ] Code reviewed
- [ ] Documentation updated
- [ ] CHANGELOG updated
- [ ] Dependencies documented
- [ ] Environment variables set
- [ ] Database migrations (if applicable)
- [ ] Backup created

### Deployment Steps

1. **Commit changes**:
   ```bash
   git add .
   git commit -m "[feature] Add search functionality"
   ```

2. **Push to repository**:
   ```bash
   git push origin feature/search
   ```

3. **Create pull request** (if using GitHub)

4. **Deploy to production**:
   ```bash
   # Pull latest code
   git pull origin main

   # Install dependencies
   pdm install --prod

   # Restart application
   systemctl restart leet-code.service
   ```

---

[← Previous: Static Files](05-static-files.md) | [🏠 Home](README.md) | [Next: Testing Procedures →](07-testing-procedures.md)
