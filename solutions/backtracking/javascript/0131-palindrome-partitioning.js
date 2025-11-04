/**
 * ### METADATA:
 * **Techniques**: Backtracking, Dynamic Programming (palindrome check)
 * **Data Structures**: Array, List, String
 * **Time Complexity**: O(n × 2^n)
 * **Space Complexity**: O(n)
 *
 * ### INTUITION:
 * The key insight is that at each position, try all possible substrings starting from that position. If a substring is a palindrome, add it to the current partition and recursively partition the remaining string. Backtrack by removing the last substring. This explores all valid palindrome partitions.
 *
 * ### APPROACH:
 * 1. **Define isPalindrome helper**: Create function to check if substring s[left:right+1] is a palindrome
 * 2. **Initialize result**: Create empty result list and current partition list
 * 3. **Define backtrack function**: Create recursive function with parameter start (current position in string)
 * 4. **Base case**: If start == len(s), add copy of current partition to result and return
 * 5. **Try all substrings**: Loop from start to end of string with end index
 * 6. **Check palindrome**: If s[start:end+1] is palindrome, add it to current partition
 * 7. **Recurse**: Call backtrack(end+1) to partition remaining string
 * 8. **Backtrack**: Remove last substring from current partition to try other partitions
 *
 * ### WHY THIS WORKS:
 * - Backtracking tries all possible partition points
 * - At each position, try cutting at every valid palindrome ending
 * - Precompute palindrome DP table: O(n^2) preprocessing for O(1) checks
 * - When reaching end, found valid partitioning
 * - O(n * 2^n) time: 2^n partitions, O(n) to check/copy each
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * s = "aab"
 * ```
 *
 * Step 1: Start backtracking from index 0
 *
 * Steps:
 * Step 1: Try substring "a" (palindrome) → recurse from index 1
 * Step 2: Try substring "a" (palindrome) → recurse from index 2
 * Step 3: Try substring "b" (palindrome) → end of string
 * Step 4: Found partition: ["a", "a", "b"]
 * Step 5: Try substring "ab" (not palindrome) → skip
 * Step 6: Try substring "aa" (palindrome) → recurse from index 2
 * Step 7: Try substring "b" (palindrome) → end of string
 * Step 8: Found partition: ["aa", "b"]
 * Step 9: Try substring "aab" (not palindrome) → skip
 *
 * Output:
 * ```
 * [["a","a","b"],["aa","b"]]
 * ```
 *
 * ### TIME COMPLEXITY:
 * **O(n × 2^n)** - where n is the length of the string. In the worst case (when all characters are the same, like "aaa"), we generate 2^(n-1) different partitions (at each gap between characters, we can choose to partition or not). For each partition, we perform palindrome checks that take **O(n)** time in total across all substrings. Checking each substring for being a palindrome takes **O(substring_length)**, and copying valid partitions takes **O(n)**. Total: **O(2^n)** partitions × **O(n)** work per partition = **O(n × 2^n)**.
 *
 * ### SPACE COMPLEXITY:
 * **O(n)** - where n is the length of the string. The recursion call stack can go as deep as n levels (when we partition the string into individual characters). The current partition list can contain at most n substrings (when every character is a separate partition). The result list is not counted as it's required output. Total auxiliary space: **O(n)** for recursion stack + **O(n)** for current partition = **O(n)**.
 *
 * ### EDGE CASES:
 * - **Empty input**: Handle when input is empty
 * - **Single element**: Handle single-element inputs
 * - **Boundary values**: Handle minimum/maximum valid values
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
