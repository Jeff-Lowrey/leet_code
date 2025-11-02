"""
# Difficulty: Medium

# 1233. Remove Sub Folders From The Filesystem

Given a list of folders, remove all sub-folders in those folders and return the folders in any order.

If a folder[i] is located within another folder[j], it is called a sub-folder of it.

The format of a path is one or more concatenated strings of the form: '/' followed by one or more lowercase English letters.

For example, "/leetcode" and "/leetcode/problems" are valid paths while an empty string and "/" are not.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>["/a","/a/b","/c/d","/c/d/e","/c/f"]</dd>
<dt>Output:</dt>
<dd>["/a","/c/d","/c/f"]</dd>
<dt>Explanation:</dt>
<dd>After removing sub-folders: "/a/b" is a sub-folder of "/a", and "/c/d/e" is a sub-folder of "/c/d", so they are removed. The result is ["/a","/c/d","/c/f"]</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
**Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
**Data Structures**: Hash Map, Array, String
**Patterns**: Hash Table Pattern
**Time Complexity**: O(N * L * log(N))
**Space Complexity**: O(N * L)

### INTUITION:
We need to identify and remove sub-folders from a list of folder paths. A sub-folder is any folder that has another folder as its prefix path. Using a Trie allows us to efficiently detect prefix relationships by building a tree structure where each node represents a path component.

### APPROACH:
**Data structures: Hash Map (trie nodes), Array (storing results)**
1. **Sort paths**: Sort lexicographically using array traversal to process parent folders before their children
2. **Use Trie structure with hash map**: Build a trie (hash map/dictionary) where each node represents a folder name, stored in hash map
3. **Mark folder ends**: Use a flag in hash map to mark where complete folders end
4. **Detect sub-folders with hash table lookup**: If we reach a node marked as folder end, any path continuing from there is a sub-folder
5. **Collect results in array**: Only add paths that aren't sub-folders of previously added paths

Alternative: Sort paths and check if each path starts with previous path + '/' using string operations

### WHY THIS WORKS:
- Sorting ensures parent folders come before children
- Trie naturally represents hierarchical structure
- Marking folder ends distinguishes complete folders from intermediate path components
- When we encounter a folder end marker, we know any continuation is a sub-folder

This solution uses hash table lookup for efficient implementation.

This solution uses hash map storage for efficient implementation.

### EXAMPLE WALKTHROUGH:
**Input:** ["/a", "/a/b", "/c/d", "/c/d/e", "/c/f"]

**Step 1:** Sort paths using array traversal for input ["/a", "/a/b", "/c/d", "/c/d/e", "/c/f"]
- Sorted: ["/a", "/a/b", "/c/d", "/c/d/e", "/c/f"]

**Step 2:** Process "/a" - Build trie with hash map
- Hash map structure: root -> {'a': {is_end: True}}
- Add to result array: ["/a"]

**Step 3:** Process "/a/b" - Use hash table lookup
- Lookup finds 'a' is already marked as folder end
- "/a/b" is sub-folder of "/a" → skip

**Step 4:** Process "/c/d" - Continue building trie
- Hash map: root -> {'a': ..., 'c': {'d': {is_end: True}}}
- Add to result: ["/a", "/c/d"]

**Step 5:** Process "/c/d/e" - Hash table lookup
- 'c' -> 'd' already marked as folder end
- "/c/d/e" is sub-folder → skip

**Step 6:** Process "/c/f" - Add new branch
- Hash map: root -> {'a': ..., 'c': {'d': ..., 'f': {is_end: True}}}
- Add to result: ["/a", "/c/d", "/c/f"]

Output:
```
["/a", "/c/d", "/c/f"]
```

### TIME COMPLEXITY:
O(N * L * log(N))
Where N is number of folders and L is average path length
- Sorting: O(N * L * log(N))
- Trie operations: O(N * L)

### SPACE COMPLEXITY:
O(N * L)
For storing the trie structure

### EDGE CASES:
- Single folder: folder=["/a"] → ["/a"] (no sub-folders to remove, returns immediately)
- No sub-folders: folder=["/a","/b","/c"] → ["/a","/b","/c"] (all at same level, all kept)
- All folders are sub-folders of one root: folder=["/a","/a/b","/a/b/c","/a/b/c/d"] → ["/a"] (keep only root, remove all nested)
- Folders with similar prefixes: folder=["/a","/ab","/abc"] → ["/a","/ab","/abc"] (all kept, "/ab" not sub-folder of "/a")

</details>
"""

from typing import Any
import re


class TrieNode:
    """Node in a Trie data structure."""

    def __init__(self) -> None:
        """Initialize TrieNode with empty children and end marker."""
        self.children: dict[str, "TrieNode"] = {}
        self.word: str | None = None  # For word storage in solutions like Word Search II
        self.is_end: bool = False  # Marks end of a word
        self.is_folder: bool = False  # Marks end of a folder path


class Solution:
    def removeSubfolders(self, folder: list[str]) -> list[str]:
        """
        Remove all sub-folders from the list using Trie.

        Args:
            folder: List of folder paths

        Returns:
            List of folder paths with sub-folders removed

        Time Complexity: O(N * L * log(N)) where N is number of folders, L is average length
        Space Complexity: O(N * L) for trie storage
        """
        # Sort folders lexicographically - ensures parent folders come first
        folder.sort()

        root = TrieNode()
        result: list[Any] = []

        for path in folder:
            # Parse path into components
            components = path.split("/")
            # Remove empty first component from leading '/'
            components = [comp for comp in components if comp]

            current = root
            is_subfolder = False

            # Traverse/build trie
            for _i, component in enumerate(components):
                # If we hit a folder end marker before processing all components,
                # this is a sub-folder
                if current.is_folder:
                    is_subfolder = True
                    break

                if component not in current.children:
                    current.children[component] = TrieNode()

                current = current.children[component]

            # If not a sub-folder, mark as folder and add to result
            if not is_subfolder:
                current.is_folder = True
                result.append(path)

        return result


class SolutionSimple:
    """Simpler solution using sorting and string prefix checking."""

    def removeSubfolders(self, folder: list[str]) -> list[str]:
        """
        Remove sub-folders by checking string prefixes.

        Time Complexity: O(N * L * log(N))
        Space Complexity: O(N) for result list
        """
        # Sort folders - parent folders come before children
        folder.sort()

        result: list[Any] = []

        for path in folder:
            # If result is empty or current path is not a sub-folder of last added path
            # Check by seeing if path starts with last_path + '/'
            if not result or not path.startswith(result[-1] + "/"):
                result.append(path)

        return result


def test_solution() -> None:
    """Test cases for 1233. Remove Sub Folders."""
    solution = Solution()
    solution_simple = SolutionSimple()

    # Test case 1: Basic sub-folder removal
    folder1 = ["/a", "/a/b", "/c/d", "/c/d/e", "/c/f"]
    expected1 = ["/a", "/c/d", "/c/f"]
    assert sorted(solution.removeSubfolders(folder1)) == sorted(expected1)
    assert sorted(solution_simple.removeSubfolders(folder1)) == sorted(expected1)

    # Test case 2: No sub-folders
    folder2 = ["/a", "/b", "/c"]
    expected2 = ["/a", "/b", "/c"]
    assert sorted(solution.removeSubfolders(folder2)) == sorted(expected2)
    assert sorted(solution_simple.removeSubfolders(folder2)) == sorted(expected2)

    # Test case 3: All sub-folders of one root
    folder3 = ["/a", "/a/b", "/a/b/c", "/a/b/c/d"]
    expected3 = ["/a"]
    assert solution.removeSubfolders(folder3) == expected3
    assert solution_simple.removeSubfolders(folder3) == expected3

    # Test case 4: Similar prefixes but not sub-folders
    folder4 = ["/a", "/ab", "/abc"]
    expected4 = ["/a", "/ab", "/abc"]
    assert sorted(solution.removeSubfolders(folder4)) == sorted(expected4)
    assert sorted(solution_simple.removeSubfolders(folder4)) == sorted(expected4)

    # Test case 5: Mixed order input
    folder5 = ["/a/b/c", "/a/b", "/a", "/a/b/d"]
    expected5 = ["/a"]
    assert solution.removeSubfolders(folder5) == expected5
    assert solution_simple.removeSubfolders(folder5) == expected5

    # Test case 6: Complex structure
    folder6 = ["/aa/ab", "/aa", "/aa/ab/ac", "/ab", "/ab/ac"]
    expected6 = ["/aa", "/ab"]
    assert sorted(solution.removeSubfolders(folder6)) == sorted(expected6)
    assert sorted(solution_simple.removeSubfolders(folder6)) == sorted(expected6)

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    print("=== 1233. Remove Sub Folders From The Filesystem ===")

    solution = Solution()

    folders = ["/a", "/a/b", "/c/d", "/c/d/e", "/c/f"]
    print(f"Input folders: {folders}")
    result = solution.removeSubfolders(folders)
    print(f"After removing sub-folders: result")

    print("\nUsing simple solution:")
    solution_simple = SolutionSimple()
    folders2 = ["/a/b/c", "/a/b/d", "/a/b", "/a"]
    print(f"Input folders: {folders2}")
    result2 = solution_simple.removeSubfolders(folders2)
    print(f"After removing sub-folders: {result2}")

    print("\nSub-folders are successfully removed using Trie structure!")
