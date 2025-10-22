# Adding New Language Support

[← Previous: Template Creation](01-template-creation.md) | [🏠 Home](../README.md) | [Next: Formatting Guide Creation →](03-formatting-guide-creation.md)

---

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Step-by-Step Guide](#step-by-step-guide)
- [Configuration Requirements](#configuration-requirements)
- [Testing Integration](#testing-integration)
- [Documentation Updates](#documentation-updates)
- [Example: Adding Ruby Support](#example-adding-ruby-support)

## Overview

Adding support for a new programming language involves several steps across multiple files. This guide walks through the complete process.

**What You'll Need to Add:**
1. Language configuration in `app.py`
2. Solution template file
3. Formatting guide documentation
4. Example solution (recommended)
5. Upload guide updates
6. Testing validation

**Time Estimate:** 2-4 hours for complete integration

## Prerequisites

### Required Knowledge
- Python and Flask basics
- Target language syntax and conventions
- Markdown formatting
- Git workflow

### Required Tools
- Python 3.13+
- Target language compiler/interpreter
- Text editor
- Flask development server

### Files You'll Modify
- `src/leet_code/app.py` - Language configuration
- `docs/developer-guide/templates/` - New template
- `docs/upload-guide/05-formatting-guidelines/` - New guide
- `docs/upload-guide/README.md` - Documentation index

## Step-by-Step Guide

### Step 1: Update Language Configuration

**File:** `src/leet_code/app.py`

**Add to `LANGUAGE_MAP` dictionary:**
```python
LANGUAGE_MAP = {
    # Existing languages...
    'ruby': {
        'name': 'Ruby',
        'extension': '.rb',
        'pygments_lexer': 'ruby',
        'mime_type': 'text/x-ruby',
        'file_pattern': r'^[0-9]{4}-[\w-]+\.rb\.rb$',
        'comment_style': 'hash',  # or 'block' for =begin/=end
    },
    # More languages...
}
```

**Field Descriptions:**
- `name`: Display name in UI
- `extension`: File extension (e.g., `.rb`)
- `pygments_lexer`: Pygments lexer name for syntax highlighting
- `mime_type`: MIME type for file uploads
- `file_pattern`: Regex for filename validation (requires double extension)
- `comment_style`: For documentation parsing

**Add to `SUPPORTED_LANGUAGES` list:**
```python
SUPPORTED_LANGUAGES = [
    'python', 'javascript', 'typescript',
    'java', 'cpp', 'go', 'rust', 'ruby'  # Add your language
]
```

**Update `get_language_from_extension()` if needed:**
```python
def get_language_from_extension(filename: str) -> str:
    """Detect language from filename"""
    if filename.endswith('.rb.rb'):
        return 'ruby'
    # Existing mappings...
```

### Step 2: Create Solution Template

**File:** `docs/developer-guide/templates/SOLUTION_TEMPLATE.rb`

**Template Structure:**
```ruby
=begin
N. Problem Title
Difficulty: Easy|Medium|Hard

[Problem description]

**Example 1:**

<dl class="example-details">
<dt>Input:</dt>
<dd>input here</dd>
<dt>Output:</dt>
<dd>output here</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### METADATA:
**Techniques**: [Techniques]
**Data Structures**: [Data structures]
**Patterns**: [Patterns]
**Time Complexity**: **O(?)** - [Explanation]
**Space Complexity**: **O(?)** - [Explanation]

### INTUITION:
[Explanation]

### APPROACH:
[Step-by-step approach]

### TIME COMPLEXITY:
**O(?)** - [Explanation]

### SPACE COMPLEXITY:
**O(?)** - [Explanation]

### EDGE CASES:
- **Case 1:** Description
- **Case 2:** Description

</details>
=end

class Solution
  # @param {Integer[]} nums
  # @param {Integer} target
  # @return {Integer[]}
  #
  # Approach: [Approach name]
  # Time Complexity: O(?)
  # Space Complexity: O(?)
  def two_sum(nums, target)
    # Implementation
  end
end

# Test cases
if __FILE__ == $0
  solution = Solution.new

  # Test 1
  nums = [2, 7, 11, 15]
  target = 9
  puts "Test 1: #{solution.two_sum(nums, target)}"
  puts "Expected: [0, 1]"
end
```

**Key Template Elements:**
1. Problem description in block comment
2. HTML-formatted examples
3. Collapsible solution explanation
4. Metadata section
5. Documented solution class
6. Test cases

See [Template Creation Guidelines](08-template-creation.md) for detailed requirements.

### Step 3: Create Formatting Guide

**File:** `docs/upload-guide/05-formatting-guidelines/SOLUTION_FORMATTING_GUIDE_RUBY.md`

**Guide Structure:**
```markdown
# Ruby Solution Formatting Guide

## Overview
This guide covers Ruby-specific formatting requirements...

## Template Structure
[Describe template sections]

## Documentation Format
### Block Comments
[Explain =begin/=end usage]

### Method Documentation
[Show @param, @return syntax]

## Code Conventions
### Naming
- Classes: PascalCase
- Methods: snake_case
- Constants: SCREAMING_SNAKE_CASE

### Ruby Idioms
[Show Ruby-specific patterns]

## Test Cases
[Test structure and expectations]

## Complete Example
[Full Two Sum solution]

## Common Patterns
[Ruby-specific solutions to common problems]

## Validation Checklist
- [ ] Block comment with problem description
- [ ] HTML example formatting
- [ ] Solution explanation in <details>
- [ ] Metadata section complete
- [ ] Test cases included
```

See [Formatting Guide Creation](10-formatting-guide-creation.md) for complete guide template.

### Step 4: Create Example Solution

**File:** `solutions/arrays-hashing/ruby/0001-two-sum.rb.rb`

Create a complete, working example using your new template. This serves as:
- Reference implementation for contributors
- Test case for language integration
- Documentation example

**Recommended problem:** Two Sum (Easy, well-understood, demonstrates basic patterns)

### Step 5: Update Documentation

**Update `docs/upload-guide/README.md`:**

Add to Table of Contents:
```markdown
13. [Ruby Formatting Guide](05-formatting-guidelines/SOLUTION_FORMATTING_GUIDE_RUBY.md)
```

Add to Quick Navigation:
```markdown
- Ruby: [Template](02-template-files.md#ruby-template) → [Formatting Guide](05-formatting-guidelines/SOLUTION_FORMATTING_GUIDE_RUBY.md)
```

Add to Template Locations:
```markdown
- [Ruby - `SOLUTION_TEMPLATE.rb`](../developer-guide/templates/SOLUTION_TEMPLATE.rb)
```

**Update `docs/upload-guide/02-template-files.md`:**

Add Ruby template section with full template content and usage examples.

**Update `docs/user-guide/09-language-selection.md`:**

Add Ruby to supported languages table and language characteristics section.

### Step 6: Update Developer Guide

**Update `docs/developer-guide/README.md`:**

Update "Project Statistics" or "Technology Stack" to include Ruby support.

Add to solution template list.

## Configuration Requirements

### Pygments Lexer Verification

Verify the lexer exists and works:
```python
from pygments.lexers import get_lexer_by_name

try:
    lexer = get_lexer_by_name('ruby')
    print(f"✓ Lexer found: {lexer.name}")
except:
    print("✗ Lexer not found")
```

**Common Lexer Names:**
- Python: `python`, `python3`
- JavaScript: `javascript`, `js`
- Java: `java`
- C++: `cpp`, `c++`
- Go: `go`
- Rust: `rust`
- Ruby: `ruby`
- PHP: `php`
- Swift: `swift`
- Kotlin: `kotlin`

Full list: https://pygments.org/docs/lexers/

### File Pattern Design

Pattern must match the double-extension format:

```python
# Pattern components:
# ^           - Start of string
# [0-9]{4}    - Exactly 4 digits (problem number)
# -           - Literal hyphen
# [\w-]+      - One or more word chars or hyphens (problem name)
# \.ext       - Literal dot + extension
# \.ext       - Literal dot + extension (repeated)
# $           - End of string

r'^[0-9]{4}-[\w-]+\.rb\.rb$'
```

**Test your pattern:**
```python
import re

pattern = r'^[0-9]{4}-[\w-]+\.rb\.rb$'
test_files = [
    '0001-two-sum.rb.rb',      # ✓ Valid
    '217-contains-duplicate.rb.rb',  # ✓ Valid
    'two-sum.rb',              # ✗ Missing number
    '0001-two-sum.rb',         # ✗ Single extension
    '1-two-sum.rb.rb',         # ✗ Not 4 digits
]

for filename in test_files:
    match = re.match(pattern, filename)
    print(f"{filename}: {'✓' if match else '✗'}")
```

### MIME Type Selection

Common MIME types:
- `text/x-python` - Python
- `text/javascript` - JavaScript
- `text/x-java` - Java
- `text/x-c++src` - C++
- `text/x-go` - Go
- `text/x-rust` - Rust
- `text/x-ruby` - Ruby
- `text/x-php` - PHP
- `text/x-swift` - Swift

## Testing Integration

### Unit Tests

**Test file:** `tests/test_language_support.py`

```python
def test_ruby_language_config():
    """Test Ruby language configuration"""
    from src.leet_code.app import LANGUAGE_MAP

    assert 'ruby' in LANGUAGE_MAP
    assert LANGUAGE_MAP['ruby']['extension'] == '.rb'
    assert LANGUAGE_MAP['ruby']['name'] == 'Ruby'

def test_ruby_file_pattern():
    """Test Ruby filename validation"""
    import re
    from src.leet_code.app import LANGUAGE_MAP

    pattern = LANGUAGE_MAP['ruby']['file_pattern']

    assert re.match(pattern, '0001-two-sum.rb.rb')
    assert re.match(pattern, '0217-contains-duplicate.rb.rb')
    assert not re.match(pattern, 'two-sum.rb')
    assert not re.match(pattern, '0001-two-sum.rb')

def test_ruby_syntax_highlighting():
    """Test Pygments lexer for Ruby"""
    from pygments.lexers import get_lexer_by_name

    lexer = get_lexer_by_name('ruby')
    assert lexer is not None

    code = "def hello\n  puts 'Hello'\nend"
    tokens = list(lexer.get_tokens(code))
    assert len(tokens) > 0
```

### Integration Tests

1. **Template Test:**
   ```bash
   # Copy template
   cp docs/developer-guide/templates/SOLUTION_TEMPLATE.rb test.rb.rb

   # Verify it's valid Ruby
   ruby -c test.rb.rb
   ```

2. **Upload Test:**
   - Start Flask app
   - Navigate to a solution page
   - Use upload form to upload Ruby file
   - Verify file appears and renders correctly

3. **Rendering Test:**
   - View solution with Ruby alternative
   - Check syntax highlighting
   - Verify HTML sections render
   - Test collapsible details block

### Manual Testing Checklist

- [ ] Language appears in upload dropdown
- [ ] File validation accepts correct format
- [ ] File validation rejects incorrect format
- [ ] Syntax highlighting works
- [ ] HTML example formatting renders
- [ ] Details block expands/collapses
- [ ] Test cases display correctly
- [ ] Download functionality works
- [ ] Language badge appears
- [ ] Can switch between languages

## Documentation Updates

### Update README Files

1. **Project README:**
   - Add Ruby to supported languages list
   - Update language count

2. **Upload Guide README:**
   - Add Ruby to table of contents
   - Add Ruby to quick navigation
   - Add Ruby template location

3. **User Guide:**
   - Update language selection guide
   - Add Ruby characteristics
   - Include Ruby examples

### Update Formatting Guidelines Index

**File:** `docs/upload-guide/05-formatting-guidelines/05-formatting-guidelines.md`

Add section for Ruby:
```markdown
## Ruby Solutions

For Ruby-specific formatting requirements, see the [Ruby Formatting Guide](SOLUTION_FORMATTING_GUIDE_RUBY.md).

**Key Points:**
- Use `=begin`/`=end` for block comments
- Follow Ruby naming conventions (snake_case)
- Include `@param` and `@return` documentation
- Use Ruby idioms (blocks, symbols, etc.)
```

## Example: Adding Ruby Support

### Complete Implementation

**1. Update app.py:**
```python
LANGUAGE_MAP = {
    # ...
    'ruby': {
        'name': 'Ruby',
        'extension': '.rb',
        'pygments_lexer': 'ruby',
        'mime_type': 'text/x-ruby',
        'file_pattern': r'^[0-9]{4}-[\w-]+\.rb\.rb$',
        'comment_style': 'hash',
    },
}

SUPPORTED_LANGUAGES = [
    'python', 'javascript', 'typescript',
    'java', 'cpp', 'go', 'rust', 'ruby'
]
```

**2. Create template (excerpted):**
```ruby
=begin
N. Problem Title
Difficulty: Easy|Medium|Hard
[Full template content...]
=end

class Solution
  def method_name(params)
    # Implementation
  end
end
```

**3. Create formatting guide:**
See full guide at `SOLUTION_FORMATTING_GUIDE_RUBY.md`

**4. Create example:**
```ruby
# Complete Two Sum solution in Ruby
# File: solutions/arrays-hashing/ruby/0001-two-sum.rb.rb
```

**5. Test:**
```bash
# Verify Ruby syntax
ruby -c solutions/arrays-hashing/ruby/0001-two-sum.rb.rb

# Run solution
ruby solutions/arrays-hashing/ruby/0001-two-sum.rb.rb

# Test upload via web interface
./run.sh
# Navigate to solution and test upload
```

---

[← Previous: Template Creation](01-template-creation.md) | [🏠 Home](../README.md) | [Next: Formatting Guide Creation →](03-formatting-guide-creation.md)
