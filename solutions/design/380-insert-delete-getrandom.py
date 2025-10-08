"""
# 380. Insert Delete GetRandom O(1)
**Medium**

Design a data structure that supports insert, delete, and getRandom operations in average O(1) time.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
To achieve O(1) for all three operations, we need:
- Insert: O(1) - use hash map
- Delete: O(1) - use hash map + swap-with-last technique
- getRandom: O(1) - need random access by index

A combination of a list (for random access) and a dictionary (for O(1) lookup) works perfectly.

### APPROACH:
1. **Data Structures**:
   - nums: list to store values (for random access)
   - val_to_index: dict mapping value -> its index in nums

2. **insert(val)**:
   - Return False if val already exists
   - Append val to nums
   - Store index in val_to_index
   - Return True

3. **remove(val)**:
   - Return False if val doesn't exist
   - Get index of val
   - Swap val with last element in nums
   - Update index of swapped element in val_to_index
   - Remove last element from nums
   - Delete val from val_to_index
   - Return True

4. **getRandom()**:
   - Return random element from nums using random.choice()

### WHY THIS WORKS:
- List provides O(1) random access and O(1) append
- Dict provides O(1) lookup
- Swap-with-last technique allows O(1) deletion from list
- All operations are truly O(1) average case

### TIME COMPLEXITY:
- insert: O(1)
- remove: O(1)
- getRandom: O(1)

### SPACE COMPLEXITY: O(n) for storing n elements

### EXAMPLE WALKTHROUGH:
```
insert(1): nums=[1], map={1:0}
insert(2): nums=[1,2], map={1:0, 2:1}
getRandom(): randomly return 1 or 2
remove(1): swap 1 with 2 -> nums=[2,1], then pop -> nums=[2], map={2:0}
insert(3): nums=[2,3], map={2:0, 3:1}
```

### EDGE CASES:
- Removing last element
- Single element in structure
- Duplicate insert attempts
- Remove non-existent element

</details>

<details>
<summary><b>💡 APPROACH</b></summary>

The approach uses list + dict combination for O(1) operations.

### Algorithm Steps:
1. Maintain list for values and dict for value->index mapping
2. Insert: append to list and update dict
3. Remove: swap with last, update dict, remove last
4. GetRandom: use random.choice on list

</details>
"""

import random
from typing import Optional


class RandomizedSet:
    """
    Data structure supporting insert, delete, and getRandom in O(1).

    Uses list for random access and dict for O(1) lookup.
    """

    def __init__(self):
        """
        Initialize the RandomizedSet.

        Time Complexity: O(1)
        Space Complexity: O(1)
        """
        self.nums = []  # List to store values
        self.val_to_index = {}  # Map value -> index in nums

    def insert(self, val: int) -> bool:
        """
        Insert a value into the set.

        Args:
            val: Value to insert

        Returns:
            bool: True if value was not present, False otherwise

        Time Complexity: O(1)
        Space Complexity: O(1)
        """
        if val in self.val_to_index:
            return False

        # Add to end of list
        self.nums.append(val)
        # Store index in map
        self.val_to_index[val] = len(self.nums) - 1
        return True

    def remove(self, val: int) -> bool:
        """
        Remove a value from the set.

        Args:
            val: Value to remove

        Returns:
            bool: True if value was present, False otherwise

        Time Complexity: O(1)
        Space Complexity: O(1)
        """
        if val not in self.val_to_index:
            return False

        # Get index of value to remove
        index = self.val_to_index[val]
        last_val = self.nums[-1]

        # Swap value with last element
        self.nums[index] = last_val
        self.val_to_index[last_val] = index

        # Remove last element
        self.nums.pop()
        del self.val_to_index[val]

        return True

    def getRandom(self) -> int:
        """
        Get a random element from the set.

        Returns:
            int: Random element from the set

        Time Complexity: O(1)
        Space Complexity: O(1)
        """
        return random.choice(self.nums)


def test_solution():
    """
    Test cases for RandomizedSet.
    """
    # Test case 1: Basic operations
    rs1 = RandomizedSet()
    assert rs1.insert(1) == True
    assert rs1.remove(2) == False
    assert rs1.insert(2) == True
    assert rs1.getRandom() in [1, 2]
    assert rs1.remove(1) == True
    assert rs1.insert(2) == False
    assert rs1.getRandom() == 2

    # Test case 2: Multiple insertions and deletions
    rs2 = RandomizedSet()
    assert rs2.insert(0) == True
    assert rs2.insert(1) == True
    assert rs2.remove(0) == True
    assert rs2.insert(2) == True
    assert rs2.remove(1) == True
    assert rs2.getRandom() == 2

    # Test case 3: Duplicate prevention
    rs3 = RandomizedSet()
    assert rs3.insert(1) == True
    assert rs3.insert(1) == False  # Duplicate
    assert rs3.insert(2) == True
    assert rs3.insert(2) == False  # Duplicate
    assert rs3.remove(1) == True
    assert rs3.remove(1) == False  # Already removed

    # Test case 4: Random distribution (probabilistic test)
    rs4 = RandomizedSet()
    for i in range(10):
        rs4.insert(i)

    # Check that getRandom returns valid values
    for _ in range(100):
        val = rs4.getRandom()
        assert 0 <= val < 10, f"Invalid random value: {val}"

    # Test case 5: Edge case - single element
    rs5 = RandomizedSet()
    rs5.insert(42)
    assert rs5.getRandom() == 42
    assert rs5.remove(42) == True

    # Test case 6: Remove and re-insert
    rs6 = RandomizedSet()
    rs6.insert(1)
    rs6.insert(2)
    rs6.insert(3)
    assert rs6.remove(2) == True
    assert rs6.insert(2) == True
    vals = set()
    for _ in range(100):
        vals.add(rs6.getRandom())
    assert vals == {1, 2, 3}, f"Expected {{1, 2, 3}}, got {vals}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    print("RandomizedSet demonstration:")
    randomized_set = RandomizedSet()

    print(f"insert(1) = {randomized_set.insert(1)}")  # True
    print(f"remove(2) = {randomized_set.remove(2)}")  # False
    print(f"insert(2) = {randomized_set.insert(2)}")  # True
    print(f"getRandom() = {randomized_set.getRandom()}")  # 1 or 2
    print(f"remove(1) = {randomized_set.remove(1)}")  # True
    print(f"insert(2) = {randomized_set.insert(2)}")  # False
    print(f"getRandom() = {randomized_set.getRandom()}")  # 2
