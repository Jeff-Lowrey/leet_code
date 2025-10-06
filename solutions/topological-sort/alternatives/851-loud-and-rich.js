/**
 * 851. Loud And Rich
 * Medium
 *
 * Loud and Rich Problem Implementation In a group of N people, each person has different levels of quietness. We have a list of richer relationships where richer[i] = [x, y] means person x is richer than person y. We need to find out for each person, who is the least quiet person among all people who are at least as rich as them. @param {number[][]} richer - Array of pairs where richer[i] = [x,y] means x is richer than y @param {number[]} quiet - Array where quiet[i] represents the quietness of the i-th person @return {number[]} - Array where result[x] is the least quiet person among all people at least as rich as x
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Loud And Rich is to understand the core problem pattern
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
 * Loud and Rich Problem Implementation
 * 
 * In a group of N people, each person has different levels of quietness.
 * We have a list of richer relationships where richer[i] = [x, y] means person x is richer than person y.
 * We need to find out for each person, who is the least quiet person among all people who are at least as rich as them.
 * 
 * @param {number[][]} richer - Array of pairs where richer[i] = [x,y] means x is richer than y
 * @param {number[]} quiet - Array where quiet[i] represents the quietness of the i-th person
 * @return {number[]} - Array where result[x] is the least quiet person among all people at least as rich as x
 */
function loudAndRich(richer, quiet) {
    const n = quiet.length;
    
    // Create adjacency list for the graph (less rich -> richer)
    const graph = Array.from({ length: n }, () => []);
    for (const [rich, poor] of richer) {
        graph[poor].push(rich);
    }
    
    // Initialize answer array with -1
    const answer = new Array(n).fill(-1);
    
    /**
     * DFS helper function to find the least quiet person
     * @param {number} node - Current person we're examining
     * @return {number} - Index of least quiet person
     */
    const dfs = (node) => {
        // If we've already computed this node, return cached result
        if (answer[node] !== -1) {
            return answer[node];
        }
        
        // Initialize answer as the current node
        answer[node] = node;
        
        // Check all richer persons connected to current node
        for (const richerPerson of graph[node]) {
            const candidate = dfs(richerPerson);
            // Update answer if we find someone quieter
            if (quiet[candidate] < quiet[answer[node]]) {
                answer[node] = candidate;
            }
        }
        
        return answer[node];
    };
    
    // Process each person
    for (let i = 0; i < n; i++) {
        if (answer[i] === -1) {
            dfs(i);
        }
    }
    
    return answer;
}

// Example usage and test cases
function runTests() {
    // Test Case 1
    const richer1 = [[1,0],[2,1],[3,1],[3,7],[4,3],[5,3],[6,3]];
    const quiet1 = [3,2,5,4,6,1,7,0];
    console.log("Test Case 1:");
    console.log("Input:");
    console.log("richer =", richer1);
    console.log("quiet =", quiet1);
    console.log("Output:", loudAndRich(richer1, quiet1));
    
    // Test Case 2
    const richer2 = [];
    const quiet2 = [0];
    console.log("\nTest Case 2:");
    console.log("Input:");
    console.log("richer =", richer2);
    console.log("quiet =", quiet2);
    console.log("Output:", loudAndRich(richer2, quiet2));
}

// Run tests if not being imported as a module
if (require.main === module) {
    runTests();
}

// Export for testing
module.exports = loudAndRich;