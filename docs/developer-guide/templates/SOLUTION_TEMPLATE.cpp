/**
 * Difficulty: [Easy/Medium/Hard]
 *
 * [Problem description goes here. Use markdown formatting with `code` for inline code.]
 *
 * [Additional problem constraints or notes.]
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[input example]</dd>
 * <dt>Output:</dt>
 * <dd>[output example]</dd>
 * <dt>Explanation:</dt>
 * <dd>[explanation of how input becomes output]</dd>
 * </dl>
 *
### METADATA:
**Techniques**: [e.g., Hash Table Lookup, Binary Search, Two Pointers]
**Data Structures**: [e.g., Hash Map, Array, Tree, Graph]
**Patterns**: [e.g., Complement Search, Sliding Window, DFS]
**Time Complexity**: **O(?)** - [detailed explanation of time complexity]
**Space Complexity**: **O(?)** - [detailed explanation of space complexity]

 *
 * ### INTUITION:
 * [High-level insight or key observation that makes the solution work.]
 *
 * [Keep this section brief - 1-3 sentences maximum.]
 *
 * [Explain the "aha moment" or central idea.]
 *
 * ### APPROACH:
 * [Detailed explanation of the solution approach written in flowing prose.]
 *
 * [Break down the algorithm step by step.]
 *
 * [Explain why each step is necessary.]
 *
 * [Use clear, descriptive language without numbered lists.]
 *
 * [Focus on helping the reader understand the thought process.]
 *
 * ### WHY THIS WORKS:
 * [Brief explanation of correctness - use bullet points for clarity.]
 *
 * [Why does this approach solve the problem?]
 *
 * [What properties make it work?]
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * [input example]
 * ```
 *
 * **Step 1:** [description of first step]
 *
 * **Step 2:** [description of second step]
 *
 * **Step N:** [description of final step]
 *
 * Output:
 * ```
 * [expected output]
 * ```
 *
 * ### TIME COMPLEXITY:
 * **O(?)** - [detailed explanation]
 *
 * ### SPACE COMPLEXITY:
 * **O(?)** - [detailed explanation]
 *
 * ### EDGE CASES:
 * - **[Edge case 1]:** [how it's handled]
 * - **[Edge case 2]:** [how it's handled]
 * - **[Edge case 3]:** [how it's handled]
 */

#include <iostream>
#include <vector>
#include <unordered_map>
#include <algorithm>
using namespace std;

class Solution {
public:
    /**
     * Main solution method
     *
     * Approach: [Brief description of approach]
     * Time Complexity: O(?)
     * Space Complexity: O(?)
     *
     * @param param1 [description and type]
     * @param param2 [description and type]
     * @return [description and type]
     */
    ReturnType methodName(ParamType1 param1, ParamType2 param2) {
        // Implementation with clear comments
        return ReturnType{};
    }

    /**
     * Alternative solution method
     *
     * Approach: [Alternative Approach Name]
     * Time Complexity: O(?)
     * Space Complexity: O(?)
     *
     * @param param1 [description and type]
     * @param param2 [description and type]
     * @return [description and type]
     */
    ReturnType methodNameAlternative(ParamType1 param1, ParamType2 param2) {
        // Alternative implementation
        return ReturnType{};
    }
};

// Helper function to compare results (customize based on return type)
template<typename T>
bool compareResults(const T& result, const T& expected) {
    return result == expected;
}

// Test cases
int main() {
    Solution solution;

    // Test case 1
    cout << "Test Case 1:" << endl;
    ParamType1 param1_1 = {}; // Replace with actual test input
    ParamType2 param2_1 = {}; // Replace with actual test input
    ReturnType expected1 = {}; // Replace with expected output
    ReturnType result1 = solution.methodName(param1_1, param2_1);
    cout << "Input: param1=";
    // Print param1_1 (customize based on type)
    cout << ", param2=";
    // Print param2_1 (customize based on type)
    cout << endl;
    cout << "Output: ";
    // Print result1 (customize based on type)
    cout << endl;
    cout << "Expected: ";
    // Print expected1 (customize based on type)
    cout << endl;
    cout << "Pass: " << (compareResults(result1, expected1) ? "true" : "false") << endl;
    cout << endl;

    // Test case 2
    cout << "Test Case 2:" << endl;
    ParamType1 param1_2 = {};
    ParamType2 param2_2 = {};
    ReturnType expected2 = {};
    ReturnType result2 = solution.methodName(param1_2, param2_2);
    cout << "Input: param1=";
    // Print param1_2 (customize based on type)
    cout << ", param2=";
    // Print param2_2 (customize based on type)
    cout << endl;
    cout << "Output: ";
    // Print result2 (customize based on type)
    cout << endl;
    cout << "Expected: ";
    // Print expected2 (customize based on type)
    cout << endl;
    cout << "Pass: " << (compareResults(result2, expected2) ? "true" : "false") << endl;
    cout << endl;

    // Test case 3 - Edge case
    cout << "Test Case 3 (Edge Case):" << endl;
    ParamType1 param1_3 = {};
    ParamType2 param2_3 = {};
    ReturnType expected3 = {};
    ReturnType result3 = solution.methodName(param1_3, param2_3);
    cout << "Input: param1=";
    // Print param1_3 (customize based on type)
    cout << ", param2=";
    // Print param2_3 (customize based on type)
    cout << endl;
    cout << "Output: ";
    // Print result3 (customize based on type)
    cout << endl;
    cout << "Expected: ";
    // Print expected3 (customize based on type)
    cout << endl;
    cout << "Pass: " << (compareResults(result3, expected3) ? "true" : "false") << endl;

    return 0;
}
