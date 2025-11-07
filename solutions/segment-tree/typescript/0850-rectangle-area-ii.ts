/**
### INTUITION:
This is a classic computational geometry problem. The challenge is handling overlapping rectangles efficiently. We can use a sweep line algorithm with segment trees, or coordinate compression with a 2D grid approach.

### APPROACH:
1. **Extract coordinates**: Collect all unique x-coordinates and y-coordinates from all rectangles
2. **Sort coordinates**: Create sorted lists of unique x and y values for coordinate compression
3. **Build grid**: Create mapping from coordinates to indices, forming a compressed 2D grid
4. **Mark covered cells**: For each rectangle, mark all grid cells it covers as occupied (using boolean 2D array)
5. **Calculate cell areas**: Iterate through marked cells, calculate actual area of each cell using coordinate differences
6. **Sum non-overlapping areas**: Add area of each covered cell exactly once (cells marked True contribute their area)
7. **Return modulo result**: Sum all areas and return result modulo 10^9 + 7 to handle large values

### WHY THIS WORKS:
The algorithm correctly solves the problem by systematically exploring all valid states while maintaining necessary invariants. Each step preserves correctness through careful state management, and the base cases handle edge conditions properly. The approach guarantees finding the solution (if one exists) by examining all possibilities or efficiently pruning invalid paths.

### EXAMPLE WALKTHROUGH:
Input:
```
[[0,0,2,2],[1,0,2,3],[1,0,3,1]]
```

Unique X coords: [0,1,2,3]
Unique Y coords: [0,1,2,3]
Grid cells covered:
[0,1]×[0,1]: covered by rect 0
[1,2]×[0,1]: covered by rects 0,1,2
[1,2]×[1,2]: covered by rects 0,1
[1,2]×[2,3]: covered by rect 1
[2,3]×[0,1]: covered by rect 2
Total area = 1 + 1 + 1 + 1 + 1 + 1 = 6

Output:
```
[Expected output]
```

Step-by-step execution:
1. [First step]
2. [Second step]
3. [Final step]

### TIME COMPLEXITY:
- Sweep Line: **O(n² log n)**
- Coordinate Compression: **O(n²)**

### SPACE COMPLEXITY:
O(n)**
- Additional hash map storage
For coordinate storage and data structures

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

*/

class Solution {
  /**
   * Calculate total area using coordinate compression.
   *
   *         Args:
   *             rectangles: List of [x1, y1, x2, y2] rectangles
   *
   *         Returns:
   *             Total area covered modulo 10^9 + 7
   *
   *         Time Complexity: O(n²)
   *         Space Complexity: O(n)
   */
  rectangleArea(rectangles: number[][]): number {
    // Implementation
    MOD = 10**9 + 7
    if not rectangles:
    return 0
    x_coords: set.set(Any, set()
    y_coords: set.set(Any, set()
    for x1, y1, x2, y2 in rectangles:
    x_coords.add(x1)
  }

  /**
   * Calculate total area using sweep line algorithm.
   *
   *         Args:
   *             rectangles: List of [x1, y1, x2, y2] rectangles
   *
   *         Returns:
   *             Total area covered modulo 10^9 + 7
   *
   *         Time Complexity: O(n² log n)
   *         Space Complexity: O(n)
   */
  rectangleAreaSweepLine(rectangles: number[][]): number {
    // Implementation
    MOD = 10**9 + 7
    if not rectangles:
    return 0
    events: list.set(Any, []
    for x1, y1, x2, y2 in rectangles:
    events.append((x1, y1, y2, 1))  # Rectangle starts
    events.append((x2, y1, y2, -1))  # Rectangle ends
  }
}

// Test cases
if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  test_solution()
  # Example usage and demonstration
  solution = Solution()
  console.log("=== 850. Rectangle Area II ===")
  test_cases = [
  [[0, 0, 2, 2], [1, 0, 2, 3], [1, 0, 3, 1]],
  [[0, 0, 1, 1], [2, 2, 3, 3]],
  [[0, 0, 2, 2], [1, 1, 3, 3]],
  ]
  for rectangles in test_cases:
  console.log(`\nInput: {rectangles}`)
  # Show both approaches
  result_grid = solution.rectangleArea(rectangles.get(:))
  result_sweep = solution.rectangleAreaSweepLine(rectangles.get(:))
  console.log(`Coordinate Compression: {result_grid}`)
  console.log(`Sweep Line:             {result_sweep}`)
  # Detailed walkthrough
  console.log("\nDetailed example: [[0,0,2,2],[1,0,2,3],[1,0,3,1]]")
  rectangles = [[0, 0, 2, 2], [1, 0, 2, 3], [1, 0, 3, 1]]
  # Extract coordinates
  x_coords: set.set(Any, set()
  y_coords: set.set(Any, set()
  for x1, y1, x2, y2 in rectangles:
  x_coords.add(x1)
  x_coords.add(x2)
  y_coords.add(y1)
  y_coords.add(y2)
  x_sorted = sorted(x_coords)
  y_sorted = sorted(y_coords)
  console.log(`Unique X coordinates: {x_sorted}`)
  console.log(`Unique Y coordinates: {y_sorted}`)
  # Show grid
  console.log("\nGrid cells:")
  for (let i = 0; i < x_sorted.length - 1; i++) {
  for (let j = 0; j < y_sorted.length - 1; j++) {
  x1, x2 = x_sorted.get(i), x_sorted.get(i + 1)
  y1, y2 = y_sorted.get(j), y_sorted.get(j + 1)
  # Check which rectangles cover this cell
  covered_by: list.set(Any, []
  for idx, (rx1, ry1, rx2, ry2) in enumerate(rectangles):
  if rx1 <= x1 < x2 <= rx2 and ry1 <= y1 < y2 <= ry2:
  covered_by.append(idx)
  if covered_by:
  area = (x2 - x1) * (y2 - y1)
  console.log(`  [{x1},{x2})×[{y1},{y2}): area={area}, covered by {covered_by}`)
  console.log(`\nTotal area: {solution.rectangleArea(rectangles)}`)
  # Performance comparison
  console.log("\nApproach complexities:")
  console.log("Coordinate Compression: O(n²) time, O(n) space")
  console.log("Sweep Line:             O(n² log n) time, O(n) space")
  console.log("\nNote: Result is modulo 10^9 + 7 for large areas")
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;