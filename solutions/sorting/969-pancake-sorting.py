"""
# 969. Pancake Sorting
**Medium**

Given an array of integers arr, sort the array by performing a series of pancake flips.

In one pancake flip we do the following steps:
- Choose an integer k where 1 <= k <= arr.length.
- Reverse the sub-array arr[0...k-1] (0-indexed).

For example, if arr = [3,2,1,4] and we performed a pancake flip choosing k = 3, we reverse the
sub-array [3,2,1], so arr = [1,2,3,4] after the pancake flip at k = 3.

Return an array of the k-values corresponding to a sequence of pancake flips that sort arr.
Any valid answer that sorts the array within 10 * arr.length flips will be accepted.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
Like sorting pancakes by size - we can repeatedly bring the largest unsorted element to the
top with one flip, then flip it to its final position. This guarantees sorting.

### APPROACH:
1. **Find maximum** in unsorted portion of array
2. **Flip to top**: If max is not already at top, flip to bring it to position 0
3. **Flip to position**: Flip to move max to its final sorted position
4. **Repeat**: Continue with remaining unsorted portion
5. **Track flips**: Record k-values for each flip

### WHY THIS WORKS:
- Each element can be moved to its final position in at most 2 flips
- First flip brings it to the top
- Second flip moves it to its correct position
- Working from largest to smallest guarantees no interference
- Maximum 2n flips (well within 10n limit)

### TIME COMPLEXITY: O(n²)
- n iterations (one per element)
- Each iteration finds max: O(n)
- Total: O(n²)

### SPACE COMPLEXITY: O(n)
For storing the flip sequence

### EXAMPLE WALKTHROUGH:
```
Input: arr = [3,2,4,1]

Goal: Sort to [1,2,3,4]

Step 1: Find max=4 at index 2
Flip at k=3: [3,2,4] → [4,2,3]
Result: [4,2,3,1]

Step 2: Flip at k=4 to move 4 to end
Flip at k=4: [4,2,3,1] → [1,3,2,4]
Result: [1,3,2,4]

Step 3: Find max=3 at index 1 in [1,3,2]
Flip at k=2: [1,3] → [3,1]
Result: [3,1,2,4]

Step 4: Flip at k=3 to move 3 to position
Flip at k=3: [3,1,2] → [2,1,3]
Result: [2,1,3,4]

Step 5: Find max=2 at index 0 in [2,1]
Already at top, flip at k=2
Flip at k=2: [2,1] → [1,2]
Result: [1,2,3,4]

Output: [3,4,2,3,2] (flip positions)
```

### EDGE CASES:
- Already sorted array
- Single element
- Reverse sorted
- All elements equal
- Two elements

### OPTIMIZATIONS:
- **Skip if already in position**: Don't flip if element already at correct spot
- **Skip single flips**: If max is already at position 0, only need one flip
- **Early termination**: Stop when remaining array is sorted

</details>
"""

from typing import List


class Solution:
    def pancakeSort(self, arr: List[int]) -> List[int]:
        """
        Sort array using pancake flips.

        Args:
            arr: Array to sort

        Returns:
            List of k-values for pancake flips

        Time Complexity: O(n²)
        Space Complexity: O(n) for result
        """
        result = []
        n = len(arr)

        # Sort from largest to smallest
        for target_size in range(n, 1, -1):
            # Find index of current maximum value in unsorted portion
            max_idx = arr.index(target_size)

            # If already in correct position, skip
            if max_idx == target_size - 1:
                continue

            # If not at the beginning, flip to bring it to the top
            if max_idx != 0:
                self.flip(arr, max_idx + 1)
                result.append(max_idx + 1)

            # Flip to move it to its final position
            self.flip(arr, target_size)
            result.append(target_size)

        return result

    def flip(self, arr: List[int], k: int) -> None:
        """
        Reverse arr[0:k] in place.

        Args:
            arr: Array to flip (modified in-place)
            k: Flip first k elements
        """
        arr[:k] = arr[:k][::-1]

    def pancakeSortVerbose(self, arr: List[int]) -> List[int]:
        """
        Verbose version with detailed steps.

        Time Complexity: O(n²)
        Space Complexity: O(n)
        """
        result = []
        n = len(arr)

        for target_size in range(n, 1, -1):
            # Find position of largest element in unsorted portion
            max_val = target_size
            max_idx = -1

            for i in range(target_size):
                if arr[i] == max_val:
                    max_idx = i
                    break

            # Element already in correct position
            if max_idx == target_size - 1:
                continue

            # Bring element to front if not already there
            if max_idx > 0:
                # Reverse from 0 to max_idx
                left, right = 0, max_idx
                while left < right:
                    arr[left], arr[right] = arr[right], arr[left]
                    left += 1
                    right -= 1
                result.append(max_idx + 1)

            # Move element to final position
            # Reverse from 0 to target_size-1
            left, right = 0, target_size - 1
            while left < right:
                arr[left], arr[right] = arr[right], arr[left]
                left += 1
                right -= 1
            result.append(target_size)

        return result

    def pancakeSortOptimized(self, arr: List[int]) -> List[int]:
        """
        Optimized version that minimizes flips.

        Time Complexity: O(n²)
        Space Complexity: O(n)
        """
        result = []
        n = len(arr)

        for size in range(n, 1, -1):
            # Find index of size in current array
            max_idx = 0
            for i in range(size):
                if arr[i] == size:
                    max_idx = i
                    break

            # Already in correct position
            if max_idx == size - 1:
                continue

            # Only need one flip if already at position 0
            if max_idx == 0:
                arr[:size] = arr[:size][::-1]
                result.append(size)
            else:
                # Two flips: bring to top, then to position
                arr[:max_idx + 1] = arr[:max_idx + 1][::-1]
                result.append(max_idx + 1)

                arr[:size] = arr[:size][::-1]
                result.append(size)

        return result


def test_solution():
    """Test cases for Problem 969."""
    solution = Solution()

    # Test case 1: Example from problem
    arr1 = [3, 2, 4, 1]
    result1 = solution.pancakeSort(arr1.copy())
    # Apply flips and verify sorted
    for k in result1:
        arr1[:k] = arr1[:k][::-1]
    assert arr1 == sorted([3, 2, 4, 1]), f"Not sorted correctly: {arr1}"
    assert len(result1) <= 10 * 4, f"Too many flips: {len(result1)}"

    # Test case 2: Another example
    arr2 = [1, 2, 3]
    result2 = solution.pancakeSort(arr2.copy())
    for k in result2:
        arr2[:k] = arr2[:k][::-1]
    assert arr2 == [1, 2, 3], f"Not sorted correctly: {arr2}"

    # Test case 3: Reverse sorted
    arr3 = [5, 4, 3, 2, 1]
    result3 = solution.pancakeSort(arr3.copy())
    for k in result3:
        arr3[:k] = arr3[:k][::-1]
    assert arr3 == [1, 2, 3, 4, 5], f"Not sorted correctly: {arr3}"

    # Test case 4: Single element
    arr4 = [1]
    result4 = solution.pancakeSort(arr4.copy())
    assert arr4 == [1], f"Not sorted correctly: {arr4}"

    # Test case 5: Two elements
    arr5 = [2, 1]
    result5 = solution.pancakeSort(arr5.copy())
    for k in result5:
        arr5[:k] = arr5[:k][::-1]
    assert arr5 == [1, 2], f"Not sorted correctly: {arr5}"

    # Test case 6: Already sorted
    arr6 = [1, 2, 3, 4, 5]
    result6 = solution.pancakeSort(arr6.copy())
    for k in result6:
        arr6[:k] = arr6[:k][::-1]
    assert arr6 == [1, 2, 3, 4, 5], f"Not sorted correctly: {arr6}"

    # Test verbose version
    arr7 = [3, 2, 4, 1]
    result7 = solution.pancakeSortVerbose(arr7.copy())
    for k in result7:
        arr7[:k] = arr7[:k][::-1]
    assert arr7 == sorted([3, 2, 4, 1]), f"Not sorted correctly: {arr7}"

    # Test optimized version
    arr8 = [3, 2, 4, 1]
    result8 = solution.pancakeSortOptimized(arr8.copy())
    for k in result8:
        arr8[:k] = arr8[:k][::-1]
    assert arr8 == sorted([3, 2, 4, 1]), f"Not sorted correctly: {arr8}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("=== 969. Pancake Sorting ===")

    arr1 = [3, 2, 4, 1]
    print(f"Original: {arr1}")
    flips = solution.pancakeSort(arr1.copy())
    print(f"Flip sequence: {flips}")

    # Apply flips to show result
    test_arr = [3, 2, 4, 1]
    for k in flips:
        test_arr[:k] = test_arr[:k][::-1]
        print(f"After flip k={k}: {test_arr}")
    print(f"Final sorted: {test_arr}")

    print("\nAnother example:")
    arr2 = [1, 2, 3]
    print(f"Original: {arr2}")
    flips2 = solution.pancakeSort(arr2.copy())
    print(f"Flip sequence: {flips2}")
    if not flips2:
        print("Already sorted, no flips needed!")
