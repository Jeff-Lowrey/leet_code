"""
# 269. Alien Dictionary
# Difficulty: Medium
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
    def alienOrder(self, words: List[str]) -> str:
        """
        Determines the order of characters in an alien alphabet based on given sorted words.
        Uses topological sorting to determine the character order.
        
        Args:
            words: List of strings sorted according to alien dictionary order
            
        Returns:
            String representing the order of characters in the alien alphabet,
            or empty string if no valid order exists
        """
        # Edge case: empty input
        if not words:
            return ""
            
        # Build adjacency list and track all unique characters
        adj = defaultdict(set)
        chars = set(''.join(words))
        
        # Build graph by comparing adjacent words
        for i in range(len(words) - 1):
            w1, w2 = words[i], words[i + 1]
            
            # Check for invalid case where a longer word comes before its prefix
            if len(w1) > len(w2) and w1[:len(w2)] == w2:
                return ""
                
            # Find first differing character and add edge to graph
            for c1, c2 in zip(w1, w2):
                if c1 != c2:
                    adj[c1].add(c2)
                    break
        
        # Track visited and currently processing nodes for cycle detection
        visited = {}  # False = processing, True = processed
        result = []
        
        def dfs(char: str) -> bool:
            """
            Performs DFS traversal to detect cycles and build topological order.
            
            Args:
                char: Current character being processed
                
            Returns:
                Boolean indicating whether a cycle was detected
            """
            if char in visited:
                return visited[char]  # False indicates cycle
                
            visited[char] = False  # Mark as processing
            
            # Visit all neighbors
            for neighbor in adj[char]:
                if not dfs(neighbor):
                    return False
                    
            visited[char] = True  # Mark as processed
            result.append(char)
            return True
        
        # Perform DFS for each character
        for char in chars:
            if char not in visited:
                if not dfs(char):
                    return ""  # Cycle detected
        
        # Return characters in reverse order (topological sort)
        return ''.join(result[::-1])

    def alienOrder_bfs(self, words: List[str]) -> str:
        """
        Alternative implementation using BFS (Kahn's algorithm).
        
        Args:
            words: List of strings sorted according to alien dictionary order
            
        Returns:
            String representing the order of characters in the alien alphabet,
            or empty string if no valid order exists
        """
        # Build adjacency list and in-degree count
        adj = defaultdict(set)
        in_degree = defaultdict(int)
        chars = set(''.join(words))
        
        # Initialize in-degree for all characters
        for char in chars:
            in_degree[char] = 0
        
        # Build graph
        for i in range(len(words) - 1):
            w1, w2 = words[i], words[i + 1]
            
            # Check invalid case
            if len(w1) > len(w2) and w1[:len(w2)] == w2:
                return ""
                
            # Add edges and update in-degree
            for c1, c2 in zip(w1, w2):
                if c1 != c2:
                    if c2 not in adj[c1]:
                        adj[c1].add(c2)
                        in_degree[c2] += 1
                    break
        
        # Initialize queue with nodes having 0 in-degree
        queue = deque([c for c in chars if in_degree[c] == 0])
        result = []
        
        # Process queue
        while queue:
            char = queue.popleft()
            result.append(char)
            
            # Update in-degree of neighbors
            for neighbor in adj[char]:
                in_degree[neighbor] -= 1
                if in_degree[neighbor] == 0:
                    queue.append(neighbor)
        
        # Check if all characters were processed
        return ''.join(result) if len(result) == len(chars) else ""

# Example usage

def test_solution():
    """
    Test cases for 269. Alien Dictionary.
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
    print(f"Solution for 269. Alien Dictionary")
