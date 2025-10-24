/**
 * # Difficulty: Medium
 *
 * # 721. Accounts Merge
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
 * <dd>[["John", "johnsmith@mail.com", "john_newyork@mail.com"]</dd>
 * <dt>Output:</dt>
 * <dd>1</dd>
 * <dt>Explanation:</dt>
 * <dd>Accounts merged by common emails</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary> * ### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Set Operations
 * **Data Structures**: Hash Map, Hash Set, Array
 * **Patterns**: Hash Table Pattern, Divide and Conquer
 * **Time Complexity**: * O(N × M × α(N))
 * **Space Complexity**: * O(N × M)

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

### TIME COMPLEXITY:
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

/**
 * Union-Find data structure for efficient grouping
 */
class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = new Array(n).fill(0);
  }

  /**
   * Find root with path compression
   * @param {number} x - Element to find root for
   * @returns {number} Root of the component
   */
  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  /**
   * Union by rank optimization
   * @param {number} x - First element
   * @param {number} y - Second element
   */
  union(x, y) {
    let px = this.find(x);
    let py = this.find(y);

    if (px === py) {
      return;
    }

    if (this.rank[px] < this.rank[py]) {
      [px, py] = [py, px];
    }

    this.parent[py] = px;
    if (this.rank[px] === this.rank[py]) {
      this.rank[px]++;
    }
  }
}

/**
 * Merge accounts that share common emails using Union-Find
 * @param {string[][]} accounts - Array of accounts, each starting with name followed by emails
 * @returns {string[][]} Merged accounts with sorted emails
 *
 * Time Complexity: O(N × M × α(N)) where N is accounts, M is avg emails per account
 * Space Complexity: O(N × M) for email mappings and Union-Find structure
 */
function accountsMerge(accounts) {
  const n = accounts.length;
  const uf = new UnionFind(n);

  // Map email to account index
  const emailToAccount = new Map();

  // Step 1: Build email to account mapping and union accounts with common emails
  for (let i = 0; i < accounts.length; i++) {
    const account = accounts[i];
    for (let j = 1; j < account.length; j++) {
      const email = account[j];
      if (emailToAccount.has(email)) {
        // If email already exists, union current account with existing account
        uf.union(i, emailToAccount.get(email));
      } else {
        // Map email to current account
        emailToAccount.set(email, i);
      }
    }
  }

  // Step 2: Group emails by their parent account
  const mergedAccounts = new Map();
  for (let i = 0; i < n; i++) {
    const parent = uf.find(i);
    if (!mergedAccounts.has(parent)) {
      mergedAccounts.set(parent, new Set());
    }
    // Add all emails from current account to parent's email set
    for (let j = 1; j < accounts[i].length; j++) {
      mergedAccounts.get(parent).add(accounts[i][j]);
    }
  }

  // Step 3: Format the result
  const result = [];
  for (const [accountIdx, emails] of mergedAccounts) {
    // Create merged account starting with name followed by sorted emails
    const mergedAccount = [
      accounts[accountIdx][0],
      ...Array.from(emails).sort(),
    ];
    result.push(mergedAccount);
  }

  return result;
}

/**
 * Alternative implementation using DFS-based approach
 * @param {string[][]} accounts - Array of accounts
 * @returns {string[][]} Merged accounts with sorted emails
 */
function accountsMergeAlternative(accounts) {
  // Build email to accounts mapping
  const emailToAccounts = new Map();
  for (let i = 0; i < accounts.length; i++) {
    for (let j = 1; j < accounts[i].length; j++) {
      const email = accounts[i][j];
      if (!emailToAccounts.has(email)) {
        emailToAccounts.set(email, []);
      }
      emailToAccounts.get(email).push(i);
    }
  }

  // DFS to find connected components
  const visited = new Array(accounts.length).fill(false);
  const result = [];

  function dfs(accountIdx, emails) {
    if (visited[accountIdx]) {
      return;
    }
    visited[accountIdx] = true;

    // Add all emails from current account
    for (let j = 1; j < accounts[accountIdx].length; j++) {
      const email = accounts[accountIdx][j];
      emails.add(email);

      // Visit all accounts that share this email
      for (const neighborIdx of emailToAccounts.get(email)) {
        if (!visited[neighborIdx]) {
          dfs(neighborIdx, emails);
        }
      }
    }
  }

  for (let i = 0; i < accounts.length; i++) {
    if (!visited[i]) {
      const emails = new Set();
      dfs(i, emails);
      const mergedAccount = [accounts[i][0], ...Array.from(emails).sort()];
      result.push(mergedAccount);
    }
  }

  return result;
}

/**
 * Test cases for Problem 721: Accounts Merge
 */
function testSolution() {
  console.log("Testing 721. Accounts Merge");

  // Test case 1: Basic merge case
  const accounts1 = [
    ["John", "johnsmith@mail.com", "john_newyork@mail.com"],
    ["John", "johnsmith@mail.com", "john00@mail.com"],
    ["Mary", "mary@mail.com"],
    ["John", "johnnybravo@mail.com"],
  ];
  const result1 = accountsMerge(accounts1);
  const expected1 = [
    ["John", "john00@mail.com", "john_newyork@mail.com", "johnsmith@mail.com"],
    ["Mary", "mary@mail.com"],
    ["John", "johnnybravo@mail.com"],
  ];
  // Sort both for comparison since order doesn't matter
  result1.sort();
  expected1.sort();
  console.assert(
    JSON.stringify(result1) === JSON.stringify(expected1),
    `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`,
  );

  // Test case 2: No merging needed
  const accounts2 = [
    ["Gabe", "Gabe0@m.co", "Gabe3@m.co", "Gabe1@m.co"],
    ["Kevin", "Kevin3@m.co", "Kevin5@m.co", "Kevin0@m.co"],
    ["Ethan", "Ethan5@m.co", "Ethan4@m.co", "Ethan0@m.co"],
  ];
  const result2 = accountsMerge(accounts2);
  const expected2 = [
    ["Gabe", "Gabe0@m.co", "Gabe1@m.co", "Gabe3@m.co"],
    ["Kevin", "Kevin0@m.co", "Kevin3@m.co", "Kevin5@m.co"],
    ["Ethan", "Ethan0@m.co", "Ethan4@m.co", "Ethan5@m.co"],
  ];
  result2.sort();
  expected2.sort();
  console.assert(
    JSON.stringify(result2) === JSON.stringify(expected2),
    `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`,
  );

  // Test case 3: Single account
  const accounts3 = [["David", "david@gmail.com"]];
  const result3 = accountsMerge(accounts3);
  const expected3 = [["David", "david@gmail.com"]];
  console.assert(
    JSON.stringify(result3) === JSON.stringify(expected3),
    `Test 3 failed: expected ${JSON.stringify(expected3)}, got ${JSON.stringify(result3)}`,
  );

  // Test case 4: Complex merge case
  const accounts4 = [
    ["Alex", "alex@gmail.com"],
    ["Bob", "bob@gmail.com"],
    ["Alex", "alex@yahoo.com", "alex@gmail.com"],
  ];
  const result4 = accountsMerge(accounts4);
  const expected4 = [
    ["Alex", "alex@gmail.com", "alex@yahoo.com"],
    ["Bob", "bob@gmail.com"],
  ];
  result4.sort();
  expected4.sort();
  console.assert(
    JSON.stringify(result4) === JSON.stringify(expected4),
    `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(result4)}`,
  );

  // Test case 5: Empty accounts (edge case)
  const accounts5 = [];
  const result5 = accountsMerge(accounts5);
  const expected5 = [];
  console.assert(
    JSON.stringify(result5) === JSON.stringify(expected5),
    `Test 5 failed: expected ${JSON.stringify(expected5)}, got ${JSON.stringify(result5)}`,
  );

  // Test alternative implementation
  const result6 = accountsMergeAlternative(accounts1);
  result6.sort();
  console.assert(
    JSON.stringify(result6) === JSON.stringify(expected1),
    `Alternative test failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result6)}`,
  );

  console.log("All test cases passed for 721. Accounts Merge!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 721. Accounts Merge ===");
  console.log("Category: Union Find");
  console.log("Difficulty: Medium");
  console.log("");

  // Example 1: Basic merge case
  const accounts1 = [
    ["John", "johnsmith@mail.com", "john_newyork@mail.com"],
    ["John", "johnsmith@mail.com", "john00@mail.com"],
    ["Mary", "mary@mail.com"],
    ["John", "johnnybravo@mail.com"],
  ];
  const result1 = accountsMerge(accounts1);
  console.log(`accountsMerge(${JSON.stringify(accounts1)}) ->`);
  console.log(JSON.stringify(result1));
  console.log(
    'Analysis: John\'s first two accounts share "johnsmith@mail.com" so they merge',
  );

  // Example 2: No merging case
  const accounts2 = [
    ["David", "david@gmail.com", "david@yahoo.com"],
    ["Alex", "alex@gmail.com"],
  ];
  const result2 = accountsMerge(accounts2);
  console.log(`\naccountsMerge(${JSON.stringify(accounts2)}) ->`);
  console.log(JSON.stringify(result2));
  console.log("Analysis: No shared emails, so accounts remain separate");

  // Example 3: Algorithm comparison
  console.log(`\nAlgorithm comparison:`);
  const testAccounts = [
    ["Alice", "alice@mail.com", "alice@yahoo.com"],
    ["Bob", "bob@mail.com"],
    ["Alice", "alice@mail.com", "alice@hotmail.com"],
  ];
  const approaches = [
    ["Union-Find approach", accountsMerge],
    ["DFS approach", accountsMergeAlternative],
  ];

  for (const [name, method] of approaches) {
    const result = method(testAccounts);
    console.log(`${name}: ${JSON.stringify(result)}`);
  }

  console.log(`\nKey insights:`);
  console.log(`1. Union-Find groups accounts with shared emails efficiently`);
  console.log(`2. Email-to-account mapping detects shared emails`);
  console.log(
    `3. Transitivity: if A shares with B and B shares with C, A-B-C merge`,
  );
  console.log(`4. Time complexity: O(N×M×α(N)), Space complexity: O(N×M)`);
  console.log(`5. Result emails must be sorted alphabetically`);

  testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
  demonstrateSolution();
}

// Export for use in other modules
module.exports = {
  accountsMerge,
  accountsMergeAlternative,
  UnionFind,
  testSolution,
  demonstrateSolution,
};

/**
 * Additional Notes:
 * - This solution uses Union-Find as the primary approach for its natural fit with grouping problems
 * - Time complexity is O(N×M×α(N)) where α is the inverse Ackermann function (practically constant)
 * - Space complexity is O(N×M) for email mappings and Union-Find structure
 * - The algorithm handles all edge cases including single accounts and no shared emails
 * - Essential insight: shared emails create equivalence relations between accounts
 * - Alternative DFS approach demonstrates graph-based thinking for the same problem
 */
