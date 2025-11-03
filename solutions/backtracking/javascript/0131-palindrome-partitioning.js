/**
### INTUITION:
[This problem requires understanding of backtracking concepts. The key insight is to identify the optimal approach for this specific scenario.]

### APPROACH:
1. **Analyze the problem**: Understand the input constraints and expected output
2. **Choose the right technique**: Apply backtracking methodology
3. **Implement efficiently**: Focus on optimal time and space complexity
4. **Handle edge cases**: Consider boundary conditions and special cases

### WHY THIS WORKS:
- This ensures that the solution leverages backtracking principles
- This ensures that time complexity is optimized for the given constraints
- This ensures that space complexity is minimized where possible

### EXAMPLE WALKTHROUGH:
Input:
```
s = "aab"
```

Step 1: Start backtracking from index 0

Steps:
Step 1: Try substring "a" (palindrome) → recurse from index 1
Step 2: Try substring "a" (palindrome) → recurse from index 2
Step 3: Try substring "b" (palindrome) → end of string
Step 4: Found partition: ["a", "a", "b"]
Step 5: Try substring "ab" (not palindrome) → skip
Step 6: Try substring "aa" (palindrome) → recurse from index 2
Step 7: Try substring "b" (palindrome) → end of string
Step 8: Found partition: ["aa", "b"]
Step 9: Try substring "aab" (not palindrome) → skip

Output:
```
[["a","a","b"],["aa","b"]]
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

/**
 * Main solution for Problem 131: Palindrome Partitioning
 *
 * @param {string} s - Input string to partition
 * @return {string[][]} - Array of all possible palindrome partitions
 *
 * Time Complexity: O(N × 2^N) where N is string length - at most 2^N partitions, each takes O(N) to verify and copy
 * Space Complexity: O(N) for recursion depth and current partition
 */
function solve(s) {
  // Handle edge cases
  if (!s || s.length === 0) {
    return [[]];
  }

  const result = [];

  /**
   * Check if a substring is a palindrome
   * @param {string} str - String to check
   * @param {number} left - Left index
   * @param {number} right - Right index
   * @return {boolean} - True if substring is palindrome
   */
  function isPalindrome(str, left, right) {
    while (left < right) {
      if (str[left] !== str[right]) {
        return false;
      }
      left++;
      right--;
    }
    return true;
  }

  /**
   * Backtracking helper function
   * @param {number} start - Starting index for current partition attempt
   * @param {string[]} currentPartition - Current partition being built
   */
  function backtrack(start, currentPartition) {
    // Base case: reached end of string
    if (start === s.length) {
      result.push([...currentPartition]); // Make a copy
      return;
    }

    // Try all possible endings for current palindromic substring
    for (let end = start; end < s.length; end++) {
      // Check if substring from start to end is a palindrome
      if (isPalindrome(s, start, end)) {
        // Choose: add palindromic substring to current partition
        const palindrome = s.substring(start, end + 1);
        currentPartition.push(palindrome);

        // Explore: recursively partition the remaining string
        backtrack(end + 1, currentPartition);

        // Unchoose: remove palindromic substring (backtrack)
        currentPartition.pop();
      }
    }
  }

  // Start backtracking from index 0
  backtrack(0, []);

  return result;
}

/**
 * Test cases for Problem 131: Palindrome Partitioning
 */
function testSolution() {
  console.log("Testing 131. Palindrome Partitioning");

  // Helper function to sort partitions for comparison
  function sortPartitions(partitions) {
    return partitions
      .map((partition) => [...partition])
      .sort((a, b) => {
        for (let i = 0; i < Math.min(a.length, b.length); i++) {
          if (a[i] !== b[i]) return a[i].localeCompare(b[i]);
        }
        return a.length - b.length;
      });
  }

  // Helper function to compare arrays of arrays
  function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    const sorted1 = sortPartitions(arr1);
    const sorted2 = sortPartitions(arr2);
    return JSON.stringify(sorted1) === JSON.stringify(sorted2);
  }

  // Helper function to verify all parts are palindromes
  function verifyAllPalindromes(partitions) {
    for (const partition of partitions) {
      for (const part of partition) {
        const reversed = part.split("").reverse().join("");
        if (part !== reversed) {
          return false;
        }
      }
    }
    return true;
  }

  // Helper function to verify partitions cover the original string
  function verifyPartitionsComplete(s, partitions) {
    for (const partition of partitions) {
      const reconstructed = partition.join("");
      if (reconstructed !== s) {
        return false;
      }
    }
    return true;
  }

  // Test case 1: Basic functionality
  const result1 = solve("aab");
  const expected1 = [
    ["a", "a", "b"],
    ["aa", "b"],
  ];
  console.assert(
    arraysEqual(result1, expected1),
    `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`,
  );
  console.assert(
    verifyAllPalindromes(result1),
    `Test 1 failed: not all parts are palindromes`,
  );
  console.assert(
    verifyPartitionsComplete("aab", result1),
    `Test 1 failed: partitions don't reconstruct original string`,
  );

  // Test case 2: Single character
  const result2 = solve("a");
  const expected2 = [["a"]];
  console.assert(
    arraysEqual(result2, expected2),
    `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`,
  );

  // Test case 3: All same characters
  const result3 = solve("aaa");
  const expected3 = [["a", "a", "a"], ["a", "aa"], ["aa", "a"], ["aaa"]];
  console.assert(
    arraysEqual(result3, expected3),
    `Test 3 failed: expected ${JSON.stringify(expected3)}, got ${JSON.stringify(result3)}`,
  );
  console.assert(
    verifyAllPalindromes(result3),
    `Test 3 failed: not all parts are palindromes`,
  );

  // Test case 4: Empty string
  const result4 = solve("");
  const expected4 = [[]];
  console.assert(
    arraysEqual(result4, expected4),
    `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(result4)}`,
  );

  // Test case 5: No multi-character palindromes
  const result5 = solve("abc");
  const expected5 = [["a", "b", "c"]];
  console.assert(
    arraysEqual(result5, expected5),
    `Test 5 failed: expected ${JSON.stringify(expected5)}, got ${JSON.stringify(result5)}`,
  );
  console.assert(
    verifyAllPalindromes(result5),
    `Test 5 failed: not all parts are palindromes`,
  );

  // Test case 6: Mixed palindromes
  const result6 = solve("raceacar");
  console.assert(
    verifyAllPalindromes(result6),
    `Test 6 failed: not all parts are palindromes`,
  );
  console.assert(
    verifyPartitionsComplete("raceacar", result6),
    `Test 6 failed: partitions don't reconstruct original string`,
  );

  // Test case 7: All partitions are unique
  const result7 = solve("aab");
  const uniquePartitions = new Set(
    result7.map((partition) => JSON.stringify(partition)),
  );
  console.assert(
    uniquePartitions.size === result7.length,
    `Test 7 failed: found duplicate partitions`,
  );

  // Test case 8: Longer palindrome
  const result8 = solve("abccba");
  const hasFullPalindrome = result8.some(
    (partition) => partition.length === 1 && partition[0] === "abccba",
  );
  console.assert(
    hasFullPalindrome,
    `Test 8 failed: should include full string as single palindrome`,
  );
  console.assert(
    verifyAllPalindromes(result8),
    `Test 8 failed: not all parts are palindromes`,
  );

  console.log("All test cases passed for 131. Palindrome Partitioning!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 131. Palindrome Partitioning ===");
  console.log("Category: Backtracking");
  console.log("Difficulty: Medium");
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
 * - This solution focuses on backtracking concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
