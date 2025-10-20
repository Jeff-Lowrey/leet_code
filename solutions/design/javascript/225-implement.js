/**
 *  Difficulty: Easy
 *
 * # 225. Implement Stack using Queues
 *
 * Implement a last-in-first-out (LIFO) stack using only two queues.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>
 * ["MyStack", "push", "push", "top", "pop", "empty"]<br>
 * [[], [1], [2], [], [], []]
 * </dd>
 * <dt>Output:</dt>
 * <dd>[null, null, null, 2, 2, false]</dd>
 * <dt>Explanation:</dt>
 * <dd>
 * MyStack myStack = new MyStack();<br>
 * myStack.push(1);<br>
 * myStack.push(2);<br>
 * myStack.top(); // return 2<br>
 * myStack.pop(); // return 2<br>
 * myStack.empty(); // return False
 * </dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>

 * ### METADATA:
 * **Techniques**: Object-Oriented Design, Data Structure Design
 * **Data Structures**: Custom Data Structures, Hash Map, Array
 * **Patterns**: Design Pattern, Encapsulation
 * **Time Complexity**: * - push: O(n) - need to rotate queue
 * **Space Complexity**: **O(n) for storing n elements

 *
 * ### INTUITION:
 * A stack follows LIFO (Last In First Out), while a queue follows FIFO (First In First Out).
 * To simulate stack behavior using queues, we need to reverse the order on every push or pop.
 * The most efficient approach is to reverse on push, making pop O(1).
 *
 * ### APPROACH:
 * 1. **Single Queue Approach**: Use one main queue
 * 2. **push**: Add new element, then rotate queue to move it to front
 *    - Add element to queue
 *    - Rotate queue: for each existing element, dequeue and enqueue (n-1 times)
 *    - This makes the newest element the front of the queue
 * 3. **pop**: Simply dequeue from front (now acts like stack top)
 * 4. **top**: Peek at front element
 * 5. **empty**: Check if queue is empty
 *
 * ### WHY THIS WORKS:
 * - By rotating the queue on every push, we maintain stack order
 * - The most recently added element is always at the front
 * - Pop and top operations become O(1)
 * - Only push is O(n), which is acceptable
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * push(1): queue = [1]
 * push(2): queue = [2] -> rotate -> [2, 1]
 * push(3): queue = [3, 2, 1] -> rotate -> [3, 2, 1]
 * top() -> 3
 * pop() -> 3, queue = [2, 1]
 * top() -> 2
 * ```
 *
 * ### TIME COMPLEXITY:
 * - push: O(n) - need to rotate queue
 * - pop: O(1)
 * - top: O(1)
 * - empty: O(1)
 *
 * ### SPACE COMPLEXITY:
 * O(n) for storing n elements
 *
 * ### EDGE CASES:
 * - Empty stack
 * - Single element
 * - Multiple push/pop operations
 *
 * </details>
 */

/**
 * MyStack class - Implements Stack using Queues
 *
 * Uses two queues to simulate LIFO behavior:
 * - mainQueue: stores elements with newest at front (stack top)
 * - tempQueue: temporary storage for element rotation during push
 */
class MyStack {
  /**
   * Initialize the stack data structure.
   */
  constructor() {
    this.mainQueue = []; // Primary storage with stack order
    this.tempQueue = []; // Temporary queue for rotation
  }

  /**
   * Push element x onto stack.
   * @param {number} x - Element to push
   *
   * Time Complexity: O(n) - need to rotate elements
   * Space Complexity: O(1)
   */
  push(x) {
    // Add new element to tempQueue first
    this.tempQueue.push(x);

    // Move all existing elements from mainQueue to tempQueue
    while (this.mainQueue.length > 0) {
      this.tempQueue.push(this.mainQueue.shift());
    }

    // Swap queues - tempQueue (with new element at front) becomes mainQueue
    [this.mainQueue, this.tempQueue] = [this.tempQueue, this.mainQueue];
  }

  /**
   * Removes the element on top of the stack and returns it.
   * @return {number} - Top element
   *
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  pop() {
    return this.mainQueue.shift();
  }

  /**
   * Get the top element without removing it.
   * @return {number} - Top element
   *
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  top() {
    return this.mainQueue[0];
  }

  /**
   * Returns whether the stack is empty.
   * @return {boolean} - True if empty, false otherwise
   *
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  empty() {
    return this.mainQueue.length === 0;
  }
}

/**
 * Alternative implementation using single queue
 */
class MyStackSingleQueue {
  constructor() {
    this.queue = [];
  }

  push(x) {
    const size = this.queue.length;
    this.queue.push(x);

    // Rotate queue so new element is at front
    for (let i = 0; i < size; i++) {
      this.queue.push(this.queue.shift());
    }
  }

  pop() {
    return this.queue.shift();
  }

  top() {
    return this.queue[0];
  }

  empty() {
    return this.queue.length === 0;
  }
}

/**
 * Factory function for creating MyStack instances
 * @return {MyStack}
 */
function solve() {
  return new MyStack();
}

/**
 * Test cases for Problem 225: Implement Stack using Queues
 */
function testSolution() {
  console.log("Testing 225. Implement Stack using Queues");

  // Test case 1: Basic functionality
  const stack1 = new MyStack();
  stack1.push(1);
  stack1.push(2);
  console.assert(stack1.top() === 2, "Test 1a failed: top should return 2");
  console.assert(stack1.pop() === 2, "Test 1b failed: pop should return 2");
  console.assert(!stack1.empty(), "Test 1c failed: stack should not be empty");
  console.assert(stack1.pop() === 1, "Test 1d failed: pop should return 1");
  console.assert(stack1.empty(), "Test 1e failed: stack should be empty");

  // Test case 2: LIFO behavior verification
  const stack2 = new MyStack();
  stack2.push(1);
  stack2.push(2);
  stack2.push(3);
  console.assert(
    stack2.pop() === 3,
    "Test 2a failed: LIFO - last in first out",
  );
  console.assert(stack2.pop() === 2, "Test 2b failed: LIFO - second last");
  console.assert(
    stack2.pop() === 1,
    "Test 2c failed: LIFO - first in last out",
  );

  // Test case 3: Alternating operations
  const stack3 = new MyStack();
  stack3.push(1);
  console.assert(stack3.top() === 1, "Test 3a failed");
  stack3.push(2);
  console.assert(stack3.top() === 2, "Test 3b failed");
  console.assert(stack3.pop() === 2, "Test 3c failed");
  stack3.push(3);
  console.assert(stack3.top() === 3, "Test 3d failed");

  // Test case 4: Single queue implementation
  const stack4 = new MyStackSingleQueue();
  stack4.push(1);
  stack4.push(2);
  console.assert(stack4.top() === 2, "Test 4a failed");
  console.assert(stack4.pop() === 2, "Test 4b failed");
  console.assert(stack4.pop() === 1, "Test 4c failed");
  console.assert(stack4.empty(), "Test 4d failed");

  console.log("All test cases passed for 225. Implement Stack using Queues!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 225. Implement Stack using Queues ===");
  console.log("Category: Design");
  console.log("Difficulty: Easy");
  console.log("");

  // Example demonstration
  const stack = new MyStack();
  console.log("Operations: push(1), push(2), top(), pop(), empty()");

  stack.push(1);
  console.log("After push(1): stack has 1 element");

  stack.push(2);
  console.log("After push(2): stack has 2 elements");

  console.log("top():", stack.top(), "(should be 2 - last element pushed)");
  console.log("pop():", stack.pop(), "(should be 2 - LIFO behavior)");
  console.log("empty():", stack.empty(), "(should be false)");
  console.log("pop():", stack.pop(), "(should be 1)");
  console.log("empty():", stack.empty(), "(should be true)");
  console.log("");

  testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
  demonstrateSolution();
}

// Export for use in other modules
module.exports = {
  MyStack,
  MyStackSingleQueue,
  solve,
  testSolution,
  demonstrateSolution,
};

/**
 * Additional Notes:
 * - This solution uses two queues with rotation strategy for stack simulation
 * - Push operation is O(n) due to element rotation, but pop/top are O(1)
 * - Single queue version is more space-efficient but same time complexity
 * - The rotation approach ensures newest element is always at queue front
 * - Critical for understanding queue/stack conversion patterns in system design
 * - Alternative to expensive push is expensive pop - trade-off depends on usage pattern
 */
