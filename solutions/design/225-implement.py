I'll help you implement a Stack data structure in Python. Here's a complete implementation that meets the requirements:

```python
class Stack:
    """
    A simple Stack implementation using a Python list.
    Supports basic stack operations: push, pop, peek, is_empty, and size.
    """
    
    def __init__(self):
        """Initialize an empty stack."""
        self._items = []  # Using list as underlying data structure
    
    def push(self, item):
        """
        Push an item onto the stack.
        
        Args:
            item: The item to be pushed onto the stack.
        """
        self._items.append(item)
    
    def pop(self):
        """
        Remove and return the top item from the stack.
        
        Returns:
            The top item from the stack.
            
        Raises:
            IndexError: If the stack is empty.
        """
        if self.is_empty():
            raise IndexError("Pop from empty stack")
        return self._items.pop()
    
    def peek(self):
        """
        Return the top item from the stack without removing it.
        
        Returns:
            The top item from the stack.
            
        Raises:
            IndexError: If the stack is empty.
        """
        if self.is_empty():
            raise IndexError("Peek from empty stack")
        return self._items[-1]
    
    def is_empty(self):
        """
        Check if the stack is empty.
        
        Returns:
            bool: True if stack is empty, False otherwise.
        """
        return len(self._items) == 0
    
    def size(self):
        """
        Get the number of items in the stack.
        
        Returns:
            int: The number of items in the stack.
        """
        return len(self._items)
    
    def clear(self):
        """Remove all items from the stack."""
        self._items = []
    
    def __str__(self):
        """
        Return a string representation of the stack.
        
        Returns:
            str: A string showing the stack contents from bottom to top.
        """
        return str(self._items)


def main():
    """Example usage of the Stack class."""
    # Create a new stack
    stack = Stack()
    
    # Push some items
    print("Pushing items: 1, 2, 3")
    stack.push(1)
    stack.push(2)
    stack.push(3)
    
    # Display the stack
    print(f"Stack contents: {stack}")
    print(f"Stack size: {stack.size()}")
    
    # Peek at top item
    print(f"Top item (peek): {stack.peek()}")
    
    # Pop items
    print("\nPopping items:")
    while not stack.is_empty():
        print(f"Popped: {stack.pop()}")
    
    # Try to pop from empty stack
    try:
        stack.pop()
    except IndexError as e:
        print(f"\nError: {e}")


if __name__ == "__main__":
    main()
```

This implementation includes:

1. A `Stack` class with all basic stack operations:
   - `push`: Add an item to the top
   - `pop`: Remove and return the top item
   - `peek`: View the top item without removing it
   - `is_empty`: Check if stack is empty
   - `size`: Get number of items in stack
   - `clear`: Remove all items
   - `__str__`: String representation of stack

2. Proper error handling for edge cases:
   - Empty stack operations (pop, peek)
   - Using exceptions for error conditions

3. A main function demonstrating usage of the stack

4. Clean code structure with comprehensive comments

5. Following Python conventions:
   - Using underscore prefix for internal attributes
   - Proper docstrings
   - Type hints in docstrings
   - PEP 8 style guidelines

The implementation uses a Python list as the underlying data structure, which provides O(1) amortized time complexity for push and pop operations.

You can run this file directly to see example usage, or import the Stack class to use in other programs.