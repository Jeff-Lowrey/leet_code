/**
 * 1136. Parallel Courses
 * Medium
 *
 * Parallel Courses - Solution Time Complexity: O(N + E) where N is number of courses and E is number of prerequisites Space Complexity: O(N + E) for storing the graph and indegree array
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Parallel Courses is to understand the core problem pattern
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