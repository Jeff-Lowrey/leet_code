/**
 * 207. Course Schedule
 * Medium
 *
 * Course Schedule - Determines if it's possible to finish all courses Problem: Given numCourses and prerequisites array where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai, return true if you can finish all courses. Otherwise, return false. @param {number} numCourses - The total number of courses @param {number[][]} prerequisites - Array of prerequisite pairs @return {boolean} - Whether it's possible to finish all courses
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
 * Course Schedule - Determines if it's possible to finish all courses
 * 
 * Problem: Given numCourses and prerequisites array where prerequisites[i] = [ai, bi]
 * indicates that you must take course bi first if you want to take course ai,
 * return true if you can finish all courses. Otherwise, return false.
 * 
 * @param {number} numCourses - The total number of courses
 * @param {number[][]} prerequisites - Array of prerequisite pairs
 * @return {boolean} - Whether it's possible to finish all courses
 */

/**
 * Main function to check if course schedule is possible
 */
function canFinish(numCourses, prerequisites) {
    // Edge cases
    if (numCourses === 0) return true;
    if (!prerequisites || prerequisites.length === 0) return true;

    // Create adjacency list representation of the graph
    const graph = buildGraph(numCourses, prerequisites);
    
    // Array to track visited nodes in current DFS path
    const visited = new Set();
    // Array to track nodes that have been fully explored
    const explored = new Set();

    // Check for cycles starting from each course
    for (let course = 0; course < numCourses; course++) {
        if (!explored.has(course) && hasCycle(course, graph, visited, explored)) {
            return false;
        }
    }

    return true;
}

/**
 * Builds an adjacency list representation of the course prerequisites
 */
function buildGraph(numCourses, prerequisites) {
    const graph = Array(numCourses).fill().map(() => []);
    
    for (const [course, prereq] of prerequisites) {
        graph[course].push(prereq);
    }
    
    return graph;
}

/**
 * Detects if there's a cycle in the graph using DFS
 */
function hasCycle(course, graph, visited, explored) {
    // If we've seen this course in current path, we have a cycle
    if (visited.has(course)) {
        return true;
    }
    
    // If we've already explored this course fully, no need to check again
    if (explored.has(course)) {
        return false;
    }

    // Mark course as visited in current path
    visited.add(course);

    // Check all prerequisites of current course
    for (const prereq of graph[course]) {
        if (hasCycle(prereq, graph, visited, explored)) {
            return true;
        }
    }

    // Remove course from current path as we backtrack
    visited.delete(course);
    // Mark course as fully explored
    explored.add(course);

    return false;
}

// Test cases
function runTests() {
    console.log('Running test cases...');
    
    // Test Case 1: Simple valid case
    console.log(canFinish(2, [[1,0]]));  // Expected: true
    
    // Test Case 2: Cycle detection
    console.log(canFinish(2, [[1,0],[0,1]]));  // Expected: false
    
    // Test Case 3: Multiple prerequisites
    console.log(canFinish(4, [[1,0],[2,1],[3,2]]));  // Expected: true
    
    // Test Case 4: No prerequisites
    console.log(canFinish(2, []));  // Expected: true
    
    // Test Case 5: Complex case with cycle
    console.log(canFinish(4, [[0,1],[1,2],[2,3],[3,1]]));  // Expected: false
}

// Export for use in other modules
module.exports = {
    canFinish,
    buildGraph,
    hasCycle
};

// Uncomment to run tests
// runTests();