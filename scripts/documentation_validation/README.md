# Documentation Validation Scripts

Automated documentation quality validation and fixing workflow for LeetCode solutions.

## Overview

This validation system uses the **src/ ProblemData parser** as the single source of truth. It extracts structured data from solution files and validates quality without manual regex parsing.

## Architecture

```
src/leet_code/markdown_extraction.py  → ProblemData (source of truth)
                                        ↓
validators/extractors.py              → extract_problem_data()
                                        ↓
fixer.py                               → Quality scoring & analysis
                                        ↓
validate.py                            → Batch processing & iteration
```

**Key Principle**: Zero manual extraction. All parsing done by production src/ code.

## Files

- **validate.py** - Main validation script (batch mode, auto mode, manual mode)
- **fixer.py** - Core quality analysis using ProblemData directly
- **injection.py** - Surgical section replacement (write operations)
- **validators/** - Validation modules
  - `extractors.py` - Wraps src/ parser to return ProblemData
  - `template_validator.py` - Validates ProblemData against template requirements
  - `models.py` - Minimal data models (mostly uses src/ ProblemData)

## Usage

### Check Progress Report
```bash
cd scripts/documentation_validation
python validate.py <category> --report
```

### Batch Mode (Recommended)
```bash
# 1. Analyze and present all issues
python validate.py backtracking --batch-mode

# 2. Claude creates fixes.json with all fixes

# 3. Apply all fixes
python validate.py backtracking --apply-fixes
```

### Auto Mode (Loops automatically)
```bash
python validate.py backtracking --auto --max-iterations 5
```

## Validation Logic

### Template Validation (Boolean checks on ProblemData)
```python
required_fields = {
    "METADATA": lambda pd: bool(pd.techniques or pd.data_structures),
    "INTUITION": lambda pd: bool(pd.intuition),
    "APPROACH": lambda pd: bool(pd.approach),
    # ... etc
}
```

### Quality Scoring (Simple string operations)
```python
# No regex - just Python string methods
if len(content) < 20:
    score -= 40

if "TODO" in content:
    score -= 30

if content.count("- ") < 2:
    score -= 15
```

## Why This Approach is Reliable

1. **Single Source of Truth**: src/ parser used by web app
2. **No Regex**: Simple string operations only
3. **No Manual Extraction**: Eliminated entire extraction layer
4. **Type Safety**: Structured ProblemData fields, not string hunting
5. **Fewer Layers**: File → extract_problem_data() → validate

## Temporary Files

Temporary files (backups, reports, fixes.json) are stored in:
```
.claude_functions/documentation_review/tmp/
```
(gitignored)

## Integration with Web App

The validation system uses the **exact same parser** as the web application:
- Both use `src/leet_code/markdown_extraction.py`
- Both work with `ProblemData` objects
- If it parses correctly here, it works in the web app

## Development Notes

- All validators work with ProblemData from src/ parser
- No DocumentationSection wrapper (removed for simplicity)
- Template files: `docs/developer-guide/templates/SOLUTION_TEMPLATE.*`
- Scoring is heuristic-based for speed (no LLM calls)
