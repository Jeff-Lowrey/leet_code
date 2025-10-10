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

class FileNode {
    constructor() {
        this.isFile = false;
        this.content = '';
        this.children = new Map();
    }
}

class FileSystem {
    constructor() {
        this.root = new FileNode();
    }

    /**
     * Helper to parse path into components
     */
    parsePath(path) {
        if (path === '/') return [];
        return path.substring(1).split('/');
    }

    /**
     * Helper to navigate to a path, creating directories if needed
     */
    navigate(path, create = false) {
        const parts = this.parsePath(path);
        let node = this.root;

        for (const part of parts) {
            if (!node.children.has(part)) {
                if (!create) return null;
                node.children.set(part, new FileNode());
            }
            node = node.children.get(part);
        }

        return node;
    }

    /**
     * List files/directories at given path
     * @param {string} path
     * @return {string[]}
     */
    ls(path) {
        const node = this.navigate(path);
        if (!node) return [];

        // If it's a file, return the file name
        if (node.isFile) {
            const parts = this.parsePath(path);
            return [parts[parts.length - 1]];
        }

        // If it's a directory, return sorted list of children
        return Array.from(node.children.keys()).sort();
    }

    /**
     * Create directory path
     * @param {string} path
     * @return {void}
     */
    mkdir(path) {
        this.navigate(path, true);
    }

    /**
     * Add content to file (create file if doesn't exist)
     * @param {string} filePath
     * @param {string} content
     * @return {void}
     */
    addContentToFile(filePath, content) {
        const node = this.navigate(filePath, true);
        node.isFile = true;
        node.content += content;
    }

    /**
     * Read content from file
     * @param {string} filePath
     * @return {string}
     */
    readContentFromFile(filePath) {
        const node = this.navigate(filePath);
        return node ? node.content : '';
    }
}

/**
 * Test cases for Problem 588: Design In-Memory File System
 */
function testSolution() {
    console.log('Testing 588. Design In-Memory File System');

    const arraysEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

    // Test case 1: Basic operations
    const fs1 = new FileSystem();
    let result1 = fs1.ls('/');
    console.assert(arraysEqual(result1, []),
        `Test 1a failed: expected [], got ${JSON.stringify(result1)}`);

    fs1.mkdir('/a/b/c');
    result1 = fs1.ls('/a/b');
    console.assert(arraysEqual(result1, ['c']),
        `Test 1b failed: expected ["c"], got ${JSON.stringify(result1)}`);

    // Test case 2: File operations
    const fs2 = new FileSystem();
    fs2.addContentToFile('/a/b/c/d', 'hello');
    result1 = fs2.ls('/');
    console.assert(arraysEqual(result1, ['a']),
        `Test 2a failed: expected ["a"], got ${JSON.stringify(result1)}`);

    const content = fs2.readContentFromFile('/a/b/c/d');
    console.assert(content === 'hello',
        `Test 2b failed: expected "hello", got "${content}"`);

    // Test case 3: Append to file
    const fs3 = new FileSystem();
    fs3.addContentToFile('/a/b/c/file.txt', 'hello ');
    fs3.addContentToFile('/a/b/c/file.txt', 'world');
    const content3 = fs3.readContentFromFile('/a/b/c/file.txt');
    console.assert(content3 === 'hello world',
        `Test 3 failed: expected "hello world", got "${content3}"`);

    // Test case 4: Multiple files in directory
    const fs4 = new FileSystem();
    fs4.addContentToFile('/a/file1', 'content1');
    fs4.addContentToFile('/a/file2', 'content2');
    fs4.mkdir('/a/dir1');
    result1 = fs4.ls('/a');
    console.assert(arraysEqual(result1, ['dir1', 'file1', 'file2']),
        `Test 4 failed: expected ["dir1","file1","file2"], got ${JSON.stringify(result1)}`);

    // Test case 5: ls on file path
    const fs5 = new FileSystem();
    fs5.addContentToFile('/a/b/file.txt', 'test');
    result1 = fs5.ls('/a/b/file.txt');
    console.assert(arraysEqual(result1, ['file.txt']),
        `Test 5 failed: expected ["file.txt"], got ${JSON.stringify(result1)}`);

    // Test case 6: Complex scenario
    const fs6 = new FileSystem();
    fs6.mkdir('/a/b/c');
    fs6.mkdir('/a/b/d');
    fs6.addContentToFile('/a/b/e/file.txt', 'test');
    result1 = fs6.ls('/a/b');
    console.assert(arraysEqual(result1, ['c', 'd', 'e']),
        `Test 6 failed: expected ["c","d","e"], got ${JSON.stringify(result1)}`);

    console.log('All test cases passed for 588. Design In-Memory File System!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 588. Design In-Memory File System ===');
    console.log('Category: Trie / Design');
    console.log('Difficulty: Hard');
    console.log('');

    testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
    demonstrateSolution();
}

// Export for use in other modules
module.exports = {
    FileSystem,
    FileNode,
    testSolution,
    demonstrateSolution
};

/**
 * Additional Notes:
 * - Trie structure is perfect for hierarchical file systems
 * - Could extend with: delete, move, copy operations
 * - Consider permissions, timestamps, file sizes for real systems
 * - Map provides O(1) lookup for children
 * - Sorting on demand vs maintaining sorted order trade-off
 */
