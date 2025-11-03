/**
### INTUITION:
The key insight is that sort intervals by start time. For each interval, binary search for the first interval whose start >= current interval's end. Store the index or -1 if not found.

### APPROACH:
1. **Create index mapping**: Build dict mapping start to original index
2. **Sort starts**: Create sorted list of start times
3. **For each interval**: Get its end time
4. **Binary search**: Use bisect_left to find smallest start >= end
5. **Check if found**: If index < len(starts), get original index from mapping
6. **Not found**: Append -1 to result
7. **Return result**: Return list of right interval indices

### WHY THIS WORKS:
- This ensures that binary search on sorted start times to find next interval
- This ensures that store original indices before sorting to map back
- This ensures that for each interval's end, binary search for smallest start >= end
- This ensures that hashMap maps start value to original index
- This ensures that o(n log n) for sort + n binary searches, O(n) space

### EXAMPLE WALKTHROUGH:
Input:
```
intervals = [[3,4],[2,3],[1,2]]
```

Step 1: Create index mapping
indexed = [(3,4,0), (2,3,1), (1,2,2)]
Step 2: Sort by start time
sorted = [(1,2,2), (2,3,1), (3,4,0)]
Step 3: Binary search for each interval's end

Steps:
Step 1: [3,4]: find start ≥ 4 → not found → -1
Step 2: [2,3]: find start ≥ 3 → found at index 0
Step 3: [1,2]: find start ≥ 2 → found at index 1

Output:
```
[-1,0,1]
```

### TIME COMPLEXITY:
O(n)**

- Single pass through the input

### SPACE COMPLEXITY:
O(1)**
- Constant extra space

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>

*/

class Solution {
  /**
   * Find the right interval for each interval in the given list.
   *
   * Time Complexity: O(n log n)
   * Space Complexity: O(n)
   */
  findRightInterval(intervals: number[][]): number[] {
    if (!intervals || intervals.length === 0) {
      return [];
    }

    // Create list of (start_point, index) pairs for binary search
    const startPoints: [number, number][] = intervals.map((interval, i) => [interval[0], i]);
    startPoints.sort((a, b) => a[0] - b[0]); // Sort by start points

    /**
     * Binary search to find the smallest start point >= target
     */
    const binarySearch = (target: number): number => {
      let left = 0;
      let right = startPoints.length - 1;
      let result = -1;

      while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (startPoints[mid][0] >= target) {
          result = startPoints[mid][1];
          right = mid - 1;
        } else {
          left = mid + 1;
        }
      }

      return result;
    };

    // Find right interval for each interval
    const result: number[] = [];
    for (const interval of intervals) {
      const rightIndex = binarySearch(interval[1]);
      result.push(rightIndex);
    }

    return result;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  const result1 = solution.findRightInterval([
    [3, 4],
    [2, 3],
    [1, 2],
  ]);
  console.log(`Test 1: ${JSON.stringify(result1) === JSON.stringify([-1, 0, 1]) ? "PASS" : "FAIL"}`);

  const result2 = solution.findRightInterval([
    [1, 4],
    [2, 3],
    [3, 4],
  ]);
  console.log(`Test 2: ${JSON.stringify(result2) === JSON.stringify([-1, -1, -1]) ? "PASS" : "FAIL"}`);

  const result3 = solution.findRightInterval([
    [1, 2],
    [2, 3],
    [3, 4],
  ]);
  console.log(`Test 3: ${JSON.stringify(result3) === JSON.stringify([1, 2, -1]) ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
