/**
 * # 0521. Longest Uncommon Subsequence I
 *
 * Difficulty: Medium
 *
 * Solve the Longest Uncommon Subsequence I problem as described.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>* ```</dd>
 * <dt>Output:</dt>
 * <dd>* ```</dd>
 * <dt>Explanation:</dt>
 * <dd>Processing input produces the expected output</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### METADATA:
 * **Techniques**: String comparison, Logical reasoning
 * **Data Structures**: String
 * **Patterns**: Brainteaser
 * **Time Complexity**: **O(n)**
 * **Space Complexity**: **O(n)**
 *
 * ### INTUITION:
The key insight is to solve this problem efficiently.

### APPROACH:
We solve this problem by implementing the required algorithm.

### WHY THIS WORKS:
This approach works because it correctly implements the problem requirements.

### EXAMPLE WALKTHROUGH:
Input:
```
example input
```

Output:
```
example output
```

Step-by-step execution:
1. [First step]
2. [Second step]
3. [Final step]

### TIME COMPLEXITY:
**O(n)** - Analysis of time complexity - [Add explanation of why this complexity]

### SPACE COMPLEXITY:
**O(n)** - Analysis of space complexity - [Add explanation of why this complexity]

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>
 */

function findLUSlength(a: string, b: string): number {
    return a === b ? -1 : Math.max(a.length, b.length);
}

if (require.main === module) {
    const testCases: [string, string, number][] = [
        ["aba", "cdc", 3],
        ["aaa", "bbb", 3],
        ["aaa", "aaa", -1],
        ["a", "aa", 2],
    ];

    console.log("Testing findLUSlength:");
    for (const [a, b, expected] of testCases) {
        const result: number = findLUSlength(a, b);
        const status: string = result === expected ? "✓" : "✗";
        console.log(`${status} findLUSlength("${a}", "${b}") = ${result}, expected = ${expected}`);
    }
}

export { findLUSlength };
