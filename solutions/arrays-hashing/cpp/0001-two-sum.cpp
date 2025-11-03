/**
### INTUITION:
The key insight is to use a hash map to store numbers we've seen so far.

For each number, we check if its complement (target - current_number) exists in our hash map.

This allows us to find the pair in a single pass.

### APPROACH:
1. We start by creating an unordered_map to store the numbers we've encountered along with their indices.
2. As we iterate through the array, for each number we calculate its complement - the value that
would sum with the current number to reach our target.
3. The complement is simply
`target - current_number`.
4. Before adding the current number to our hash map, we first check if its complement already
exists in the map.
5. If we find the complement, we've discovered our pair and can immediately
return both indices: the stored index from the hash map and the current index.
6. If the complement doesn't exist yet, we store the current number and its index in the hash map.
7. This prepares us for future iterations where this number might be the complement we're looking for.
8. The beauty of this approach is that we only need to make a single pass through the array.
9. Each lookup in the hash map is O(1), making this dramatically faster than checking all possible pairs.

### WHY THIS WORKS:
A set by definition contains only unique elements - when we convert an array to a set, any duplicates are automatically removed. By comparing the lengths of the original array and the set, we can detect if duplicates existed. The early termination approach works because as soon as we find an element already in our seen set, we've proven a duplicate exists without needing to check the remaining elements.

### EXAMPLE WALKTHROUGH:
Input:
```
nums = [1, 2, 3, 1]
```

**Step 1:** Convert array to set
- set(nums) = {1, 2, 3}
- Set length = 3, Array length = 4

**Step 2:** Compare lengths
- len(nums) = 4 != len(set(nums)) = 3
- Since lengths differ, duplicates exist

Output: True

Alternative (Early Termination):
- seen = {}
- Check 1: not in seen, add it → seen = {1}
- Check 2: not in seen, add it → seen = {1, 2}
- Check 3: not in seen, add it → seen = {1, 2, 3}
- Check 1: found in seen → return True immediately

### TIME COMPLEXITY:
**O(n)** - where n is the length of the array. In the worst case (no duplicates), we iterate through all n elements, performing one set membership check (**O(1)**) and one set insertion (**O(1)**) for each element. Total: **O(n × 1)** = **O(n)**. In the best case (duplicate found early), we return immediately, giving us **O(1)**. Average case is still **O(n)** as we might need to check most elements. The simple set conversion approach always takes **O(n)** to create the set.

### SPACE COMPLEXITY:
**O(n)** - We create a set that in the worst case (all elements unique) stores all n elements from the array. Even with duplicates, we may store up to n unique values. The space used grows linearly with input size. For the set comparison approach, Python creates a temporary set of size up to n. For the early termination approach, we build a set incrementally but still use up to **O(n)** space.

### EDGE CASES:
- **No solution exists:** Problem guarantees exactly one solution
- **Duplicate values:** Hash map handles correctly by index
- **Two same numbers sum to target:** Works if at different indices
- **Negative numbers:** Algorithm works for any integers

</details>

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
