/**
 * Difficulty: Hard
 *
 * # 588. Design In Memory File System
 *
 * Design a data structure that simulates an in-memory file system.
 *
 * Implement the FileSystem class:
 * - FileSystem() Initializes the object of the system.
 * - List<String> ls(String path) If path is a file path, returns a list that only contains this file's name. If path is a directory path, returns the list of file and directory names in this directory.
 * - void mkdir(String path) Makes a directory according to the given path. The given directory path does not exist. If the middle directories in the path do not exist, you should create them as well.
 * - void addContentToFile(String path, String content) If filePath does not exist, creates that file containing given content. If filePath already exists, appends the given content to original content.
 * - String readContentFromFile(String path) Returns the content in the file at filePath.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>mkdir("/a/b/c")</dd>
 * <dt>Output:</dt>
 * <dd>1. Create root node "/"</dd>
 * <dt>Explanation:</dt>
 * <dd>Design in-memory file system with ls, mkdir, addContentToFile operations</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 *

 * ### METADATA:
 * **Techniques**: Trie Operations, Prefix Matching
 * **Data Structures**: Trie (Prefix Tree)
 * **Patterns**: Trie Pattern, Prefix Search
 * **Time Complexity**: **O(P)
 * **Space Complexity**: **O(N×M)

 *
 * ### INTUITION:
 * This problem requires implementing a tree-like data structure to represent the file system hierarchy. Each node can be either a directory (containing other nodes) or a file (containing content). We use a trie-like structure where each node knows whether it's a file or directory.
 *
 * ### APPROACH:
 * 1. **Node structure**: Each node has children (subdirectories/files) and content (for files)
 * 2. **Path parsing**: Split paths by '/' and navigate through the tree
 * 3. **Directory vs File**: Track whether each node represents a file or directory
 * 4. **Lazy creation**: Create intermediate directories as needed
 * 5. **Content management**: Store and append file content
 *
 * ### WHY THIS WORKS:
 * - Tree structure naturally represents file system hierarchy
 * - Trie-like navigation allows efficient path traversal
 * - Each node maintains its type (file/directory) and content
 * - Dictionary-based children storage enables O(1) access by name
 * - Path parsing handles absolute paths correctly
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * mkdir("/a/b/c")
 * 1. Create root node "/"
 * 2. Create node "a" under root
 * 3. Create node "b" under "a"
 * 4. Create node "c" under "b"
 *
 * addContentToFile("/a/b/c/file1.txt", "hello")
 * 1. Navigate to "/a/b/c"
 * 2. Create file node "file1.txt"
 * 3. Set content to "hello"
 *
 * ls("/a/b/c")
 * Returns: ["file1.txt"]
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(P)
 * Where P is the path length (number of path components)
 *
 * ### SPACE COMPLEXITY:
 * O(N×M)
 * Where N is number of nodes and M is average path component length
 *
 * ### EDGE CASES:
 * - Root directory path "/"
 * - Nested directory creation
 * - File content appending
 * - Empty paths and content
 * - Mixed file and directory operations
 *
 * </details>
 */

class FileNode {
  constructor() {
    this.isFile = false;
    this.content = "";
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
    if (path === "/") return [];
    return path.substring(1).split("/");
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
    return node ? node.content : "";
  }
}

/**
 * Test cases for Problem 588: Design In-Memory File System
 */
function testSolution() {
  console.log("Testing 588. Design In-Memory File System");

  const arraysEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

  // Test case 1: Basic operations
  const fs1 = new FileSystem();
  let result1 = fs1.ls("/");
  console.assert(
    arraysEqual(result1, []),
    `Test 1a failed: expected [], got ${JSON.stringify(result1)}`,
  );

  fs1.mkdir("/a/b/c");
  result1 = fs1.ls("/a/b");
  console.assert(
    arraysEqual(result1, ["c"]),
    `Test 1b failed: expected ["c"], got ${JSON.stringify(result1)}`,
  );

  // Test case 2: File operations
  const fs2 = new FileSystem();
  fs2.addContentToFile("/a/b/c/d", "hello");
  result1 = fs2.ls("/");
  console.assert(
    arraysEqual(result1, ["a"]),
    `Test 2a failed: expected ["a"], got ${JSON.stringify(result1)}`,
  );

  const content = fs2.readContentFromFile("/a/b/c/d");
  console.assert(
    content === "hello",
    `Test 2b failed: expected "hello", got "${content}"`,
  );

  // Test case 3: Append to file
  const fs3 = new FileSystem();
  fs3.addContentToFile("/a/b/c/file.txt", "hello ");
  fs3.addContentToFile("/a/b/c/file.txt", "world");
  const content3 = fs3.readContentFromFile("/a/b/c/file.txt");
  console.assert(
    content3 === "hello world",
    `Test 3 failed: expected "hello world", got "${content3}"`,
  );

  // Test case 4: Multiple files in directory
  const fs4 = new FileSystem();
  fs4.addContentToFile("/a/file1", "content1");
  fs4.addContentToFile("/a/file2", "content2");
  fs4.mkdir("/a/dir1");
  result1 = fs4.ls("/a");
  console.assert(
    arraysEqual(result1, ["dir1", "file1", "file2"]),
    `Test 4 failed: expected ["dir1","file1","file2"], got ${JSON.stringify(result1)}`,
  );

  // Test case 5: ls on file path
  const fs5 = new FileSystem();
  fs5.addContentToFile("/a/b/file.txt", "test");
  result1 = fs5.ls("/a/b/file.txt");
  console.assert(
    arraysEqual(result1, ["file.txt"]),
    `Test 5 failed: expected ["file.txt"], got ${JSON.stringify(result1)}`,
  );

  // Test case 6: Complex scenario
  const fs6 = new FileSystem();
  fs6.mkdir("/a/b/c");
  fs6.mkdir("/a/b/d");
  fs6.addContentToFile("/a/b/e/file.txt", "test");
  result1 = fs6.ls("/a/b");
  console.assert(
    arraysEqual(result1, ["c", "d", "e"]),
    `Test 6 failed: expected ["c","d","e"], got ${JSON.stringify(result1)}`,
  );

  console.log("All test cases passed for 588. Design In-Memory File System!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 588. Design In-Memory File System ===");
  console.log("Category: Trie / Design");
  console.log("Difficulty: Hard");
  console.log("");

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
  demonstrateSolution,
};

/**
 * Additional Notes:
 * - Trie structure is perfect for hierarchical file systems
 * - Could extend with: delete, move, copy operations
 * - Consider permissions, timestamps, file sizes for real systems
 * - Map provides O(1) lookup for children
 * - Sorting on demand vs maintaining sorted order trade-off
 */
