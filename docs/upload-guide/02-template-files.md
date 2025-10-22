# Template Files

[← Previous: Overview](01-overview.md) | [🏠 Home](README.md) | [Next: Solution Structure →](03-solution-structure.md)

---

## Table of Contents

- [Available Templates](#available-templates)
- [Python Solution Template](#python-solution-template)
- [JavaScript Solution Template](#javascript-solution-template)
- [TypeScript Solution Template](#typescript-solution-template)
- [C++ Solution Template](#c-solution-template)
- [Java Solution Template](#java-solution-template)
- [Go Solution Template](#go-solution-template)
- [Rust Solution Template](#rust-solution-template)
- [Template Best Practices](#template-best-practices)
- [Quick Template Commands](#quick-template-commands)
- [Template Customization](#template-customization)

## Available Templates

The platform provides standardized templates for 7 programming languages:

| Language | Template Location | Formatting Guide |
|----------|------------------|------------------|
| **Python** | [`SOLUTION_TEMPLATE.py`](../developer-guide/templates/SOLUTION_TEMPLATE.py) | [Guide](05-formatting-guidelines/SOLUTION_FORMATTING_GUIDE_PY.md) |
| **JavaScript** | [`SOLUTION_TEMPLATE.js`](../developer-guide/templates/SOLUTION_TEMPLATE.js) | [Guide](05-formatting-guidelines/SOLUTION_FORMATTING_GUIDE_JS.md) |
| **TypeScript** | [`SOLUTION_TEMPLATE.ts`](../developer-guide/templates/SOLUTION_TEMPLATE.ts) | [Guide](05-formatting-guidelines/SOLUTION_FORMATTING_GUIDE_TS.md) |
| **C++** | [`SOLUTION_TEMPLATE.cpp`](../developer-guide/templates/SOLUTION_TEMPLATE.cpp) | [Guide](05-formatting-guidelines/SOLUTION_FORMATTING_GUIDE_CPP.md) |
| **Java** | [`SOLUTION_TEMPLATE.java`](../developer-guide/templates/SOLUTION_TEMPLATE.java) | [Guide](05-formatting-guidelines/SOLUTION_FORMATTING_GUIDE_JAVA.md) |
| **Go** | [`SOLUTION_TEMPLATE.go`](../developer-guide/templates/SOLUTION_TEMPLATE.go) | [Guide](05-formatting-guidelines/SOLUTION_FORMATTING_GUIDE_GO.md) |
| **Rust** | [`SOLUTION_TEMPLATE.rs`](../developer-guide/templates/SOLUTION_TEMPLATE.rs) | [Guide](05-formatting-guidelines/SOLUTION_FORMATTING_GUIDE_RS.md) |

All templates follow a consistent structure with language-specific conventions.

## Python Template

### Location

[`docs/solutions/templates/SOLUTION_TEMPLATE.py`](../solutions/templates/SOLUTION_TEMPLATE.py)

### Template Contents

The Python template includes:

**1. Module Docstring**
```python
"""
[Problem Number]. Problem Title
Difficulty: [Easy/Medium/Hard]

[Full problem description]

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[input description]</dd>
<dt>Output:</dt>
<dd>[output description]</dd>
<dt>Explanation:</dt>
<dd>[explanation]</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>


### METADATA:
**Techniques**: [e.g., Hash Table Lookup, Binary Search, Two Pointers]
**Data Structures**: [e.g., Hash Map, Array, Tree, Graph]
**Patterns**: [e.g., Complement Search, Sliding Window, DFS]
**Time Complexity**: **O(?)** - [detailed explanation of time complexity]
**Space Complexity**: **O(?)** - [detailed explanation of space complexity]

### INTUITION:
[1-3 sentences about the key insight]

### APPROACH:
[Step-by-step explanation in flowing prose]

### TIME COMPLEXITY:
**O(?)** - [explanation]

### SPACE COMPLEXITY:
**O(?)** - [explanation]

### EDGE CASES:
- **Case 1:** [description]
- **Case 2:** [description]

</details>
"""
```

**2. Solution Class**
```python
from typing import List

class Solution:
    def methodName(self, params) -> return_type:
        """
        Approach: [brief description]
        Time Complexity: O(?)
        Space Complexity: O(?)
        """
        pass
```

**3. Test Cases**
```python
if __name__ == "__main__":
    solution = Solution()

    # Test case 1
    # Test case 2
```

### Using the Python Template

**Step 1: Copy Template**
```bash
cp docs/solutions/templates/SOLUTION_TEMPLATE.py docs/solutions/{category}/NNN-problem-name.py
```

**Step 2: Fill Problem Details**
- Replace `[Problem Number]` with LeetCode number
- Replace `Problem Title` with actual title
- Set difficulty level
- Add complete problem description

**Step 3: Add Examples**
- Use HTML definition list format
- Include all example cases from LeetCode
- Format input, output, and explanation

**Step 4: Add METADATA Section**
- TECHNIQUES: Algorithm techniques used (e.g., "Hash Table Lookup, Single Pass")
- DATA STRUCTURES: Data structures employed (e.g., "Hash Map, Array")
- PATTERNS: Design patterns applied (e.g., "Complement Search")
- TIME COMPLEXITY: Detailed Big-O analysis with explanation
- SPACE COMPLEXITY: Detailed memory analysis with explanation

**Step 5: Write Solution Explanation**
- INTUITION: The "aha moment"
- APPROACH: Step-by-step walkthrough
- TIME COMPLEXITY: Big-O analysis
- SPACE COMPLEXITY: Memory analysis
- EDGE CASES: Boundary conditions

**Step 6: Implement Solution**
- Add proper type hints
- Write clean, commented code
- Include alternative approaches if relevant

**Step 7: Add Test Cases**
- At least 3 test cases
- Include edge cases
- Verify output

### Python Formatting Reference

See detailed guide: [`SOLUTION_FORMATTING_GUIDE_PY.md`](05-formatting-guidelines/SOLUTION_FORMATTING_GUIDE_PY.md)

## JavaScript Template

### Location

[`docs/solutions/templates/SOLUTION_TEMPLATE.js`](../solutions/templates/SOLUTION_TEMPLATE.js)

### Template Contents

The JavaScript template includes:

**1. JSDoc Comment**
```javascript
/**
 * [Problem Number]. Problem Title
 * Difficulty: [Easy/Medium/Hard]
 *
 * [Full problem description]
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[input description]</dd>
 * <dt>Output:</dt>
 * <dd>[output description]</dd>
 * <dt>Explanation:</dt>
 * <dd>[explanation]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### METADATA:
**Techniques**: [e.g., Hash Table Lookup, Binary Search, Two Pointers]
**Data Structures**: [e.g., Hash Map, Array, Tree, Graph]
**Patterns**: [e.g., Complement Search, Sliding Window, DFS]
**Time Complexity**: * **O(?)** - [detailed explanation of time complexity]
**Space Complexity**: * **O(?)** - [detailed explanation of space complexity]

 *
 * ### INTUITION:
 * [Key insight]
 *
 * ### APPROACH:
 * [Step-by-step explanation]
 *
 * ### TIME COMPLEXITY:
 * **O(?)** - [explanation]
 *
 * ### SPACE COMPLEXITY:
 * **O(?)** - [explanation]
 *
 * </details>
 */
```

**2. Solution Class**
```javascript
class Solution {
    /**
     * @param {type} param - description
     * @return {type} - description
     *
     * Approach: [brief description]
     * Time Complexity: O(?)
     * Space Complexity: O(?)
     */
    methodName(param) {
        // Implementation
    }
}
```

**3. Test Cases**
```javascript
// Test cases
function runTests() {
    const solution = new Solution();

    // Test case 1
    console.log("Test Case 1:");
    // ...
}

if (typeof require !== 'undefined' && require.main === module) {
    runTests();
}
```

**4. Module Exports**
```javascript
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Solution;
}
```

### Using the JavaScript Template

**Step 1: Copy Template**
```bash
cp docs/solutions/templates/SOLUTION_TEMPLATE.js docs/solutions/{category}/javascript/NNN-problem-name.js.js
```

**Step 2: Fill JSDoc Comment**
- Complete problem description
- Add all examples
- Write solution explanation sections

**Step 3: Add JSDoc Type Annotations**
- `@param {type}` for each parameter
- `@return {type}` for return value
- Use proper JSDoc types

**Step 4: Implement Solution**
- Use modern JavaScript (ES6+)
- Clear variable names
- Inline comments for complex logic

**Step 5: Write Test Cases**
- Use `console.log()` for output
- `JSON.stringify()` for comparison
- Clear test case labels

### JavaScript Formatting Reference

See detailed guide: [`SOLUTION_FORMATTING_GUIDE_JS.md`](05-formatting-guidelines/SOLUTION_FORMATTING_GUIDE_JS.md)

## TypeScript Template

### Location

[`docs/developer-guide/templates/SOLUTION_TEMPLATE.ts`](../developer-guide/templates/SOLUTION_TEMPLATE.ts)

### Template Contents

TypeScript template includes typed JSDoc and interface definitions:

**1. Problem Documentation**
```typescript
/**
 * Difficulty: [Easy/Medium/Hard]
 *
 * [Problem description with type annotations]
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 * [METADATA, INTUITION, APPROACH sections]
 * </details>
 */
```

**2. Solution with Type Safety**
```typescript
class Solution {
    methodName(param: type): returnType {
        // Fully typed implementation
    }
}
```

### Using the TypeScript Template

```bash
cp docs/developer-guide/templates/SOLUTION_TEMPLATE.ts docs/solutions/{category}/typescript/NNN-problem-name.ts.ts
```

**Key Features:**
- Full TypeScript type annotations
- Interface definitions for complex types
- Strict type checking compatibility
- Modern ES6+ syntax

### TypeScript Formatting Reference

See detailed guide: [`SOLUTION_FORMATTING_GUIDE_TS.md`](05-formatting-guidelines/SOLUTION_FORMATTING_GUIDE_TS.md)

## C++ Template

### Location

[`docs/developer-guide/templates/SOLUTION_TEMPLATE.cpp`](../developer-guide/templates/SOLUTION_TEMPLATE.cpp)

### Template Contents

C++ template uses Doxygen-style comments:

**1. Problem Documentation**
```cpp
/**
 * Difficulty: [Easy/Medium/Hard]
 *
 * [Problem description]
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 * [METADATA, INTUITION, APPROACH sections]
 * </details>
 */
```

**2. Solution Class**
```cpp
class Solution {
public:
    returnType methodName(paramType param) {
        // Implementation
    }
};
```

**3. Test Main Function**
```cpp
int main() {
    Solution solution;
    // Test cases
    return 0;
}
```

### Using the C++ Template

```bash
cp docs/developer-guide/templates/SOLUTION_TEMPLATE.cpp docs/solutions/{category}/cpp/NNN-problem-name.cpp.cpp
```

**Compilation:**
```bash
g++ -std=c++17 -o solution NNN-problem-name.cpp.cpp
./solution
```

### C++ Formatting Reference

See detailed guide: [`SOLUTION_FORMATTING_GUIDE_CPP.md`](05-formatting-guidelines/SOLUTION_FORMATTING_GUIDE_CPP.md)

## Java Template

### Location

[`docs/developer-guide/templates/SOLUTION_TEMPLATE.java`](../developer-guide/templates/SOLUTION_TEMPLATE.java)

### Template Contents

Java template uses Javadoc conventions:

**1. Problem Documentation**
```java
/**
 * Difficulty: [Easy/Medium/Hard]
 *
 * <p>[Problem description]</p>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 * [METADATA, INTUITION, APPROACH sections]
 * </details>
 */
```

**2. Solution Class**
```java
class Solution {
    public returnType methodName(paramType param) {
        // Implementation
    }

    public static void main(String[] args) {
        Solution solution = new Solution();
        // Test cases
    }
}
```

### Using the Java Template

```bash
cp docs/developer-guide/templates/SOLUTION_TEMPLATE.java docs/solutions/{category}/java/NNN-problem-name.java.java
```

**Compilation & Execution:**
```bash
javac NNN-problem-name.java.java
java Solution
```

### Java Formatting Reference

See detailed guide: [`SOLUTION_FORMATTING_GUIDE_JAVA.md`](05-formatting-guidelines/SOLUTION_FORMATTING_GUIDE_JAVA.md)

## Go Template

### Location

[`docs/developer-guide/templates/SOLUTION_TEMPLATE.go`](../developer-guide/templates/SOLUTION_TEMPLATE.go)

### Template Contents

Go template follows Go documentation conventions:

**1. Problem Documentation**
```go
/*
Difficulty: [Easy/Medium/Hard]

[Problem description]

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
[METADATA, INTUITION, APPROACH sections]
</details>
*/
```

**2. Solution Functions**
```go
// methodName implements the solution
func methodName(param paramType) returnType {
    // Implementation
}

func main() {
    // Test cases
}
```

### Using the Go Template

```bash
cp docs/developer-guide/templates/SOLUTION_TEMPLATE.go docs/solutions/{category}/go/NNN-problem-name.go.go
```

**Execution:**
```bash
go run NNN-problem-name.go.go
```

### Go Formatting Reference

See detailed guide: [`SOLUTION_FORMATTING_GUIDE_GO.md`](05-formatting-guidelines/SOLUTION_FORMATTING_GUIDE_GO.md)

## Rust Template

### Location

[`docs/developer-guide/templates/SOLUTION_TEMPLATE.rs`](../developer-guide/templates/SOLUTION_TEMPLATE.rs)

### Template Contents

Rust template uses Rustdoc format:

**1. Problem Documentation**
```rust
/*!
Difficulty: [Easy/Medium/Hard]

[Problem description]

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
[METADATA, INTUITION, APPROACH sections]
</details>
*/
```

**2. Solution Implementation**
```rust
struct Solution;

impl Solution {
    pub fn method_name(param: ParamType) -> ReturnType {
        // Implementation
    }
}

fn main() {
    // Test cases
}
```

### Using the Rust Template

```bash
cp docs/developer-guide/templates/SOLUTION_TEMPLATE.rs docs/solutions/{category}/rust/NNN-problem-name.rs.rs
```

**Compilation & Execution:**
```bash
rustc NNN-problem-name.rs.rs
./NNN-problem-name
```

### Rust Formatting Reference

See detailed guide: [`SOLUTION_FORMATTING_GUIDE_RS.md`](05-formatting-guidelines/SOLUTION_FORMATTING_GUIDE_RS.md)

## Template Best Practices

### Documentation

- ✅ Complete all required sections
- ✅ Write clear, concise explanations
- ✅ Use proper markdown formatting
- ✅ Include code examples in explanations
- ✅ Document edge cases thoroughly

### Code Quality

- ✅ Follow language conventions
- ✅ Use meaningful variable names
- ✅ Add comments for complex logic
- ✅ Keep functions focused
- ✅ Test thoroughly

### Formatting

- ✅ Use HTML definition lists for examples
- ✅ Proper indentation (4 spaces or language standard)
- ✅ Consistent spacing
- ✅ No trailing whitespace
- ✅ File ends with newline

## Quick Template Commands

### Copy Templates

```bash
# Python
cp docs/developer-guide/templates/SOLUTION_TEMPLATE.py docs/solutions/arrays-hashing/001-two-sum.py

# JavaScript
cp docs/developer-guide/templates/SOLUTION_TEMPLATE.js docs/solutions/arrays-hashing/javascript/001-two-sum.js.js

# TypeScript
cp docs/developer-guide/templates/SOLUTION_TEMPLATE.ts docs/solutions/arrays-hashing/typescript/001-two-sum.ts.ts

# C++
cp docs/developer-guide/templates/SOLUTION_TEMPLATE.cpp docs/solutions/arrays-hashing/cpp/001-two-sum.cpp.cpp

# Java
cp docs/developer-guide/templates/SOLUTION_TEMPLATE.java docs/solutions/arrays-hashing/java/001-two-sum.java.java

# Go
cp docs/developer-guide/templates/SOLUTION_TEMPLATE.go docs/solutions/arrays-hashing/go/001-two-sum.go.go

# Rust
cp docs/developer-guide/templates/SOLUTION_TEMPLATE.rs docs/solutions/arrays-hashing/rust/001-two-sum.rs.rs
```

### Run/Compile Solutions

```bash
# Python
python docs/solutions/{category}/NNN-problem-name.py

# JavaScript/Node.js
node docs/solutions/{category}/javascript/NNN-problem-name.js.js

# TypeScript
npx ts-node docs/solutions/{category}/typescript/NNN-problem-name.ts.ts

# C++
g++ -std=c++17 -o solution NNN-problem-name.cpp.cpp && ./solution

# Java
javac NNN-problem-name.java.java && java Solution

# Go
go run NNN-problem-name.go.go

# Rust
rustc NNN-problem-name.rs.rs && ./NNN-problem-name
```

## Template Customization

### When to Modify Templates

Templates can be customized for:
- Solution in another language approaches
- Multiple solution methods
- Language-specific features
- Advanced explanations

### What Must Remain

Always keep:
- HTML definition list for examples
- Required explanation sections
- Complexity analysis
- Test cases

## Next Steps

Now that you understand the templates, learn about the required solution structure.

---

[← Previous: Overview](01-overview.md) | [🏠 Home](README.md) | [Next: Solution Structure →](03-solution-structure.md)
