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

class TrieNode {
    constructor() {
        this.children = new Map();
        this.isFolder = false;
    }
}

/**
 * Main solution for Problem 1233: Remove Sub-Folders from the Filesystem
 *
 * @param {string[]} folder - Array of folder paths
 * @return {string[]} - Array of folders after removing sub-folders
 *
 * Time Complexity: O(n * m * log n)
 * Space Complexity: O(n * m)
 */
function removeSubfolders(folder) {
    // Sort folders lexicographically
    folder.sort();

    const root = new TrieNode();
    const result = [];

    for (const path of folder) {
        // Split path into components (skip empty first element from leading '/')
        const parts = path.split('/').filter(p => p.length > 0);
        let node = root;
        let isSubFolder = false;

        // Traverse/build path in Trie
        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];

            // If we encounter a folder marker before reaching the end,
            // this path is a sub-folder
            if (node.isFolder) {
                isSubFolder = true;
                break;
            }

            if (!node.children.has(part)) {
                node.children.set(part, new TrieNode());
            }
            node = node.children.get(part);
        }

        // If not a sub-folder, mark as folder and add to result
        if (!isSubFolder) {
            node.isFolder = true;
            result.push(path);
        }
    }

    return result;
}

/**
 * Alternative solution using simple string prefix checking
 * Simpler but with similar time complexity
 */
function removeSubfoldersSimple(folder) {
    folder.sort();
    const result = [folder[0]];

    for (let i = 1; i < folder.length; i++) {
        const lastFolder = result[result.length - 1];
        // Check if current folder starts with last added folder + '/'
        // This ensures exact folder match (not just string prefix)
        if (!folder[i].startsWith(lastFolder + '/')) {
            result.push(folder[i]);
        }
    }

    return result;
}

/**
 * Test cases for Problem 1233: Remove Sub-Folders from the Filesystem
 */
function testSolution() {
    console.log('Testing 1233. Remove Sub-Folders from the Filesystem');

    // Helper to compare arrays (order-independent)
    const arraysEqual = (a, b) => {
        if (a.length !== b.length) return false;
        const sortedA = [...a].sort();
        const sortedB = [...b].sort();
        return sortedA.every((val, idx) => val === sortedB[idx]);
    };

    // Test case 1: Example from problem
    const result1 = removeSubfolders(["/a", "/a/b", "/c/d", "/c/d/e", "/c/f"]);
    const expected1 = ["/a", "/c/d", "/c/f"];
    console.assert(arraysEqual(result1, expected1),
        `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`);

    // Test case 2: No sub-folders
    const result2 = removeSubfolders(["/a", "/b", "/c"]);
    const expected2 = ["/a", "/b", "/c"];
    console.assert(arraysEqual(result2, expected2),
        `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`);

    // Test case 3: All are sub-folders except one
    const result3 = removeSubfolders(["/a", "/a/b", "/a/b/c", "/a/b/c/d"]);
    const expected3 = ["/a"];
    console.assert(arraysEqual(result3, expected3),
        `Test 3 failed: expected ${JSON.stringify(expected3)}, got ${JSON.stringify(result3)}`);

    // Test case 4: Similar prefixes but different paths
    const result4 = removeSubfolders(["/a/b/c", "/a/b/ca", "/a/b/d"]);
    const expected4 = ["/a/b/c", "/a/b/ca", "/a/b/d"];
    console.assert(arraysEqual(result4, expected4),
        `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(result4)}`);

    // Test case 5: Complex hierarchy
    const result5 = removeSubfolders(["/aa/ab/ac/ae", "/aa/ab/af/ag", "/ap/aq/ar/as", "/ap/aq/ar", "/ap/ax/ay/az", "/ap", "/ap/aq/ar/at", "/aa/ab/af/ah", "/aa/ai/aj/ak", "/aa"]);
    const expected5 = ["/aa", "/ap"];
    console.assert(arraysEqual(result5, expected5),
        `Test 5 failed: expected ${JSON.stringify(expected5)}, got ${JSON.stringify(result5)}`);

    // Test simple solution as well
    const result6 = removeSubfoldersSimple(["/a", "/a/b", "/c/d", "/c/d/e", "/c/f"]);
    console.assert(arraysEqual(result6, expected1),
        `Test 6 (simple) failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result6)}`);

    console.log('All test cases passed for 1233. Remove Sub-Folders from the Filesystem!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 1233. Remove Sub-Folders from the Filesystem ===');
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
    removeSubfolders,
    removeSubfoldersSimple,
    testSolution,
    demonstrateSolution
};

/**
 * Additional Notes:
 * - The Trie solution is more educational but the simple solution is more practical
 * - Sorting is key to both approaches - ensures parent folders processed first
 * - String prefix checking with '/' ensures exact folder boundaries
 * - Both solutions have similar time complexity due to sorting
 */
