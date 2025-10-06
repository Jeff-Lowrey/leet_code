/**
 * 278. First Bad Version
 * Medium
 *
 * First Bad Version - Solution The problem is to find the first bad version in a sequence of versions, given that all versions after a bad version are also bad. Approach: Binary Search Time Complexity: O(log n) Space Complexity: O(1)
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving First Bad Version is to understand the core problem pattern
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
 * First Bad Version - Solution
 * 
 * The problem is to find the first bad version in a sequence of versions,
 * given that all versions after a bad version are also bad.
 * 
 * Approach: Binary Search
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */

/**
 * Definition for isBadVersion()
 * 
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     @return {boolean};
 * };
 */

/**
 * @param {function} isBadVersion()
 * @return {function}
 */
const solution = function(isBadVersion) {
    /**
     * @param {integer} n Total versions
     * @return {integer} The first bad version
     */
    return function(n) {
        // Edge case: if there's only one version
        if (n === 1) return 1;
        
        let left = 1;
        let right = n;
        
        // Binary search implementation
        while (left < right) {
            // Calculate mid point using unsigned right shift to avoid overflow
            const mid = left + ((right - left) >>> 1);
            
            if (isBadVersion(mid)) {
                // If current version is bad, look in left half
                right = mid;
            } else {
                // If current version is good, look in right half
                left = mid + 1;
            }
        }
        
        // At this point, left and right have converged to the first bad version
        return left;
    };
};

// Export the solution for testing purposes
module.exports = solution;

/**
 * Example usage:
 * 
 * const isBadVersion = version => version >= 4;
 * const firstBadVersion = solution(isBadVersion);
 * console.log(firstBadVersion(5)); // Output: 4
 * 
 * Explanation:
 * - The function uses binary search to efficiently find the first bad version
 * - It maintains two pointers: left and right
 * - In each iteration, it checks the middle version
 * - If middle version is bad, search in left half
 * - If middle version is good, search in right half
 * - Process continues until left and right pointers converge
 * 
 * Note:
 * - The solution assumes that isBadVersion API is already defined
 * - The implementation handles potential integer overflow using unsigned right shift
 * - The solution is optimized for large numbers of versions
 */