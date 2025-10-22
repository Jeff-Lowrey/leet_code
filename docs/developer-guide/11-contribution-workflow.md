# Contribution Workflow

[← Previous: Testing Languages](10-testing-languages.md) | [🏠 Home](README.md)

---

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
- [Branch Strategy](#branch-strategy)
- [Development Workflow](#development-workflow)
- [Pull Request Process](#pull-request-process)
- [Code Review Guidelines](#code-review-guidelines)
- [Merge Criteria](#merge-criteria)
- [Language-Specific Contributions](#language-specific-contributions)
- [Documentation Contributions](#documentation-contributions)
- [Issue Management](#issue-management)

## Overview

This guide outlines the contribution workflow for the LeetCode Learning Tool, with specific guidance for language-specific features and documentation improvements.

**Contribution Types:**
- **Solutions:** Adding new problem solutions
- **Languages:** Adding support for new programming languages
- **Features:** Implementing new functionality
- **Bug Fixes:** Resolving issues and errors
- **Documentation:** Improving guides and references
- **Tests:** Adding or improving test coverage

**Core Principles:**
- Quality over quantity
- Clear communication
- Comprehensive testing
- Thorough documentation
- Respectful collaboration

## Getting Started

### Prerequisites

**Required:**
- Python 3.13+
- PDM package manager
- Git
- GitHub account

**For Language Contributions:**
- Compiler/interpreter for target language
- Language-specific linters and formatters
- Understanding of language idioms and conventions

### Fork and Clone

1. **Fork the repository:**
   - Navigate to repository on GitHub
   - Click "Fork" button
   - Select your account

2. **Clone your fork:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/leet_code.git
   cd leet_code
   ```

3. **Add upstream remote:**
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/leet_code.git
   ```

4. **Install dependencies:**
   ```bash
   pdm install
   source .venv/bin/activate  # Linux/macOS
   # or
   .venv\Scripts\activate  # Windows
   ```

### Environment Setup

```bash
# Verify installation
python --version  # Should be 3.13+
pdm --version

# Run application
pdm run python -m src.leet_code.app

# Run tests
pytest

# Run type checking
mypy src/

# Run linting
ruff check src/
```

## Branch Strategy

### Branch Naming Convention

**Format:** `type/short-description`

**Types:**
- `feature/` - New features or enhancements
- `bugfix/` - Bug fixes
- `docs/` - Documentation changes
- `lang/` - Language support additions
- `refactor/` - Code refactoring
- `test/` - Test additions or improvements

**Examples:**
```bash
feature/add-search-filter
bugfix/fix-upload-validation
docs/update-user-guide
lang/add-kotlin-support
refactor/simplify-category-manager
test/add-integration-tests
```

### Branch Lifecycle

```
main (protected)
  ↓
  ├─ feature/new-feature
  ├─ bugfix/fix-issue
  ├─ lang/add-language
  └─ docs/update-docs
```

**Rules:**
- Never commit directly to `main`
- Create new branch for each contribution
- Keep branches focused on single purpose
- Delete branches after merge

### Creating a Branch

```bash
# Sync with upstream
git fetch upstream
git checkout main
git merge upstream/main

# Create feature branch
git checkout -b feature/your-feature-name

# Or for language support
git checkout -b lang/add-ruby-support
```

## Development Workflow

### Standard Workflow

**1. Create branch:**
```bash
git checkout -b feature/your-feature
```

**2. Make changes:**
- Implement feature/fix
- Follow code style guidelines
- Add tests
- Update documentation

**3. Test changes:**
```bash
# Run tests
pytest

# Type checking
mypy src/

# Linting
ruff check src/

# Manual testing
python -m src.leet_code.app
```

**4. Commit changes:**
```bash
git add <files>
git commit -m "[semver][component] Description"
```

**Commit Message Format:**
```
[semver][component] Short description

Longer explanation if needed:
- What was changed
- Why it was changed
- Any breaking changes or notes
```

**Semver Options:**
- `[patch]` - Bug fixes, documentation, minor changes
- `[minor]` - New features, backwards compatible
- `[major]` - Breaking changes

**Component Examples:**
- `[app]` - Main Flask application
- `[data]` - CategoryManager or data handling
- `[docs]` - Documentation
- `[tests]` - Test files
- `[lang]` - Language support
- `[templates]` - Template files

**Example Commits:**
```bash
git commit -m "[patch][app] Fix file upload validation error"
git commit -m "[minor][lang] Add Ruby language support"
git commit -m "[patch][docs] Update user guide navigation"
git commit -m "[minor][feature] Add complexity filter to search"
```

**5. Push changes:**
```bash
git push origin feature/your-feature
```

**6. Create Pull Request** (see [Pull Request Process](#pull-request-process))

### Syncing with Upstream

**Before starting new work:**
```bash
git checkout main
git fetch upstream
git merge upstream/main
git push origin main
```

**While working on branch:**
```bash
# Fetch upstream changes
git fetch upstream

# Rebase your branch (preferred)
git rebase upstream/main

# Or merge upstream/main
git merge upstream/main

# Resolve conflicts if any
# Push updated branch
git push origin feature/your-feature --force-with-lease
```

## Pull Request Process

### Creating a Pull Request

1. **Push your branch:**
   ```bash
   git push origin feature/your-feature
   ```

2. **Open PR on GitHub:**
   - Navigate to repository
   - Click "Pull requests" → "New pull request"
   - Select your branch
   - Fill out PR template

3. **PR Title Format:**
   ```
   [Type] Short description
   ```

   Examples:
   - `[Feature] Add search filtering by complexity`
   - `[Bug Fix] Resolve upload validation error`
   - `[Language] Add Kotlin language support`
   - `[Docs] Update developer guide`

4. **PR Description Template:**

```markdown
## Summary
Brief description of changes (2-3 sentences)

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Language support
- [ ] Documentation
- [ ] Refactoring
- [ ] Tests

## Related Issue
Closes #<issue-number>

## Changes Made
- Bullet list of specific changes
- Each change on new line
- Be specific and clear

## Testing Performed
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing completed
- [ ] All tests pass
- [ ] Type checking passes (mypy)
- [ ] Linting passes (ruff)

## For Language Additions Only
- [ ] Language configuration added to app.py
- [ ] Solution template created
- [ ] Formatting guide created
- [ ] Example solution created
- [ ] All language tests pass
- [ ] Documentation updated

## Screenshots (if applicable)
[Add screenshots showing UI changes]

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] Tests added/updated
- [ ] All tests pass
- [ ] No breaking changes (or documented if necessary)

## Additional Notes
Any additional context or notes for reviewers
```

### PR Best Practices

**Do:**
- ✅ Keep PRs focused and small
- ✅ Write clear, descriptive titles
- ✅ Provide comprehensive description
- ✅ Include tests for new functionality
- ✅ Update documentation
- ✅ Respond promptly to review feedback
- ✅ Resolve conflicts before review
- ✅ Add screenshots for UI changes

**Don't:**
- ❌ Mix unrelated changes
- ❌ Submit untested code
- ❌ Ignore review feedback
- ❌ Force push after review starts (without notice)
- ❌ Submit PRs with failing tests
- ❌ Leave TODO comments without issues

## Code Review Guidelines

### For Contributors

**Requesting Review:**
1. Ensure all tests pass
2. Complete self-review
3. Assign reviewers (if applicable)
4. Respond to automated checks

**Responding to Feedback:**
- Address all comments
- Ask questions if unclear
- Make requested changes
- Re-request review after updates
- Mark conversations as resolved

**Common Review Comments:**

**Code Quality:**
```python
# Reviewer: Consider using list comprehension
# Before:
result = []
for item in items:
    if item > 0:
        result.append(item * 2)

# After:
result = [item * 2 for item in items if item > 0]
```

**Type Hints:**
```python
# Reviewer: Add type hints
# Before:
def process_data(data):
    return data.upper()

# After:
def process_data(data: str) -> str:
    return data.upper()
```

**Documentation:**
```python
# Reviewer: Add docstring
# After:
def process_data(data: str) -> str:
    """
    Convert input string to uppercase.

    Args:
        data: Input string to process

    Returns:
        Uppercase version of input
    """
    return data.upper()
```

### For Reviewers

**Review Checklist:**

**Code Quality:**
- [ ] Code is readable and maintainable
- [ ] Follows project conventions
- [ ] No obvious bugs or issues
- [ ] Efficient algorithms used
- [ ] Error handling is appropriate
- [ ] Type hints are present and correct

**Testing:**
- [ ] Tests cover new functionality
- [ ] Edge cases are tested
- [ ] All tests pass
- [ ] No test coverage decrease

**Documentation:**
- [ ] Code is well-commented
- [ ] Public APIs are documented
- [ ] README updated if needed
- [ ] Guides updated if needed

**Language-Specific:**
- [ ] Template is syntactically correct
- [ ] Formatting guide is comprehensive
- [ ] Example solution works
- [ ] Language idioms are followed
- [ ] All language tests pass

**Review Guidelines:**
- Be respectful and constructive
- Explain reasoning for suggestions
- Distinguish between required and optional changes
- Approve if changes are minor
- Request changes if significant issues
- Test locally if complex changes

## Merge Criteria

### Requirements for Merge

**All PRs Must:**
1. ✅ Pass all automated tests
2. ✅ Pass type checking (mypy)
3. ✅ Pass linting (ruff)
4. ✅ Have approving review
5. ✅ Have up-to-date branch
6. ✅ Resolve all conversations
7. ✅ Have clear description
8. ✅ Follow commit conventions

**Language PRs Must Also:**
9. ✅ Include working template
10. ✅ Include formatting guide
11. ✅ Include example solution
12. ✅ Pass language-specific tests
13. ✅ Update all documentation

**Feature PRs Must Also:**
14. ✅ Include tests for new code
15. ✅ Update relevant documentation
16. ✅ Maintain backward compatibility (or document breaking changes)

### Merge Process

**When approved:**
1. Reviewer approves PR
2. All checks pass
3. Branch is up-to-date
4. Maintainer merges PR
5. Branch is automatically deleted

**Merge Strategy:**
- Use "Squash and merge" for feature branches
- Preserve individual commits for complex PRs
- Delete branch after merge

## Language-Specific Contributions

### Adding New Language Support

**Complete checklist for language additions:**

**Phase 1: Configuration (1-2 hours)**
- [ ] Research language conventions
- [ ] Check Pygments lexer availability
- [ ] Add to `LANGUAGE_MAP` in `app.py`
- [ ] Add to `SUPPORTED_LANGUAGES` list
- [ ] Update file extension mapping

**Phase 2: Template Creation (2-4 hours)**
- [ ] Create solution template
- [ ] Include all required sections
- [ ] Follow language conventions
- [ ] Test template compiles/runs
- [ ] Add template to templates directory

**Phase 3: Documentation (3-5 hours)**
- [ ] Create formatting guide
- [ ] Include complete examples
- [ ] Document language idioms
- [ ] Add common patterns
- [ ] Create validation checklist

**Phase 4: Example Implementation (1-2 hours)**
- [ ] Implement Two Sum solution
- [ ] Add comprehensive comments
- [ ] Include test cases
- [ ] Verify solution executes

**Phase 5: Testing (1-2 hours)**
- [ ] Unit tests for configuration
- [ ] Integration tests for upload
- [ ] Manual testing in browser
- [ ] Verify syntax highlighting
- [ ] Test all download formats

**Phase 6: Documentation Updates (1 hour)**
- [ ] Update upload guide README
- [ ] Update developer guide README
- [ ] Update user guide language section
- [ ] Add to template locations list

**Total Time Estimate:** 9-16 hours for complete language integration

### Creating Example Solutions

**Requirements:**
- Use latest language template
- Implement complete solution
- Include all required sections
- Add at least 3 test cases
- Verify solution executes
- Follow language conventions

**Example File Structure:**
```
solutions/
└── arrays-hashing/
    └── ruby/
        ├── 0001-two-sum.rb.rb
        ├── 0217-contains-duplicate.rb.rb
        └── 0242-valid-anagram.rb.rb
```

**Submission Process:**
1. Create solution in correct directory
2. Test solution executes
3. Verify formatting follows guide
4. Commit with proper message
5. Create PR with "Language" label

## Documentation Contributions

### Types of Documentation

**User Documentation:**
- User guide sections
- Upload guide sections
- Language selection guide
- Study strategies

**Developer Documentation:**
- Developer guide sections
- Template creation guide
- Architecture documentation
- Testing procedures

**Reference Documentation:**
- API documentation
- Configuration reference
- Formatting guidelines

### Documentation Standards

**Writing Style:**
- Clear and concise
- Active voice preferred
- Use examples liberally
- Include code snippets
- Provide context for decisions

**Formatting:**
- Use markdown
- Include table of contents
- Add navigation links
- Use code blocks with language tags
- Include diagrams where helpful

**Structure:**
```markdown
# Title

[Navigation links]

---

## Table of Contents
- [Section 1](#section-1)
- [Section 2](#section-2)

## Section 1
Content...

## Section 2
Content...

---

[Navigation links]
```

### Documentation Review

**Self-Review Checklist:**
- [ ] No spelling or grammar errors
- [ ] All links work correctly
- [ ] Code examples are accurate
- [ ] Navigation is consistent
- [ ] Screenshots are current (if applicable)
- [ ] Table of contents is complete

## Issue Management

### Creating Issues

**Issue Template:**
```markdown
## Description
Clear description of issue or feature request

## Type
- [ ] Bug
- [ ] Feature Request
- [ ] Documentation
- [ ] Question

## Steps to Reproduce (for bugs)
1. Step 1
2. Step 2
3. ...

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- OS: [e.g., macOS, Ubuntu]
- Python version: [e.g., 3.13]
- Browser: [e.g., Chrome, Firefox]

## Screenshots
[If applicable]

## Additional Context
Any other relevant information
```

### Working on Issues

**Claiming an Issue:**
1. Comment on issue expressing interest
2. Wait for assignment or approval
3. Create branch referencing issue
4. Link PR to issue when ready

**Branch Naming:**
```bash
# Use issue number
git checkout -b feature/42-add-search-filter

# PR will reference
Closes #42
```

### Issue Labels

**Common Labels:**
- `bug` - Something isn't working
- `feature` - New feature request
- `documentation` - Documentation improvements
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention needed
- `language-support` - Language-related
- `priority-high` - High priority
- `priority-medium` - Medium priority
- `priority-low` - Low priority

## Commit Message Guidelines

### Format

```
[semver][component] Short description (50 chars or less)

More detailed explanation if needed (wrap at 72 chars):
- What changed
- Why it changed
- Any breaking changes
- References to issues

Closes #123
```

### Examples

**Simple commits:**
```bash
[patch][app] Fix upload validation for file extensions
[patch][docs] Update user guide navigation links
[minor][lang] Add Ruby language support configuration
```

**Complex commits:**
```bash
[minor][feature] Add complexity-based search filtering

Implement new search filter allowing users to filter solutions
by time and space complexity:
- Add complexity filter UI to search page
- Update CategoryManager to support complexity queries
- Add tests for complexity filtering
- Update user guide with filter documentation

Closes #45
```

**Breaking changes:**
```bash
[major][api] Change solution data structure format

BREAKING CHANGE: Solution dataclass now uses separate fields
for time and space complexity instead of single complexity field.

Update any code that accesses solution.complexity to use
solution.time_complexity and solution.space_complexity instead.

Migration guide added to CHANGELOG.md

Closes #67
```

## Quality Standards

### Code Quality

**All code must:**
- Follow PEP 8 (Python code)
- Include type hints
- Have docstrings for public APIs
- Pass mypy type checking
- Pass ruff linting
- Have test coverage

**Language-specific code must:**
- Follow language conventions
- Use idiomatic patterns
- Include appropriate comments
- Have executable tests
- Be compatible with template

### Testing Requirements

**Required tests:**
- Unit tests for new functions/methods
- Integration tests for features
- Language tests for new languages
- Manual testing documentation

**Test coverage:**
- Maintain or improve coverage
- Cover edge cases
- Test error conditions
- Verify expected behavior

### Documentation Requirements

**All PRs should include:**
- Updated README if applicable
- Updated relevant guides
- Docstrings for new code
- Comments for complex logic
- Updated examples if needed

## Getting Help

### Resources

**Documentation:**
- [Developer Guide](README.md)
- [User Guide](../user-guide/README.md)
- [Upload Guide](../upload-guide/README.md)

**Support:**
- GitHub Issues - Bug reports and feature requests
- GitHub Discussions - Questions and general discussion
- Pull Request comments - Implementation questions

### Common Questions

**Q: How do I add a new language?**
A: See [Adding Language Support](09-adding-languages.md)

**Q: How do I format my solution?**
A: See language-specific formatting guide in `docs/upload-guide/05-formatting-guidelines/`

**Q: Why was my PR rejected?**
A: Check review comments for specific feedback. Common issues:
- Tests failing
- Code style violations
- Missing documentation
- Incomplete implementation

**Q: How long until my PR is reviewed?**
A: Usually within 3-5 business days. If urgent, add comment requesting review.

**Q: Can I work on multiple PRs simultaneously?**
A: Yes, but use separate branches for each PR.

---

[← Previous: Testing Languages](10-testing-languages.md) | [🏠 Home](README.md)
