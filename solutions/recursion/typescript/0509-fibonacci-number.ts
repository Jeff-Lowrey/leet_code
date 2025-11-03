/**
 * # 0509. Fibonacci Number
 *
 * # Difficulty: Easy
 *
 * The Fibonacci numbers, commonly denoted F(n) form a sequence, called the Fibonacci sequence,
 * such that each number is the sum of the two preceding ones, starting from 0 and 1. That is:
 *
 * F(0) = 0, F(1) = 1
 * F(n) = F(n - 1) + F(n - 2), for n > 1.
 *
 * Given n, calculate F(n).
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>n = 4</dd>
 * <dt>Output:</dt>
 * <dd>3</dd>
 * <dt>Explanation:</dt>
 * <dd>F(4) = F(3) + F(2) = 2 + 1 = 3</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### METADATA:
 * **Techniques**: Recursion, Memoization, Iteration
 * **Data Structures**: Array (for memoization)
 * **Patterns**: Base Case Recursion, Top-Down DP
 * **Time Complexity**: O(2^n) naive, O(n) with memoization
 * **Space Complexity**: O(n) for recursion stack and memoization
 *
 * ### INTUITION:
The key insight is that the Fibonacci sequence is the classic example of recursion. Each number is defined
recursively as the sum of the two preceding numbers, with base cases F(0)=0 and F(1)=1.

### APPROACH:
The algorithm proceeds as follows:

**Data structures: Array (memoization cache) or iterative variables**
1. **Base cases**: If n is 0 or 1, return n directly
2. **Recursive case**: Return fib(n-1) + fib(n-2)
3. **Optimization**: Use memoization to avoid redundant calculations

### WHY THIS WORKS:
- This ensures that the Fibonacci definition is inherently recursive
- This ensures that base cases prevent infinite recursion
- This ensures that memoization reduces time complexity from exponential to linear



This solution uses iteration for efficient implementation.

### EXAMPLE WALKTHROUGH:
Input:
```
n = 4
```

**Step 1:** Base cases - F(0) = 0, F(1) = 1 (defined by problem)

**Step 2:** Calculate F(2) = F(1) + F(0) = 1 + 0 = 1

**Step 3:** Calculate F(3) = F(2) + F(1) = 1 + 1 = 2

**Step 4:** Calculate F(4) = F(3) + F(2) = 2 + 1 = 3

Output:
```
3
```

### TIME COMPLEXITY:
 * - Naive recursion: O(2^n) - exponential
 * - With memoization: O(n) - linear
 *
 * ### SPACE COMPLEXITY:
 * O(n) - recursion stack depth
 *
 * ### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

