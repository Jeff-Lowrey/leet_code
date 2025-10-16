/**
 * # Difficulty: Medium
 *
 * # 49. Group Anagrams
 *
 * This problem demonstrates key concepts in Hash Tables and String manipulation.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[["eat", "tea", "ate"]</dd>
 * <dt>Output:</dt>
 * <dd>1</dd>
 * <dt>Explanation:</dt>
 * <dd>Words ['eat','tea','ate'] are anagrams grouped together, as are ['tan','nat'], and ['bat'] alone</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * Anagrams are words that contain the same characters with the same frequencies, just rearranged.
 * To group anagrams together, we need a way to identify which words are anagrams of each other.
 * The key insight is that anagrams will have the same "signature" - either the same sorted string
 * or the same character frequency pattern.
 *
 * ### APPROACH:
 * 1. **Create signature for each word**: Sort characters or count character frequencies
 * 2. **Use signature as hash key**: Group words with the same signature together
 * 3. **Build groups**: Use a hash map where keys are signatures and values are lists of anagrams
 * 4. **Return all groups**: Extract all values from the hash map
 *
 * ### WHY THIS WORKS:
 * - Anagrams have identical sorted strings (e.g., "eat" and "tea" both become "aet")
 * - Hash map provides O(1) average time for grouping
 * - All words with the same signature are guaranteed to be anagrams
 * - This approach naturally groups anagrams without comparing every pair
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: strs = ["eat","tea","tan","ate","nat","bat"]
 *
 * Step 1: Process "eat"
 *   - Sort: "aet"
 *   - Map: {"aet": ["eat"]}
 *
 * Step 2: Process "tea"
 *   - Sort: "aet"
 *   - Map: {"aet": ["eat", "tea"]}
 *
 * Step 3: Process "tan"
 *   - Sort: "ant"
 *   - Map: {"aet": ["eat", "tea"], "ant": ["tan"]}
 *
 * Step 4: Process "ate"
 *   - Sort: "aet"
 *   - Map: {"aet": ["eat", "tea", "ate"], "ant": ["tan"]}
 *
 * Step 5: Process "nat"
 *   - Sort: "ant"
 *   - Map: {"aet": ["eat", "tea", "ate"], "ant": ["tan", "nat"]}
 *
 * Step 6: Process "bat"
 *   - Sort: "abt"
 *   - Map: {"aet": ["eat", "tea", "ate"], "ant": ["tan", "nat"], "abt": ["bat"]}
 *
 * Output: [["eat","tea","ate"], ["tan","nat"], ["bat"]]
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n * k log k)
 * Where n is the number of strings and k is the maximum length of a string. For each string,
 * we sort it (O(k log k)). If we use character counting instead, it's O(n * k).
 *
 * ### SPACE COMPLEXITY:
 * O(n * k)
 * We store all n strings in the hash map, and the total space for storing them is O(n * k).
 *
 * ### EDGE CASES:
 * - Empty array: Return empty array
 * - Single string: Return array with one group containing that string
 * - No anagrams: Each string in its own group
 * - All anagrams: Single group with all strings
 * - Empty strings: Empty strings are anagrams of each other
 *
 * </details>
 */

/**
 * Main solution for Problem 49: Group Anagrams
 *
 * @param {string[]} strs - Array of strings to group
 * @return {string[][]} - Array of grouped anagrams
 *
 * Time Complexity: O(n * k log k) where n is number of strings, k is max string length
 * Space Complexity: O(n * k) for the hash map storage
 */
function solve(strs) {
  const anagramGroups = new Map();

  for (const str of strs) {
    // Sort the string to create a key
    const key = str.split("").sort().join("");

    // Add to the group
    if (!anagramGroups.has(key)) {
      anagramGroups.set(key, []);
    }
    anagramGroups.get(key).push(str);
  }

  // Return all groups as an array
  return Array.from(anagramGroups.values());
}

/**
 * Test cases for Problem 49: Group Anagrams
 */
function testSolution() {
  console.log("Testing 49. Group Anagrams");

  // Helper to sort arrays of arrays for comparison
  const sortGroups = (groups) => {
    return groups.map((g) => g.sort()).sort((a, b) => a[0].localeCompare(b[0]));
  };

  // Test case 1: Basic grouping
  const result1 = solve(["eat", "tea", "tan", "ate", "nat", "bat"]);
  const expected1 = [["bat"], ["nat", "tan"], ["ate", "eat", "tea"]];
  console.assert(
    JSON.stringify(sortGroups(result1)) ===
      JSON.stringify(sortGroups(expected1)),
    `Test 1 failed`,
  );

  // Test case 2: Empty string
  const result2 = solve([""]);
  console.assert(
    result2.length === 1 && result2[0].length === 1 && result2[0][0] === "",
    `Test 2 failed`,
  );

  // Test case 3: Single character
  const result3 = solve(["a"]);
  console.assert(
    result3.length === 1 && result3[0][0] === "a",
    `Test 3 failed`,
  );

  console.log("All test cases passed for 49. Group Anagrams!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 49. Group Anagrams ===");
  console.log("Category: Strings");
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
 * - This solution focuses on strings concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
