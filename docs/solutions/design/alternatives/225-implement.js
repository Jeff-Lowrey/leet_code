/**
 * Difficulty: Medium
 *
 * [Problem description goes here]
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[input description]</dd>
 * <dt>Output:</dt>
 * <dd>[output description]</dd>
 * <dt>Explanation:</dt>
 * <dd>[explanation]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * [High-level insight or key observation]
 *
 * ### APPROACH:
 * [Detailed explanation of the solution approach]
 *
 * ### WHY THIS WORKS:
 * - [Explanation of correctness]
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * [example input]
 * ```
 * **Step 1:** [description]
 * **Step 2:** [description]
 *
 * ### TIME COMPLEXITY:
 * **O(?)** - [explanation]
 *
 * ### SPACE COMPLEXITY:
 * **O(?)** - [explanation]
 *
 * ### EDGE CASES:
 * - **Empty stack:** Handle operations on empty stack
 * - **Single element:** Push/pop with one item
 * - **Balanced pairs:** Match opening/closing elements
 * - **Nested structures:** Handle deeply nested cases
 * - **Underflow:** Prevent popping from empty stack
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
        this.mainQueue = [];  // Primary storage with stack order
        this.tempQueue = [];  // Temporary queue for rotation
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
    console.log('Testing 225. Implement Stack using Queues');

    // Test case 1: Basic functionality
    const stack1 = new MyStack();
    stack1.push(1);
    stack1.push(2);
    console.assert(stack1.top() === 2, 'Test 1a failed: top should return 2');
    console.assert(stack1.pop() === 2, 'Test 1b failed: pop should return 2');
    console.assert(!stack1.empty(), 'Test 1c failed: stack should not be empty');
    console.assert(stack1.pop() === 1, 'Test 1d failed: pop should return 1');
    console.assert(stack1.empty(), 'Test 1e failed: stack should be empty');

    // Test case 2: LIFO behavior verification
    const stack2 = new MyStack();
    stack2.push(1);
    stack2.push(2);
    stack2.push(3);
    console.assert(stack2.pop() === 3, 'Test 2a failed: LIFO - last in first out');
    console.assert(stack2.pop() === 2, 'Test 2b failed: LIFO - second last');
    console.assert(stack2.pop() === 1, 'Test 2c failed: LIFO - first in last out');

    // Test case 3: Alternating operations
    const stack3 = new MyStack();
    stack3.push(1);
    console.assert(stack3.top() === 1, 'Test 3a failed');
    stack3.push(2);
    console.assert(stack3.top() === 2, 'Test 3b failed');
    console.assert(stack3.pop() === 2, 'Test 3c failed');
    stack3.push(3);
    console.assert(stack3.top() === 3, 'Test 3d failed');

    // Test case 4: Single queue implementation
    const stack4 = new MyStackSingleQueue();
    stack4.push(1);
    stack4.push(2);
    console.assert(stack4.top() === 2, 'Test 4a failed');
    console.assert(stack4.pop() === 2, 'Test 4b failed');
    console.assert(stack4.pop() === 1, 'Test 4c failed');
    console.assert(stack4.empty(), 'Test 4d failed');

    console.log('All test cases passed for 225. Implement Stack using Queues!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 225. Implement Stack using Queues ===');
    console.log('Category: Design');
    console.log('Difficulty: Easy');
    console.log('');

    // Example demonstration
    const stack = new MyStack();
    console.log('Operations: push(1), push(2), top(), pop(), empty()');

    stack.push(1);
    console.log('After push(1): stack has 1 element');

    stack.push(2);
    console.log('After push(2): stack has 2 elements');

    console.log('top():', stack.top(), '(should be 2 - last element pushed)');
    console.log('pop():', stack.pop(), '(should be 2 - LIFO behavior)');
    console.log('empty():', stack.empty(), '(should be false)');
    console.log('pop():', stack.pop(), '(should be 1)');
    console.log('empty():', stack.empty(), '(should be true)');
    console.log('');

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
    demonstrateSolution
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
