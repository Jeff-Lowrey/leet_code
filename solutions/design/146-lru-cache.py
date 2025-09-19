"""
146. LRU Cache
Medium

Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.

Implement the LRUCache class:
- LRUCache(int capacity) Initialize the LRU cache with positive size capacity.
- int get(int key) Return the value of the key if the key exists, otherwise return -1.
- void put(int key, int value) Update the value of the key if the key exists.
  Otherwise, add the key-value pair to the cache. If the number of keys exceeds
  the capacity from this operation, evict the least recently used key.

The functions get and put must each run in O(1) average time complexity.

Example:
Input
["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
Output
[null, null, null, 1, null, -1, null, -1, 3, 4]

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
LRU needs O(1) access to both most and least recently used items.
Combine hash map (O(1) access) with doubly linked list (O(1) insertion/deletion).

### KEY INSIGHT:
- **Hash Map**: key → node mapping for O(1) lookup
- **Doubly Linked List**: maintains order (head=most recent, tail=least recent)
- **Move to Head**: on access, move node to head (mark as recently used)
- **Remove Tail**: when capacity exceeded, remove tail node

### APPROACH:
1. **Get**: Check hash map, move node to head if found
2. **Put**: Add/update in hash map, add/move node to head
3. **Eviction**: Remove tail node and its hash map entry when over capacity

### DATA STRUCTURES:
- `OrderedDict`: Python's built-in LRU-ready structure
- `Double Linked List + HashMap`: Manual implementation for better understanding

### WHY DOUBLY LINKED LIST?
- Need to remove nodes from middle (requires previous pointer)
- Need to add/remove from both ends efficiently
- Maintains insertion order naturally

### TIME COMPLEXITY: O(1) for both get and put
### SPACE COMPLEXITY: O(capacity)

</details>
"""

from collections import OrderedDict


class LRUCache:
    """
    Approach: OrderedDict
    Time Complexity: O(1) for both get and put
    Space Complexity: O(capacity)
    """

    def __init__(self, capacity: int):
        self.cache = OrderedDict()
        self.capacity = capacity

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1

        # Move to end (mark as recently used)
        self.cache.move_to_end(key)
        return self.cache[key]

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            # Update and move to end
            self.cache.move_to_end(key)

        self.cache[key] = value

        if len(self.cache) > self.capacity:
            # Remove least recently used (first item)
            self.cache.popitem(last=False)


class Node:
    """Doubly linked list node"""
    def __init__(self, key=0, value=0):
        self.key = key
        self.value = value
        self.prev = None
        self.next = None


class LRUCacheManual:
    """
    Manual implementation with HashMap + Doubly Linked List
    Time Complexity: O(1) for both get and put
    Space Complexity: O(capacity)
    """

    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = {}  # key -> node

        # Create dummy head and tail
        self.head = Node()
        self.tail = Node()
        self.head.next = self.tail
        self.tail.prev = self.head

    def _add_to_head(self, node):
        """Add node right after head"""
        node.next = self.head.next
        node.prev = self.head
        self.head.next.prev = node
        self.head.next = node

    def _remove_node(self, node):
        """Remove node from list"""
        prev_node = node.prev
        next_node = node.next
        prev_node.next = next_node
        next_node.prev = prev_node

    def _move_to_head(self, node):
        """Move existing node to head"""
        self._remove_node(node)
        self._add_to_head(node)

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1

        node = self.cache[key]
        self._move_to_head(node)
        return node.value

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            # Update existing node
            node = self.cache[key]
            node.value = value
            self._move_to_head(node)
        else:
            # Create new node
            node = Node(key, value)
            self.cache[key] = node
            self._add_to_head(node)

            if len(self.cache) > self.capacity:
                # Remove LRU (node before tail)
                lru = self.tail.prev
                self._remove_node(lru)
                del self.cache[lru.key]


"""
460. LFU Cache
Hard

Design and implement a data structure for a Least Frequently Used (LFU) cache.
"""

from collections import defaultdict


class LFUCache:
    """
    Approach: Two HashMaps with Doubly Linked Lists per frequency
    Time Complexity: O(1) for both get and put
    Space Complexity: O(capacity)
    """

    def __init__(self, capacity: int):
        self.capacity = capacity
        self.min_freq = 0
        self.key_to_val_freq = {}  # key -> (value, frequency)
        self.freq_to_keys = defaultdict(OrderedDict)  # frequency -> OrderedDict of keys

    def get(self, key: int) -> int:
        if key not in self.key_to_val_freq:
            return -1

        value, freq = self.key_to_val_freq[key]

        # Remove from current frequency list
        del self.freq_to_keys[freq][key]
        if not self.freq_to_keys[freq]:
            del self.freq_to_keys[freq]
            if self.min_freq == freq:
                self.min_freq += 1

        # Add to next frequency list
        self.key_to_val_freq[key] = (value, freq + 1)
        self.freq_to_keys[freq + 1][key] = None

        return value

    def put(self, key: int, value: int) -> None:
        if self.capacity <= 0:
            return

        if key in self.key_to_val_freq:
            # Update existing key
            _, freq = self.key_to_val_freq[key]
            self.key_to_val_freq[key] = (value, freq)
            self.get(key)  # Increase frequency
        else:
            # Add new key
            if len(self.key_to_val_freq) >= self.capacity:
                # Remove LFU key
                lfu_key, _ = self.freq_to_keys[self.min_freq].popitem(last=False)
                del self.key_to_val_freq[lfu_key]

            # Add new key with frequency 1
            self.key_to_val_freq[key] = (value, 1)
            self.freq_to_keys[1][key] = None
            self.min_freq = 1


# Test cases
if __name__ == "__main__":
    # Test LRU Cache
    print("Testing LRU Cache:")
    lru_cache = LRUCache(2)
    operations = [
        ("put", 1, 1),
        ("put", 2, 2),
        ("get", 1),
        ("put", 3, 3),
        ("get", 2),
        ("put", 4, 4),
        ("get", 1),
        ("get", 3),
        ("get", 4)
    ]

    for op in operations:
        if op[0] == "put":
            lru_cache.put(op[1], op[2])
            print(f"put({op[1]}, {op[2]})")
        else:
            result = lru_cache.get(op[1])
            print(f"get({op[1]}) = {result}")

    print("\n" + "="*50 + "\n")

    # Test LFU Cache
    print("Testing LFU Cache:")
    lfu_cache = LFUCache(2)
    operations_lfu = [
        ("put", 1, 1),
        ("put", 2, 2),
        ("get", 1),
        ("put", 3, 3),
        ("get", 2),
        ("get", 3),
        ("put", 4, 4),
        ("get", 1),
        ("get", 3),
        ("get", 4)
    ]

    for op in operations_lfu:
        if op[0] == "put":
            lfu_cache.put(op[1], op[2])
            print(f"put({op[1]}, {op[2]})")
        else:
            result = lfu_cache.get(op[1])
            print(f"get({op[1]}) = {result}")
