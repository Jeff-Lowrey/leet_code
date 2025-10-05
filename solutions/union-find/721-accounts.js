I'll help you create a solution for the Accounts Merge problem in JavaScript. I'll write a complete implementation with comments and proper structure.

```javascript
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
```

This implementation provides a solution to the Accounts Merge problem using a Union-Find (Disjoint Set) data structure. Here's a breakdown of the key components:

1. `UnionFind` class implementation for managing connected components with path compression and union by rank optimizations.

2. `accountsMerge` function that:
   - Creates a UnionFind data structure
   - Maps emails to account indices
   - Merges accounts with common emails
   - Groups emails by parent account
   - Returns the merged accounts in the required format

3. Test cases and example usage to demonstrate the functionality

The solution handles the following requirements:
- Merges accounts that share common emails
- Maintains the name from the original account
- Sorts emails within each merged account
- Handles edge cases like duplicate emails and multiple accounts for the same person

The code is structured with clear comments and follows JavaScript best practices. It can be run directly or imported as a module in other files.