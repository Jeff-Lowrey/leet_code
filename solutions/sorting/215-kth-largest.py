"""
215. Kth Largest Element in an Array
Medium

Given an integer array `nums` and an integer k, return the kth largest element in the array.

Note that it is the kth largest element in the sorted order, not the kth distinct element.

Example:
Input: `nums` = [3,2,1,5,6,4], `k` = 2
Output: 5
"""

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
We don't need to sort the entire array. QuickSelect uses the partitioning idea from QuickSort but only recurses on one side, making it more efficient for finding a single element at a specific position.

### APPROACH (QUICKSELECT):
1. **Convert Problem**: kth largest = (n-k)th smallest
2. **Partition**: Use QuickSort's partition to place pivot in correct position
3. **Selective Recursion**: Only recurse on the side containing our target
4. **Random Pivot**: Improves average case performance

### WHY THIS WORKS:
After partitioning, we know the exact position of the pivot. If it's our target position, we're done. Otherwise, we know which side contains our target and can ignore the other half.

### TIME COMPLEXITY: O(n) average, O(n²) worst case
### SPACE COMPLEXITY: O(1)

### ALTERNATIVE APPROACHES:

**Heap Approach**:
- Maintain min-heap of size k
- Time: O(n log k), Space: O(k)
- Better when k << n

**Sorting Approach**:
- Sort entire array
- Time: O(n log n), Space: O(1)
- Simple but overkill

### EXAMPLE WALKTHROUGH:
Array: [3,2,1,5,6,4], k=2 (find 2nd largest)
- Convert: Find (6-2)=4th smallest
- Partition around pivot 4: [3,2,1,4,6,5]
- Pivot at index 3, target at index 4 → recurse right
- Continue until target found

### KEY INSIGHT:
QuickSelect eliminates half the search space each iteration on average, leading to linear time complexity.

</details>

import heapq
import random


class Solution:
    def findKthLargest(self, nums: list[int], k: int) -> int:
        """
        Approach: QuickSelect (Optimal)
        Time Complexity: O(n) average, O(n²) worst
        Space Complexity: O(1)
        """
        k = len(nums) - k  # Convert to kth smallest

        def quickselect(left, right):
            # Random pivot for better average performance
            pivot_index = random.randint(left, right)
            nums[pivot_index], nums[right] = nums[right], nums[pivot_index]

            # Partition
            pivot = nums[right]
            store_index = left

            for i in range(left, right):
                if nums[i] < pivot:
                    nums[i], nums[store_index] = nums[store_index], nums[i]
                    store_index += 1

            nums[store_index], nums[right] = nums[right], nums[store_index]

            # Check position
            if store_index == k:
                return nums[store_index]
            elif store_index < k:
                return quickselect(store_index + 1, right)
            else:
                return quickselect(left, store_index - 1)

        return quickselect(0, len(nums) - 1)

    def findKthLargestHeap(self, nums: list[int], k: int) -> int:
        """
        Approach: Min heap of size k
        Time Complexity: O(n log k)
        Space Complexity: O(k)
        """
        heap = nums[:k]
        heapq.heapify(heap)

        for num in nums[k:]:
            if num > heap[0]:
                heapq.heapreplace(heap, num)

        return heap[0]

    def findKthLargestSort(self, nums: list[int], k: int) -> int:
        """
        Approach: Sorting
        Time Complexity: O(n log n)
        Space Complexity: O(1)
        """
        nums.sort(reverse=True)
        return nums[k - 1]


"""
912. Sort an Array
Medium

Given an array of integers nums, sort the array in ascending order and return it.

You must solve the problem without using any built-in functions.

Example:
Input: nums = [5,2,3,1]
Output: [1,2,3,5]
"""

class SolutionSort:
    def sortArray(self, nums: list[int]) -> list[int]:
        """
        Approach: Merge Sort
        Time Complexity: O(n log n)
        Space Complexity: O(n)
        """
        def merge_sort(arr):
            if len(arr) <= 1:
                return arr

            mid = len(arr) // 2
            left = merge_sort(arr[:mid])
            right = merge_sort(arr[mid:])

            return merge(left, right)

        def merge(left, right):
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

        return merge_sort(nums)

    def sortArrayQuick(self, nums: list[int]) -> list[int]:
        """
        Approach: Quick Sort
        Time Complexity: O(n log n) average, O(n²) worst
        Space Complexity: O(log n)
        """
        def quick_sort(left, right):
            if left >= right:
                return

            # Random pivot
            pivot_index = random.randint(left, right)
            nums[pivot_index], nums[right] = nums[right], nums[pivot_index]

            # Partition
            pivot = nums[right]
            store_index = left

            for i in range(left, right):
                if nums[i] < pivot:
                    nums[i], nums[store_index] = nums[store_index], nums[i]
                    store_index += 1

            nums[store_index], nums[right] = nums[right], nums[store_index]

            # Recursive calls
            quick_sort(left, store_index - 1)
            quick_sort(store_index + 1, right)

        quick_sort(0, len(nums) - 1)
        return nums

    def sortArrayHeap(self, nums: list[int]) -> list[int]:
        """
        Approach: Heap Sort
        Time Complexity: O(n log n)
        Space Complexity: O(1)
        """
        def heapify(n, i):
            largest = i
            left = 2 * i + 1
            right = 2 * i + 2

            if left < n and nums[left] > nums[largest]:
                largest = left
            if right < n and nums[right] > nums[largest]:
                largest = right

            if largest != i:
                nums[i], nums[largest] = nums[largest], nums[i]
                heapify(n, largest)

        n = len(nums)

        # Build max heap
        for i in range(n // 2 - 1, -1, -1):
            heapify(n, i)

        # Extract elements
        for i in range(n - 1, 0, -1):
            nums[0], nums[i] = nums[i], nums[0]
            heapify(i, 0)

        return nums


"""
148. Sort List
Medium

Given the head of a linked list, return the list after sorting it in ascending order.

Example:
Input: head = [4,2,1,3]
Output: [1,2,3,4]
"""

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class SolutionSortList:
    def sortList(self, head: ListNode) -> ListNode:
        """
        Approach: Merge Sort
        Time Complexity: O(n log n)
        Space Complexity: O(log n) for recursion
        """
        if not head or not head.next:
            return head

        # Find middle using slow/fast pointers
        slow = head
        fast = head.next

        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next

        # Split the list
        mid = slow.next
        slow.next = None

        # Recursively sort both halves
        left = self.sortList(head)
        right = self.sortList(mid)

        # Merge sorted halves
        return self.merge(left, right)

    def merge(self, l1: ListNode, l2: ListNode) -> ListNode:
        dummy = ListNode(0)
        current = dummy

        while l1 and l2:
            if l1.val <= l2.val:
                current.next = l1
                l1 = l1.next
            else:
                current.next = l2
                l2 = l2.next
            current = current.next

        current.next = l1 if l1 else l2
        return dummy.next


# Test cases
if __name__ == "__main__":
    # Test Kth Largest
    solution = Solution()

    print("Kth Largest Element:")
    test_cases = [
        ([3, 2, 1, 5, 6, 4], 2),
        ([3, 2, 3, 1, 2, 4, 5, 5, 6], 4),
        ([1], 1)
    ]

    for nums, k in test_cases:
        result = solution.findKthLargest(nums.copy(), k)
        print(f"Array: {nums}, k={k}")
        print(f"Kth largest: {result}\n")

    # Test Sort Array
    solution_sort = SolutionSort()

    print("Sort Array:")
    arrays = [
        [5, 2, 3, 1],
        [5, 1, 1, 2, 0, 0],
        [-1, 0, 3, 5, 9, 12]
    ]

    for arr in arrays:
        result = solution_sort.sortArray(arr.copy())
        print(f"Original: {arr}")
        print(f"Sorted: {result}\n")
