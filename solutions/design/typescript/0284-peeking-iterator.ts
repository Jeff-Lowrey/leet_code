/**
 * # Difficulty: Medium
 * 
 * # 284. Peeking Iterator
 * 
 * Design an iterator that supports the peek operation on an existing iterator in addition to the hasNext and the next operations.
 * 
 * Implement the PeekingIterator class:
 * - PeekingIterator(Iterator<int> iterator) Initializes the object with the given integer iterator iterator.
 * - int next() Returns the next element in the array and moves the pointer to the next element.
 * - boolean hasNext() Returns true if there are still elements in the array.
 * - int peek() Returns the next element in the array without moving the pointer.
 * 
 * Note: Each language may have a different implementation of the constructor and Iterator, but they all support the int next() and boolean hasNext() functions.
 * 
 * **Example:**
 * 
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>
 * ["PeekingIterator", "next", "peek", "next", "next", "hasNext"]<br>
 * [[[1, 2, 3]], [], [], [], [], []]
 * </dd>
 * <dt>Output:</dt>
 * <dd>[null, 1, 2, 2, 3, false]</dd>
 * <dt>Explanation:</dt>
 * <dd>
 * PeekingIterator peekingIterator = new PeekingIterator([1, 2, 3]); // [1,2,3]<br>
 * peekingIterator.next();    // return 1, the pointer moves to the next element [1,2,3].<br>
 * peekingIterator.peek();    // return 2, the pointer does not move [1,2,3].<br>
 * peekingIterator.next();    // return 2, the pointer moves to the next element [1,2,3]<br>
 * peekingIterator.next();    // return 3, the pointer moves to the next element [1,2,3]<br>
 * peekingIterator.hasNext(); // return False
 * </dd>
 * </dl>
 * 
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Standard Algorithm
 * **Data Structures**: Array, Linked List
 * **Patterns**: Iterative Solution
 * **Time Complexity**: O(1)
 * **Space Complexity**: O(1) - Constant extra space
 * 
 * ### INTUITION:
 * The challenge is to add a peek() operation that returns the next element without advancing the iterator. We need to cache the next element to support this functionality while maintaining compatibility with the original iterator interface.
 * 
 * ### APPROACH:
 * 1. **Cache next element**: Store the upcoming element when needed
 * 2. **Track cached state**: Know when we have a cached element vs need to fetch
 * 3. **Peek operation**: Return cached element without advancing
 * 4. **Next operation**: Return cached element (if exists) or fetch from iterator
 * 5. **HasNext operation**: Check if cached element exists or iterator has more
 * 
 * ### WHY THIS WORKS:
 * - Caching allows us to "look ahead" without consuming the iterator
 * - State tracking ensures we don't double-consume elements
 * - All operations maintain O(1) complexity
 * - Original iterator interface is preserved
 * 
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * Iterator: [1,2,3]
 * ```
 *
 * PeekingIterator created
 *
 * Steps:
 * Step 1: peek() → 1 (cache element 1, don't advance)
 * Step 2: next() → 1 (return cached element, advance iterator)
 * Step 3: peek() → 2 (cache element 2, don't advance)
 * Step 4: peek() → 2 (return same cached element)
 * Step 5: next() → 2 (return cached element, advance iterator)
 * Step 6: hasNext() → true (iterator still has element 3)
 * Step 7: next() → 3 (fetch from iterator)
 * Step 8: hasNext() → false
 * 
 * Output:
 * ```
 * true
 * ```
 * 
 * ### TIME COMPLEXITY:
 * O(1)
 * All operations are constant time
 * 
 * ### SPACE COMPLEXITY:
 * O(1)
 * Only storing one cached element
 * 
 * ### EDGE CASES:
 * - Empty iterator (hasNext() returns false immediately)
 * - Single element iterator (works correctly with cache)
 * - Multiple consecutive peek() calls (returns same element)
 * - peek() then next() (peek doesn't consume, next does)
 * - Calling peek() when hasNext() is false (undefined behavior, should check first)
 * 
 * </details>
 */

class Solution {
}

// Test cases
if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();
  // Add test cases here
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;