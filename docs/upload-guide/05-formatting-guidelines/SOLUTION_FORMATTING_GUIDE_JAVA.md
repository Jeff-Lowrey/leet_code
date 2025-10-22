# LeetCode Solution Formatting Guide - Java

[← Previous: C++ Formatting Guide](SOLUTION_FORMATTING_GUIDE_CPP.md) | [🏠 Home](../README.md) | [Next: Go Formatting Guide →](SOLUTION_FORMATTING_GUIDE_GO.md)

---

This guide explains the standard format for Java LeetCode solution files in this repository.

## Table of Contents

- [Template Location](#template-location)
- [Key Formatting Rules](#key-formatting-rules)
- [Visual Styling Notes](#visual-styling-notes)
- [Theme System](#theme-system)
- [Java-Specific Conventions](#java-specific-conventions)
- [Best Practices](#best-practices)
- [Reference Implementation](#reference-implementation)
- [Additional Resources](#additional-resources)

## Template Location
[↑ Back to Table of Contents](#table-of-contents)

Use [`docs/developer-guide/templates/SOLUTION_TEMPLATE.java`](../../docs/developer-guide/templates/SOLUTION_TEMPLATE.java) as the starting point for new solutions.

## Key Formatting Rules
[↑ Back to Table of Contents](#table-of-contents)

### 1. Javadoc Comment Structure

```java
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

```java
import java.util.*;

class Solution {
    /**
     * Main solution method
     *
     * Approach: [Brief description]
     * Time Complexity: O(?)
     * Space Complexity: O(?)
     *
     * @param param1 Description
     * @param param2 Description
     * @return Description
     */
    public ReturnType methodName(Type1 param1, Type2 param2) {
        // Implementation with clear comments
        return result;
    }

    /**
     * Alternative solution method
     *
     * @param param Description
     * @return Description
     */
    public ReturnType alternativeMethod(Type param) {
        // Implementation
        return result;
    }

    /**
     * Test cases
     */
    public static void main(String[] args) {
        Solution solution = new Solution();

        // Test case 1 - Basic case
        int[] nums1 = {2, 7, 11, 15};
        int target1 = 9;
        System.out.println("Test 1: " +
            (Arrays.equals(solution.methodName(nums1, target1), expected) ? "PASS" : "FAIL"));

        // Test case 2 - Edge case
        int[] nums2 = {};
        System.out.println("Test 2: " +
            (Arrays.equals(solution.methodName(nums2, 0), expected) ? "PASS" : "FAIL"));
    }
}
```

## Java-Specific Conventions
[↑ Back to Table of Contents](#table-of-contents)

### Common Imports

```java
// Collections framework
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.PriorityQueue;
import java.util.Stack;
import java.util.TreeMap;
import java.util.TreeSet;

// Utilities
import java.util.Arrays;
import java.util.Collections;

// Wildcard import for multiple classes
import java.util.*;
```

### Data Structures

```java
// Lists
List<Integer> list = new ArrayList<>();
List<Integer> linkedList = new LinkedList<>();

// Maps
Map<String, Integer> map = new HashMap<>();
Map<String, Integer> treeMap = new TreeMap<>(); // Sorted

// Sets
Set<Integer> set = new HashSet<>();
Set<Integer> treeSet = new TreeSet<>(); // Sorted

// Queue and Stack
Queue<Integer> queue = new LinkedList<>();
Deque<Integer> deque = new ArrayDeque<>();
Stack<Integer> stack = new Stack<>();

// Priority Queue (Min heap by default)
PriorityQueue<Integer> minHeap = new PriorityQueue<>();
PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
```

### Common Patterns

```java
// Iterate with index
for (int i = 0; i < nums.length; i++) {
    // Access nums[i]
}

// Enhanced for loop
for (int num : nums) {
    // Process num
}

// Stream API (Java 8+)
int sum = Arrays.stream(nums).sum();
List<Integer> filtered = list.stream()
    .filter(x -> x > 0)
    .collect(Collectors.toList());

// Lambda expressions
Collections.sort(list, (a, b) -> a - b);
```

### String Operations

```java
// StringBuilder for string concatenation
StringBuilder sb = new StringBuilder();
sb.append("Hello");
sb.append(" World");
String result = sb.toString();

// String methods
String s = "example";
char[] chars = s.toCharArray();
String[] parts = s.split(" ");
```

### Arrays

```java
// Array initialization
int[] nums = new int[n];
int[] values = {1, 2, 3, 4, 5};

// 2D arrays
int[][] matrix = new int[m][n];

// Array utilities
Arrays.sort(nums);
Arrays.fill(nums, 0);
int[] copy = Arrays.copyOf(nums, nums.length);
```

## Best Practices
[↑ Back to Table of Contents](#table-of-contents)

1. ✅ Use proper Javadoc comments for methods
2. ✅ Follow Java naming conventions (camelCase)
3. ✅ Use generics for type safety
4. ✅ Prefer interfaces over concrete types (List vs ArrayList)
5. ✅ Use enhanced for loops when index not needed
6. ✅ Leverage Java 8+ features (streams, lambdas)
7. ❌ Don't use raw types - always use generics
8. ❌ Don't ignore warnings - fix them

## Reference Implementation
[↑ Back to Table of Contents](#table-of-contents)

See template at [`docs/developer-guide/templates/SOLUTION_TEMPLATE.java`](../../docs/developer-guide/templates/SOLUTION_TEMPLATE.java) for a complete example.

## Additional Resources
[↑ Back to Table of Contents](#additional-resources)

- C++ guide: [SOLUTION_FORMATTING_GUIDE_CPP.md](SOLUTION_FORMATTING_GUIDE_CPP.md)
- Go guide: [SOLUTION_FORMATTING_GUIDE_GO.md](SOLUTION_FORMATTING_GUIDE_GO.md)
- Template: [`docs/developer-guide/templates/SOLUTION_TEMPLATE.java`](../../docs/developer-guide/templates/SOLUTION_TEMPLATE.java)

---

[← Previous: C++ Formatting Guide](SOLUTION_FORMATTING_GUIDE_CPP.md) | [🏠 Home](../README.md) | [Next: Go Formatting Guide →](SOLUTION_FORMATTING_GUIDE_GO.md)
