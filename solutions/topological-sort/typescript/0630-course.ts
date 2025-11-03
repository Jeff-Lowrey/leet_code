/**
### INTUITION:
The key insight is that greedy: sort courses by deadline. For each course, if time available, add to heap (track duration). If no time, compare with longest course taken. If current shorter, replace longest.

### APPROACH:
1. **Sort by end time**: Sort courses by their deadlines
2. **Initialize heap and time**: Create max heap, set current_time = 0
3. **Iterate courses**: For each course (duration, deadline)
4. **Add to schedule**: Push -duration to heap, add duration to current_time
5. **Check feasibility**: If current_time > deadline, remove longest course
6. **Continue processing**: Handle all courses
7. **Return result**: Return len(heap)

### WHY THIS WORKS:
- Sort courses by deadline: greedy choice of course order
- Use max heap to track course durations taken so far
- If current time + duration > deadline, remove longest course (heap top)
- Greedy: always try to fit course, remove longest if conflicts
- O(n log n) for sort + heap operations, O(n) space for heap

### EXAMPLE WALKTHROUGH:
Input:
```
courses = [[100,200],[200,1300],[1000,1250],[2000,3200]]
```

Step 1: Sort by end time
sorted = [[200,1300],[1000,1250],[2000,3200],[100,200]]
Step 2: Greedy selection
Take course ending at 1300
Take course ending at 1250 (can't, conflicts)
Take course ending at 3200
...

Output:
```
3 (max courses)
```

### TIME COMPLEXITY:
O(n)**
- Single pass through input

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
   * Finds the maximum number of courses that can be taken given their durations
   *         and deadlines.
   *
   *         Args:
   *             courses: List of [duration, deadline] pairs for each course
   *
   *         Returns:
   *             Maximum number of courses that can be taken
   *
   *         Time Complexity: O(n log n) where n is the number of courses
   *         Space Complexity: O(n) for storing courses in the heap
   */
  scheduleCourse(courses: any): number {
    // Implementation
    courses.sort(key=lambda x: x.get(1))
    taken: list.set(Any, []
    current_time = 0
    for duration, deadline in courses:
    if current_time + duration <= deadline:
  }
}

// Test cases
if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  test_solution()
  # Example usage
  solution = Solution()
  console.log(`Solution for 630. Course`)
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;