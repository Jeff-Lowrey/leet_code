/**

 *
 * This problem demonstrates key concepts in Design.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.
 * The key challenge is maintaining the minimum element in O(1) time. We can use
 * two stacks: one for all elements and another to track minimums at each level.
 *
 * APPROACH:




 *
 * WHY THIS WORKS:
 * - Main stack handles normal stack operations
 * - Min stack maintains minimum for each level of main stack
 * - When we pop, we check if we're removing the current minimum
 * - This ensures O(1) access to minimum at all times
 *
 * TIME COMPLEXITY: O(1) for all operations
 * SPACE COMPLEXITY: O(n) - in worst case, minStack can have same size as mainStack
 *
 * EXAMPLE WALKTHROUGH:
 * ```
 * Operations: push(-2), push(0), push(-3)
 * mainStack: [-2, 0, -3]
 * minStack:  [-2, -3]
 *
 * getMin() returns -3 (top of minStack)
 * pop() removes -3 from both stacks
 * getMin() returns -2 (new top of minStack)
 * ```
 *
 * EDGE CASES:
 * - Empty stack operations
 * - Single element stack
 * - Duplicate minimum values
 * - All elements are the same
 */

/**
 * MinStack class implementation
 */
class MinStack {
    /**
     * Initialize the MinStack data structure.
     *
     * We use two stacks:
     * - mainStack: stores all elements
     * - minStack: stores minimum elements at each level
     */
    constructor() {
        this.mainStack = [];
        this.minStack = [];
    }

    /**
     * Push element val onto stack.
     *
     * @param {number} val - The value to push
     *
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    push(val) {
        this.mainStack.push(val);

        // Push to minStack if it's empty or val is <= current minimum
        if (this.minStack.length === 0 || val <= this.minStack[this.minStack.length - 1]) {
            this.minStack.push(val);
        }
    }

    /**
     * Remove the element on the top of the stack.
     *
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    pop() {
        if (this.mainStack.length === 0) {
            return;
        }

        const poppedValue = this.mainStack.pop();

        // If we're removing the current minimum, also pop from minStack
        if (poppedValue === this.minStack[this.minStack.length - 1]) {
            this.minStack.pop();
        }
    }

    /**
     * Get the top element of the stack.
     *
     * @return {number} - The top element
     *
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    top() {
        if (this.mainStack.length === 0) {
            return undefined;
        }
        return this.mainStack[this.mainStack.length - 1];
    }

    /**
     * Retrieve the minimum element in the stack.
     *
     * @return {number} - The minimum element
     *
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    getMin() {
        if (this.minStack.length === 0) {
            return undefined;
        }
        return this.minStack[this.minStack.length - 1];
    }
}

/**
 * Alternative implementation using single stack with (value, currentMin) pairs
 */
class MinStackAlternative {
    constructor() {
        this.stack = []; // Each element is [value, currentMin]
    }

    push(val) {
        const currentMin = this.stack.length === 0
            ? val
            : Math.min(val, this.stack[this.stack.length - 1][1]);
        this.stack.push([val, currentMin]);
    }

    pop() {
        if (this.stack.length > 0) {
            this.stack.pop();
        }
    }

    top() {
        if (this.stack.length === 0) return undefined;
        return this.stack[this.stack.length - 1][0];
    }

    getMin() {
        if (this.stack.length === 0) return undefined;
        return this.stack[this.stack.length - 1][1];
    }
}

/**
 * Factory function for creating MinStack instances
 * @return {MinStack}
 */
function solve() {
    return new MinStack();
}

/**
 * Test cases for Problem 155: Min Stack
 */
function testSolution() {
    console.log('Testing 155. Min Stack');

    // Test case 1: Basic functionality
    const minStack1 = new MinStack();
    minStack1.push(-2);
    minStack1.push(0);
    minStack1.push(-3);
    console.assert(minStack1.getMin() === -3, 'Test 1a failed');
    minStack1.pop();
    console.assert(minStack1.top() === 0, 'Test 1b failed');
    console.assert(minStack1.getMin() === -2, 'Test 1c failed');

    // Test case 2: Single element
    const minStack2 = new MinStack();
    minStack2.push(5);
    console.assert(minStack2.top() === 5, 'Test 2a failed');
    console.assert(minStack2.getMin() === 5, 'Test 2b failed');

    // Test case 3: Duplicate minimums
    const minStack3 = new MinStack();
    minStack3.push(0);
    minStack3.push(1);
    minStack3.push(0);
    console.assert(minStack3.getMin() === 0, 'Test 3a failed');
    minStack3.pop();
    console.assert(minStack3.getMin() === 0, 'Test 3b failed');

    // Test case 4: Alternative implementation
    const minStack4 = new MinStackAlternative();
    minStack4.push(-2);
    minStack4.push(0);
    minStack4.push(-3);
    console.assert(minStack4.getMin() === -3, 'Test 4a failed');
    minStack4.pop();
    console.assert(minStack4.top() === 0, 'Test 4b failed');
    console.assert(minStack4.getMin() === -2, 'Test 4c failed');

    console.log('All test cases passed for 155. Min Stack!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 155. Min Stack ===');
    console.log('Category: Design');
    console.log('Difficulty: Easy');
    console.log('');

    testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
    demonstrateSolution();
}

// Export for use in other modules
module.exports = {
    MinStack,
    MinStackAlternative,
    solve,
    testSolution,
    demonstrateSolution
};

/**
 * Additional Notes:
 * - This solution uses classic two-stack approach for O(1) operations
 * - Alternative single-stack approach trades space for simplicity
 * - Critical for system design interviews and real-world applications
 * - The approach can be adapted for other stack optimization problems
 */