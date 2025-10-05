I'll help you implement an LFU (Least Frequently Used) Cache in Python. Here's a complete implementation that meets the requirements:

```python
"""
LFU (Least Frequently Used) Cache Implementation in Python

This implementation uses a combination of hash maps and doubly linked lists
to achieve O(1) time complexity for both get and put operations.

The cache maintains:
- A frequency map to track items with same frequency
- A key-value map for quick access to cache nodes
- A key-frequency map to track frequency of each key
"""

class Node:
    def __init__(self, key=None, value=None):
        self.key = key
        self.value = value
        self.freq = 1
        self.prev = None
        self.next = None

class DLinkedList:
    def __init__(self):
        self.head = Node()  # Sentinel head
        self.tail = Node()  # Sentinel tail
        self.head.next = self.tail
        self.tail.prev = self.head
        self.size = 0

    def add_node(self, node):
        """Add node right after head."""
        node.prev = self.head
        node.next = self.head.next
        self.head.next.prev = node
        self.head.next = node
        self.size += 1

    def remove_node(self, node):
        """Remove an existing node from the linked list."""
        prev = node.prev
        new = node.next
        prev.next = new
        new.prev = prev
        self.size -= 1

    def remove_tail(self):
        """Remove the node before tail."""
        if self.size > 0:
            node = self.tail.prev
            self.remove_node(node)
            return node
        return None

class LFUCache:
    def __init__(self, capacity: int):
        """Initialize the LFU cache with given capacity."""
        self.capacity = capacity
        self.size = 0
        self.min_freq = 0
        self.key_to_node = {}  # Map key to Node
        self.freq_to_list = {}  # Map frequency to DLinkedList
        
    def _update_freq(self, node):
        """Update the frequency of a node."""
        # Remove from current frequency list
        freq = node.freq
        self.freq_to_list[freq].remove_node(node)
        
        # If current frequency list is empty and it's the minimum frequency,
        # increment min_freq
        if self.min_freq == freq and self.freq_to_list[freq].size == 0:
            self.min_freq += 1
            
        # Add to new frequency list
        node.freq += 1
        if node.freq not in self.freq_to_list:
            self.freq_to_list[node.freq] = DLinkedList()
        self.freq_to_list[node.freq].add_node(node)

    def get(self, key: int) -> int:
        """
        Get the value of the key if the key exists in the cache.
        Returns -1 if the key does not exist.
        """
        if key not in self.key_to_node:
            return -1
        
        node = self.key_to_node[key]
        self._update_freq(node)
        return node.value

    def put(self, key: int, value: int) -> None:
        """
        Set or insert the value if the key is not already present.
        When the cache reaches its capacity, invalidate the least frequently used item.
        """
        if self.capacity == 0:
            return
        
        if key in self.key_to_node:
            node = self.key_to_node[key]
            node.value = value
            self._update_freq(node)
        else:
            # Remove the least frequently used item if cache is full
            if self.size >= self.capacity:
                # Get the LFU list
                lfu_list = self.freq_to_list[self.min_freq]
                # Remove the LRU item from that list
                lru_node = lfu_list.remove_tail()
                del self.key_to_node[lru_node.key]
                self.size -= 1
            
            # Add new node
            node = Node(key, value)
            self.key_to_node[key] = node
            if 1 not in self.freq_to_list:
                self.freq_to_list[1] = DLinkedList()
            self.freq_to_list[1].add_node(node)
            self.min_freq = 1
            self.size += 1

def main():
    """Example usage of LFUCache."""
    cache = LFUCache(2)
    cache.put(1, 1)
    cache.put(2, 2)
    print(cache.get(1))       # returns 1
    cache.put(3, 3)          # evicts key 2
    print(cache.get(2))       # returns -1 (not found)
    print(cache.get(3))       # returns 3
    cache.put(4, 4)          # evicts key 1
    print(cache.get(1))       # returns -1 (not found)
    print(cache.get(3))       # returns 3
    print(cache.get(4))       # returns 4

if __name__ == "__main__":
    main()
```

This implementation provides an LFU Cache with the following features:

1. O(1) time complexity for both get and put operations
2. Uses a combination of hash maps and doubly linked lists for efficient operations
3. Properly handles capacity constraints and least frequently used item eviction
4. Includes clear comments explaining the implementation
5. Follows Python naming conventions and best practices
6. Includes a main function demonstrating usage
7. Handles edge cases (empty cache, capacity = 0, etc.)

The implementation uses three main components:
- Node class for storing key-value pairs with frequency information
- DLinkedList class for managing nodes with the same frequency
- LFUCache class that implements the main cache functionality

The cache maintains frequency information for each key and uses it to determine which items to evict when the cache is full. When multiple items have the same frequency, it uses LRU (Least Recently Used) policy as a tiebreaker.