"""
# 912. Sort An Array
**Medium**

Given an array of integers nums, sort the array in ascending order and return it.

You must solve the problem without using any built-in functions in O(nlog(n)) time complexity
and with the smallest space complexity possible.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
Implement various sorting algorithms from scratch. Quicksort, Mergesort, and Heapsort all
achieve O(n log n) time. This problem tests understanding of fundamental sorting algorithms.

### APPROACH:
**Merge Sort:**
1. Divide array into two halves recursively
2. Sort each half recursively
3. Merge sorted halves back together

**Quick Sort:**
1. Choose pivot element
2. Partition array around pivot
3. Recursively sort left and right partitions

**Heap Sort:**
1. Build max heap from array
2. Repeatedly extract maximum and rebuild heap

### WHY THIS WORKS:
- **Merge Sort**: Divide-and-conquer with guaranteed O(n log n), stable, needs O(n) space
- **Quick Sort**: Average O(n log n), in-place, but O(n²) worst case
- **Heap Sort**: Guaranteed O(n log n), in-place, not stable

### TIME COMPLEXITY: O(n log n)
All three algorithms achieve this complexity

### SPACE COMPLEXITY:
- Merge Sort: O(n) for merge array
- Quick Sort: O(log n) for recursion stack
- Heap Sort: O(1) in-place

### EXAMPLE WALKTHROUGH:
```
Input: nums = [5,2,3,1]

Merge Sort:
[5,2,3,1]
  /    \\
[5,2]  [3,1]
 / \\    / \\
[5][2] [3][1]
 \\ /    \\ /
[2,5]  [1,3]
  \\    /
[1,2,3,5]

Quick Sort:
[5,2,3,1] pivot=1
[1] [5,2,3]
    [2,3,5] pivot=3
    [2,3] [5]
[1,2,3,5]

Output: [1,2,3,5]
```

### EDGE CASES:
- Empty array
- Single element
- All elements equal
- Already sorted
- Reverse sorted
- Large arrays (up to 50,000 elements)

### OPTIMIZATIONS:
- **Randomized quicksort**: Avoid worst case O(n²)
- **3-way quicksort**: Handle duplicates efficiently
- **Hybrid approaches**: Use insertion sort for small subarrays
- **Iterative implementations**: Reduce stack space

</details>
"""

import random


class Solution:
    def sortArray(self, nums: list[int]) -> list[int]:
        """
        Sort array using merge sort.

        Args:
            nums: Array to sort

        Returns:
            Sorted array

        Time Complexity: O(n log n)
        Space Complexity: O(n) for merge array
        """
        if len(nums) <= 1:
            return nums

        # Divide
        mid = len(nums) // 2
        left = self.sortArray(nums[:mid])
        right = self.sortArray(nums[mid:])

        # Conquer (merge)
        return self.merge(left, right)

    def merge(self, left: list[int], right: list[int]) -> list[int]:
        """Merge two sorted arrays."""
        result = []
        i = j = 0

        while i < len(left) and j < len(right):
            if left[i] <= right[j]:
                result.append(left[i])
                i += 1
            else:
                result.append(right[j])
                j += 1

        result.extend(left[i:])
        result.extend(right[j:])
        return result

    def sortArrayQuickSort(self, nums: list[int]) -> list[int]:
        """
        Sort array using randomized quicksort.

        Time Complexity: O(n log n) average, O(n²) worst case
        Space Complexity: O(log n) for recursion stack
        """

        def quicksort(arr: list[int], low: int, high: int) -> None:
            if low < high:
                # Partition and get pivot index
                pi = partition(arr, low, high)

                # Recursively sort left and right partitions
                quicksort(arr, low, pi - 1)
                quicksort(arr, pi + 1, high)

        def partition(arr: list[int], low: int, high: int) -> int:
            # Randomized pivot to avoid worst case
            pivot_idx = random.randint(low, high)
            arr[pivot_idx], arr[high] = arr[high], arr[pivot_idx]

            pivot = arr[high]
            i = low - 1

            for j in range(low, high):
                if arr[j] <= pivot:
                    i += 1
                    arr[i], arr[j] = arr[j], arr[i]

            arr[i + 1], arr[high] = arr[high], arr[i + 1]
            return i + 1

        quicksort(nums, 0, len(nums) - 1)
        return nums

    def sortArrayHeapSort(self, nums: list[int]) -> list[int]:
        """
        Sort array using heap sort.

        Time Complexity: O(n log n)
        Space Complexity: O(1) - in-place
        """

        def heapify(arr: list[int], n: int, i: int) -> None:
            """Maintain max heap property at index i."""
            largest = i
            left = 2 * i + 1
            right = 2 * i + 2

            if left < n and arr[left] > arr[largest]:
                largest = left

            if right < n and arr[right] > arr[largest]:
                largest = right

            if largest != i:
                arr[i], arr[largest] = arr[largest], arr[i]
                heapify(arr, n, largest)

        n = len(nums)

        # Build max heap
        for i in range(n // 2 - 1, -1, -1):
            heapify(nums, n, i)

        # Extract elements from heap one by one
        for i in range(n - 1, 0, -1):
            nums[0], nums[i] = nums[i], nums[0]  # Move max to end
            heapify(nums, i, 0)  # Heapify reduced heap

        return nums

    def sortArrayMergeSortInPlace(self, nums: list[int]) -> list[int]:
        """
        Sort using in-place merge sort (modifies original array).

        Time Complexity: O(n log n)
        Space Complexity: O(log n) for recursion
        """

        def merge_sort_helper(left: int, right: int) -> None:
            if left >= right:
                return

            mid = (left + right) // 2
            merge_sort_helper(left, mid)
            merge_sort_helper(mid + 1, right)
            merge_inplace(left, mid, right)

        def merge_inplace(left: int, mid: int, right: int) -> None:
            """Merge two sorted subarrays in-place."""
            # Create temporary arrays
            left_arr = nums[left : mid + 1]
            right_arr = nums[mid + 1 : right + 1]

            i = j = 0
            k = left

            while i < len(left_arr) and j < len(right_arr):
                if left_arr[i] <= right_arr[j]:
                    nums[k] = left_arr[i]
                    i += 1
                else:
                    nums[k] = right_arr[j]
                    j += 1
                k += 1

            while i < len(left_arr):
                nums[k] = left_arr[i]
                i += 1
                k += 1

            while j < len(right_arr):
                nums[k] = right_arr[j]
                j += 1
                k += 1

        merge_sort_helper(0, len(nums) - 1)
        return nums


def test_solution():
    """Test cases for Problem 912."""
    solution = Solution()

    # Test case 1: Example from problem
    result1 = solution.sortArray([5, 2, 3, 1])
    expected1 = [1, 2, 3, 5]
    assert result1 == expected1, f"Expected {expected1}, got {result1}"

    # Test case 2: Another example
    result2 = solution.sortArray([5, 1, 1, 2, 0, 0])
    expected2 = [0, 0, 1, 1, 2, 5]
    assert result2 == expected2, f"Expected {expected2}, got {result2}"

    # Test case 3: Already sorted
    result3 = solution.sortArray([1, 2, 3, 4, 5])
    expected3 = [1, 2, 3, 4, 5]
    assert result3 == expected3, f"Expected {expected3}, got {result3}"

    # Test case 4: Reverse sorted
    result4 = solution.sortArray([5, 4, 3, 2, 1])
    expected4 = [1, 2, 3, 4, 5]
    assert result4 == expected4, f"Expected {expected4}, got {result4}"

    # Test case 5: Single element
    result5 = solution.sortArray([1])
    expected5 = [1]
    assert result5 == expected5, f"Expected {expected5}, got {result5}"

    # Test case 6: Empty array
    result6 = solution.sortArray([])
    expected6 = []
    assert result6 == expected6, f"Expected {expected6}, got {result6}"

    # Test case 7: All equal
    result7 = solution.sortArray([3, 3, 3, 3])
    expected7 = [3, 3, 3, 3]
    assert result7 == expected7, f"Expected {expected7}, got {result7}"

    # Test quicksort
    result8 = solution.sortArrayQuickSort([5, 2, 3, 1])
    expected8 = [1, 2, 3, 5]
    assert result8 == expected8, f"Expected {expected8}, got {result8}"

    # Test heapsort
    result9 = solution.sortArrayHeapSort([5, 2, 3, 1])
    expected9 = [1, 2, 3, 5]
    assert result9 == expected9, f"Expected {expected9}, got {result9}"

    # Test in-place merge sort
    result10 = solution.sortArrayMergeSortInPlace([5, 2, 3, 1])
    expected10 = [1, 2, 3, 5]
    assert result10 == expected10, f"Expected {expected10}, got {result10}"

    # Test with negative numbers
    result11 = solution.sortArray([-4, 0, 7, 4, 9, -5, -1, 0, -7, -1])
    expected11 = [-7, -5, -4, -1, -1, 0, 0, 4, 7, 9]
    assert result11 == expected11, f"Expected {expected11}, got {result11}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("=== 912. Sort An Array ===")
    print(f"Merge Sort: {solution.sortArray([5, 2, 3, 1])}")
    print(f"Quick Sort: {solution.sortArrayQuickSort([5, 1, 1, 2, 0, 0])}")
    print(f"Heap Sort: {solution.sortArrayHeapSort([5, 4, 3, 2, 1])}")
    print(f"In-place Merge Sort: {solution.sortArrayMergeSortInPlace([9, 8, 7, 6, 5])}")
