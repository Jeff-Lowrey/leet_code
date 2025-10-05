I'll help you create a complete JavaScript implementation of the Min Stack design problem. I'll write the code with clear comments and proper structure that meets all requirements.

```javascript
/**
 * MinStack Class Implementation
 * 
 * This implementation maintains two stacks:
 * - main stack: stores all elements
 * - minStack: keeps track of minimum elements
 * 
 * Time Complexity:
 * - push: O(1)
 * - pop: O(1)
 * - top: O(1)
 * - getMin: O(1)
 * 
 * Space Complexity: O(n) where n is the number of elements in the stack
 */
class MinStack {
    /**
     * Initialize your data structure here.
     */
    constructor() {
        this.stack = [];      // Main stack to store elements
        this.minStack = [];   // Auxiliary stack to track minimums
    }
    
    /**
     * Pushes an element onto the stack and updates minimum stack
     * @param {number} val - The value to push onto the stack
     * @return {void}
     */
    push(val) {
        this.stack.push(val);
        
        // If minStack is empty or new value is less than or equal to current minimum,
        // push to minStack
        if (this.minStack.length === 0 || val <= this.minStack[this.minStack.length - 1]) {
            this.minStack.push(val);
        }
    }
    
    /**
     * Removes the element on top of the stack and updates minimum stack if necessary
     * @return {void}
     */
    pop() {
        if (this.stack.length === 0) return;
        
        // If popped element is the current minimum, remove from minStack
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
 */
function runExample() {
    const minStack = new MinStack();
    
    // Test operations
    minStack.push(-2);
    minStack.push(0);
    minStack.push(-3);
    
    console.log("Minimum:", minStack.getMin()); // Returns -3
    
    minStack.pop();
    console.log("Top:", minStack.top());        // Returns 0
    console.log("Minimum:", minStack.getMin()); // Returns -2
}

// Export the MinStack class for use in other files
module.exports = MinStack;

// Uncomment the following line to run the example
// runExample();
```

This implementation provides a complete solution for the Min Stack design problem with the following features:

1. **Clean Structure**: The code is organized into a class with clear method definitions.

2. **Efficiency**: All operations (push, pop, top, getMin) run in O(1) time complexity.

3. **Comments**: Comprehensive comments explain the implementation and each method's purpose.

4. **Best Practices**:
   - Proper error handling
   - Consistent coding style
   - Clear variable naming
   - JSDoc style comments for methods

5. **Complete Solution**: Includes both the implementation and example usage.

6. **Edge Cases**: Handles empty stack scenarios appropriately.

The implementation uses two stacks:
- The main stack stores all elements
- The minStack keeps track of minimum elements at each state

This approach ensures that we can retrieve the minimum element in constant time while maintaining the stack's basic operations.

The code can be used by importing the MinStack class and creating new instances as needed. The example usage demonstrates how to use the various methods of the class.