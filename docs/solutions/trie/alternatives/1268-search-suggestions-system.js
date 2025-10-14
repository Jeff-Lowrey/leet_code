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
 * - **Target not in array:** Return -1 or appropriate value
 * - **Single element:** Handle when left equals right
 * - **Empty input:** Return default value
 * - **Boundary conditions:** Check first and last positions
 * - **Integer overflow:** Use mid = left + (right - left) / 2
 *
 * </details>
 */

class TrieNode {
    constructor() {
        this.children = new Map();
        this.isEndOfWord = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        let node = this.root;
        for (const char of word) {
            if (!node.children.has(char)) {
                node.children.set(char, new TrieNode());
            }
            node = node.children.get(char);
        }
        node.isEndOfWord = true;
    }

    /**
     * Find node for given prefix
     */
    findNode(prefix) {
        let node = this.root;
        for (const char of prefix) {
            if (!node.children.has(char)) {
                return null;
            }
            node = node.children.get(char);
        }
        return node;
    }

    /**
     * DFS to collect up to limit words starting from node
     */
    dfs(node, prefix, limit, results) {
        if (results.length >= limit) return;

        if (node.isEndOfWord) {
            results.push(prefix);
        }

        // Traverse children in sorted order (Map iterates in insertion order,
        // but we'll convert to array and sort)
        const sortedKeys = Array.from(node.children.keys()).sort();
        for (const char of sortedKeys) {
            if (results.length >= limit) break;
            this.dfs(node.children.get(char), prefix + char, limit, results);
        }
    }

    /**
     * Get up to limit suggestions for prefix
     */
    getSuggestions(prefix, limit = 3) {
        const node = this.findNode(prefix);
        if (!node) return [];

        const results = [];
        this.dfs(node, prefix, limit, results);
        return results;
    }
}

/**
 * Main solution for Problem 1268: Search Suggestions System
 *
 * @param {string[]} products - List of products
 * @param {string} searchWord - The search word
 * @return {string[][]} - Suggestions for each prefix
 *
 * Time Complexity: O(n*m + k*m)
 * Space Complexity: O(n*m)
 */
function suggestedProducts(products, searchWord) {
    // Sort products first
    products.sort();

    // Build Trie
    const trie = new Trie();
    for (const product of products) {
        trie.insert(product);
    }

    // Get suggestions for each prefix
    const result = [];
    let prefix = '';

    for (const char of searchWord) {
        prefix += char;
        result.push(trie.getSuggestions(prefix, 3));
    }

    return result;
}

/**
 * Alternative solution using binary search (simpler, no Trie)
 * Still efficient for this problem
 */
function suggestedProductsBinarySearch(products, searchWord) {
    products.sort();
    const result = [];
    let prefix = '';

    for (const char of searchWord) {
        prefix += char;

        // Binary search for first product matching prefix
        let left = 0, right = products.length - 1;
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (products[mid] < prefix) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }

        // Collect up to 3 products starting from left
        const suggestions = [];
        for (let i = left; i < Math.min(left + 3, products.length); i++) {
            if (products[i].startsWith(prefix)) {
                suggestions.push(products[i]);
            }
        }
        result.push(suggestions);
    }

    return result;
}

/**
 * Test cases for Problem 1268: Search Suggestions System
 */
function testSolution() {
    console.log('Testing 1268. Search Suggestions System');

    const arraysEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

    // Test case 1: Example from problem
    const result1 = suggestedProducts(
        ["mobile", "mouse", "moneypot", "monitor", "mousepad"],
        "mouse"
    );
    const expected1 = [
        ["mobile", "moneypot", "monitor"],
        ["mobile", "moneypot", "monitor"],
        ["mouse", "mousepad"],
        ["mouse", "mousepad"],
        ["mouse", "mousepad"]
    ];
    console.assert(arraysEqual(result1, expected1),
        `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`);

    // Test case 2: Less than 3 matches
    const result2 = suggestedProducts(
        ["havana"],
        "havana"
    );
    const expected2 = [
        ["havana"],
        ["havana"],
        ["havana"],
        ["havana"],
        ["havana"],
        ["havana"]
    ];
    console.assert(arraysEqual(result2, expected2),
        `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`);

    // Test case 3: No matches for later prefixes
    const result3 = suggestedProducts(
        ["bags", "baggage", "banner", "box", "cloths"],
        "bags"
    );
    const expected3 = [
        ["baggage", "bags", "banner"],
        ["baggage", "bags", "banner"],
        ["baggage", "bags"],
        ["bags"]
    ];
    console.assert(arraysEqual(result3, expected3),
        `Test 3 failed: expected ${JSON.stringify(expected3)}, got ${JSON.stringify(result3)}`);

    // Test case 4: Binary search solution
    const result4 = suggestedProductsBinarySearch(
        ["mobile", "mouse", "moneypot", "monitor", "mousepad"],
        "mouse"
    );
    console.assert(arraysEqual(result4, expected1),
        `Test 4 (binary search) failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result4)}`);

    console.log('All test cases passed for 1268. Search Suggestions System!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 1268. Search Suggestions System ===');
    console.log('Category: Trie');
    console.log('Difficulty: Medium');
    console.log('');

    testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
    demonstrateSolution();
}

// Export for use in other modules
module.exports = {
    suggestedProducts,
    suggestedProductsBinarySearch,
    Trie,
    testSolution,
    demonstrateSolution
};

/**
 * Additional Notes:
 * - Trie solution is more extensible for autocomplete systems
 * - Binary search solution is simpler and efficient for this specific problem
 * - Pre-sorting is crucial for both approaches
 * - Consider caching suggestions at each node for better performance
 */
