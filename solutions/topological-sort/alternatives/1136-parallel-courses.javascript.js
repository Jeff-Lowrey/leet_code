I'll help you create a solution for the Parallel Courses problem in JavaScript. I'll include detailed comments and handle edge cases appropriately.

```javascript
/**
 * Parallel Courses - Solution
 * Time Complexity: O(N + E) where N is number of courses and E is number of prerequisites
 * Space Complexity: O(N + E) for storing the graph and indegree array
 */

/**
 * @param {number} n - Number of courses
 * @param {number[][]} relations - Array of prerequisite pairs
 * @return {number} - Minimum number of semesters needed
 */
function minimumSemesters(n, relations) {
    // Edge case: if no courses
    if (n <= 0) return 0;
    
    // Create adjacency list representation of the graph
    const graph = new Map();
    const inDegree = new Array(n + 1).fill(0);
    
    // Initialize graph
    for (let i = 1; i <= n; i++) {
        graph.set(i, []);
    }
    
    // Build the graph and calculate in-degrees
    for (const [prev, next] of relations) {
        graph.get(prev).push(next);
        inDegree[next]++;
    }
    
    // Queue for BFS - start with courses that have no prerequisites
    const queue = [];
    for (let i = 1; i <= n; i++) {
        if (inDegree[i] === 0) {
            queue.push(i);
        }
    }
    
    let semester = 0;
    let coursesCompleted = 0;
    
    // Process courses semester by semester
    while (queue.length > 0) {
        const currentLevelSize = queue.length;
        semester++;
        
        // Process all courses that can be taken in current semester
        for (let i = 0; i < currentLevelSize; i++) {
            const currentCourse = queue.shift();
            coursesCompleted++;
            
            // Check all courses that depend on current course
            for (const nextCourse of graph.get(currentCourse)) {
                inDegree[nextCourse]--;
                
                // If all prerequisites are completed, add to queue
                if (inDegree[nextCourse] === 0) {
                    queue.push(nextCourse);
                }
            }
        }
    }
    
    // Check if all courses were completed
    return coursesCompleted === n ? semester : -1;
}

// Test cases
function runTests() {
    console.log('Running test cases...');
    
    // Test Case 1: Simple linear dependency
    console.log(minimumSemesters(3, [[1,3],[2,3]])); // Expected: 2
    
    // Test Case 2: Cycle detection
    console.log(minimumSemesters(3, [[1,2],[2,3],[3,1]])); // Expected: -1
    
    // Test Case 3: No prerequisites
    console.log(minimumSemesters(3, [])); // Expected: 1
    
    // Test Case 4: Complex dependencies
    console.log(minimumSemesters(4, [[1,2],[2,3],[3,4]])); // Expected: 4
}

// Export for use in other modules
module.exports = {
    minimumSemesters,
    runTests
};

// Uncomment to run tests
// runTests();
```

This implementation solves the Parallel Courses problem with the following features:

1. **Topological Sort Approach**: Uses a modified BFS-based topological sort to determine the minimum number of semesters needed.

2. **Graph Representation**: Uses an adjacency list representation with a Map for efficient storage and access.

3. **Key Components**:
   - Graph building with prerequisites
   - In-degree tracking for each course
   - Level-by-level BFS processing to simulate semesters
   - Cycle detection (returns -1 if cycle exists)

4. **Error Handling**:
   - Handles empty input
   - Detects impossible scenarios (cycles)
   - Validates completion of all courses

5. **Testing**:
   - Includes test cases for various scenarios
   - Test function can be enabled/disabled as needed

6. **Documentation**:
   - Clear comments explaining the approach
   - Time and space complexity analysis
   - Function documentation with parameter descriptions

The solution efficiently handles the following cases:
- Linear dependencies
- Multiple prerequisites
- No prerequisites
- Cyclic dependencies (impossible cases)
- Complex dependency graphs

To use this code, you can either:
1. Import it as a module and use the minimumSemesters function
2. Uncomment the runTests() call to run the included test cases
3. Add your own test cases to the runTests function

The code follows JavaScript best practices and conventions, including:
- Consistent naming conventions
- Proper error handling
- Clean code structure
- Efficient algorithms
- Clear documentation