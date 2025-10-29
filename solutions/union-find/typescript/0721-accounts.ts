/**
 * # Difficulty: Medium
 * 
 * # 0721. Accounts Merge
 * 
 * Given a list of accounts where each element accounts[i] is a list of strings, where the first element accounts[i][0] is a name, and the rest of the elements are emails representing emails of the account.
 * 
 * Now, we would like to merge these accounts. Two accounts definitely belong to the same person if there is some common email to both accounts. Note that even if two accounts have the same name, they may belong to different people as people could have the same name. A person can have any number of accounts initially, but all of their accounts definitely have the same name.
 * 
 * After merging the accounts, return the accounts in the following format: the first element of each account is the name, and the rest of the elements are emails in sorted order. The accounts themselves can be returned in any order.
 * 
 * **Example:**
 * 
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[["John", "johnsmith@mail.com", "john_newyork@mail.com"]]</dd>
 * <dt>Output:</dt>
 * <dd>1</dd>
 * <dt>Explanation:</dt>
 * <dd>Accounts merged by common emails</dd>
 * </dl>
 * 
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Set Operations
 * **Data Structures**: Hash Map, Hash Set, Array
 * **Patterns**: Hash Table Pattern, Divide and Conquer
 * **Time Complexity**: O(N × M × α(N))
 * **Space Complexity**: O(N × M)
 * 
 * ### INTUITION:
 * This is a classic Union-Find problem where we need to group accounts that belong to the same person. The key insight is that if two accounts share any email address, they belong to the same person and should be merged. We use Union-Find to efficiently group accounts with shared emails.
 * 
 * ### APPROACH:
 * 1. **Map emails to accounts**: Create a mapping from emails to account indices
 * 2. **Union accounts with shared emails**: Use Union-Find to group accounts that share emails
 * 3. **Collect emails by parent**: Group all emails under their root parent account
 * 4. **Format result**: Create merged accounts with sorted emails
 * 
 * ### WHY THIS WORKS:
 * - Union-Find efficiently manages grouping of accounts
 * - Email-to-account mapping allows us to detect shared emails
 * - Transitivity: if account A shares email with B, and B shares with C, then A, B, C belong to same person
 * - Union-Find naturally handles this transitivity
 * 
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * [["John","johnsmith@mail.com","john_newyork@mail.com"],
 * ```
 *
 * ["John","johnsmith@mail.com","john00@mail.com"],
 * ["Mary","mary@mail.com"],
 * ["John","johnnybravo@mail.com"]]
 * Step 1: Map emails to accounts
 *
 * Steps:
 * Step 1: - johnsmith@mail.com → account 0
 * Step 2: - john_newyork@mail.com → account 0
 * Step 3: - johnsmith@mail.com → already exists, union(0, 1)
 * Step 4: - john00@mail.com → account 1
 * Step 5: - mary@mail.com → account 2
 * Step 6: - johnnybravo@mail.com → account 3
 * Step 7: After union operations
 * Step 8: - Accounts 0 and 1 are connected (share johnsmith@mail.com)
 * Step 9: - Account 2 is separate
 * Step 10: - Account 3 is separate
 * Step 11: Group emails by parent
 * Step 12: - Parent 0: {johnsmith@mail.com, john_newyork@mail.com, john00@mail.com}
 * Step 13: - Parent 2: {mary@mail.com}
 * Step 14: - Parent 3: {johnnybravo@mail.com}
 *
 * Output:
 * ```
 * [["John","john00@mail.com","john_newyork@mail.com","johnsmith@mail.com"],
 * ["Mary","mary@mail.com"],
 * ["John","johnnybravo@mail.com"]]
 * ```

 * ### TIME COMPLEXITY:
 * O(N × M × α(N))
 * Where N is number of accounts, M is average emails per account, α is inverse Ackermann function
 * 
 * ### SPACE COMPLEXITY:
 * O(N × M)
 * For storing email mappings and Union-Find structure
 * 
 * ### EDGE CASES:
 * - Single account with one email
 * - Multiple accounts with no shared emails
 * - Accounts with same name but no shared emails
 * - Empty email lists (though problem guarantees at least one email)
 * 
 * </details>
 */

class Solution {
  /**
   * Merge accounts that share common emails using Union-Find.
   *
   *         Args:
   *             accounts: List of accounts where each account is a list containing
   *                      name followed by emails
   *
   *         Returns:
   *             List of merged accounts with emails sorted alphabetically
   *
   *         Time Complexity: O(N × M × α(N)) where N is accounts, M is avg emails per account
   *         Space Complexity: O(N × M) for email mappings and Union-Find structure
   */
  accountsMerge(accounts: string[][]): string[][] {
    // Implementation
    n = accounts.length
    uf = UnionFind(n)
    email_to_account: dict[Any, Any] = {}
    for (let i = 0; i < accounts.length; i++) {
        const account = accounts.get(i);
    for email in account.get(1:):
    if (email_to_account.has(email)) {
  }

  /**
   * Alternative implementation using DFS-based approach.
   *
   *         Args:
   *             accounts: List of accounts
   *
   *         Returns:
   *             List of merged accounts with sorted emails
   */
  accountsMergeAlternative(accounts: string[][]): string[][] {
    // Implementation
    email_to_accounts: dict.get(Any, list[Any)] = defaultdict(list)
    for (let i = 0; i < accounts.length; i++) {
        const account = accounts.get(i);
    for email in account.get(1:):
    email_to_accounts.get(email).append(i)
    visited = [false] * accounts.length
    result = []
  }
}

// Test cases
if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  test_solution()
  # Example usage
  solution = Solution()
  console.log("=== 721. Accounts Merge ===")
  # Example 1: Basic case
  accounts = [
  ["John", "johnsmith@mail.com", "john_newyork@mail.com"],
  ["John", "johnsmith@mail.com", "john00@mail.com"],
  ["Mary", "mary@mail.com"],
  ["John", "johnnybravo@mail.com"],
  ]
  result = solution.accountsMerge(accounts)
  console.log(`Input: {accounts}`)
  console.log(`Output: result`)
  console.log("Analysis: John's first two accounts share 'johnsmith@mail.com' so they merge")
  # Example 2: No merging case
  accounts2 = [["David", "david@gmail.com", "david@yahoo.com"], ["Alex", "alex@gmail.com"]]
  result2 = solution.accountsMerge(accounts2)
  console.log(`\nInput: {accounts2}`)
  console.log(`Output: {result2}`)
  console.log("Analysis: No shared emails, so accounts remain separate")
  console.log("\nKey insights:")
  console.log("1. Union-Find groups accounts with shared emails efficiently")
  console.log("2. Email-to-account mapping detects shared emails")
  console.log("3. Transitivity: if A shares with B and B shares with C, A-B-C merge")
  console.log("4. Time: O(N×M×α(N)), Space: O(N×M)")
  console.log("5. Result emails must be sorted alphabetically")
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;