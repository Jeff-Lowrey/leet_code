/**
 * 225. Implement
 * Medium
 *
 * Stack Implementation in JavaScript A Stack is a linear data structure that follows the Last-In-First-Out (LIFO) principle. This implementation includes the following operations: - push: Add an element to the top of the stack - pop: Remove and return the top element from the stack - peek/top: Return the top element without removing it - isEmpty: Check if the stack is empty - size: Get the number of elements in the stack - clear: Remove all elements from the stack
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Implement is to understand the core problem pattern
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
 * Stack Implementation in JavaScript
 * 
 * A Stack is a linear data structure that follows the Last-In-First-Out (LIFO) principle.
 * This implementation includes the following operations:
 * - push: Add an element to the top of the stack
 * - pop: Remove and return the top element from the stack
 * - peek/top: Return the top element without removing it
 * - isEmpty: Check if the stack is empty
 * - size: Get the number of elements in the stack
 * - clear: Remove all elements from the stack
 */

class Stack {
    /**
     * Initialize an empty stack
     */
    constructor() {
        this.items = [];
        this.count = 0;
    }

    /**
     * Add an element to the top of the stack
     * @param {*} element - The element to add to the stack
     * @returns {number} The new size of the stack
     */
    push(element) {
        this.items[this.count] = element;
        this.count++;
        return this.count;
    }

    /**
     * Remove and return the top element from the stack
     * @returns {*} The removed element or undefined if stack is empty
     */
    pop() {
        if (this.isEmpty()) {
            return undefined;
        }

        this.count--;
        const result = this.items[this.count];
        delete this.items[this.count];
        return result;
    }

    /**
     * Return the top element without removing it
     * @returns {*} The top element or undefined if stack is empty
     */
    peek() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[this.count - 1];
    }

    /**
     * Check if the stack is empty
     * @returns {boolean} True if stack is empty, false otherwise
     */
    isEmpty() {
        return this.count === 0;
    }

    /**
     * Get the number of elements in the stack
     * @returns {number} The size of the stack
     */
    size() {
        return this.count;
    }

    /**
     * Remove all elements from the stack
     */
    clear() {
        this.items = [];
        this.count = 0;
    }

    /**
     * Convert the stack to a string representation
     * @returns {string} String representation of the stack
     */
    toString() {
        if (this.isEmpty()) {
            return '';
        }
        
        let str = '';
        for (let i = 0; i < this.count; i++) {
            str += `${this.items[i]}${i < this.count - 1 ? ',' : ''}`;
        }
        return str;
    }
}

// Example usage:
function demonstrateStack() {
    const stack = new Stack();
    
    console.log('Is stack empty?', stack.isEmpty()); // true

    stack.push(10);
    stack.push(20);
    stack.push(30);
    
    console.log('Stack size:', stack.size()); // 3
    console.log('Stack contents:', stack.toString()); // "10,20,30"
    
    console.log('Top element:', stack.peek()); // 30
    
    console.log('Popped element:', stack.pop()); // 30
    console.log('New stack size:', stack.size()); // 2
    
    stack.clear();
    console.log('After clear - Is stack empty?', stack.isEmpty()); // true
}

// Export the Stack class for use in other modules
module.exports = Stack;

// Uncomment the following line to run the demonstration
// demonstrateStack();