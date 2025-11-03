/**
### INTUITION:
The key insight is to solve this problem efficiently.

### APPROACH:
We solve this problem by implementing the required algorithm.

### WHY THIS WORKS:
This approach works because it correctly implements the problem requirements.

### EXAMPLE WALKTHROUGH:
Input:
```
example input
```

Output:
```
example output
```

Step-by-step execution:
1. [First step]
2. [Second step]
3. [Final step]

### TIME COMPLEXITY:
O(n)** - Analysis of time complexity - [Add explanation of why this complexity]

### SPACE COMPLEXITY:
O(1)** - Analysis of space complexity - [Add explanation of why this complexity]

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>

*/

function judgeCircle(moves) {
    return (moves.split('U').length - 1) === (moves.split('D').length - 1) &&
           (moves.split('L').length - 1) === (moves.split('R').length - 1);
}

if (require.main === module) {
    const testCases = [
        ["UD", true],
        ["LL", false],
        ["UDLR", true],
    ];

    console.log("Testing judgeCircle:");
    for (const [moves, expected] of testCases) {
        const result = judgeCircle(moves);
        const status = result === expected ? "✓" : "✗";
        console.log(`${status} judgeCircle("${moves}") = ${result}, expected = ${expected}`);
    }
}

module.exports = { judgeCircle };
