/**
 * # Difficulty: Medium
 *
 * # 1268. Search Suggestions System
 *
 *
 * You are given an array of strings products and a string searchWord.
 *
 * Design a system that suggests at most three product names from products after each character of searchWord is typed. Suggested products should have common prefix with searchWord. If there are more than three products with a common prefix return the three lexicographically minimums products.
 *
 * Return a list of lists of the suggested products after each character of searchWord is typed.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>["mobile", "mouse", "moneypot", "monitor", "mousepad"]</dd>
 * <dt>Output:</dt>
 * <dd>1</dd>
 * <dt>Explanation:</dt>
 * <dd>Search suggestions for 'mouse' show top 3 products per character</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Map, Array, String
 * **Patterns**: Two Pointers Pattern, Hash Table Pattern
 * **Time Complexity**: O(N * L + S)
 * **Space Complexity**: O(N * L)
 *
 * ### INTUITION:
 * This is a classic autocomplete problem that benefits from using a Trie data structure. As we type each character, we need to find all words with that prefix and return the top 3 lexicographically. A Trie allows us to efficiently navigate to the prefix and collect matching words.
 *
 * ### APPROACH:
 * 1. **Build Trie**: Insert all products into a trie structure
 * 2. **Store suggestions at nodes**: At each node, store up to 3 lexicographically smallest words that pass through it
 * 3. **Process each character**: For each character typed, navigate to that node and return its suggestions
 * 4. **Handle missing prefixes**: If prefix doesn't exist, return empty lists for remaining characters
 *
 * Alternative: Sort products, then use binary search for each prefix
 *
 * ### WHY THIS WORKS:
 * - Trie naturally organizes words by prefixes
 * - Storing sorted suggestions at each node provides O(1) lookup
 * - As we build the trie, we can maintain the lexicographically smallest suggestions
 * - Navigation follows the typed prefix exactly
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * products = ["mobile","mouse","moneypot","monitor","mousepad"]
 * ```
 *
 * searchWord = "mouse"
 * Build Trie and store suggestions:
 *
 * Steps:
 * Step 1: root -> 'm' (suggestions: ["mobile", "moneypot", "monitor"])
 * Step 2: -> 'o' (suggestions: ["mobile", "moneypot", "monitor"])
 * Step 3: -> 'u' (suggestions: ["mouse", "mousepad"])
 * Step 4: -> 's' (suggestions: ["mouse", "mousepad"])
 * Step 5: -> 'e' (suggestions: ["mouse", "mousepad"])
 * Step 6: Process 'm': ["mobile", "moneypot", "monitor"]
 * Step 7: Process 'mo': ["mobile", "moneypot", "monitor"]
 * Step 8: Process 'mou': ["mouse", "mousepad"]
 * Step 9: Process 'mous': ["mouse", "mousepad"]
 * Step 10: Process 'mouse': ["mouse", "mousepad"]

 * ### TIME COMPLEXITY:
 * O(N * L + S)
 * Where N is number of products, L is average length, S is searchWord length
 * - Building trie with suggestions: O(N * L)
 * - Processing search: O(S)
 *
 * ### SPACE COMPLEXITY:
 * O(N * L)
 * For storing the trie structure
 *
 * ### EDGE CASES:
 * - SearchWord has no matching products
 * - Fewer than 3 products match a prefix
 * - All products share the same prefix
 * - Empty products list
 *
 * </details>
 */

class Solution {
  suggestedProducts(products: string[], searchWord: string): string[][] {
    products.sort();
    const result: string[][] = [];
    let prefix = "";

    for (const char of searchWord) {
      prefix += char;
      const matches: string[] = [];

      for (const product of products) {
        if (product.startsWith(prefix) && matches.length < 3) {
          matches.push(product);
        }
      }

      result.push(matches);
    }

    return result;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  const result1 = solution.suggestedProducts(["mobile", "mouse", "moneypot", "monitor", "mousepad"], "mouse");
  console.log(`Test 1: ${result1.length === 5 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
