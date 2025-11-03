"""
### INTUITION:
The key insight is that use a queue to maintain the sliding window of values. When the window exceeds the size limit, remove the oldest element and add the new one.

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
Input:
```
MovingAverage(3):
```

next(1): queue=[1], avg=1.0
next(10): queue=[1,10], avg=5.5
next(3): queue=[1,10,3], avg=4.67
next(5): queue=[10,3,5], avg=6.0 (removed 1)

Output:
```
[Expected output]
```

### TIME COMPLEXITY:
**O(1)** per operation - constant time

### SPACE COMPLEXITY:
**O(size)**

- Based on auxiliary data structures

### EDGE CASES:
- **Window size 1**: Average equals current value
- **Fewer than size elements**: Average of elements so far
- **Exactly size elements**: Window is full, start sliding
- **More than size elements**: Remove oldest, add newest
- **Single element stream**: Return that element

"""
