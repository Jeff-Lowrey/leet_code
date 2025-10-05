I'll help you implement a Min Stack solution in JavaScript that meets all the requirements. Here's the complete implementation:

```javascript
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
```

This implementation includes:

1. A `MinStack` class that maintains two internal stacks:
   - `stack`: The main stack that stores all elements
   - `minStack`: An auxiliary stack that keeps track of minimum values

2. Four main methods:
   - `push(val)`: Adds an element to the stack
   - `pop()`: Removes the top element from the stack
   - `top()`: Returns the top element without removing it
   - `getMin()`: Returns the minimum element in the stack

3. Key features:
   - All operations run in O(1) time complexity
   - Proper handling of edge cases (empty stack)
   - Clean and well-documented code with JSDoc comments
   - Follows JavaScript best practices and conventions

4. The implementation uses an efficient approach where the minimum stack only stores values when they are less than or equal to the current minimum, reducing space usage while maintaining O(1) time complexity for all operations.

5. The code includes example usage in comments and exports the class for use in other files.

This implementation is efficient, well-structured, and handles all the required operations for a min stack while maintaining constant time complexity for all operations.