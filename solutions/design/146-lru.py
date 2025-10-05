I'll help you implement an LRU (Least Recently Used) Cache in Python. Here's a complete implementation that meets the requirements:

```python
from collections import OrderedDict

class LRUCache:
    """
    LRU Cache Implementation using OrderedDict
    
    This implementation provides O(1) time complexity for both get and put operations.
    Uses OrderedDict to maintain the order of elements, where most recently used items
    are moved to the end and least recently used items are at the beginning.
    """
    
    def __init__(self, capacity: int):
        """
        Initialize the LRU Cache with given capacity
        
        Args:
            capacity (int): Maximum number of items the cache can hold
        """
        self.cache = OrderedDict()
        self.capacity = capacity

    def get(self, key: int) -> int:
        """
        Retrieve item from cache. If exists, move to end (mark as most recently used)
        
        Args:
            key (int): Key to look up in cache
            
        Returns:
            int: Value associated with key, or -1 if key doesn't exist
        """
        if key not in self.cache:
            return -1
        
        # Move the accessed item to end (mark as most recently used)
        self.cache.move_to_end(key)
        return self.cache[key]

    def put(self, key: int, value: int) -> None:
        """
        Add or update item in cache. If cache is full, remove least recently used item
        
        Args:
            key (int): Key to store
            value (int): Value to store
        """
        # If key exists, update its value and move to end
        if key in self.cache:
            self.cache.move_to_end(key)
        
        self.cache[key] = value
        
        # If cache exceeds capacity, remove the least recently used item
        if len(self.cache) > self.capacity:
            self.cache.popitem(last=False)


def test_lru_cache():
    """
    Test function to demonstrate LRU Cache functionality
    """
    # Initialize cache with capacity of 2
    cache = LRUCache(2)
    
    # Test basic operations
    cache.put(1, 1)
    cache.put(2, 2)
    assert cache.get(1) == 1       # returns 1
    cache.put(3, 3)                # evicts key 2
    assert cache.get(2) == -1      # returns -1 (not found)
    cache.put(4, 4)                # evicts key 1
    assert cache.get(1) == -1      # returns -1 (not found)
    assert cache.get(3) == 3       # returns 3
    assert cache.get(4) == 4       # returns 4
    
    print("All test cases passed!")


if __name__ == "__main__":
    # Run tests
    test_lru_cache()
```

This implementation:

1. Uses `OrderedDict` from collections module for efficient ordering operations
2. Provides O(1) time complexity for both get and put operations
3. Includes comprehensive comments explaining the implementation
4. Follows Python naming conventions and best practices
5. Includes a test function to verify functionality
6. Handles edge cases like cache misses and capacity limits

Key features:
- The cache maintains items in order of use, with most recently used at the end
- When capacity is exceeded, the least recently used item is removed
- Get operations move accessed items to the end (marking them as most recently used)
- Put operations either update existing items or add new ones, removing old ones if needed

The implementation is complete and can be run directly to test the functionality. The test cases demonstrate basic operations and edge cases.