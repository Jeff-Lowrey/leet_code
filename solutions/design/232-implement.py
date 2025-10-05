I'll help you implement a Queue data structure in Python. Here's a complete implementation that meets the requirements:

```python
#!/usr/bin/env python3
"""
Queue Implementation in Python
This module implements a Queue data structure with basic operations.
"""

class Queue:
    """
    A Queue implementation using a Python list.
    Follows FIFO (First In First Out) principle.
    """
    
    def __init__(self):
        """Initialize an empty queue."""
        self._items = []
    
    def enqueue(self, item):
        """
        Add an item to the back of the queue.
        
        Args:
            item: The item to be added to the queue
        """
        self._items.append(item)
    
    def dequeue(self):
        """
        Remove and return the item at the front of the queue.
        
        Returns:
            The item at the front of the queue
            
        Raises:
            IndexError: If the queue is empty
        """
        if self.is_empty():
            raise IndexError("Cannot dequeue from an empty queue")
        return self._items.pop(0)
    
    def peek(self):
        """
        Return the item at the front of the queue without removing it.
        
        Returns:
            The item at the front of the queue
            
        Raises:
            IndexError: If the queue is empty
        """
        if self.is_empty():
            raise IndexError("Cannot peek an empty queue")
        return self._items[0]
    
    def is_empty(self):
        """
        Check if the queue is empty.
        
        Returns:
            bool: True if queue is empty, False otherwise
        """
        return len(self._items) == 0
    
    def size(self):
        """
        Get the number of items in the queue.
        
        Returns:
            int: The number of items in the queue
        """
        return len(self._items)
    
    def clear(self):
        """Remove all items from the queue."""
        self._items = []
    
    def __str__(self):
        """
        Return a string representation of the queue.
        
        Returns:
            str: String representation of the queue
        """
        return str(self._items)


def main():
    """Example usage of the Queue class."""
    # Create a new queue
    queue = Queue()
    
    # Add some items
    print("Adding items to queue...")
    queue.enqueue(1)
    queue.enqueue(2)
    queue.enqueue(3)
    print(f"Queue: {queue}")
    
    # Demonstrate dequeue
    print("\nDequeuing items...")
    print(f"Dequeued: {queue.dequeue()}")
    print(f"Queue after dequeue: {queue}")
    
    # Demonstrate peek
    print(f"\nPeek at front item: {queue.peek()}")
    
    # Check size
    print(f"Queue size: {queue.size()}")
    
    # Check if empty
    print(f"Is queue empty? {queue.is_empty()}")
    
    # Clear the queue
    print("\nClearing queue...")
    queue.clear()
    print(f"Is queue empty? {queue.is_empty()}")
    
    # Demonstrate error handling
    try:
        queue.dequeue()
    except IndexError as e:
        print(f"Error: {e}")


if __name__ == "__main__":
    main()
```

This implementation includes:

1. A `Queue` class with standard queue operations:
   - `enqueue`: Add an item to the back
   - `dequeue`: Remove and return the front item
   - `peek`: View the front item without removing it
   - `is_empty`: Check if queue is empty
   - `size`: Get number of items in queue
   - `clear`: Remove all items

2. Proper error handling for edge cases:
   - Attempting to dequeue from an empty queue
   - Attempting to peek at an empty queue

3. A main function demonstrating usage of the Queue class

4. Clear documentation using docstrings

5. Python best practices:
   - Clear naming conventions
   - Proper encapsulation (using protected `_items` list)
   - Type hints in docstrings
   - Comprehensive error handling

6. The implementation uses a Python list as the underlying data structure, with `append()` for enqueue and `pop(0)` for dequeue operations.

You can run this file directly to see example usage of the Queue implementation. The code is structured to be both educational and practical for real-world use.