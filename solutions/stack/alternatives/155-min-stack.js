/**
 * 155. Min Stack
 * Medium
 *
 * MinStack Class Implementation Implements a stack that supports push, pop, top, and retrieving the minimum element in constant time.
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Min Stack is to understand the core problem pattern
 * and apply the most efficient algorithmic approach.
 *
 * ### APPROACH:
 * 1. Analyze the problem requirements
 * 2. Choose the optimal data structure
 * 3. Implement the solution step by step
 * 4. Handle edge cases appropriately
 *
 * ### WHY THIS WORKS:
 * This approach works because it leverages the fundamental properties of the problem
 * to achieve an efficient solution.
 *
 * ### EXAMPLE WALKTHROUGH:
 * For a typical input, the algorithm processes the data systematically
 * to produce the expected output.
 *
 * </details>
 */

/**
 * MinStack Class Implementation
 * Implements a stack that supports push, pop, top, and retrieving the minimum element in constant time.
 */
class MinStack {
    /**
     * Initialize your data structure here.
     * Uses two arrays: one for the main stack and one for tracking minimums
     */
    constructor() {
        this.stack = [];        // Main stack to store all elements
        this.minStack = [];     // Auxiliary stack to track minimum values
    }
    
    /**
     * Pushes an element onto the stack
     * Also updates the minimum stack accordingly
     * @param {number} val - The value to push onto the stack
     * @return {void}
     */
    push(val) {
        this.stack.push(val);
        
        // If minStack is empty or new value is less than or equal to current minimum,
        // add it to minStack
        if (this.minStack.length === 0 || val <= this.minStack[this.minStack.length - 1]) {
            this.minStack.push(val);
        }
    }
    
    /**
     * Removes the element on top of the stack
     * Updates minimum stack if necessary
     * @return {void}
     */
    pop() {
        if (this.stack.length === 0) return;
        
        // If the popped value is the current minimum, remove it from minStack
        if (this.stack[this.stack.length - 1] === this.minStack[this.minStack.length - 1]) {
            this.minStack.pop();
        }
        
        this.stack.pop();
    }
    
    /**
     * Get the top element of the stack
     * @return {number} The top element of the stack
     */
    top() {
        if (this.stack.length === 0) return null;
        return this.stack[this.stack.length - 1];
    }
    
    /**
     * Retrieve the minimum element in the stack
     * @return {number} The minimum element in the stack
     */
    getMin() {
        if (this.minStack.length === 0) return null;
        return this.minStack[this.minStack.length - 1];
    }
}

/**
 * Example usage:
 * const minStack = new MinStack();
 * minStack.push(-2);
 * minStack.push(0);
 * minStack.push(-3);
 * console.log(minStack.getMin()); // Returns -3
 * minStack.pop();
 * console.log(minStack.top());    // Returns 0
 * console.log(minStack.getMin()); // Returns -2
 */

// Export the MinStack class for use in other files
module.exports = MinStack;