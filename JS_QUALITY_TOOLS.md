# JavaScript Quality Tools

This project uses industry-standard tools to ensure JavaScript code quality.

## Tools Overview

| Tool | Purpose | Command |
|------|---------|---------|
| **ESLint** | Linting & Security | `npm run lint` |
| **Prettier** | Code Formatting | `npm run format` |
| **npm audit** | Dependency Security | `npm run security` |

## Quick Start

### Install Dependencies
```bash
npm install
```

### Run All Quality Checks
```bash
npm run quality
```

### Auto-Fix Issues
```bash
npm run quality:fix
```

## Individual Commands

### Linting (ESLint)
Checks for code quality issues, best practices, and security vulnerabilities.

```bash
# Check for issues
npm run lint

# Auto-fix issues
npm run lint:fix
```

**What it checks:**
- Unused variables
- Use of `var` instead of `const/let`
- Equality operators (`===` vs `==`)
- Security vulnerabilities (XSS, eval, regex DoS)
- JSDoc comment completeness
- Console statements (warns on `console.log`)

### Formatting (Prettier)
Enforces consistent code style.

```bash
# Check formatting
npm run format

# Auto-format files
npm run format:fix
```

**What it formats:**
- Indentation (2 spaces)
- Quotes (single quotes)
- Semicolons (required)
- Line length (100 characters)
- Trailing commas (ES5 compatible)

### Security (npm audit + ESLint Security)
Scans for security vulnerabilities.

```bash
# Check for vulnerabilities
npm run security

# Auto-fix dependency vulnerabilities
npm run security:fix
```

**What it checks:**
- Dependency vulnerabilities (npm audit)
- Unsafe code patterns (ESLint security plugin)
  - `eval()` usage
  - Regular expression DoS
  - Unsafe regular expressions
  - Command injection
  - XSS vulnerabilities

## Configuration Files

| File | Purpose |
|------|---------|
| `.eslintrc.json` | ESLint rules configuration |
| `.eslintignore` | Files to exclude from linting |
| `.prettierrc.json` | Prettier formatting rules |
| `.prettierignore` | Files to exclude from formatting |
| `package.json` | NPM scripts and dependencies |

## Ignored Files

The following are excluded from checks:
- `node_modules/`
- `venv/` and `.venv/` (Python virtual environments)
- `*.min.js` (minified files)
- `solutions/**/alternatives/*.js` (LeetCode solution files)

## ESLint Rules Highlights

- **Error**: Using `var` (use `const` or `let`)
- **Error**: Using `==` instead of `===`
- **Error**: Missing curly braces in control statements
- **Warn**: Unused variables (except those starting with `_`)
- **Warn**: Using `console.log` (use `console.error` or remove)
- **Warn**: Missing JSDoc comments on functions/classes

## Security Rules Highlights

ESLint Security plugin detects:
- ✅ Unsafe use of `eval()`
- ✅ Regular expression Denial of Service (ReDoS)
- ✅ Unsafe regular expressions
- ✅ Command injection vulnerabilities
- ✅ Potential XSS vulnerabilities
- ✅ Unsafe object access patterns

## Integration with Python Quality Tools

You can run both Python and JavaScript quality checks:

```bash
# Python
python -m mypy src/
python -m ruff check src/ tests/
python -m ruff format src/ tests/
python -m bandit -r src/ -ll

# JavaScript
npm run quality

# Or create a shell script to run both
```

## CI/CD Integration

Add to your CI/CD pipeline:

```yaml
# Example GitHub Actions
- name: Install Node.js dependencies
  run: npm ci

- name: Run JavaScript quality checks
  run: npm run quality
```

## Editor Integration

### VS Code
Install these extensions:
- **ESLint** (`dbaeumer.vscode-eslint`)
- **Prettier** (`esbenp.prettier-vscode`)

Add to `.vscode/settings.json`:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "eslint.validate": ["javascript"]
}
```

### Other Editors
- **Vim/Neovim**: Use ALE or coc.nvim
- **Sublime Text**: Install SublimeLinter-eslint
- **Atom**: Install linter-eslint and prettier-atom

## Troubleshooting

### npm install fails
Make sure you have Node.js installed:
```bash
node --version  # Should be v16+ or v18+
npm --version
```

### ESLint errors on valid code
Check if your code is using modern JavaScript features. The config is set to ES2021.

### Prettier conflicts with ESLint
The config uses `eslint-config-prettier` to disable conflicting rules. This should not happen.

## Contributing

Before committing JavaScript changes:
1. Run `npm run quality:fix`
2. Fix any remaining issues manually
3. Commit your changes

## Resources

- [ESLint Documentation](https://eslint.org/docs/latest/)
- [Prettier Documentation](https://prettier.io/docs/en/)
- [ESLint Security Plugin](https://github.com/eslint-community/eslint-plugin-security)
- [npm audit Documentation](https://docs.npmjs.com/cli/v10/commands/npm-audit)
