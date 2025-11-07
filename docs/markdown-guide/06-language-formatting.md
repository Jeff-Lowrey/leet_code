# Language-Specific Formatting

## Overview

Each programming language has its own comment syntax for embedding markdown. The application automatically detects and extracts markdown based on file extension.

## Comment Block Formats

### Python - Docstring
```python
"""
# Problem Title
Difficulty: Easy

Problem description...

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
...
</details>
"""

from typing import List

class Solution:
    def solutionMethod(self):
        # implementation
```

- **Format**: Triple quotes `"""..."""`
- **Location**: Module-level docstring at file start
- **Extraction**: `extract_markdown_from_python_docstring()`

---

### JavaScript/TypeScript - JSDoc
```javascript
/**
 * # Problem Title
 * Difficulty: Easy
 *
 * Problem description...
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 * ...
 * </details>
 */

var solutionFunction = function() {
    // implementation
};
```

- **Format**: `/** ... */` block comment
- **Location**: File start before any code
- **Extraction**: Strips `*` prefixes, processes as markdown

---

### Java - Javadoc
```java
/**
 * # Problem Title
 * Difficulty: Easy
 *
 * Problem description...
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 * ...
 * </details>
 */

class Solution {
    public int[] method() {
        // implementation
    }
}
```

- **Format**: `/** ... */` block comment
- **Location**: File start before class definition
- **Extraction**: Same as JavaScript

---

### C++ - Doxygen
```cpp
/**
 * # Problem Title  
 * Difficulty: Easy
 *
 * Problem description...
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 * ...
 * </details>
 */

class Solution {
public:
    vector<int> method() {
        // implementation
    }
};
```

- **Format**: `/** ... */` block comment
- **Location**: File start
- **Extraction**: Same as JavaScript

---

### Go - Package Comment
```go
/**
 * # Problem Title
 * Difficulty: Easy
 *
 * Problem description...
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 * ...
 * </details>
 */

func solutionFunction() {
    // implementation
}
```

- **Format**: `/** ... */` block comment
- **Location**: File start
- **Extraction**: Same as JavaScript

---

### Rust - Module Doc Comment
```rust
/**
 * # Problem Title
 * Difficulty: Easy
 *
 * Problem description...
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 * ...
 * </details>
 */

impl Solution {
    pub fn method() {
        // implementation
    }
}
```

- **Format**: `/** ... */` block comment
- **Location**: File start
- **Extraction**: Same as JavaScript

---

## Universal Extraction

The application uses a unified extraction function that works for all languages:

```python
# From data/markdown_extraction.py
markdown_content = extract_markdown_from_code(code, file_extension)
```

### Supported Extensions
- `.py` - Python docstring extraction
- `.js` - JavaScript JSDoc extraction
- `.ts` - TypeScript JSDoc extraction
- `.java` - Java Javadoc extraction
- `.cpp`, `.cc`, `.cxx` - C++ Doxygen extraction
- `.go` - Go package comment extraction
- `.rs` - Rust module doc extraction

### How It Works
1. Detects file extension
2. Applies language-specific comment extraction
3. Cleans comment markers (`*`, `"""`, etc.)
4. Returns pure markdown content
5. Same processing pipeline for all languages

---

## Best Practices

1. **Use Correct Comment Style** - Match language conventions
2. **Place at File Start** - Before any code
3. **No Leading Asterisks in Content** - They're stripped automatically
4. **Preserve Markdown Formatting** - Blank lines, indentation matter
5. **Test Extraction** - Verify markdown extracts correctly

---

## Common Mistakes

### 1. Wrong Comment Type
❌ **Wrong** (Python):
```python
# This is not extracted
# Multi-line regular comment
```

✅ **Correct** (Python):
```python
"""
This is extracted as markdown
"""
```

### 2. Missing Leading Asterisks (JS/Java/C++)
❌ **Wrong**:
```javascript
/**
# Problem Title
Difficulty: Easy
*/
```

✅ **Correct**:
```javascript
/**
 * # Problem Title
 * Difficulty: Easy
 */
```

### 3. Code Before Comment
❌ **Wrong**:
```python
import sys

"""
# Problem Title
...
"""
```

✅ **Correct**:
```python
"""
# Problem Title
...
"""

import sys
```

---

## Related Sections

- **Code Section** → [05-code-section.md](05-code-section.md)
- **Processing Flow** → [07-processing-flow.md](07-processing-flow.md)
- **Complete Examples** → [09-examples.md](09-examples.md)
