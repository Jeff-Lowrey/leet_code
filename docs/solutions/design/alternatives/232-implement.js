/**
 * # Difficulty: Easy
 *
 * # 232. Implement Queue using Stacks
 *
 * Implement a first-in-first-out (FIFO) queue using only two stacks.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>push(1): input=[1], output=[]</dd>
 * <dt>Output:</dt>
 * <dd>push(2): input=[1,2], output=[]</dd>
 * <dt>Explanation:</dt>
 * <dd>After pushing 1 and 2, both values are in the input stack with 2 on top, while the output stack remains empty until a pop or peek operation is performed</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * A queue follows FIFO (First In First Out), while a stack follows LIFO (Last In First Out).
 * We can simulate queue behavior using two stacks - one for input and one for output.
 * The key insight is to transfer elements between stacks when needed.
 *
 * ### APPROACH:
 * 1. **Two Stack Approach**: Use input_stack and output_stack
 * 2. **push**: Always push to input_stack - O(1)
 * 3. **pop/peek**:
 *    - If output_stack has elements, pop/peek from there
 *    - If output_stack is empty, transfer all from input_stack to output_stack
 *    - This reverses the order, making FIFO behavior
 * 4. **empty**: Check if both stacks are empty
 *
 * ### WHY THIS WORKS:
 * - Input stack holds new elements in reverse order
 * - Output stack holds elements in correct queue order (FIFO)
 * - Transfer happens lazily only when needed
 * - Amortized O(1) for all operations
 * - Each element is moved at most twice (input -> output -> removed)
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * push(1): input=[1], output=[]
 * push(2): input=[1,2], output=[]
 * peek(): transfer -> input=[], output=[2,1], return 1
 * pop(): output=[2,1], return 1, output=[2]
 * push(3): input=[3], output=[2]
 * pop(): output=[2], return 2
 * ```
 *
 * ### TIME COMPLEXITY:
 * - push: O(1)
 * - pop: Amortized O(1)
 * - peek: Amortized O(1)
 * - empty: O(1)
 *
 * ### SPACE COMPLEXITY:
 * O(n) for storing n elements
 *
 * ### EDGE CASES:
 * - Empty queue
 * - Single element
 * - Multiple operations
 * - Alternating push/pop
 *
 * </details>
 */

/**
 * MyQueue class - Implements Queue using Stacks
 *
 * Uses two stacks to simulate FIFO behavior:
 * - inputStack: receives new elements (push operations)
 * - outputStack: provides elements in queue order (pop/peek operations)
 */
class MyQueue {
    /**
     * Initialize the queue data structure.
     */
    constructor() {
        this.inputStack = [];   // Stack for push operations
        this.outputStack = [];  // Stack for pop/peek operations
    }

    /**
     * Push element x to the back of queue.
     * @param {number} x - Element to push
     *
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    push(x) {
        this.inputStack.push(x);
    }

    /**
     * Removes the element from the front of queue and returns it.
     * @return {number} - Front element
     *
     * Time Complexity: O(1) amortized, O(n) worst case
     * Space Complexity: O(1)
     */
    pop() {
        this.transferIfNeeded();
        return this.outputStack.pop();
    }

    /**
     * Get the front element without removing it.
     * @return {number} - Front element
     *
     * Time Complexity: O(1) amortized, O(n) worst case
     * Space Complexity: O(1)
     */
    peek() {
        this.transferIfNeeded();
        return this.outputStack[this.outputStack.length - 1];
    }

    /**
     * Returns whether the queue is empty.
     * @return {boolean} - True if empty, false otherwise
     *
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    empty() {
        return this.inputStack.length === 0 && this.outputStack.length === 0;
    }

    /**
     * Transfer elements from inputStack to outputStack if outputStack is empty.
     * This reverses the order, making the oldest element accessible first.
     *
     * Time Complexity: O(n) for transfer, but amortized O(1)
     * Space Complexity: O(1)
     */
    transferIfNeeded() {
        if (this.outputStack.length === 0) {
            while (this.inputStack.length > 0) {
                this.outputStack.push(this.inputStack.pop());
            }
        }
    }
}

/**
 * Alternative implementation using single stack (less efficient)
 */
class MyQueueAlternative {
    constructor() {
        this.stack = [];
    }

    push(x) {
        // To simulate queue behavior with single stack,
        // we need to move all elements to maintain order
        const temp = [];
        while (this.stack.length > 0) {
            temp.push(this.stack.pop());
        }
        this.stack.push(x);
        while (temp.length > 0) {
            this.stack.push(temp.pop());
        }
    }

    pop() {
        return this.stack.pop();
    }

    peek() {
        return this.stack[this.stack.length - 1];
    }

    empty() {
        return this.stack.length === 0;
    }
}

/**
 * Factory function for creating MyQueue instances
 * @return {MyQueue}
 */
function solve() {
    return new MyQueue();
}

/**
 * Test cases for Problem 232: Implement Queue using Stacks
 */
function testSolution() {
    console.log('Testing 232. Implement Queue using Stacks');

    // Test case 1: Basic functionality
    const queue1 = new MyQueue();
    queue1.push(1);
    queue1.push(2);
    console.assert(queue1.peek() === 1, 'Test 1a failed: peek should return 1');
    console.assert(queue1.pop() === 1, 'Test 1b failed: pop should return 1');
    console.assert(!queue1.empty(), 'Test 1c failed: queue should not be empty');
    console.assert(queue1.pop() === 2, 'Test 1d failed: pop should return 2');
    console.assert(queue1.empty(), 'Test 1e failed: queue should be empty');

    // Test case 2: Alternating operations
    const queue2 = new MyQueue();
    queue2.push(1);
    console.assert(queue2.pop() === 1, 'Test 2a failed');
    queue2.push(2);
    queue2.push(3);
    console.assert(queue2.pop() === 2, 'Test 2b failed');
    queue2.push(4);
    console.assert(queue2.pop() === 3, 'Test 2c failed');
    console.assert(queue2.pop() === 4, 'Test 2d failed');

    // Test case 3: Multiple peeks
    const queue3 = new MyQueue();
    queue3.push(5);
    queue3.push(6);
    console.assert(queue3.peek() === 5, 'Test 3a failed');
    console.assert(queue3.peek() === 5, 'Test 3b failed: peek should be consistent');
    console.assert(queue3.pop() === 5, 'Test 3c failed');

    // Test case 4: Alternative implementation
    const queue4 = new MyQueueAlternative();
    queue4.push(1);
    queue4.push(2);
    console.assert(queue4.peek() === 1, 'Test 4a failed');
    console.assert(queue4.pop() === 1, 'Test 4b failed');
    console.assert(queue4.pop() === 2, 'Test 4c failed');
    console.assert(queue4.empty(), 'Test 4d failed');

    console.log('All test cases passed for 232. Implement Queue using Stacks!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 232. Implement Queue using Stacks ===');
    console.log('Category: Design');
    console.log('Difficulty: Easy');
    console.log('');

    // Example demonstration
    const queue = new MyQueue();
    console.log('Operations: push(1), push(2), peek(), pop(), empty()');

    queue.push(1);
    console.log('After push(1): queue has 1 element');

    queue.push(2);
    console.log('After push(2): queue has 2 elements');

    console.log('peek():', queue.peek(), '(should be 1 - first element pushed)');
    console.log('pop():', queue.pop(), '(should be 1 - FIFO behavior)');
    console.log('empty():', queue.empty(), '(should be false)');
    console.log('pop():', queue.pop(), '(should be 2)');
    console.log('empty():', queue.empty(), '(should be true)');
    console.log('');

    testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
    demonstrateSolution();
}

// Export for use in other modules
module.exports = {
    MyQueue,
    MyQueueAlternative,
    solve,
    testSolution,
    demonstrateSolution
};

/**
 * Additional Notes:
 * - This solution uses the classic two-stack approach for optimal amortized performance
 * - Each element is transferred at most once, ensuring O(1) amortized time
 * - The lazy transfer strategy minimizes unnecessary operations
 * - Alternative single-stack approach has O(n) time for push operations
 * - Critical for understanding stack/queue conversion patterns in system design
 * - The approach demonstrates how to simulate one data structure using another
 */
