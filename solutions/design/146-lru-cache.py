"""
# 146. LRU Cache
**Medium**

Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.

Implement the LRUCache class:
- LRUCache(int capacity) Initialize the LRU cache with positive size capacity.
- int get(int key) Return the value of the key if the key exists, otherwise return -1.
- void put(int key, int value) Update the value of the key if it exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity from this operation, evict the least recently used key.

The functions get and put must each run in O(1) average time complexity.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
LRU Cache needs O(1) access and O(1) eviction. We can combine:
- HashMap for O(1) key lookup
- Doubly Linked List for O(1) insertion/deletion at any position

### APPROACH:
1. **HashMap + Doubly Linked List**: Hash map stores key->node mapping
2. **Recent Access Tracking**: Move accessed nodes to head of list
3. **Eviction Policy**: Remove from tail when capacity exceeded
4. **O(1) Operations**: All operations use direct node manipulation

### WHY THIS WORKS:
- HashMap provides O(1) key lookup
- Doubly linked list allows O(1) insertion/deletion anywhere
- Head represents most recently used, tail represents least recently used
- Moving nodes to head maintains LRU order efficiently

### TIME COMPLEXITY: O(1)
All operations (get, put) are constant time

### SPACE COMPLEXITY: O(capacity)
We store at most 'capacity' key-value pairs

### EXAMPLE WALKTHROUGH:
```
LRUCache(2)
put(1, 1) -> [1:1]
put(2, 2) -> [2:2, 1:1]
get(1)    -> [1:1, 2:2] (1 moves to front)
put(3, 3) -> [3:3, 1:1] (2 evicted)
get(2)    -> -1 (not found)
```

### EDGE CASES:
- Capacity of 1
- Get non-existent key
- Put same key multiple times
- Cache at full capacity

</details>

<details>
<summary><b>💡 APPROACH</b></summary>

HashMap + Doubly Linked List approach:
1. Create DoublyLinkedNode class
2. Maintain head and tail dummy nodes
3. HashMap maps key to node
4. Get: return value and move to head
5. Put: add new or update existing, move to head, evict if needed

### Algorithm Steps:
1. Initialize head/tail dummy nodes and HashMap
2. Get: check HashMap, move node to head if found
3. Put: update existing or create new, move to head, evict tail if over capacity
4. Helper methods: addToHead, removeNode, moveToHead, removeTail

</details>
"""

class DoublyLinkedNode:
    """Node for doubly linked list."""
    def __init__(self, key=0, value=0):
        self.key = key
        self.value = value
        self.prev = None
        self.next = None

class LRUCache:
    def __init__(self, capacity: int):
        """
        Initialize LRU Cache with given capacity.

        Args:
            capacity: Maximum number of key-value pairs to store
        """
        self.capacity = capacity
        self.cache = {}  # key -> node mapping

        # Create dummy head and tail nodes
        self.head = DoublyLinkedNode()
        self.tail = DoublyLinkedNode()
        self.head.next = self.tail
        self.tail.prev = self.head

    def _add_to_head(self, node: DoublyLinkedNode) -> None:
        """Add node right after head."""
        node.prev = self.head
        node.next = self.head.next
        self.head.next.prev = node
        self.head.next = node

    def _remove_node(self, node: DoublyLinkedNode) -> None:
        """Remove node from linked list."""
        node.prev.next = node.next
        node.next.prev = node.prev

    def _move_to_head(self, node: DoublyLinkedNode) -> None:
        """Move node to head (mark as most recently used)."""
        self._remove_node(node)
        self._add_to_head(node)

    def _remove_tail(self) -> DoublyLinkedNode:
        """Remove and return the last node (least recently used)."""
        last_node = self.tail.prev
        self._remove_node(last_node)
        return last_node

    def get(self, key: int) -> int:
        """
        Get value by key and mark as recently used.

        Time Complexity: O(1)
        Space Complexity: O(1)
        """
        if key in self.cache:
            node = self.cache[key]
            # Move to head (mark as recently used)
            self._move_to_head(node)
            return node.value
        return -1

    def put(self, key: int, value: int) -> None:
        """
        Put key-value pair into cache.

        Time Complexity: O(1)
        Space Complexity: O(1)
        """
        if key in self.cache:
            # Update existing key
            node = self.cache[key]
            node.value = value
            self._move_to_head(node)
        else:
            # Add new key
            new_node = DoublyLinkedNode(key, value)

            if len(self.cache) >= self.capacity:
                # Remove least recently used
                tail_node = self._remove_tail()
                del self.cache[tail_node.key]

            # Add new node
            self.cache[key] = new_node
            self._add_to_head(new_node)

# Alternative implementation using OrderedDict (simpler but less educational)
from collections import OrderedDict

class LRUCacheOrderedDict:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = OrderedDict()

    def get(self, key: int) -> int:
        if key in self.cache:
            # Move to end (most recent)
            self.cache.move_to_end(key)
            return self.cache[key]
        return -1

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            # Update and move to end
            self.cache[key] = value
            self.cache.move_to_end(key)
        else:
            # Add new key
            if len(self.cache) >= self.capacity:
                # Remove least recent (first item)
                self.cache.popitem(last=False)
            self.cache[key] = value


def test_solution():
    """
    Test cases for 146. LRU Cache.
    """
    # Test case 1: Basic operations
    lru = LRUCache(2)

    lru.put(1, 1)
    lru.put(2, 2)
    assert lru.get(1) == 1, f"Expected 1, got {lru.get(1)}"

    lru.put(3, 3)  # evicts key 2
    assert lru.get(2) == -1, f"Expected -1, got {lru.get(2)}"

    lru.put(4, 4)  # evicts key 1
    assert lru.get(1) == -1, f"Expected -1, got {lru.get(1)}"
    assert lru.get(3) == 3, f"Expected 3, got {lru.get(3)}"
    assert lru.get(4) == 4, f"Expected 4, got {lru.get(4)}"

    # Test case 2: Capacity of 1
    lru2 = LRUCache(1)
    lru2.put(2, 1)
    assert lru2.get(2) == 1
    lru2.put(3, 2)  # evicts key 2
    assert lru2.get(2) == -1
    assert lru2.get(3) == 2

    # Test case 3: Update existing key
    lru3 = LRUCache(2)
    lru3.put(1, 1)
    lru3.put(2, 2)
    lru3.put(1, 10)  # update key 1
    assert lru3.get(1) == 10
    assert lru3.get(2) == 2

    # Test OrderedDict implementation
    lru_od = LRUCacheOrderedDict(2)
    lru_od.put(1, 1)
    lru_od.put(2, 2)
    assert lru_od.get(1) == 1
    lru_od.put(3, 3)  # evicts key 2
    assert lru_od.get(2) == -1

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    print("=== 146. LRU Cache ===")
    lru = LRUCache(2)

    print("put(1, 1)")
    lru.put(1, 1)
    print("put(2, 2)")
    lru.put(2, 2)
    print(f"get(1): {lru.get(1)}")
    print("put(3, 3)")  # evicts key 2
    lru.put(3, 3)
    print(f"get(2): {lru.get(2)}")  # returns -1 (not found)
    print(f"get(3): {lru.get(3)}")
    print(f"get(1): {lru.get(1)}")