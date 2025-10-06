/**
 * 207. Course Schedule
 * Medium
 *
 * Course Schedule - Topological Sort Implementation Problem: Determine if it's possible to finish all courses given prerequisites @param {number} numCourses - The total number of courses @param {number[][]} prerequisites - Array of prerequisite pairs [course, prereq] @return {boolean} - Whether it's possible to finish all courses
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Course Schedule is to understand the core problem pattern
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
 * Course Schedule - Topological Sort Implementation
 * Problem: Determine if it's possible to finish all courses given prerequisites
 * @param {number} numCourses - The total number of courses
 * @param {number[][]} prerequisites - Array of prerequisite pairs [course, prereq]
 * @return {boolean} - Whether it's possible to finish all courses
 */

/**
 * Main function to check if course schedule is possible
 */
function canFinish(numCourses, prerequisites) {
    // Create adjacency list to represent the graph
    const graph = new Map();
    const inDegree = new Array(numCourses).fill(0);
    
    // Initialize the graph
    for (let i = 0; i < numCourses; i++) {
        graph.set(i, []);
    }
    
    // Build the graph and calculate in-degrees
    for (const [course, prereq] of prerequisites) {
        graph.get(prereq).push(course);
        inDegree[course]++;
    }
    
    // Queue for BFS - start with all courses that have no prerequisites
    const queue = [];
    for (let i = 0; i < numCourses; i++) {
        if (inDegree[i] === 0) {
            queue.push(i);
        }
    }
    
    // Counter for visited courses
    let visited = 0;
    
    // Process the queue (topological sort)
    while (queue.length > 0) {
        const current = queue.shift();
        visited++;
        
        // Process all courses that depend on the current course
        for (const nextCourse of graph.get(current)) {
            inDegree[nextCourse]--;
            if (inDegree[nextCourse] === 0) {
                queue.push(nextCourse);
            }
        }
    }
    
    // If we visited all courses, there's no cycle
    return visited === numCourses;
}

/**
 * Helper function to test the implementation
 */
function runTests() {
    // Test cases
    const testCases = [
        {
            numCourses: 2,
            prerequisites: [[1,0]],
            expected: true,
            description: "Simple valid case"
        },
        {
            numCourses: 2,
            prerequisites: [[1,0], [0,1]],
            expected: false,
            description: "Cycle case"
        },
        {
            numCourses: 4,
            prerequisites: [[1,0], [2,1], [3,2]],
            expected: true,
            description: "Linear dependency"
        }
    ];
    
    // Run tests
    for (const test of testCases) {
        const result = canFinish(test.numCourses, test.prerequisites);
        console.log(`Test: ${test.description}`);
        console.log(`Expected: ${test.expected}, Got: ${result}`);
        console.log(`Status: ${result === test.expected ? 'PASSED' : 'FAILED'}`);
        console.log('---');
    }
}

// Export the main function
module.exports = canFinish;

// Run tests if not being imported
if (require.main === module) {
    runTests();
}