/**
### INTUITION:
The key insight is that the challenge is to add a peek() operation that returns the next element without advancing the iterator. We need to cache the next element to support this functionality while maintaining compatibility with the original iterator interface.

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

### EXAMPLE WALKTHROUGH:
Input:
```
Iterator: [1,2,3]
```

PeekingIterator created

Steps:
Step 1: peek() → 1 (cache element 1, don't advance)
Step 2: next() → 1 (return cached element, advance iterator)
Step 3: peek() → 2 (cache element 2, don't advance)
Step 4: peek() → 2 (return same cached element)
Step 5: next() → 2 (return cached element, advance iterator)
Step 6: hasNext() → true (iterator still has element 3)
Step 7: next() → 3 (fetch from iterator)
Step 8: hasNext() → false

Output:
```
true
```

### TIME COMPLEXITY:
O(1)**
All operations are constant time

### SPACE COMPLEXITY:
O(1)**
- Constant extra space
Only storing one cached element

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

*/

/**
 * Simple Iterator class for demonstration
 * In LeetCode, this is provided
 */
class Iterator {
  constructor(arr) {
    this.arr = arr;
    this.index = 0;
  }

  hasNext() {
    return this.index < this.arr.length;
  }

  next() {
    return this.arr[this.index++];
  }
}

/**
 * PeekingIterator class that wraps an iterator and adds peek functionality
 *
 * Time Complexity: O(1) for all operations
 * Space Complexity: O(1)
 */
class PeekingIterator {
  /**
   * @param {Iterator} iterator
   */
  constructor(iterator) {
    this.iterator = iterator;
    this.cachedValue = null;
    this.hasCached = false;

    // Pre-fetch the first element if available
    if (this.iterator.hasNext()) {
      this.cachedValue = this.iterator.next();
      this.hasCached = true;
    }
  }

  /**
   * Returns the next element without advancing the iterator
   * @return {number}
   */
  peek() {
    return this.cachedValue;
  }

  /**
   * Returns the next element and advances the iterator
   * @return {number}
   */
  next() {
    const result = this.cachedValue;

    // Fetch next value if available
    if (this.iterator.hasNext()) {
      this.cachedValue = this.iterator.next();
      this.hasCached = true;
    } else {
      this.cachedValue = null;
      this.hasCached = false;
    }

    return result;
  }

  /**
   * Returns true if there are more elements to iterate
   * @return {boolean}
   */
  hasNext() {
    return this.hasCached;
  }
}

/**
 * Factory function for creating PeekingIterator instances
 * @param {Iterator} iterator - Iterator to wrap
 * @return {PeekingIterator}
 */
function solve(iterator) {
  return new PeekingIterator(iterator);
}

/**
 * Test cases for Problem 284: Peeking Iterator
 */
function testSolution() {
  console.log("Testing 284. Peeking Iterator");

  // Test case 1: Standard usage with peek and next
  const iter1 = new PeekingIterator(new Iterator([1, 2, 3]));
  console.assert(iter1.peek() === 1, "Test 1a failed: first peek");
  console.assert(iter1.next() === 1, "Test 1b failed: first next");
  console.assert(iter1.peek() === 2, "Test 1c failed: second peek");
  console.assert(iter1.next() === 2, "Test 1d failed: second next");
  console.assert(iter1.next() === 3, "Test 1e failed: third next");
  console.assert(
    iter1.hasNext() === false,
    "Test 1f failed: hasNext after exhaustion",
  );

  // Test case 2: Multiple consecutive peeks
  const iter2 = new PeekingIterator(new Iterator([1, 2, 3]));
  console.assert(iter2.peek() === 1, "Test 2a failed");
  console.assert(iter2.peek() === 1, "Test 2b failed");
  console.assert(iter2.peek() === 1, "Test 2c failed");
  console.assert(iter2.next() === 1, "Test 2d failed");

  // Test case 3: Single element
  const iter3 = new PeekingIterator(new Iterator([42]));
  console.assert(iter3.hasNext() === true, "Test 3a failed");
  console.assert(iter3.peek() === 42, "Test 3b failed");
  console.assert(iter3.next() === 42, "Test 3c failed");
  console.assert(iter3.hasNext() === false, "Test 3d failed");

  // Test case 4: LeetCode example
  const iter4 = new PeekingIterator(new Iterator([1, 2, 3]));
  console.assert(iter4.next() === 1, "Test 4a failed");
  console.assert(iter4.peek() === 2, "Test 4b failed");
  console.assert(iter4.next() === 2, "Test 4c failed");
  console.assert(iter4.next() === 3, "Test 4d failed");
  console.assert(iter4.hasNext() === false, "Test 4e failed");

  // Test case 5: Peek without next
  const iter5 = new PeekingIterator(new Iterator([5, 6, 7, 8]));
  console.assert(iter5.peek() === 5, "Test 5a failed");
  console.assert(iter5.hasNext() === true, "Test 5b failed");
  console.assert(iter5.next() === 5, "Test 5c failed");
  console.assert(iter5.peek() === 6, "Test 5d failed");

  console.log("All test cases passed for 284. Peeking Iterator!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 284. Peeking Iterator ===");
  console.log("Category: Design");
  console.log("Difficulty: Medium");
  console.log("");

  // Example: Demonstrate peek functionality
  console.log("Example: Iterator with [1, 2, 3]");
  const peekIterator = new PeekingIterator(new Iterator([1, 2, 3]));

  console.log("Operations:");
  console.log(`next() -> ${peekIterator.next()} (returns 1, moves to 2)`);
  console.log(`peek() -> ${peekIterator.peek()} (returns 2, no move)`);
  console.log(`next() -> ${peekIterator.next()} (returns 2, moves to 3)`);
  console.log(`next() -> ${peekIterator.next()} (returns 3, moves to end)`);
  console.log(`hasNext() -> ${peekIterator.hasNext()} (returns false)\n`);

  testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
  demonstrateSolution();
}

// Export for use in other modules
module.exports = {
  Iterator,
  PeekingIterator,
  solve,
  testSolution,
  demonstrateSolution,
};

/**
 * Additional Notes:
 * - Buffering pattern is common in iterator design for lookahead functionality
 * - O(1) space overhead makes this practical for large data streams
 * - Can be extended to support multi-element lookahead with a queue
 * - The pattern is used in parsers, tokenizers, and stream processors
 * - Maintains iterator contract while adding non-destructive read capability
 */
