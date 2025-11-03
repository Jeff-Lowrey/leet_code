/**
### INTUITION:
The key insight is that build combinations incrementally by choosing numbers from a starting position onwards. Use a start parameter to ensure we only consider numbers greater than previously chosen ones, avoiding duplicates like [1,2] and [2,1]. When combination reaches size k, add it to results.

### APPROACH:
1. **Initialize result**: Create empty result list and current combination list
2. **Define backtrack function**: Create recursive function with parameters (start, current)
# 0077. **Base case**: If len(current) == k, add copy of current to result and return  # Result undefined
4. **Iterate from start**: Loop from start to n+1 (numbers 1 to n)
5. **Add number**: Append current number i to current combination
6. **Recursive call**: Call backtrack(i+1, current) to continue building combination
7. **Backtrack**: Remove last element from current (pop) to try next number
8. **Return result**: After all recursive calls complete, return result list

### WHY THIS WORKS:
- Backtracking builds combinations of size k from 1..n
- At each step, try all numbers from start to n
- When path length reaches k, found valid combination
- Pass start to ensure combinations not permutations (no [2,1] after [1,2])
- O(C(n,k) * k) time: C(n,k) combinations, O(k) to copy each

### EXAMPLE WALKTHROUGH:
Input:
```
n = 4, k = 2
```

Step 1: Start backtracking with empty combination
Try 1: curr = [1]

Steps:
Step 1: Try 2: curr = [1,2] → len=k, add [1,2] to result
Step 2: Try 3: curr = [1,3] → len=k, add [1,3] to result
Step 3: Try 4: curr = [1,4] → len=k, add [1,4] to result
Step 4: Try 2: curr = [2]
Step 5: Try 3: curr = [2,3] → len=k, add [2,3] to result
Step 6: Try 4: curr = [2,4] → len=k, add [2,4] to result
Step 7: Try 3: curr = [3]
Step 8: Try 4: curr = [3,4] → len=k, add [3,4] to result
Step 9: Try 4: curr = [4] → can't form combination of size 2

Output:
```
[[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]
```

### TIME COMPLEXITY:
O(n)**
- Single pass through input

### SPACE COMPLEXITY:
O(1)**
- Constant extra space

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>

*/

class Solution {
  /**
   * Generate all possible combinations of k numbers from 1 to n.
   *
   * Time Complexity: O(C(n,k) * k)
   * Space Complexity: O(k) for recursion depth
   */
  combine(n: number, k: number): number[][] {
    const result: number[][] = [];

    const backtrack = (start: number, currCombination: number[]): void => {
      // If we have a valid combination of size k, add it to results
      if (currCombination.length === k) {
        result.push([...currCombination]);
        return;
      }

      // Try each possible number that can be added to the current combination
      for (let i = start; i <= n; i++) {
        // Add current number to combination
        currCombination.push(i);
        // Recursively generate combinations with remaining numbers
        backtrack(i + 1, currCombination);
        // Backtrack by removing the last added number
        currCombination.pop();
      }
    };

    backtrack(1, []);
    return result;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  const result1 = solution.combine(4, 2);
  const expected1 = [
    [1, 2],
    [1, 3],
    [1, 4],
    [2, 3],
    [2, 4],
    [3, 4],
  ];
  console.log(`Test 1: ${JSON.stringify(result1) === JSON.stringify(expected1) ? "PASS" : "FAIL"}`);

  const result2 = solution.combine(1, 1);
  console.log(`Test 2: ${JSON.stringify(result2) === JSON.stringify([[1]]) ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
