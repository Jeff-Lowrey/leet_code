"""
# Difficulty: Hard

# 295. Find Median from Data Stream

The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value, and the median is the mean of the two middle values.

Implement the MedianFinder class:
- MedianFinder() initializes the MedianFinder object.
- void addNum(int num) adds the integer num from the data stream to the data structure.
- double findMedian() returns the median of all elements so far.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>addNum(1):</dd>
<dt>Output:</dt>
<dd>left=[1], right=[]</dd>
<dt>Explanation:</dt>
<dd>Median after adding [1,2] is 1.5, after [1,2,3] is 2</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
Use two heaps to divide numbers into two halves: max-heap for smaller half, min-heap for larger half. The median is always at the top of one or both heaps.

### APPROACH:
1. **Two heaps**: max-heap (left half), min-heap (right half)
2. **Balance heaps**: Keep sizes equal or left heap has 1 more
3. **Add number**:
   - Add to left heap, then move largest to right heap
   - If right > left, move smallest from right to left
4. **Find median**:
   - If sizes equal: average of both tops
   - Else: top of left heap

### WHY THIS WORKS:
- Max-heap stores smaller half (can get largest quickly)
- Min-heap stores larger half (can get smallest quickly)
- Tops of heaps are always the middle elements
- Balancing ensures O(1) median access

### EXAMPLE WALKTHROUGH:
```
addNum(1):
  left=[1], right=[]
  median = 1

addNum(2):
  left=[1], right=[2]
  median = (1+2)/2 = 1.5

addNum(3):
  left=[2,1], right=[3]
  median = 2 (top of left heap)

addNum(4):
  left=[2,1], right=[3,4]
  median = (2+3)/2 = 2.5
```

### TIME COMPLEXITY:
- addNum(): O(log n) - heap operations
- findMedian(): O(1) - just access heap tops

### SPACE COMPLEXITY:
O(n)
Store all n numbers across two heaps

### EDGE CASES:
- Single element
- Two elements
- Negative numbers
- Duplicate values
- Large data stream

</details>
"""


