# LeetCode Solution Formatting Guide - C++

[← Previous: TypeScript Formatting Guide](SOLUTION_FORMATTING_GUIDE_TS.md) | [🏠 Home](../README.md) | [Next: Java Formatting Guide →](SOLUTION_FORMATTING_GUIDE_JAVA.md)

---

This guide explains the standard format for C++ LeetCode solution files in this repository.

## Table of Contents

- [Template Location](#template-location)
- [Key Formatting Rules](#key-formatting-rules)
- [Visual Styling Notes](#visual-styling-notes)
- [Theme System](#theme-system)
- [C++-Specific Conventions](#c-specific-conventions)
- [Best Practices](#best-practices)
- [Reference Implementation](#reference-implementation)
- [Additional Resources](#additional-resources)

## Template Location
[↑ Back to Table of Contents](#table-of-contents)

Use [`docs/developer-guide/templates/SOLUTION_TEMPLATE.cpp`](../../docs/developer-guide/templates/SOLUTION_TEMPLATE.cpp) as the starting point for new solutions.

## Key Formatting Rules
[↑ Back to Table of Contents](#table-of-contents)

### 1. Multi-line Comment Structure

```cpp
/**
 * # [Problem Number]. Problem Title
 *
 * # Difficulty: [Easy/Medium/Hard]
 *
 * [Problem description with markdown formatting]
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[input]</dd>
 * <dt>Output:</dt>
 * <dd>[output]</dd>
 * <dt>Explanation:</dt>
 * <dd>[explanation]</dd>
 * </dl>
 *
 * <details>...</details>
 */
```

### 2. Solution Explanation Sections

Include these sections in the `<details>` block **in this exact order**:

1. **METADATA:** (Required)
2. **INTUITION:** (Required)
3. **APPROACH:** (Required)
4. **WHY THIS WORKS:** (Optional but Recommended)
5. **EXAMPLE WALKTHROUGH:** (Required)
6. **TIME COMPLEXITY:** (Required)
7. **SPACE COMPLEXITY:** (Required)
8. **EDGE CASES:** (Required)

### 3. Code Structure

```cpp
#include <vector>
#include <unordered_map>
#include <string>
using namespace std;

class Solution {
public:
    /**
     * Main solution method
     *
     * Approach: [Brief description]
     * Time Complexity: O(?)
     * Space Complexity: O(?)
     */
    ReturnType methodName(Type1 param1, Type2 param2) {
        // Implementation with clear comments
        return result;
    }

    /**
     * Alternative solution method
     * Time Complexity: O(?)
     * Space Complexity: O(?)
     */
    ReturnType alternativeMethod(Type param) {
        // Implementation
        return result;
    }
};
```

### 4. Test Cases

```cpp
int main() {
    Solution solution;

    // Test case 1 - Basic case
    vector<int> nums1 = {2, 7, 11, 15};
    int target1 = 9;
    auto result1 = solution.methodName(nums1, target1);
    cout << "Test 1: " << (result1 == expected ? "PASS" : "FAIL") << endl;

    // Test case 2 - Edge case
    vector<int> nums2 = {};
    auto result2 = solution.methodName(nums2, 0);
    cout << "Test 2: " << (result2 == expected ? "PASS" : "FAIL") << endl;

    return 0;
}
```

## C++-Specific Conventions
[↑ Back to Table of Contents](#table-of-contents)

### Standard Library Containers

```cpp
// Common containers
#include <vector>        // Dynamic array
#include <unordered_map> // Hash map
#include <unordered_set> // Hash set
#include <queue>         // Queue/Priority queue
#include <stack>         // Stack
#include <set>           // Ordered set
#include <map>           // Ordered map
```

### Modern C++ Features

```cpp
// Auto type deduction
auto result = solution.method(nums);

// Range-based for loops
for (const auto& num : nums) {
    // Process num
}

// Lambda functions
sort(nums.begin(), nums.end(), [](int a, int b) {
    return a < b;
});

// Smart pointers
#include <memory>
unique_ptr<TreeNode> node = make_unique<TreeNode>(val);
```

### Common Patterns

```cpp
// Two pointers
int left = 0, right = nums.size() - 1;

// Sliding window
int start = 0;
for (int end = 0; end < nums.size(); end++) {
    // Expand window
    while (/* condition */) {
        // Shrink window
        start++;
    }
}

// Hash map for frequency
unordered_map<int, int> freq;
for (int num : nums) {
    freq[num]++;
}
```

### Memory Management

```cpp
// RAII - Resource Acquisition Is Initialization
// Use smart pointers instead of raw pointers
unique_ptr<TreeNode> node(new TreeNode(val));

// Or use make_unique (C++14+)
auto node = make_unique<TreeNode>(val);

// Avoid manual delete - use containers and smart pointers
```

## Best Practices
[↑ Back to Table of Contents](#table-of-contents)

1. ✅ Use `const` references for read-only parameters
2. ✅ Prefer `auto` for type deduction when clear
3. ✅ Use range-based for loops when possible
4. ✅ Include necessary headers explicitly
5. ✅ Use modern C++ features (C++11/14/17)
6. ✅ Avoid manual memory management
7. ❌ Don't use raw pointers - use smart pointers
8. ❌ Don't use C-style arrays - use `vector`

## Reference Implementation
[↑ Back to Table of Contents](#table-of-contents)

See template at [`docs/developer-guide/templates/SOLUTION_TEMPLATE.cpp`](../../docs/developer-guide/templates/SOLUTION_TEMPLATE.cpp) for a complete example.

## Additional Resources
[↑ Back to Table of Contents](#additional-resources)

- TypeScript guide: [SOLUTION_FORMATTING_GUIDE_TS.md](SOLUTION_FORMATTING_GUIDE_TS.md)
- Java guide: [SOLUTION_FORMATTING_GUIDE_JAVA.md](SOLUTION_FORMATTING_GUIDE_JAVA.md)
- Template: [`docs/developer-guide/templates/SOLUTION_TEMPLATE.cpp`](../../docs/developer-guide/templates/SOLUTION_TEMPLATE.cpp)

---

[← Previous: TypeScript Formatting Guide](SOLUTION_FORMATTING_GUIDE_TS.md) | [🏠 Home](../README.md) | [Next: Java Formatting Guide →](SOLUTION_FORMATTING_GUIDE_JAVA.md)
