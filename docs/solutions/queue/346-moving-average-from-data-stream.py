"""
# Difficulty: Easy

Given a stream of integers and a window size, calculate the moving average of all integers in the sliding window.

Implement the `MovingAverage` class:
- `MovingAverage(int size)` Initializes the object with the window size `size`.
- `double next(int val)` Returns the moving average of the last `size` values of the stream.

Example:
Input: ["MovingAverage", "next", "next", "next", "next"]
       [[3], [1], [10], [3], [5]]
Output: [null, 1.0, 5.5, 4.66667, 6.0]

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>MovingAverage(3):</dd>
<dt>Output:</dt>
<dd>next(1): queue=[1], avg=1.0</dd>
<dt>Explanation:</dt>
<dd>Moving average of size 3 for [1,10,3,5] is [1,5.5,4.666..,6]</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
Use a queue to maintain the sliding window of values. When the window exceeds the size limit, remove the oldest element and add the new one.

### APPROACH:
1. **Initialize** a queue to store values and track the window size
2. **For each new value**:
   - Add `val` to the queue
   - If queue size exceeds `size`, remove the front element
   - Calculate and return the average of current elements

### WHY THIS WORKS:
- Queue maintains FIFO order for the sliding window
- We keep exactly `size` elements (or fewer initially)
- Sum and count give us the moving average efficiently

### EXAMPLE WALKTHROUGH:
```
MovingAverage(3):
next(1): queue=[1], avg=1.0
next(10): queue=[1,10], avg=5.5
next(3): queue=[1,10,3], avg=4.67
next(5): queue=[10,3,5], avg=6.0 (removed 1)
```

### TIME COMPLEXITY:
O(1) per operation

### SPACE COMPLEXITY:
O(size)

### EDGE CASES:
- **Window size 1**: Average equals current value
- **Fewer than size elements**: Average of elements so far
- **Exactly size elements**: Window is full, start sliding
- **More than size elements**: Remove oldest, add newest
- **Single element stream**: Return that element

</details>
"""


