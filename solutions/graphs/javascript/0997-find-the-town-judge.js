/**
### INTUITION:
This is a graph problem where we need to find a node (person) with specific in-degree and out-degree properties. The judge must have in-degree = n-1 (everyone trusts them) and out-degree = 0 (they trust nobody). We can solve this efficiently by tracking trust relationships as a directed graph.

### APPROACH:
1. **Count trust relationships**: Track who trusts whom and who is trusted by whom
2. **Calculate net trust**: For each person, calculate (trusted_by_count - trusts_count)
3. **Find the judge**: The judge will have net trust = n-1 (trusted by n-1 people, trusts 0)
4. **Validate result**: Ensure exactly one person satisfies the judge criteria

### WHY THIS WORKS:
- This ensures that judge trusts nobody: out-degree = 0
- This ensures that everyone else trusts judge: in-degree = n-1
- This ensures that net trust = in-degree - out-degree = (n-1) - 0 = n-1
- This ensures that all other people have net trust < n-1 (they either trust someone or aren't trusted by everyone)

### EXAMPLE WALKTHROUGH:
Input:
```
n = 3, trust = [[1,3],[2,3]]
```

Steps:
Step 1: Person 1: trusts 3, trusted by 0 → net = 0 - 1 = -1
Step 2: Person 2: trusts 3, trusted by 0 → net = 0 - 1 = -1
Step 3: Person 3: trusts 0, trusted by 2 → net = 2 - 0 = 2 = n-1 ✓

Output:
```
3 (person 3 is the judge)
```

### TIME COMPLEXITY:
O(T + N)**
Where T is the number of trust relationships and N is the number of people

### SPACE COMPLEXITY:
O(N)**
For storing trust counts

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

*/

/**
 * Main solution for Problem 997: Find The Town Judge
 *
 * @param {number} n - Number of people labeled 1 to n
 * @param {number[][]} trust - Array of trust relationships [a, b] means a trusts b
 * @return {number} - The town judge's label, or -1 if no judge exists
 *
 * Time Complexity: O(E) where E is number of trust relationships
 * Space Complexity: O(n) for trust score array
 */
function solve(n, trust) {
  // Special case: single person is automatically the judge
  if (n === 1) return 1;

  // Calculate net trust score for each person (indegree - outdegree)
  const trustScore = new Array(n + 1).fill(0);

  for (const [a, b] of trust) {
    trustScore[a]--; // a trusts someone (outdegree)
    trustScore[b]++; // b is trusted by someone (indegree)
  }

  // Find person with trust score of n-1 (trusted by all others, trusts no one)
  for (let i = 1; i <= n; i++) {
    if (trustScore[i] === n - 1) {
      return i;
    }
  }

  return -1; // No judge found
}

/**
 * Test cases for Problem 997: Find The Town Judge
 */
function testSolution() {
  console.log("Testing 997. Find The Town Judge");

  // Test case 1: Basic case with judge
  const result1 = solve(2, [[1, 2]]);
  console.assert(result1 === 2, `Test 1 failed: expected 2, got ${result1}`);

  // Test case 2: Three people, person 3 is judge
  const result2 = solve(3, [
    [1, 3],
    [2, 3],
  ]);
  console.assert(result2 === 3, `Test 2 failed: expected 3, got ${result2}`);

  // Test case 3: No judge (person 3 trusts someone)
  const result3 = solve(3, [
    [1, 3],
    [2, 3],
    [3, 1],
  ]);
  console.assert(result3 === -1, `Test 3 failed: expected -1, got ${result3}`);

  // Test case 4: Single person
  const result4 = solve(1, []);
  console.assert(result4 === 1, `Test 4 failed: expected 1, got ${result4}`);

  // Test case 5: No trust relationships
  const result5 = solve(3, []);
  console.assert(result5 === -1, `Test 5 failed: expected -1, got ${result5}`);

  // Test case 6: Multiple people trust each other (no judge)
  const result6 = solve(3, [
    [1, 2],
    [2, 3],
    [3, 1],
  ]);
  console.assert(result6 === -1, `Test 6 failed: expected -1, got ${result6}`);

  // Test case 7: Judge doesn't trust everyone else
  const result7 = solve(4, [
    [1, 2],
    [1, 3],
    [2, 3],
    [3, 4],
    [4, 3],
  ]);
  console.assert(result7 === -1, `Test 7 failed: expected -1, got ${result7}`);

  // Test case 8: Large case with clear judge
  const result8 = solve(4, [
    [1, 4],
    [2, 4],
    [3, 4],
  ]);
  console.assert(result8 === 4, `Test 8 failed: expected 4, got ${result8}`);

  console.log("All test cases passed for 997. Find The Town Judge!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 997. Find The Town Judge ===");
  console.log("Category: Graphs");
  console.log("Difficulty: Easy");
  console.log("");

  // Example demonstration would go here
  testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
  demonstrateSolution();
}

// Export for use in other modules
module.exports = {
  solve,
  testSolution,
  demonstrateSolution,
};

/**
 * Additional Notes:
 * - This solution focuses on graphs concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
