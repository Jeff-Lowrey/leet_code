/**
 * Difficulty: Medium
 *
 * [Problem description goes here]
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[input description]</dd>
 * <dt>Output:</dt>
 * <dd>[output description]</dd>
 * <dt>Explanation:</dt>
 * <dd>[explanation]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * [High-level insight or key observation]
 *
 * ### APPROACH:
 * [Detailed explanation of the solution approach]
 *
 * ### WHY THIS WORKS:
 * - [Explanation of correctness]
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * [example input]
 * ```
 * **Step 1:** [description]
 * **Step 2:** [description]
 *
 * ### TIME COMPLEXITY:
 * **O(?)** - [explanation]
 *
 * ### SPACE COMPLEXITY:
 * **O(?)** - [explanation]
 *
 * ### EDGE CASES:
 * - **[Edge case 1]:** [how it's handled]
 * - **[Edge case 2]:** [how it's handled]
 *
 * </details>
 */

/**
 * Union-Find data structure for efficient grouping
 */
class UnionFind {
    constructor(n) {
        this.parent = Array.from({length: n}, (_, i) => i);
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
        const mergedAccount = [accounts[accountIdx][0], ...Array.from(emails).sort()];
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
    console.log('Testing 721. Accounts Merge');

    // Test case 1: Basic merge case
    const accounts1 = [
        ["John", "johnsmith@mail.com", "john_newyork@mail.com"],
        ["John", "johnsmith@mail.com", "john00@mail.com"],
        ["Mary", "mary@mail.com"],
        ["John", "johnnybravo@mail.com"]
    ];
    const result1 = accountsMerge(accounts1);
    const expected1 = [
        ["John", "john00@mail.com", "john_newyork@mail.com", "johnsmith@mail.com"],
        ["Mary", "mary@mail.com"],
        ["John", "johnnybravo@mail.com"]
    ];
    // Sort both for comparison since order doesn't matter
    result1.sort();
    expected1.sort();
    console.assert(JSON.stringify(result1) === JSON.stringify(expected1),
        `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`);

    // Test case 2: No merging needed
    const accounts2 = [
        ["Gabe", "Gabe0@m.co", "Gabe3@m.co", "Gabe1@m.co"],
        ["Kevin", "Kevin3@m.co", "Kevin5@m.co", "Kevin0@m.co"],
        ["Ethan", "Ethan5@m.co", "Ethan4@m.co", "Ethan0@m.co"]
    ];
    const result2 = accountsMerge(accounts2);
    const expected2 = [
        ["Gabe", "Gabe0@m.co", "Gabe1@m.co", "Gabe3@m.co"],
        ["Kevin", "Kevin0@m.co", "Kevin3@m.co", "Kevin5@m.co"],
        ["Ethan", "Ethan0@m.co", "Ethan4@m.co", "Ethan5@m.co"]
    ];
    result2.sort();
    expected2.sort();
    console.assert(JSON.stringify(result2) === JSON.stringify(expected2),
        `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`);

    // Test case 3: Single account
    const accounts3 = [["David", "david@gmail.com"]];
    const result3 = accountsMerge(accounts3);
    const expected3 = [["David", "david@gmail.com"]];
    console.assert(JSON.stringify(result3) === JSON.stringify(expected3),
        `Test 3 failed: expected ${JSON.stringify(expected3)}, got ${JSON.stringify(result3)}`);

    // Test case 4: Complex merge case
    const accounts4 = [
        ["Alex", "alex@gmail.com"],
        ["Bob", "bob@gmail.com"],
        ["Alex", "alex@yahoo.com", "alex@gmail.com"]
    ];
    const result4 = accountsMerge(accounts4);
    const expected4 = [
        ["Alex", "alex@gmail.com", "alex@yahoo.com"],
        ["Bob", "bob@gmail.com"]
    ];
    result4.sort();
    expected4.sort();
    console.assert(JSON.stringify(result4) === JSON.stringify(expected4),
        `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(result4)}`);

    // Test case 5: Empty accounts (edge case)
    const accounts5 = [];
    const result5 = accountsMerge(accounts5);
    const expected5 = [];
    console.assert(JSON.stringify(result5) === JSON.stringify(expected5),
        `Test 5 failed: expected ${JSON.stringify(expected5)}, got ${JSON.stringify(result5)}`);

    // Test alternative implementation
    const result6 = accountsMergeAlternative(accounts1);
    result6.sort();
    console.assert(JSON.stringify(result6) === JSON.stringify(expected1),
        `Alternative test failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result6)}`);

    console.log('All test cases passed for 721. Accounts Merge!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 721. Accounts Merge ===');
    console.log('Category: Union Find');
    console.log('Difficulty: Medium');
    console.log('');

    // Example 1: Basic merge case
    const accounts1 = [
        ["John", "johnsmith@mail.com", "john_newyork@mail.com"],
        ["John", "johnsmith@mail.com", "john00@mail.com"],
        ["Mary", "mary@mail.com"],
        ["John", "johnnybravo@mail.com"]
    ];
    const result1 = accountsMerge(accounts1);
    console.log(`accountsMerge(${JSON.stringify(accounts1)}) ->`);
    console.log(JSON.stringify(result1));
    console.log('Analysis: John\'s first two accounts share "johnsmith@mail.com" so they merge');

    // Example 2: No merging case
    const accounts2 = [
        ["David", "david@gmail.com", "david@yahoo.com"],
        ["Alex", "alex@gmail.com"]
    ];
    const result2 = accountsMerge(accounts2);
    console.log(`\naccountsMerge(${JSON.stringify(accounts2)}) ->`);
    console.log(JSON.stringify(result2));
    console.log('Analysis: No shared emails, so accounts remain separate');

    // Example 3: Algorithm comparison
    console.log(`\nAlgorithm comparison:`);
    const testAccounts = [
        ["Alice", "alice@mail.com", "alice@yahoo.com"],
        ["Bob", "bob@mail.com"],
        ["Alice", "alice@mail.com", "alice@hotmail.com"]
    ];
    const approaches = [
        ['Union-Find approach', accountsMerge],
        ['DFS approach', accountsMergeAlternative]
    ];

    for (const [name, method] of approaches) {
        const result = method(testAccounts);
        console.log(`${name}: ${JSON.stringify(result)}`);
    }

    console.log(`\nKey insights:`);
    console.log(`1. Union-Find groups accounts with shared emails efficiently`);
    console.log(`2. Email-to-account mapping detects shared emails`);
    console.log(`3. Transitivity: if A shares with B and B shares with C, A-B-C merge`);
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
    demonstrateSolution
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
