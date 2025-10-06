/**
 * 210. Course Schedule Ii
 * Medium
 *
 * Course Schedule II - Topological Sort Implementation @param {number} numCourses - The total number of courses @param {number[][]} prerequisites - Array of prerequisite pairs [course, prereq] @return {number[]} - The ordering of courses to take to finish all courses
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Course Schedule Ii is to understand the core problem pattern
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
 * Course Schedule II - Topological Sort Implementation
 * 
 * @param {number} numCourses - The total number of courses
 * @param {number[][]} prerequisites - Array of prerequisite pairs [course, prereq]
 * @return {number[]} - The ordering of courses to take to finish all courses
 */
function findOrder(numCourses, prerequisites) {
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
    
    // Result array to store the course order
    const result = [];
    
    // Process the queue
    while (queue.length > 0) {
        const current = queue.shift();
        result.push(current);
        
        // Process all courses that depend on the current course
        for (const nextCourse of graph.get(current)) {
            inDegree[nextCourse]--;
            if (inDegree[nextCourse] === 0) {
                queue.push(nextCourse);
            }
        }
    }
    
    // Check if all courses can be completed
    return result.length === numCourses ? result : [];
}

/**
 * Helper function to test the solution
 * @param {number} numCourses 
 * @param {number[][]} prerequisites 
 */
function testFindOrder(numCourses, prerequisites) {
    console.log(`Input: numCourses = ${numCourses}, prerequisites = ${JSON.stringify(prerequisites)}`);
    const result = findOrder(numCourses, prerequisites);
    console.log(`Output: ${JSON.stringify(result)}\n`);
}

// Test cases
function runTests() {
    // Test Case 1: Simple case
    testFindOrder(2, [[1,0]]);
    
    // Test Case 2: Multiple prerequisites
    testFindOrder(4, [[1,0],[2,0],[3,1],[3,2]]);
    
    // Test Case 3: No prerequisites
    testFindOrder(1, []);
    
    // Test Case 4: Impossible case (cycle)
    testFindOrder(2, [[1,0],[0,1]]);
}

// Run the tests
runTests();

// Export the function for external use
module.exports = {
    findOrder
};