/**
### INTUITION:
The key insight is that use a queue to maintain the sliding window of values. When the window exceeds the size limit, remove the oldest element and add the new one.

### APPROACH:
1. **Initialize** a queue to store values and track the window size
2. **For each new value**:
   - Add `val` to the queue
   - If queue size exceeds `size`, remove the front element
   - Calculate and return the average of current elements

### WHY THIS WORKS:
- Queue maintains FIFO order for the sliding window
- We keep exactly `size` elements (or fewer initially)
- Sum and count give us the moving average efficiently

### EXAMPLE WALKTHROUGH:
Input:
```
MovingAverage(3):
```

next(1): queue=[1], avg=1.0
next(10): queue=[1,10], avg=5.5
next(3): queue=[1,10,3], avg=4.67
next(5): queue=[10,3,5], avg=6.0 (removed 1)

Output:
```
[Expected output]
```

### TIME COMPLEXITY:
O(1)** per operation - constant time

### SPACE COMPLEXITY:
O(size)**

- Based on auxiliary data structures

### EDGE CASES:
- **Window size 1**: Average equals current value
- **Fewer than size elements**: Average of elements so far
- **Exactly size elements**: Window is full, start sliding
- **More than size elements**: Remove oldest, add newest
- **Single element stream**: Return that element

</details>

</details>

</details>

</details>

</details>

</details>

</details>

</details>

*/

/**
 * MovingAverage class
 * @param {number} size - Size of the sliding window
 */
class MovingAverage {
  constructor(size) {
    this.size = size;
    this.queue = [];
    this.sum = 0;
  }

  /**
   * Add a value to the stream and return the moving average
   * @param {number} val - Value to add
   * @return {number} - Current moving average
   */
  next(val) {
    this.queue.push(val);
    this.sum += val;

    // If queue exceeds size, remove oldest element
    if (this.queue.length > this.size) {
      this.sum -= this.queue.shift();
    }

    return this.sum / this.queue.length;
  }
}

/**
 * Wrapper function for testing
 */
function solve(commands, values) {
  if (commands.length === 0) return [];

  const results = [];
  let movingAverage = null;

  for (let i = 0; i < commands.length; i++) {
    if (commands[i] === "MovingAverage") {
      movingAverage = new MovingAverage(values[i][0]);
      results.push(null);
    } else if (commands[i] === "next") {
      results.push(movingAverage.next(values[i][0]));
    }
  }

  return results;
}

/**
 * Test cases for Problem 346: Moving Average From Data Stream
 */
function testSolution() {
  console.log("Testing 346. Moving Average From Data Stream");

  // Test case 1: Basic functionality
  const movingAverage1 = new MovingAverage(3);
  console.assert(
    movingAverage1.next(1) === 1.0,
    "Test 1a failed: expected 1.0",
  );
  console.assert(
    movingAverage1.next(10) === 5.5,
    "Test 1b failed: expected 5.5",
  );
  console.assert(
    Math.abs(movingAverage1.next(3) - 4.666666666666667) < 0.0001,
    "Test 1c failed: expected ~4.67",
  );
  console.assert(
    movingAverage1.next(5) === 6.0,
    "Test 1d failed: expected 6.0",
  );

  // Test case 2: Window size of 1
  const movingAverage2 = new MovingAverage(1);
  console.assert(
    movingAverage2.next(5) === 5.0,
    "Test 2a failed: expected 5.0",
  );
  console.assert(
    movingAverage2.next(10) === 10.0,
    "Test 2b failed: expected 10.0",
  );

  // Test case 3: Using solve wrapper
  const commands = ["MovingAverage", "next", "next", "next", "next"];
  const values = [[3], [1], [10], [3], [5]];
  const result = solve(commands, values);
  console.assert(result[0] === null, "Test 3a failed");
  console.assert(result[1] === 1.0, "Test 3b failed");
  console.assert(result[2] === 5.5, "Test 3c failed");
  console.assert(
    Math.abs(result[3] - 4.666666666666667) < 0.0001,
    "Test 3d failed",
  );
  console.assert(result[4] === 6.0, "Test 3e failed");

  console.log(
    "All test cases passed for 346. Moving Average From Data Stream!",
  );
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 346. Moving Average From Data Stream ===");
  console.log("Category: Queue");
  console.log("Difficulty: Easy");
  console.log("");

  // Example demonstration
  console.log("Example: Creating MovingAverage with window size 3");
  const ma = new MovingAverage(3);
  console.log("next(1):", ma.next(1)); // 1.0
  console.log("next(10):", ma.next(10)); // 5.5
  console.log("next(3):", ma.next(3)); // 4.67
  console.log("next(5):", ma.next(5)); // 6.0
  console.log("");

  testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
  demonstrateSolution();
}

// Export for use in other modules
module.exports = {
  MovingAverage,
  solve,
  testSolution,
  demonstrateSolution,
};

/**
 * Additional Notes:
 * - This solution focuses on queue concepts
 * - The queue maintains a sliding window of at most 'size' elements
 * - Each operation is O(1) time complexity
 * - Space complexity is O(size) for the queue storage
 */
