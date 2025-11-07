/**
### INTUITION:
Instead of simulating the elimination process (which would be O(n) time and space), we can
observe patterns in how the "head" (leftmost element) changes after each elimination round.
The key insight is that we only need to track:
1. The current head (leftmost remaining number)
2. The step size (distance between remaining numbers)
3. The direction (left-to-right or right-to-left)
4. The remaining count

### APPROACH:
The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

No data structures needed** - pure mathematical tracking approach.
We track the head of the remaining sequence. The head changes when:
- We're going left-to-right (always updates)
- We're going right-to-left AND the count is odd (head updates)

After each round:
- Step size doubles (numbers are now twice as far apart)
- Count becomes count // 2 (half the numbers remain)
- Direction alternates

### WHY THIS WORKS:
When eliminating from left-to-right, the head always moves to the next position.
When eliminating from right-to-left, the head only moves if there's an odd number
of elements (because we'd eliminate the current head's partner). The step size
doubles each round because we're eliminating every other element.

This solution uses recursion for efficient implementation.

This solution uses mathematical pattern recognition for efficient implementation.

This solution uses state tracking for efficient implementation.

### EXAMPLE WALKTHROUGH:
Input:** n = 9

Step 1:** Initial state for n=9
- arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
- head=1, step=1, remaining=9, leftToRight=true

Step 2:** Round 1 (Left to Right)
- Eliminate: 1, 3, 5, 7, 9
- Remaining: [2, 4, 6, 8]
- Update head: 1 + 1 = 2
- New state: head=2, step=2, remaining=4, leftToRight=false

Step 3:** Round 2 (Right to Left)
- Eliminate: 8, 4
- Remaining: [2, 6]
- Count is even, head stays 2
- New state: head=2, step=4, remaining=2, leftToRight=true

Step 4:** Round 3 (Left to Right)
- Eliminate: 2
- Remaining: [6]
- Update head: 2 + 4 = 6
- New state: head=6, remaining=1

Step 5:** Termination
- Only one element remains: 6

Output:
```
6
```

### TIME COMPLEXITY:
O(log n)** - Each round eliminates half the numbers, similar to binary search

### SPACE COMPLEXITY:
O(log n)** - Recursion stack depth (iterative solution can achieve **O(1)**)

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

*/

/**
 * Find the last remaining number after elimination process.
 * @param n - Upper bound of the range [1, n]
 * @returns The last remaining number
 */
function lastRemaining(n: number): number {
    let head: number = 1;  // Current head of the sequence
    let step: number = 1;  // Distance between consecutive remaining numbers
    let leftToRight: boolean = true;  // Direction of elimination
    let remaining: number = n;  // Count of remaining numbers

    while (remaining > 1) {
        // Update head if:
        // 1. Going left to right (always update)
        // 2. Going right to left AND odd count (head would be eliminated)
        if (leftToRight || remaining % 2 === 1) {
            head += step;
        }

        // After each round:
        remaining = Math.floor(remaining / 2);  // Half the numbers remain
        step *= 2;  // Numbers are twice as far apart
        leftToRight = !leftToRight;  // Alternate direction
    }

    return head;
}

/**
 * Recursive solution for the elimination game.
 * @param n - Upper bound of the range [1, n]
 * @returns The last remaining number
 */
function lastRemainingRecursive(n: number): number {
    function helper(n: number, leftToRight: boolean): number {
        // Base case
        if (n === 1) {
            return 1;
        }

        // If going left to right, result is 2 * helper for right to left
        // with n//2 elements
        if (leftToRight) {
            return 2 * helper(Math.floor(n / 2), false);
        } else {
            // If going right to left:
            // - If n is odd, same as left to right
            // - If n is even, result is 2 * helper - 1
            if (n % 2 === 1) {
                return 2 * helper(Math.floor(n / 2), true);
            } else {
                return 2 * helper(Math.floor(n / 2), true) - 1;
            }
        }
    }

    return helper(n, true);
}

// Test cases
if (require.main === module) {
    const testCases: [number, number][] = [
        [1, 1],
        [2, 2],
        [3, 2],
        [4, 2],
        [5, 2],
        [6, 4],
        [7, 4],
        [8, 6],
        [9, 6],
        [10, 8],
        [100, 54],
        [1000, 510]
    ];

    console.log("Testing lastRemaining (iterative):");
    for (const [n, expected] of testCases) {
        const result: number = lastRemaining(n);
        const status: string = result === expected ? "✓" : "✗";
        console.log(`${status} lastRemaining(${n}) = ${result}, expected = ${expected}`);
    }

    console.log("\nTesting lastRemainingRecursive:");
    for (const [n, expected] of testCases) {
        const result: number = lastRemainingRecursive(n);
        const status: string = result === expected ? "✓" : "✗";
        console.log(`${status} lastRemainingRecursive(${n}) = ${result}, expected = ${expected}`);
    }
}

export { lastRemaining, lastRemainingRecursive };
