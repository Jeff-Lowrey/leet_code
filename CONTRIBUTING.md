# Contributing to LeetCode Solutions

Thank you for your interest in contributing to this LeetCode solutions repository! This guide will help you understand how to add solutions, maintain code quality, and follow our project conventions.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Adding a New Solution](#adding-a-new-solution)
3. [Managing Dependencies](#managing-dependencies)
4. [Code Quality Standards](#code-quality-standards)
5. [Documentation Requirements](#documentation-requirements)
6. [Testing Guidelines](#testing-guidelines)
7. [Pull Request Process](#pull-request-process)
8. [Project Structure](#project-structure)
9. [Style Guidelines](#style-guidelines)
10. [Questions or Issues?](#questions-or-issues)

## Getting Started
[↑ Back to Table of Contents](#table-of-contents)

### Prerequisites

- **Python 3.11+** for Python solutions
- **Node.js 18+** for JavaScript solutions
- **Git** for version control
- **GitHub CLI (`gh`)** for forking and PR management (recommended)
- **PDM** for Python environment management (optional but recommended)

### Setting Up Your Development Environment

1. **Fork and clone the repository:**
   ```bash
   gh repo fork Jeff-Lowrey/leet_code --clone --remote
   cd leet_code
   ```
   This automatically:
   - Creates a fork under your GitHub account
   - Clones your fork to your local machine
   - Sets up `origin` (your fork) and `upstream` (original repo) remotes

2. **Create a new branch for your work:**
   ```bash
   git checkout -b solution/problem-name
   ```

3. **Set up Python environment (if using PDM):**
   ```bash
   pdm install
   source .venv/bin/activate
   ```

   Alternatively, use PDM's venv activate:
   ```bash
   eval "$(pdm venv activate)"
   ```

#### Alternative: Manual Setup (without GitHub CLI)

1. **Fork the repository:**
   - Navigate to https://github.com/Jeff-Lowrey/leet_code
   - Click the "Fork" button in the upper right
   - This creates a copy under your GitHub account

2. **Clone your fork:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/leet_code.git
   cd leet_code
   ```

3. **Add upstream remote:**
   ```bash
   git remote add upstream https://github.com/Jeff-Lowrey/leet_code.git
   ```

4. **Create a new branch for your work:**
   ```bash
   git checkout -b solution/problem-name
   ```

5. **Set up Python environment (if using PDM):**
   ```bash
   pdm install
   source .venv/bin/activate
   ```

   Alternatively, use PDM's venv activate:
   ```bash
   eval "$(pdm venv activate)"
   ```

### Keeping Your Fork Updated

Before starting work on a new solution, sync your fork with the upstream repository:

```bash
# Fetch upstream changes
git fetch upstream

# Switch to main branch
git checkout main

# Merge upstream changes
git merge upstream/main

# Push updates to your fork
git push origin main
```

## Adding a New Solution
[↑ Back to Table of Contents](#table-of-contents)

### Step 1: Choose the Problem Category

Solutions are organized by algorithm category. Place your solution in the appropriate directory:

```
docs/solutions/
├── array/
├── backtracking/
├── binary-search/
├── dynamic-programming/
├── graphs/
├── trees/
└── ... (other categories)
```

### Step 2: Use the Solution Template

**For Python solutions**, copy the template:
```bash
cp docs/solutions/templates/SOLUTION_TEMPLATE.py \
   docs/solutions/CATEGORY/NNN-problem-name.py
```

**For JavaScript solutions** (alternative implementations):
```bash
cp docs/solutions/templates/SOLUTION_TEMPLATE.js \
   docs/solutions/CATEGORY/alternatives/NNN-problem-name.js
```

### Step 3: Fill in the Template

Replace all placeholder text with actual content:

1. **Problem description** (top docstring)
2. **Example cases** with real input/output/explanation
3. **Solution explanation** sections:
   - INTUITION
   - APPROACH
   - WHY THIS WORKS
   - EXAMPLE WALKTHROUGH
   - TIME COMPLEXITY
   - SPACE COMPLEXITY
   - EDGE CASES

4. **Implementation** with proper type hints and comments
5. **Test cases** demonstrating correctness

### Step 4: File Naming Convention

Use the format: `NNN-problem-name.{py,js}`

- `NNN`: Three-digit LeetCode problem number (e.g., `001`, `042`, `297`)
- `problem-name`: Lowercase with hyphens (e.g., `two-sum`, `trapping-rain-water`)

**Examples:**
- `001-two-sum.py`
- `042-trapping-rain-water.py`
- `297-serialize-and-deserialize-binary-tree.py`

## Managing Dependencies
[↑ Back to Table of Contents](#table-of-contents)

**REQUIRED:** All dependencies must be tracked in the appropriate dependency file for reproducibility.

### Python Dependencies

If you add Python packages to your solution, update `pyproject.toml`:

```bash
# Using PDM (recommended)
pdm add package-name

# Or manually edit pyproject.toml and add to [project.dependencies]
```

**Example:**
```toml
[project]
dependencies = [
    "numpy>=1.24.0",
    "requests>=2.28.0",
]
```

### JavaScript Dependencies

If you add npm packages to your JavaScript solution, update `package.json`:

```bash
# Using npm
npm install --save package-name

# Using yarn
yarn add package-name

# Using pnpm
pnpm add package-name
```

**Important Notes:**
- Never commit `node_modules/` or `.venv/` directories
- Commit the lock files (`pdm.lock`, `package-lock.json`, `yarn.lock`, or `pnpm-lock.yaml`)
- Document why new dependencies are needed in your PR description

## Code Quality Standards
[↑ Back to Table of Contents](#table-of-contents)

### Python Requirements

1. **Type Hints**: All functions must have type annotations
   ```python
   def twoSum(self, nums: list[int], target: int) -> list[int]:
   ```

2. **Docstrings**: Include approach and complexity in function docstrings
   ```python
   """
   Approach: Hash Map for O(n) lookup
   Time Complexity: O(n)
   Space Complexity: O(n)
   """
   ```

3. **Linting**: Code must pass:
   - `mypy src/` (type checking)
   - `ruff check src/` (linting)

4. **Testing**: Include test cases that can be run with `pytest`

### JavaScript Requirements

1. **JSDoc Comments**: Use JSDoc for function documentation
   ```javascript
   /**
    * @param {number[]} nums
    * @param {number} target
    * @return {number[]}
    */
   ```

2. **Modern ES6+**: Use modern JavaScript features (const/let, arrow functions, etc.)

3. **Consistency**: Follow existing code style in the repository

## Documentation Requirements
[↑ Back to Table of Contents](#table-of-contents)

### Solution Documentation Structure

Each solution file must include:

1. **Header Section**
   - Difficulty level
   - Problem description
   - Constraints

2. **Example Section** (use HTML `<dl>` tags)
   ```html
   <dl class="example-details">
   <dt>Input:</dt>
   <dd>nums = [2,7,11,15], target = 9</dd>
   <dt>Output:</dt>
   <dd>[0,1]</dd>
   <dt>Explanation:</dt>
   <dd>Because nums[0] + nums[1] == 9, we return [0, 1]</dd>
   </dl>
   ```

3. **Solution Explanation** (in `<details>` block)
   - **INTUITION**: Key insight for the solution
   - **APPROACH**: Step-by-step methodology
   - **WHY THIS WORKS**: Reasoning behind the approach
   - **EXAMPLE WALKTHROUGH**: Trace through example
   - **TIME COMPLEXITY**: Big-O analysis
   - **SPACE COMPLEXITY**: Memory usage analysis
   - **EDGE CASES**: Special scenarios handled

4. **Implementation**
   - Clean, commented code
   - Optimal solution preferred
   - Alternative approaches welcome

5. **Test Cases**
   - Multiple test cases covering edge cases
   - Assert statements or test framework

### Example Section Guidelines

- **NO placeholders**: Replace `[input description]`, `[output description]`, `[explanation]` with actual content
- **Use actual examples**: From the LeetCode problem or create representative ones
- **Be specific**: Show concrete input/output values
- **Explain clearly**: Make explanations easy to understand

## Testing Guidelines
[↑ Back to Table of Contents](#table-of-contents)

### Running Tests

**Python:**
```bash
# Run all tests
pytest

# Run specific test
pytest docs/solutions/array/001-two-sum.py

# Run with coverage
pytest --cov=src tests/
```

**Type Checking:**
```bash
mypy src/
```

**Linting:**
```bash
ruff check src/
```

### Writing Test Cases

Include test cases directly in your solution file:

```python
def test_solution() -> None:
    """Test cases for Problem XXX."""
    solution = Solution()

    # Test case 1: Basic example
    assert solution.methodName([1, 2, 3], 5) == expected_output
    print("Test case 1 passed")

    # Test case 2: Edge case
    assert solution.methodName([], 0) == expected_edge_output
    print("Test case 2 passed")

    print("\nAll test cases passed!")

if __name__ == "__main__":
    test_solution()
```

## Pull Request Process
[↑ Back to Table of Contents](#table-of-contents)

### Before Submitting

1. **Ensure code quality:**
   - [ ] Code passes type checking (`mypy`)
   - [ ] Code passes linting (`ruff check`)
   - [ ] All test cases pass
   - [ ] No placeholder text remains

2. **Verify documentation:**
   - [ ] Problem description is complete
   - [ ] Examples have actual input/output/explanation
   - [ ] Solution explanation sections are filled in
   - [ ] Complexity analysis is accurate

3. **Commit message format:**
   ```
   [#issue][category] Brief description

   - Detail 1
   - Detail 2
   ```

   Example:
   ```
   [#2][docs] Add two-sum solution with complete documentation

   - Implement optimal hash map approach
   - Include comprehensive explanation
   - Add test cases covering edge cases
   ```

### Submitting Your PR

1. **Push your branch to your fork:**
   ```bash
   git push origin solution/problem-name
   ```

2. **Create Pull Request from your fork:**
   - Navigate to your fork on GitHub
   - Click "Compare & pull request" button
   - Ensure the base repository is `Jeff-Lowrey/leet_code` and base branch is `main`
   - Ensure the head repository is `YOUR_USERNAME/leet_code` and compare branch is your feature branch
   - Reference related issues in the description
   - Provide clear description of changes
   - Include test plan/verification steps

3. **PR Description Template:**
   ```markdown
   ## Summary
   Added solution for Problem XXX: [Problem Name]

   ## Changes
   - Implementation using [approach/algorithm]
   - Complete documentation with examples
   - Test cases covering edge cases

   ## Test Plan
   - [x] Ran test cases successfully
   - [x] Verified time/space complexity
   - [x] Checked code quality (mypy, ruff)
   ```

### Review Process

- Maintainers will review your code for correctness, style, and documentation
- Address any feedback or requested changes
- Once approved, your PR will be merged

## Project Structure
[↑ Back to Table of Contents](#table-of-contents)

```
leet_code/
├── docs/
│   ├── guides/              # User guides and documentation
│   │   ├── formatting/      # Formatting guidelines
│   │   ├── upload/          # Upload guides
│   │   └── user/            # User guides
│   └── solutions/           # All problem solutions
│       ├── templates/       # Solution templates
│       ├── array/           # Array problems
│       ├── backtracking/    # Backtracking problems
│       ├── binary-search/   # Binary search problems
│       └── .../             # Other categories
│           └── alternatives/ # JavaScript solutions
├── tests/                   # Formal test suite (if applicable)
├── .claude_functions/       # Claude-generated scripts and utilities
│   ├── scripts/            # Automation scripts
│   └── tmp/                # Temporary outputs
└── README.md               # Project overview
```

## Style Guidelines
[↑ Back to Table of Contents](#table-of-contents)

### Python Style

- **PEP 8 compliant**: Follow Python style guide
- **Type hints**: Use modern type hints (`list[int]` not `List[int]`)
- **Descriptive names**: Use clear variable and function names
- **Comments**: Explain complex logic, not obvious code
- **Docstrings**: Use for classes and non-trivial functions

### JavaScript Style

- **Consistent formatting**: Match existing code style
- **Modern syntax**: Use ES6+ features
- **JSDoc comments**: Document parameters and return types
- **Clear naming**: Use descriptive variable names

### Documentation Style

- **Markdown**: Use proper Markdown formatting
- **Headers**: Clear, hierarchical structure
- **Code blocks**: Use syntax highlighting (```python, ```javascript)
- **Links**: Make paths and references clickable
- **Examples**: Provide concrete, runnable examples

## Questions or Issues?
[↑ Back to Table of Contents](#table-of-contents)

- **Documentation**: Check the [User Guide](docs/guides/user/)
- **Formatting**: See [Formatting Guidelines](docs/guides/formatting/)
- **Issues**: Open a GitHub issue for bugs or questions
- **Discussions**: Use GitHub Discussions for general questions

---

Thank you for contributing to this project! Your solutions help others learn and grow as developers.
