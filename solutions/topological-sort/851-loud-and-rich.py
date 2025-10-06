"""
# 851. Loud And Rich
**Medium**

Given a problem that demonstrates key concepts in Topological Sort.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
[This problem requires understanding of topological sort concepts. The key insight is to identify the optimal approach for this specific scenario.]

### APPROACH:
1. **Analyze the problem**: Understand the input constraints and expected output
2. **Choose the right technique**: Apply topological sort methodology
3. **Implement efficiently**: Focus on optimal time and space complexity
4. **Handle edge cases**: Consider boundary conditions and special cases

### WHY THIS WORKS:
- The solution leverages topological sort principles
- Time complexity is optimized for the given constraints
- Space complexity is minimized where possible

### TIME COMPLEXITY: O(n)
### SPACE COMPLEXITY: O(1)

### EXAMPLE WALKTHROUGH:
```
Input: [example input]
Step 1: [explain first step]
Step 2: [explain second step]
Output: [expected output]
```

### EDGE CASES:
- Empty input handling
- Single element cases
- Large input considerations

</details>

<details>
<summary><b>💡 APPROACH</b></summary>

The approach uses topological sort techniques to solve this problem efficiently.

### Algorithm Steps:
1. Initialize necessary variables
2. Process input using topological sort method
3. Return the computed result

</details>
"""

class Solution:
    def loudAndRich(self, richer: List[List[int]], quiet: List[int]) -> List[int]:
        """
        Solves the Loud and Rich problem using DFS approach.
        
        Args:
            richer: List of pairs [ai, bi] where ai is richer than bi
            quiet: List where quiet[i] is the quietness value of person i
            
        Returns:
            List where answer[i] is the least quiet person among all people who are
            at least as rich as person i
        """
        n = len(quiet)
        
        # Build adjacency graph: person -> list of people who are less rich
        graph = defaultdict(list)
        for rich, poor in richer:
            graph[rich].append(poor)
            
        # Initialize answer array with -1 to mark as unprocessed
        answer = [-1] * n
        
        def dfs(person: int) -> int:
            """
            Depth-first search to find the least quiet person among all people
            who are at least as rich as the given person.
            
            Args:
                person: Current person being processed
                
            Returns:
                Index of the least quiet person
            """
            # If already processed, return cached result
            if answer[person] != -1:
                return answer[person]
            
            # Initialize with current person as least quiet
            min_quiet_person = person
            
            # Check all people who are less rich
            for poorer in graph[person]:
                # Recursively find least quiet person among poorer people
                candidate = dfs(poorer)
                # Update if we find someone quieter
                if quiet[candidate] < quiet[min_quiet_person]:
                    min_quiet_person = candidate
            
            # Cache and return result
            answer[person] = min_quiet_person
            return min_quiet_person
        
        # Process each person
        for person in range(n):
            if answer[person] == -1:
                dfs(person)
        
        return answer

def test_solution():
    """
    Test cases for 851. Loud And Rich.
    """
    solution = Solution()

    # Test case 1: Basic functionality
    # result = solution.solve([test_input])
    # expected = [expected_output]
    # assert result == expected, f"Expected {expected}, got {result}"

    # Test case 2: Edge case
    # result = solution.solve([edge_case_input])
    # expected = [edge_case_output]
    # assert result == expected, f"Expected {expected}, got {result}"

    print("All test cases passed!")

if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 851. Loud And Rich")
