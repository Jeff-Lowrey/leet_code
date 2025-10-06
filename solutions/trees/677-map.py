"""
# 677. Map Sum Pairs
**Medium**

You are asked to implement a map that supports the following two operations:
1. insert(key, val): Inserts a key-value pair into the map. If the key already existed, the original key-value pair will be overridden to the new one.
2. sum(prefix): Returns the sum of all the pairs' value whose key starts with the prefix.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
This is a perfect Trie (prefix tree) problem. We need to store key-value pairs and efficiently compute sums for all keys with a given prefix. A trie naturally groups keys by their prefixes, making prefix sum queries efficient.

### APPROACH:
1. **Trie Structure**: Use a trie where each node stores the sum of all values in its subtree
2. **Insert Operation**: Add/update key in trie and propagate value changes up to root
3. **Sum Operation**: Navigate to prefix node and return its accumulated sum
4. **Value Updates**: Handle key updates by adjusting differences in trie nodes

### WHY THIS WORKS:
- Trie groups keys by common prefixes naturally
- Each node stores sum of all keys in its subtree
- Insert/update operations maintain these sums correctly
- Sum queries are just lookups at the prefix node
- Time complexity is optimal for prefix-based operations

### TIME COMPLEXITY:
- Insert: O(k) where k is key length
- Sum: O(p) where p is prefix length

### SPACE COMPLEXITY: O(TOTAL_KEY_LENGTH)
For storing all keys in the trie structure

### EXAMPLE WALKTHROUGH:
```
Operations:
insert("apple", 3)
insert("app", 2)
sum("ap") → 5 (apple: 3 + app: 2)
insert("app", 4)  # Update existing key
sum("ap") → 7 (apple: 3 + app: 4)

Trie structure after operations:
    root
     |
     a (sum: 7)
     |
     p (sum: 7)
     |
     p (sum: 7, has_app: 4)
     |
     l (sum: 3)
     |
     e (sum: 3, has_apple: 3)
```

### KEY INSIGHTS:
- Trie nodes store cumulative sums for efficient prefix queries
- Insert operations update all nodes along the path
- Key updates require handling the difference between old and new values
- Each node represents a potential prefix endpoint

</details>
"""

class TrieNode:
    """Node in the trie for storing prefix sums."""

    def __init__(self):
        self.children = {}  # char -> TrieNode
        self.value = 0      # Value if this node represents end of a key
        self.sum = 0        # Sum of all values in subtree

class MapSum:
    """Map that supports prefix sum queries using Trie."""

    def __init__(self):
        """Initialize the data structure."""
        self.root = TrieNode()
        self.keys = {}  # Store key -> value mapping for updates

    def insert(self, key: str, val: int) -> None:
        """
        Insert a key-value pair into the map.

        Args:
            key: The key to insert/update
            val: The value to associate with the key

        Time Complexity: O(k) where k is length of key
        Space Complexity: O(k) for new keys
        """
        # Calculate difference for existing keys
        delta = val - self.keys.get(key, 0)
        self.keys[key] = val

        # Update trie with the delta
        node = self.root
        node.sum += delta

        for char in key:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
            node.sum += delta

        # Update the value at the final node
        node.value = val

    def sum(self, prefix: str) -> int:
        """
        Return sum of all values whose keys start with prefix.

        Args:
            prefix: The prefix to search for

        Returns:
            Sum of all values with keys starting with prefix

        Time Complexity: O(p) where p is length of prefix
        Space Complexity: O(1)
        """
        node = self.root

        for char in prefix:
            if char not in node.children:
                return 0
            node = node.children[char]

        return node.sum

    def getAllKeys(self) -> list[tuple[str, int]]:
        """
        Get all key-value pairs (for debugging/testing).

        Returns:
            List of (key, value) tuples
        """
        result = []

        def dfs(node: TrieNode, current_key: str):
            if node.value > 0:
                result.append((current_key, node.value))

            for char, child_node in node.children.items():
                dfs(child_node, current_key + char)

        dfs(self.root, "")
        return result


class MapSumAlternative:
    """Alternative implementation using simpler approach."""

    def __init__(self):
        """Initialize with dictionary storage."""
        self.keys = {}

    def insert(self, key: str, val: int) -> None:
        """Insert key-value pair."""
        self.keys[key] = val

    def sum(self, prefix: str) -> int:
        """Sum all values whose keys start with prefix."""
        return sum(val for key, val in self.keys.items()
                  if key.startswith(prefix))


def test_solution():
    """Test cases for Problem 677."""

    # Test case 1: Basic operations
    map_sum = MapSum()

    map_sum.insert("apple", 3)
    result1 = map_sum.sum("ap")
    expected1 = 3
    assert result1 == expected1, f"Expected {expected1}, got {result1}"

    map_sum.insert("app", 2)
    result2 = map_sum.sum("ap")
    expected2 = 5
    assert result2 == expected2, f"Expected {expected2}, got {result2}"

    # Test case 2: Key update
    map_sum.insert("app", 4)  # Update existing key
    result3 = map_sum.sum("ap")
    expected3 = 7  # apple: 3 + app: 4
    assert result3 == expected3, f"Expected {expected3}, got {result3}"

    # Test case 3: Non-existent prefix
    result4 = map_sum.sum("b")
    expected4 = 0
    assert result4 == expected4, f"Expected {expected4}, got {result4}"

    # Test case 4: Empty prefix
    result5 = map_sum.sum("")
    expected5 = 7  # Sum of all values
    assert result5 == expected5, f"Expected {expected5}, got {result5}"

    # Test case 5: Exact key match
    result6 = map_sum.sum("apple")
    expected6 = 3
    assert result6 == expected6, f"Expected {expected6}, got {result6}"

    # Test case 6: Multiple operations
    map_sum2 = MapSum()
    map_sum2.insert("a", 3)
    map_sum2.insert("aa", 2)
    map_sum2.insert("aaa", 1)

    result7 = map_sum2.sum("a")
    expected7 = 6  # a: 3 + aa: 2 + aaa: 1
    assert result7 == expected7, f"Expected {expected7}, got {result7}"

    result8 = map_sum2.sum("aa")
    expected8 = 3  # aa: 2 + aaa: 1
    assert result8 == expected8, f"Expected {expected8}, got {result8}"

    # Test alternative implementation
    alt_map = MapSumAlternative()
    alt_map.insert("apple", 3)
    alt_map.insert("app", 2)
    result9 = alt_map.sum("ap")
    assert result9 == 5, f"Alternative: Expected 5, got {result9}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    print("=== 677. Map Sum Pairs ===")

    # Example 1: Basic usage
    map_sum = MapSum()

    operations = [
        ("insert", "apple", 3),
        ("sum", "ap", None),
        ("insert", "app", 2),
        ("sum", "ap", None),
        ("insert", "app", 4),  # Update
        ("sum", "ap", None)
    ]

    print("Operations:")
    for op in operations:
        if op[0] == "insert":
            map_sum.insert(op[1], op[2])
            print(f"insert('{op[1]}', {op[2]})")
        else:  # sum
            result = map_sum.sum(op[1])
            print(f"sum('{op[1]}') -> {result}")

    print(f"\nAll key-value pairs: {map_sum.getAllKeys()}")

    # Example 2: Step-by-step trie building
    print(f"\n--- Step-by-step example ---")
    map_sum2 = MapSum()

    print("1. insert('apple', 3)")
    map_sum2.insert("apple", 3)
    print(f"   sum('a') -> {map_sum2.sum('a')}")
    print(f"   sum('ap') -> {map_sum2.sum('ap')}")
    print(f"   sum('app') -> {map_sum2.sum('app')}")

    print("2. insert('app', 2)")
    map_sum2.insert("app", 2)
    print(f"   sum('a') -> {map_sum2.sum('a')}")
    print(f"   sum('ap') -> {map_sum2.sum('ap')}")
    print(f"   sum('app') -> {map_sum2.sum('app')}")

    print("3. insert('application', 1)")
    map_sum2.insert("application", 1)
    print(f"   sum('app') -> {map_sum2.sum('app')}")
    print(f"   sum('appl') -> {map_sum2.sum('appl')}")

    print(f"\nKey insights:")
    print(f"1. Trie structure enables efficient prefix queries")
    print(f"2. Each node stores sum of values in its subtree")
    print(f"3. Insert operations update all nodes along the path")
    print(f"4. Key updates handle value differences correctly")
    print(f"5. Time complexity: O(k) insert, O(p) sum query")