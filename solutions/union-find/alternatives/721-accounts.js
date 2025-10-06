/**
 * 721. Accounts
 * Medium
 *
 * Accounts Merge - Solution using Union Find (Disjoint Set) data structure Time Complexity: O(N K log(N)) where N is number of accounts and K is average length of email lists Space Complexity: O(N K) where N is number of accounts and K is average length of email lists
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Accounts is to understand the core problem pattern
 * and apply the most efficient algorithmic approach.
 *
 * ### APPROACH:
 * 1. Analyze the problem requirements
 * 2. Choose the optimal data structure
 * 3. Implement the solution step by step
 * 4. Handle edge cases appropriately
 *
 * ### WHY THIS WORKS:
 * This approach works because it leverages the fundamental properties of the problem
 * to achieve an efficient solution.
 *
 * ### EXAMPLE WALKTHROUGH:
 * For a typical input, the algorithm processes the data systematically
 * to produce the expected output.
 *
 * </details>
 */

/**
 * Accounts Merge - Solution using Union Find (Disjoint Set) data structure
 * Time Complexity: O(N * K * log(N)) where N is number of accounts and K is average length of email lists
 * Space Complexity: O(N * K) where N is number of accounts and K is average length of email lists
 */

/**
 * UnionFind class implementation for managing connected components
 */
class UnionFind {
    constructor(size) {
        this.parent = Array(size).fill(0).map((_, i) => i);
        this.rank = Array(size).fill(0);
    }

    /**
     * Finds the parent of a node with path compression
     * @param {number} x - The node to find parent for
     * @returns {number} The parent node
     */
    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    }

    /**
     * Unions two sets by rank
     * @param {number} x - First node
     * @param {number} y - Second node
     */
    union(x, y) {
        let rootX = this.find(x);
        let rootY = this.find(y);

        if (rootX !== rootY) {
            if (this.rank[rootX] < this.rank[rootY]) {
                [rootX, rootY] = [rootY, rootX];
            }
            this.parent[rootY] = rootX;
            if (this.rank[rootX] === this.rank[rootY]) {
                this.rank[rootX]++;
            }
        }
    }
}

/**
 * Merges accounts with common emails
 * @param {string[][]} accounts - Array of accounts where each account is [name, email1, email2, ...]
 * @returns {string[][]} Merged accounts
 */
function accountsMerge(accounts) {
    // Create UnionFind data structure
    const uf = new UnionFind(accounts.length);
    
    // Map to store email to account index mapping
    const emailToAccount = new Map();

    // Process all accounts and union accounts with common emails
    for (let i = 0; i < accounts.length; i++) {
        const emails = accounts[i].slice(1); // Skip the name
        
        for (const email of emails) {
            if (emailToAccount.has(email)) {
                // If email already exists, union current account with existing account
                uf.union(i, emailToAccount.get(email));
            } else {
                // Add new email to mapping
                emailToAccount.set(email, i);
            }
        }
    }

    // Map to store merged accounts
    const merged = new Map();

    // Process all accounts and group emails by parent account
    for (const [email, accountIndex] of emailToAccount.entries()) {
        const parent = uf.find(accountIndex);
        
        if (!merged.has(parent)) {
            merged.set(parent, new Set());
        }
        merged.get(parent).add(email);
    }

    // Convert merged accounts to required format
    const result = [];
    for (const [accountIndex, emails] of merged.entries()) {
        const name = accounts[accountIndex][0];
        const sortedEmails = Array.from(emails).sort();
        result.push([name, ...sortedEmails]);
    }

    return result;
}

// Example usage and test cases
const testCases = [
    [
        ["John", "john@example.com", "john@example.org"],
        ["John", "john@example.org", "john@example.net"],
        ["Mary", "mary@example.com"]
    ],
    [
        ["Alex", "alex@example.com"],
        ["Alex", "alex@example.org"],
        ["Alex", "alex@example.org"]
    ]
];

// Run test cases
testCases.forEach((test, index) => {
    console.log(`Test Case ${index + 1}:`);
    console.log('Input:', test);
    console.log('Output:', accountsMerge(test));
    console.log('---');
});

module.exports = accountsMerge;