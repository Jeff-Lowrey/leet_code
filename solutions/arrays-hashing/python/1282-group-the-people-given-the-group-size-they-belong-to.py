"""### METADATA:
**Techniques**: Greedy Grouping, Hash Map Grouping
**Data Structures**: Hash Map (defaultdict)
**Time Complexity**: O(n)
**Space Complexity**: O(n)

### INTUITION:
The key insight is that use a hash map to collect people by their required group size. When a group
reaches its target size, add it to the result and start a new group for that size.

### APPROACH:
1. **Create hash map**: Map group_size -> list of people needing that size
2. **Iterate through people**: Add each person to their size's group
3. **Check group completion**: When a group reaches its size, move it to result
4. **Clear completed groups**: Reset the list for that size to start a new group

### WHY THIS WORKS:
- Greedy approach: forming groups as soon as they're complete is optimal
- Hash map groups people by their required group size efficiently
- No need to track which groups people belong to - just fill groups greedily
- Always produces a valid solution since input guarantees one exists

### EXAMPLE WALKTHROUGH:
Input:
```
groupSizes = [3,3,3,3,3,1,3]
```

Step 1: Initialize groups map
groups = {}
Step 2: Process each person
Person 0 (size 3): groups[3] = [0]
Person 1 (size 3): groups[3] = [0, 1]

Steps:
Step 1: Person 2 (size 3): groups[3] = [0, 1, 2] → Full! Add [0,1,2] to result
Step 2: Person 3 (size 3): groups[3] = [3]
Step 3: Person 4 (size 3): groups[3] = [3, 4]
Step 4: Person 5 (size 1): groups[1] = [5] → Full! Add [5] to result
Step 5: Person 6 (size 3): groups[3] = [3, 4, 6] → Full! Add [3,4,6] to result

Output:
```
[[0,1,2], [5], [3,4,6]]
```

### TIME COMPLEXITY:
**O(n)** - where n is the number of people in the groupSizes array. We make a single pass through the array (**O(n)**), and for each person we perform constant-time operations: hash map lookup/insertion (**O(1)**), appending to a list (**O(1)** amortized), and potentially moving a completed group to the result (**O(group_size)** but bounded by n total across all groups). Total: **O(n)** since each person is processed exactly once and added to exactly one result group.

### SPACE COMPLEXITY:
**O(n)** - We use a hash map that stores at most n people across all group_size buckets (each person appears exactly once in the map). The result list also stores all n people organized into groups. Additional space includes temporary group lists in the hash map. Total: **O(n)** for hash map + **O(n)** for result = **O(n)**. This is optimal since we must return all n people in the output.

### EDGE CASES:
- **All same group size**: Create multiple groups of that size
- **All different sizes**: Each person in separate group
- **Single person**: Return [[0]]
- **Multiple valid solutions**: Any valid grouping is acceptable

"""

from typing import List
from collections import defaultdict


class Solution:
    def groupThePeople(self, groupSizes: List[int]) -> List[List[int]]:
        """
        Group people by their required group size.

        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        # Map: group_size -> list of people needing that size
        groups = defaultdict(list)
        result = []

        for person, size in enumerate(groupSizes):
            # Add person to their size's group
            groups[size].append(person)

            # If group is complete, add to result and reset
            if len(groups[size]) == size:
                result.append(groups[size])
                groups[size] = []

        return result

    def groupThePeopleAlternative(self, groupSizes: List[int]) -> List[List[int]]:
        """
        Alternative: Build all groups before returning.

        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        groups = defaultdict(list)

        # Collect all people by group size
        for person, size in enumerate(groupSizes):
            groups[size].append(person)

        result = []

        # Split each size's people into groups of that size
        for size, people in groups.items():
            for i in range(0, len(people), size):
                result.append(people[i:i + size])

        return result


if __name__ == "__main__":
    solution = Solution()

    # Test case 1
    groupSizes = [3, 3, 3, 3, 3, 1, 3]
    result = solution.groupThePeople(groupSizes)
    print(f"Test 1: result")  # Expected: [[5],[0,1,2],[3,4,6]] or similar

    # Test case 2
    groupSizes = [2, 1, 3, 3, 3, 2]
    result = solution.groupThePeople(groupSizes)
    print(f"Test 2: result")  # Expected: [[1],[0,5],[2,3,4]] or similar

    # Test case 3
    groupSizes = [1]
    result = solution.groupThePeople(groupSizes)
    print(f"Test 3: result")  # Expected: [[0]]

    print("\nAll test cases completed!")
