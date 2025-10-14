"""
# Difficulty: Medium

# 380. Insert Delete GetRandom O(1)

Design a data structure that supports insert, delete, and getRandom operations in average O(1) time.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>
["RandomizedSet", "insert", "remove", "insert", "getRandom", "remove", "insert", "getRandom"]<br>
[[], [1], [2], [2], [], [1], [2], []]
</dd>
<dt>Output:</dt>
<dd>[null, true, false, true, 2, true, false, 2]</dd>
<dt>Explanation:</dt>
<dd>
RandomizedSet randomizedSet = new RandomizedSet();<br>
randomizedSet.insert(1); // Inserts 1 to the set. Returns true as 1 was inserted successfully.<br>
randomizedSet.remove(2); // Returns false as 2 does not exist in the set.<br>
randomizedSet.insert(2); // Inserts 2 to the set, returns true. Set now contains [1,2].<br>
randomizedSet.getRandom(); // getRandom() should return either 1 or 2 randomly.<br>
randomizedSet.remove(1); // Removes 1 from the set, returns true. Set now contains [2].<br>
randomizedSet.insert(2); // 2 was already in the set, so return false.<br>
randomizedSet.getRandom(); // Since 2 is the only number in the set, getRandom() will always return 2.
</dd>
</dl>

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

### EXAMPLE WALKTHROUGH:
```
insert(1): nums=[1], map={1:0}
insert(2): nums=[1,2], map={1:0, 2:1}
getRandom(): randomly return 1 or 2
remove(1): swap 1 with 2 -> nums=[2,1], then pop -> nums=[2], map={2:0}
insert(3): nums=[2,3], map={2:0, 3:1}
```

### TIME COMPLEXITY:
- insert: O(1)
- remove: O(1)
- getRandom: O(1)

### SPACE COMPLEXITY:
O(n) for storing n elements

### EDGE CASES:
- Removing last element
- Single element in structure
- Duplicate insert attempts
- Remove non-existent element

</details>
"""


