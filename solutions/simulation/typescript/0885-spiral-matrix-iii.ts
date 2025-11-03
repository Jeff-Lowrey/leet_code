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
O(n²)** - Analysis of time complexity - [Add explanation of why this complexity]

### SPACE COMPLEXITY:
O(n)** - Analysis of space complexity - [Add explanation of why this complexity]

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>

*/

function spiralMatrixIII(rows: number, cols: number, rStart: number, cStart: number): number[][] {
    const directions: number[][] = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    const result: number[][] = [];
    let r: number = rStart, c: number = cStart;
    let direction: number = 0, steps: number = 1;

    result.push([r, c]);

    while (result.length < rows * cols) {
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < steps; j++) {
                r += directions[direction][0];
                c += directions[direction][1];
                if (r >= 0 && r < rows && c >= 0 && c < cols) {
                    result.push([r, c]);
                }
            }
            direction = (direction + 1) % 4;
            if (result.length >= rows * cols) break;
        }
        steps++;
    }

    return result;
}

if (require.main === module) {
    const testCases: [number, number, number, number, number][] = [
        [1, 4, 0, 0, 4],
        [5, 6, 1, 4, 30],
    ];

    console.log("Testing spiralMatrixIII:");
    for (const [rows, cols, rStart, cStart, expectedLen] of testCases) {
        const result: number[][] = spiralMatrixIII(rows, cols, rStart, cStart);
        const status: string = result.length === expectedLen ? "✓" : "✗";
        console.log(`${status} spiralMatrixIII(${rows}, ${cols}, ${rStart}, ${cStart}) returned ${result.length} coordinates, expected ${expectedLen}`);
    }
}

export { spiralMatrixIII };
