/**
 * # 1. Two Sum
 *
 * 1. Two Sum
 * Difficulty: Easy
 *
 * Given an array of integers `nums` and an integer `target`, return indices of the
 * two numbers such that they add up to `target`.
 *
 * You may assume that each input would have exactly one solution, and you may
 * not use the same element twice.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>nums = [2,7,11,15], target = 9</dd>
 * <dt>Output:</dt>
 * <dd>[0,1]</dd>
 * <dt>Explanation:</dt>
 * <dd>Because nums[0] + nums[1] == 9, we return [0, 1]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### METADATA:
 * **Techniques**: Hash Table Lookup, Single Pass
 * **Data Structures**: Unordered Map, Vector
 * **Patterns**: Complement Search
 * **Time Complexity**: **O(n)** - Single pass through array with O(1) hash map lookups
 * **Space Complexity**: **O(n)** - Hash map stores up to n elements in worst case
 *
 * ### INTUITION:
 * The key insight is to use a hash map to store numbers we've seen so far.
 *
 * For each number, we check if its complement (target - current_number) exists in our hash map.
 *
 * This allows us to find the pair in a single pass.
 *
 * ### APPROACH:
 * We start by creating an unordered_map to store the numbers we've encountered along with their indices.
 *
 * As we iterate through the array, for each number we calculate its complement - the value that
 * would sum with the current number to reach our target. The complement is simply
 * `target - current_number`.
 *
 * Before adding the current number to our hash map, we first check if its complement already
 * exists in the map. If we find the complement, we've discovered our pair and can immediately
 * return both indices: the stored index from the hash map and the current index.
 *
 * If the complement doesn't exist yet, we store the current number and its index in the hash map.
 * This prepares us for future iterations where this number might be the complement we're looking for.
 *
 * The beauty of this approach is that we only need to make a single pass through the array.
 * Each lookup in the hash map is O(1), making this dramatically faster than checking all possible pairs.
 *
 * ### WHY THIS WORKS:
 * Instead of checking every pair (O(n²)), we use hash map for O(1) lookup.
 *
 * We only need to store numbers we've already seen.
 *
 * When we find a complement, we know the current index and the stored index.
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * nums = [2,7,11,15], target = 9
 * ```
 *
 * **Step 1:** `num=2`, `complement=7`, `seen={}` → store `{2: 0}`
 *
 * **Step 2:** `num=7`, `complement=2`, `seen={2: 0}` → found! return `[0, 1]`
 *
 * ### TIME COMPLEXITY:
 * **O(n)** - Single pass through array with O(1) hash map lookups
 *
 * ### SPACE COMPLEXITY:
 * **O(n)** - Hash map stores up to n elements in worst case
 *
 * ### EDGE CASES:
 * - **No solution exists:** Problem guarantees exactly one solution
 * - **Duplicate values:** Hash map handles correctly by index
 * - **Two same numbers sum to target:** Works if at different indices
 * - **Negative numbers:** Algorithm works for any integers
 *
 * </details>
 */

#include <vector>
#include <unordered_map>
#include <iostream>

using namespace std;

class Solution {
public:
    /**
     * Find two numbers that add up to target
     *
     * Approach: Hash Map for O(n) lookup
     * Time Complexity: O(n)
     * Space Complexity: O(n)
     *
     * @param nums Vector of integers
     * @param target Target sum
     * @return Vector containing indices of the two numbers
     */
    vector<int> twoSum(vector<int>& nums, int target) {
        // Unordered map to store value -> index mapping
        unordered_map<int, int> seen;

        for (int i = 0; i < nums.size(); i++) {
            // Calculate complement needed to reach target
            int complement = target - nums[i];

            // Check if complement exists in our hash map
            if (seen.find(complement) != seen.end()) {
                return {seen[complement], i};
            }

            // Store current number and its index
            seen[nums[i]] = i;
        }

        // Should never reach here given problem constraints
        return {};
    }

    /**
     * Brute force approach - check all pairs
     *
     * Approach: Brute Force
     * Time Complexity: O(n²)
     * Space Complexity: O(1)
     *
     * @param nums Vector of integers
     * @param target Target sum
     * @return Vector containing indices of the two numbers
     */
    vector<int> twoSumBruteForce(vector<int>& nums, int target) {
        int n = nums.size();

        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (nums[i] + nums[j] == target) {
                    return {i, j};
                }
            }
        }

        return {};
    }
};

// Helper function to print vector
void printVector(const vector<int>& vec) {
    cout << "[";
    for (size_t i = 0; i < vec.size(); i++) {
        cout << vec[i];
        if (i < vec.size() - 1) cout << ", ";
    }
    cout << "]";
}

// Test cases
int main() {
    Solution solution;

    // Test case 1
    cout << "Test Case 1:" << endl;
    vector<int> nums1 = {2, 7, 11, 15};
    int target1 = 9;
    vector<int> result1 = solution.twoSum(nums1, target1);
    cout << "Input: nums = ";
    printVector(nums1);
    cout << ", target = " << target1 << endl;
    cout << "Output: ";
    printVector(result1);
    cout << endl;
    cout << "Expected: [0, 1]" << endl;
    cout << "Pass: " << (result1 == vector<int>{0, 1} ? "true" : "false") << endl;
    cout << endl;

    // Test case 2
    cout << "Test Case 2:" << endl;
    vector<int> nums2 = {3, 2, 4};
    int target2 = 6;
    vector<int> result2 = solution.twoSum(nums2, target2);
    cout << "Input: nums = ";
    printVector(nums2);
    cout << ", target = " << target2 << endl;
    cout << "Output: ";
    printVector(result2);
    cout << endl;
    cout << "Expected: [1, 2]" << endl;
    cout << "Pass: " << (result2 == vector<int>{1, 2} ? "true" : "false") << endl;
    cout << endl;

    // Test case 3
    cout << "Test Case 3:" << endl;
    vector<int> nums3 = {3, 3};
    int target3 = 6;
    vector<int> result3 = solution.twoSum(nums3, target3);
    cout << "Input: nums = ";
    printVector(nums3);
    cout << ", target = " << target3 << endl;
    cout << "Output: ";
    printVector(result3);
    cout << endl;
    cout << "Expected: [0, 1]" << endl;
    cout << "Pass: " << (result3 == vector<int>{0, 1} ? "true" : "false") << endl;

    return 0;
}
