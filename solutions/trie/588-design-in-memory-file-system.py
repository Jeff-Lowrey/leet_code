"""
# Difficulty: Hard

# 588. Design In Memory File System

Design a data structure that simulates an in-memory file system.

Implement the FileSystem class:
- FileSystem() Initializes the object of the system.
- List<String> ls(String path) If path is a file path, returns a list that only contains this file's name. If path is a directory path, returns the list of file and directory names in this directory.
- void mkdir(String path) Makes a directory according to the given path. The given directory path does not exist. If the middle directories in the path do not exist, you should create them as well.
- void addContentToFile(String path, String content) If filePath does not exist, creates that file containing given content. If filePath already exists, appends the given content to original content.
- String readContentFromFile(String path) Returns the content in the file at filePath.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>mkdir("/a/b/c")</dd>
<dt>Output:</dt>
<dd>1. Create root node "/"</dd>
<dt>Explanation:</dt>
<dd>Design in-memory file system with ls, mkdir, addContentToFile operations</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
This problem requires implementing a tree-like data structure to represent the file system hierarchy. Each node can be either a directory (containing other nodes) or a file (containing content). We use a trie-like structure where each node knows whether it's a file or directory.

### APPROACH:
1. **Node structure**: Each node has children (subdirectories/files) and content (for files)
2. **Path parsing**: Split paths by '/' and navigate through the tree
3. **Directory vs File**: Track whether each node represents a file or directory
4. **Lazy creation**: Create intermediate directories as needed
5. **Content management**: Store and append file content

### WHY THIS WORKS:
- Tree structure naturally represents file system hierarchy
- Trie-like navigation allows efficient path traversal
- Each node maintains its type (file/directory) and content
- Dictionary-based children storage enables O(1) access by name
- Path parsing handles absolute paths correctly

### EXAMPLE WALKTHROUGH:
```
mkdir("/a/b/c")
1. Create root node "/"
2. Create node "a" under root
3. Create node "b" under "a"
4. Create node "c" under "b"

addContentToFile("/a/b/c/file1.txt", "hello")
1. Navigate to "/a/b/c"
2. Create file node "file1.txt"
3. Set content to "hello"

ls("/a/b/c")
Returns: ["file1.txt"]
```

### TIME COMPLEXITY:
O(P)
Where P is the path length (number of path components)

### SPACE COMPLEXITY:
O(N×M)
Where N is number of nodes and M is average path component length

### EDGE CASES:
- Root directory path "/"
- Nested directory creation
- File content appending
- Empty paths and content
- Mixed file and directory operations

</details>
"""
