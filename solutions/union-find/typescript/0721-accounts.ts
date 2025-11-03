/**
### INTUITION:
This is a classic Union-Find problem where we need to group accounts that belong to the same person. The key insight is that if two accounts share any email address, they belong to the same person and should be merged. We use Union-Find to efficiently group accounts with shared emails.

### APPROACH:
1. **Map emails to accounts**: Create a mapping from emails to account indices
2. **Union accounts with shared emails**: Use Union-Find to group accounts that share emails
3. **Collect emails by parent**: Group all emails under their root parent account
4. **Format result**: Create merged accounts with sorted emails

### WHY THIS WORKS:
- This ensures that union-Find efficiently manages grouping of accounts
- This ensures that email-to-account mapping allows us to detect shared emails
- This ensures that transitivity: if account A shares email with B, and B shares with C, then A, B, C belong to same person
- This ensures that union-Find naturally handles this transitivity

### EXAMPLE WALKTHROUGH:
Input:
```
[["John","johnsmith@mail.com","john_newyork@mail.com"],
```

["John","johnsmith@mail.com","john00@mail.com"],
["Mary","mary@mail.com"],
["John","johnnybravo@mail.com"]]
Step 1: Map emails to accounts

Steps:
Step 1: - johnsmith@mail.com → account 0
Step 2: - john_newyork@mail.com → account 0
Step 3: - johnsmith@mail.com → already exists, union(0, 1)
Step 4: - john00@mail.com → account 1
Step 5: - mary@mail.com → account 2
Step 6: - johnnybravo@mail.com → account 3
Step 7: After union operations
Step 8: - Accounts 0 and 1 are connected (share johnsmith@mail.com)
Step 9: - Account 2 is separate
Step 10: - Account 3 is separate
Step 11: Group emails by parent
Step 12: - Parent 0: {johnsmith@mail.com, john_newyork@mail.com, john00@mail.com}
Step 13: - Parent 2: {mary@mail.com}
Step 14: - Parent 3: {johnnybravo@mail.com}

Output:
```
[["John","john00@mail.com","john_newyork@mail.com","johnsmith@mail.com"],
["Mary","mary@mail.com"],
["John","johnnybravo@mail.com"]]
```

### TIME COMPLEXITY:
O(N × M × α(N)** + N × M log M)** where N is the number of accounts and M is the average number of emails per account. Building the email-to-account mapping takes **O(N × M)**. Union operations for each email take **O(N × M × α(N)**) where α is the inverse Ackermann function (nearly constant). Grouping emails by root parent takes **O(N × M)**. Sorting emails within each group takes **O(N × M log M)** in the worst case. Total: **O(N × M × α(N)** + N × M log M) ≈ **O(N × M log M)**.

### SPACE COMPLEXITY:
O(N × M)** - We allocate parent and rank arrays of size N for Union-Find (**O(N)** space). The email-to-account hash map stores up to N × M email-to-index mappings (**O(N × M)** space). The result array stores all emails across all accounts (**O(N × M)** space). Total: **O(N)** + **O(N × M)** + **O(N × M)** = **O(N × M)**.

### EDGE CASES:
- **Empty accounts list**: accounts = [] returns empty array
- **Single account**: accounts = [["John","john@mail.com"]] returns same account with sorted emails
- **No shared emails**: Each account remains separate, just with emails sorted
- **All accounts share one email**: All accounts merge into one
- **Same name different people**: Accounts with same name but no shared emails stay separate
- **Transitive merging**: If A shares email with B, and B shares with C, all three merge even if A and C share no direct email

</details>

*/

class UnionFind {
  private parent: number[];
  private rank: number[];

  constructor(n: number) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = Array(n).fill(0);
  }

  find(x: number): number {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  union(x: number, y: number): void {
    const px = this.find(x);
    const py = this.find(y);

    if (px === py) return;

    if (this.rank[px] < this.rank[py]) {
      this.parent[px] = py;
    } else if (this.rank[px] > this.rank[py]) {
      this.parent[py] = px;
    } else {
      this.parent[py] = px;
      this.rank[px]++;
    }
  }
}

class Solution {
  /**
   * Merge accounts that share common emails using Union-Find.
   *
   * Args:
   *   accounts: List of accounts where each account is [name, email1, email2, ...]
   *
   * Returns:
   *   List of merged accounts with emails sorted alphabetically
   *
   * Time Complexity: O(N × M × α(N) + N × M log M)
   * Space Complexity: O(N × M)
   */
  accountsMerge(accounts: string[][]): string[][] {
    const n = accounts.length;
    const uf = new UnionFind(n);
    const emailToAccount = new Map<string, number>();

    // Build email-to-account mapping and union accounts with shared emails
    for (let i = 0; i < accounts.length; i++) {
      for (let j = 1; j < accounts[i].length; j++) {
        const email = accounts[i][j];
        if (emailToAccount.has(email)) {
          // This email exists in another account - union them
          uf.union(i, emailToAccount.get(email)!);
        } else {
          emailToAccount.set(email, i);
        }
      }
    }

    // Group emails by root parent
    const components = new Map<number, string[]>();
    for (const [email, accountIdx] of emailToAccount.entries()) {
      const root = uf.find(accountIdx);
      if (!components.has(root)) {
        components.set(root, []);
      }
      components.get(root)!.push(email);
    }

    // Build result with name and sorted emails
    const result: string[][] = [];
    for (const [rootIdx, emails] of components.entries()) {
      const name = accounts[rootIdx][0];
      emails.sort();
      result.push([name, ...emails]);
    }

    return result;
  }
}

// Test cases
if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log("=== 721. Accounts Merge ===\n");

  // Example 1: Basic merging case
  const accounts1 = [
    ["John", "johnsmith@mail.com", "john_newyork@mail.com"],
    ["John", "johnsmith@mail.com", "john00@mail.com"],
    ["Mary", "mary@mail.com"],
    ["John", "johnnybravo@mail.com"],
  ];
  const result1 = solution.accountsMerge(accounts1);
  console.log("Test 1: Basic merging");
  console.log("Input:", JSON.stringify(accounts1));
  console.log("Output:", JSON.stringify(result1));
  console.log("Analysis: John's first two accounts share 'johnsmith@mail.com' so they merge\n");

  // Example 2: No merging case
  const accounts2 = [
    ["David", "david@gmail.com", "david@yahoo.com"],
    ["Alex", "alex@gmail.com"]
  ];
  const result2 = solution.accountsMerge(accounts2);
  console.log("Test 2: No shared emails");
  console.log("Input:", JSON.stringify(accounts2));
  console.log("Output:", JSON.stringify(result2));
  console.log("Analysis: No shared emails, so accounts remain separate\n");

  console.log("Key insights:");
  console.log("1. Union-Find groups accounts with shared emails efficiently");
  console.log("2. Email-to-account mapping detects shared emails");
  console.log("3. Transitivity: if A shares with B and B shares with C, A-B-C merge");
  console.log("4. Time: O(N×M×α(N) + N×M log M), Space: O(N×M)");
  console.log("5. Result emails must be sorted alphabetically");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;