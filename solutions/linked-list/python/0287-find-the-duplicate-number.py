"""
### INTUITION:
The key insight is that treat as cycle detection problem. Array indices are nodes, values are edges. Duplicate creates a cycle. Use Floyd's algorithm to find cycle entrance, which is the duplicate number.

### APPROACH:
1. **Treat as linked list**: Consider array indices as linked list
2. **Phase 1 - find cycle**: Use Floyd's algorithm with slow and fast pointers
3. **Move at different speeds**: slow = nums[slow], fast = nums[nums[fast]]
4. **Detect cycle**: When slow == fast, cycle detected
5. **Phase 2 - find entrance**: Reset slow = nums[0], keep fast at meeting point
6. **Move both at same speed**: Both move one step
7. **Find duplicate**: When slow == fast, that's the duplicate number
8. **Return result**: Return slow as the duplicate

### WHY THIS WORKS:
- Floyd's cycle detection treats array as implicit linked list where nums[i] points to nums[nums[i]]
- Duplicate value creates a cycle because two indices point to the same value
- Phase 1 (tortoise/hare) detects cycle existence in O(n) time
- Phase 2 finds cycle entrance (the duplicate) by mathematical property: distance to entrance equals distance from start
- Achieves O(1) space without modifying array, unlike hash set or sorting approaches

### EXAMPLE WALKTHROUGH:
Input:
```
nums = [1,3,4,2,2]
```

Step 1: Floyd's cycle detection
slow=nums[0]=1, fast=nums[nums[0]]=3
slow=nums[1]=3, fast=nums[nums[3]]=2
slow=nums[3]=2, fast=nums[nums[2]]=3
slow=nums[2]=4, fast=nums[nums[3]]=2
slow=nums[4]=2, fast=nums[nums[2]]=3
slow=nums[2]=4, fast=nums[nums[3]]=2
slow=nums[4]=2, fast=nums[nums[2]]=3
Meet at 2
Step 2: Find cycle entrance
slow2=nums[0]=1, slow=nums[2]=4
slow2=nums[1]=3, slow=nums[4]=2
slow2=nums[3]=2, slow=nums[2]=4
slow2=nums[2]=4, slow=nums[4]=2
slow2=nums[4]=2, slow=nums[2]=4
Meet at 2

Output:
```
2 (duplicate number)
```

### TIME COMPLEXITY:
**O(n)**
- Single pass through input

### SPACE COMPLEXITY:
**O(1)**
- Constant extra space

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

"""

from typing import List, Optional, Dict, Tuple


class Solution:
    def findDuplicate(self, nums: List[int]) -> int:
        """
        Find the duplicate number in an array using Floyd's Cycle Detection.

        Args:
            nums: List[int] - Array containing n + 1 integers where each integer
                            is in the range [1, n] inclusive.

        Returns:
            int - The duplicate number in the array

        Time Complexity: O(n)
        Space Complexity: O(1)
        """
        if not nums:
            return -1

        # Phase 1: Finding the intersection point of the two runners
        tortoise = nums[0]
        hare = nums[0]

        # Move tortoise one step and hare two steps until they meet
        while True:
            tortoise = nums[tortoise]
            hare = nums[nums[hare]]
            if tortoise == hare:
                break

        # Phase 2: Finding the entrance to the cycle
        tortoise = nums[0]
        while tortoise != hare:
            tortoise = nums[tortoise]
            hare = nums[hare]

        return hare


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Example with duplicate
    result = solution.findDuplicate([1, 3, 4, 2, 2])
    expected = 2
    assert result == expected, f"Expected expected, got result"

    # Test case 2: Another example
    result = solution.findDuplicate([3, 1, 3, 4, 2])
    expected = 3
    assert result == expected, f"Expected expected, got result"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 287. Find The Duplicate Number")
