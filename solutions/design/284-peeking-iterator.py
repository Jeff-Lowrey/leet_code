"""
# 284. Peeking Iterator
**Medium**

Design an iterator that supports the peek operation on an existing iterator in addition to the hasNext and the next operations.

Implement the PeekingIterator class:
- PeekingIterator(Iterator<int> iterator) Initializes the object with the given integer iterator iterator.
- int next() Returns the next element in the array and moves the pointer to the next element.
- boolean hasNext() Returns true if there are still elements in the array.
- int peek() Returns the next element in the array without moving the pointer.

Note: Each language may have a different implementation of the constructor and Iterator, but they all support the int next() and boolean hasNext() functions.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
The challenge is to add a peek() operation that returns the next element without advancing the iterator. We need to cache the next element to support this functionality while maintaining compatibility with the original iterator interface.

### APPROACH:
1. **Cache next element**: Store the upcoming element when needed
2. **Track cached state**: Know when we have a cached element vs need to fetch
3. **Peek operation**: Return cached element without advancing
4. **Next operation**: Return cached element (if exists) or fetch from iterator
5. **HasNext operation**: Check if cached element exists or iterator has more

### WHY THIS WORKS:
- Caching allows us to "look ahead" without consuming the iterator
- State tracking ensures we don't double-consume elements
- All operations maintain O(1) complexity
- Original iterator interface is preserved

### TIME COMPLEXITY: O(1)
All operations are constant time

### SPACE COMPLEXITY: O(1)
Only storing one cached element

### EXAMPLE WALKTHROUGH:
```
Iterator: [1,2,3]
PeekingIterator created
peek() → 1 (cache element 1, don't advance)
next() → 1 (return cached element, advance iterator)
peek() → 2 (cache element 2, don't advance)
peek() → 2 (return same cached element)
next() → 2 (return cached element, advance iterator)
hasNext() → true (iterator still has element 3)
next() → 3 (fetch from iterator)
hasNext() → false
```

### KEY DESIGN DECISIONS:
- **Lazy caching**: Only cache when peek() is called
- **State management**: Track whether cache is valid
- **Iterator delegation**: Preserve original iterator functionality

</details>
"""

# Dummy Iterator class for testing (represents the given iterator interface)
class Iterator:
    def __init__(self, nums):
        """Initialize with a list of numbers."""
        self.nums = nums
        self.index = 0

    def next(self):
        """Returns the next element and advances the pointer."""
        if self.hasNext():
            val = self.nums[self.index]
            self.index += 1
            return val
        raise StopIteration("No more elements")

    def hasNext(self):
        """Returns True if there are more elements."""
        return self.index < len(self.nums)


class PeekingIterator:
    """
    Iterator that supports peek operation.
    """

    def __init__(self, iterator):
        """
        Initialize the peeking iterator with a base iterator.

        Args:
            iterator: Base iterator supporting next() and hasNext()
        """
        self.iterator = iterator
        self.cached_value = None
        self.has_cached = False

        # Cache the first element if it exists
        if self.iterator.hasNext():
            self.cached_value = self.iterator.next()
            self.has_cached = True

    def peek(self):
        """
        Returns the next element without advancing the iterator.

        Returns:
            The next element

        Time Complexity: O(1)
        Space Complexity: O(1)
        """
        if not self.has_cached:
            raise StopIteration("No more elements to peek")
        return self.cached_value

    def next(self):
        """
        Returns the next element and advances the iterator.

        Returns:
            The next element

        Time Complexity: O(1)
        Space Complexity: O(1)
        """
        if not self.has_cached:
            raise StopIteration("No more elements")

        # Return current cached value
        result = self.cached_value

        # Update cache with next element if available
        if self.iterator.hasNext():
            self.cached_value = self.iterator.next()
            self.has_cached = True
        else:
            self.has_cached = False
            self.cached_value = None

        return result

    def hasNext(self):
        """
        Returns True if there are more elements.

        Returns:
            True if more elements exist, False otherwise

        Time Complexity: O(1)
        Space Complexity: O(1)
        """
        return self.has_cached


class PeekingIteratorAlternative:
    """
    Alternative implementation using on-demand caching.
    """

    def __init__(self, iterator):
        """Initialize with lazy caching approach."""
        self.iterator = iterator
        self.peeked_value = None
        self.is_peeked = False

    def peek(self):
        """Peek at next element, caching on first call."""
        if not self.is_peeked:
            if not self.iterator.hasNext():
                raise StopIteration("No more elements to peek")
            self.peeked_value = self.iterator.next()
            self.is_peeked = True
        return self.peeked_value

    def next(self):
        """Return next element, using cache if available."""
        if self.is_peeked:
            # Return cached value and clear cache
            result = self.peeked_value
            self.is_peeked = False
            self.peeked_value = None
            return result
        else:
            # Get directly from iterator
            if not self.iterator.hasNext():
                raise StopIteration("No more elements")
            return self.iterator.next()

    def hasNext(self):
        """Check if more elements available."""
        return self.is_peeked or self.iterator.hasNext()


def test_solution():
    """Test cases for Problem 284."""

    # Test case 1: Basic functionality
    iterator1 = Iterator([1, 2, 3])
    peekingIterator1 = PeekingIterator(iterator1)

    assert peekingIterator1.peek() == 1, "Peek should return 1"
    assert peekingIterator1.next() == 1, "Next should return 1"
    assert peekingIterator1.hasNext() == True, "Should have more elements"
    assert peekingIterator1.next() == 2, "Next should return 2"
    assert peekingIterator1.peek() == 3, "Peek should return 3"
    assert peekingIterator1.next() == 3, "Next should return 3"
    assert peekingIterator1.hasNext() == False, "Should have no more elements"

    # Test case 2: Multiple peeks
    iterator2 = Iterator([1, 2])
    peekingIterator2 = PeekingIterator(iterator2)

    assert peekingIterator2.peek() == 1, "First peek should return 1"
    assert peekingIterator2.peek() == 1, "Second peek should return 1"
    assert peekingIterator2.next() == 1, "Next should return 1"
    assert peekingIterator2.peek() == 2, "Peek should return 2"
    assert peekingIterator2.hasNext() == True, "Should have more elements"

    # Test case 3: Single element
    iterator3 = Iterator([42])
    peekingIterator3 = PeekingIterator(iterator3)

    assert peekingIterator3.hasNext() == True, "Should have element"
    assert peekingIterator3.peek() == 42, "Peek should return 42"
    assert peekingIterator3.next() == 42, "Next should return 42"
    assert peekingIterator3.hasNext() == False, "Should be empty"

    # Test case 4: Alternative implementation
    iterator4 = Iterator([1, 2, 3])
    peekingIterator4 = PeekingIteratorAlternative(iterator4)

    assert peekingIterator4.hasNext() == True, "Should have elements"
    assert peekingIterator4.peek() == 1, "Peek should return 1"
    assert peekingIterator4.next() == 1, "Next should return 1"
    assert peekingIterator4.next() == 2, "Next should return 2"

    # Test case 5: Empty iterator behavior
    iterator5 = Iterator([])
    peekingIterator5 = PeekingIterator(iterator5)
    assert peekingIterator5.hasNext() == False, "Empty iterator should have no elements"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    print("=== 284. Peeking Iterator ===")

    # Demonstrate usage
    nums = [1, 2, 3, 4]
    iterator = Iterator(nums)
    peeking_iterator = PeekingIterator(iterator)

    print(f"Original array: {nums}")
    print(f"peek() -> {peeking_iterator.peek()}")
    print(f"next() -> {peeking_iterator.next()}")
    print(f"peek() -> {peeking_iterator.peek()}")
    print(f"peek() -> {peeking_iterator.peek()}")
    print(f"next() -> {peeking_iterator.next()}")
    print(f"hasNext() -> {peeking_iterator.hasNext()}")
    print(f"next() -> {peeking_iterator.next()}")
    print(f"next() -> {peeking_iterator.next()}")
    print(f"hasNext() -> {peeking_iterator.hasNext()}")
