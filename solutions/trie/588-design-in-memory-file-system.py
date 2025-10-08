"""
# 588. Design In Memory File System
**Hard**

Design a data structure that simulates an in-memory file system.

Implement the FileSystem class:
- FileSystem() Initializes the object of the system.
- List<String> ls(String path) If path is a file path, returns a list that only contains this file's name. If path is a directory path, returns the list of file and directory names in this directory.
- void mkdir(String path) Makes a directory according to the given path. The given directory path does not exist. If the middle directories in the path do not exist, you should create them as well.
- void addContentToFile(String path, String content) If filePath does not exist, creates that file containing given content. If filePath already exists, appends the given content to original content.
- String readContentFromFile(String path) Returns the content in the file at filePath.

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

### TIME COMPLEXITY: O(P)
Where P is the path length (number of path components)

### SPACE COMPLEXITY: O(N×M)
Where N is number of nodes and M is average path component length

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

### KEY DESIGN DECISIONS:
- **Node class**: Encapsulates file/directory behavior
- **Path normalization**: Handle leading/trailing slashes
- **Content storage**: Files store content as strings
- **Sorted output**: ls() returns lexicographically sorted results
- **Lazy directory creation**: mkdir creates all intermediate directories

### EDGE CASES:
- Root directory path "/"
- Nested directory creation
- File content appending
- Empty paths and content
- Mixed file and directory operations

</details>
"""


class FileSystemNode:
    """Node representing either a file or directory in the file system."""

    def __init__(self, name: str = "", is_file: bool = False):
        self.name = name
        self.is_file = is_file
        self.content = ""  # Only used for files
        self.children = {}  # name -> FileSystemNode mapping

    def is_directory(self) -> bool:
        """Check if this node is a directory."""
        return not self.is_file


class FileSystem:
    """In-memory file system implementation using trie-like structure."""

    def __init__(self):
        """Initialize the file system with root directory."""
        self.root = FileSystemNode("/", is_file=False)

    def _parse_path(self, path: str) -> list[str]:
        """Parse path into components, handling edge cases."""
        if path == "/":
            return []

        # Remove leading and trailing slashes, split by '/'
        components = path.strip("/").split("/")
        return [comp for comp in components if comp]  # Filter empty components

    def _navigate_to_parent(self, path: str) -> tuple[FileSystemNode, str]:
        """Navigate to parent directory and return (parent_node, final_component)."""
        components = self._parse_path(path)
        current = self.root

        # Navigate to parent directory
        for component in components[:-1]:
            if component not in current.children:
                # Create intermediate directory if it doesn't exist
                current.children[component] = FileSystemNode(component, is_file=False)
            current = current.children[component]

        # Return parent node and final component name
        final_component = components[-1] if components else ""
        return current, final_component

    def _navigate_to_node(self, path: str) -> FileSystemNode:
        """Navigate to the node at given path."""
        if path == "/":
            return self.root

        components = self._parse_path(path)
        current = self.root

        for component in components:
            if component not in current.children:
                raise FileNotFoundError(f"Path not found: {path}")
            current = current.children[component]

        return current

    def ls(self, path: str) -> list[str]:
        """
        List contents of directory or return file name.

        Args:
            path: Path to list

        Returns:
            List of names in directory, or single file name

        Time Complexity: O(P + N log N) where P is path length, N is number of children
        Space Complexity: O(N) for result list
        """
        try:
            node = self._navigate_to_node(path)

            if node.is_file:
                # If it's a file, return just the file name
                return [node.name]
            else:
                # If it's a directory, return sorted list of children
                return sorted(node.children.keys())
        except FileNotFoundError:
            return []

    def mkdir(self, path: str) -> None:
        """
        Create directory at given path, including intermediate directories.

        Args:
            path: Directory path to create

        Time Complexity: O(P) where P is path length
        Space Complexity: O(P) for path components
        """
        if path == "/":
            return  # Root already exists

        parent, dir_name = self._navigate_to_parent(path)

        # Create directory if it doesn't exist
        if dir_name not in parent.children:
            parent.children[dir_name] = FileSystemNode(dir_name, is_file=False)

    def addContentToFile(self, filePath: str, content: str) -> None:
        """
        Add content to file, creating file and directories if needed.

        Args:
            filePath: Path to file
            content: Content to add/append

        Time Complexity: O(P) where P is path length
        Space Complexity: O(P + C) where C is content length
        """
        parent, file_name = self._navigate_to_parent(filePath)

        if file_name not in parent.children:
            # Create new file
            parent.children[file_name] = FileSystemNode(file_name, is_file=True)

        file_node = parent.children[file_name]

        # Ensure it's a file, not a directory
        if not file_node.is_file:
            raise ValueError(f"Cannot add content to directory: {filePath}")

        # Append content
        file_node.content += content

    def readContentFromFile(self, filePath: str) -> str:
        """
        Read content from file.

        Args:
            filePath: Path to file

        Returns:
            File content

        Time Complexity: O(P) where P is path length
        Space Complexity: O(1)
        """
        try:
            node = self._navigate_to_node(filePath)

            if not node.is_file:
                raise ValueError(f"Cannot read content from directory: {filePath}")

            return node.content
        except FileNotFoundError:
            raise FileNotFoundError(f"File not found: {filePath}")


class FileSystemAlternative:
    """Alternative implementation using nested dictionaries."""

    def __init__(self):
        """Initialize with nested dictionary structure."""
        self.files = {}  # path -> content mapping for files
        self.dirs = {"/"}  # set of directory paths

    def _normalize_path(self, path: str) -> str:
        """Normalize path by ensuring it starts with / and removing trailing /."""
        if not path.startswith("/"):
            path = "/" + path
        if len(path) > 1 and path.endswith("/"):
            path = path[:-1]
        return path

    def _ensure_parent_dirs(self, path: str) -> None:
        """Ensure all parent directories exist."""
        path = self._normalize_path(path)
        parts = path.split("/")[1:]  # Remove empty first element

        current_path = ""
        for part in parts[:-1]:  # Exclude the last part (file/final dir)
            current_path += "/" + part
            self.dirs.add(current_path)

    def ls(self, path: str) -> list[str]:
        """List directory contents or file name."""
        path = self._normalize_path(path)

        if path in self.files:
            # It's a file, return just the filename
            return [path.split("/")[-1]]

        # It's a directory, find all children
        children = set()

        # Find all files and subdirectories under this path
        prefix = path if path == "/" else path + "/"

        for file_path in self.files:
            if file_path.startswith(prefix):
                relative_path = file_path[len(prefix) :]
                if "/" not in relative_path:  # Direct child file
                    children.add(relative_path)

        for dir_path in self.dirs:
            if dir_path.startswith(prefix) and dir_path != path:
                relative_path = dir_path[len(prefix) :]
                if "/" not in relative_path:  # Direct child directory
                    children.add(relative_path)

        return sorted(children)

    def mkdir(self, path: str) -> None:
        """Create directory and all parent directories."""
        path = self._normalize_path(path)
        self._ensure_parent_dirs(path + "/dummy")  # Ensure parents exist
        self.dirs.add(path)

    def addContentToFile(self, filePath: str, content: str) -> None:
        """Add content to file, creating directories as needed."""
        filePath = self._normalize_path(filePath)
        self._ensure_parent_dirs(filePath)

        if filePath in self.files:
            self.files[filePath] += content
        else:
            self.files[filePath] = content

    def readContentFromFile(self, filePath: str) -> str:
        """Read file content."""
        filePath = self._normalize_path(filePath)
        return self.files.get(filePath, "")


def test_solution():
    """Test cases for Problem 588."""

    # Test main implementation
    fs = FileSystem()

    # Test 1: Basic directory operations
    fs.mkdir("/a/b/c")
    assert fs.ls("/a/b/c") == [], "Empty directory should return empty list"

    # Test 2: File operations
    fs.addContentToFile("/a/b/c/file1.txt", "hello")
    assert fs.readContentFromFile("/a/b/c/file1.txt") == "hello"
    assert fs.ls("/a/b/c") == ["file1.txt"]

    # Test 3: Content appending
    fs.addContentToFile("/a/b/c/file1.txt", " world")
    assert fs.readContentFromFile("/a/b/c/file1.txt") == "hello world"

    # Test 4: Multiple files in directory
    fs.addContentToFile("/a/b/c/file2.txt", "second file")
    result = fs.ls("/a/b/c")
    assert result == ["file1.txt", "file2.txt"], f"Expected sorted files, got {result}"

    # Test 5: File listing (single file)
    assert fs.ls("/a/b/c/file1.txt") == ["file1.txt"]

    # Test 6: Root directory
    assert "/" in fs.ls("/") or "a" in fs.ls("/"), "Root should contain 'a' directory"

    # Test alternative implementation
    fs_alt = FileSystemAlternative()
    fs_alt.mkdir("/x/y/z")
    fs_alt.addContentToFile("/x/y/z/test.txt", "test content")
    assert fs_alt.readContentFromFile("/x/y/z/test.txt") == "test content"
    assert fs_alt.ls("/x/y/z") == ["test.txt"]

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage demonstration
    print("=== 588. Design In Memory File System ===")

    fs = FileSystem()

    # Create directory structure
    print("Creating directory structure...")
    fs.mkdir("/home/user/documents")
    fs.mkdir("/home/user/downloads")

    # Add some files
    print("Adding files...")
    fs.addContentToFile("/home/user/documents/readme.txt", "This is a readme file.")
    fs.addContentToFile("/home/user/documents/notes.txt", "Meeting notes: ")
    fs.addContentToFile("/home/user/documents/notes.txt", "Remember to review the proposal.")
    fs.addContentToFile("/home/user/downloads/file.zip", "binary content here")

    # List directories and files
    print(f"Contents of /home/user: {fs.ls('/home/user')}")
    print(f"Contents of /home/user/documents: {fs.ls('/home/user/documents')}")
    print(f"Contents of /home/user/downloads: {fs.ls('/home/user/downloads')}")

    # Read file content
    print(f"readme.txt content: {fs.readContentFromFile('/home/user/documents/readme.txt')}")
    print(f"notes.txt content: {fs.readContentFromFile('/home/user/documents/notes.txt')}")

    # Demonstrate file name listing
    print(f"Listing specific file: {fs.ls('/home/user/documents/readme.txt')}")

    print("\nFile system operations completed successfully!")
