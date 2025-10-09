"""
# Difficulty: Medium

# 355. Design Twitter

Design a simplified version of Twitter where users can post tweets, follow/unfollow users, and see a news feed.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[input description]</dd>
<dt>Output:</dt>
<dd>[output description]</dd>
<dt>Explanation:</dt>
<dd>[explanation]</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
We need to design a system that efficiently handles:
1. Posting tweets with timestamps
2. Managing follow/unfollow relationships
3. Retrieving recent tweets from user and their followees

A combination of hash maps and heaps provides optimal performance.

### APPROACH:
1. **Data Structures**:
   - tweets: dict mapping userId -> list of (tweetId, timestamp) tuples
   - following: dict mapping userId -> set of followed userIds
   - timestamp: global counter for tweet ordering

2. **postTweet**: Add tweet with timestamp to user's tweet list

3. **getNewsFeed**:
   - Collect recent tweets from user and all followees
   - Use max heap to get 10 most recent tweets
   - Heap contains (negative_timestamp, tweetId) for max-heap behavior

4. **follow/unfollow**: Manage following set for each user

### WHY THIS WORKS:
- Hash maps provide O(1) lookup for user data
- Sets provide O(1) follow/unfollow operations
- Heap provides efficient retrieval of top k recent tweets
- Timestamp ensures correct ordering across all users

### EXAMPLE WALKTHROUGH:
```
postTweet(1, 5): user 1 posts tweet 5
follow(1, 2): user 1 follows user 2
postTweet(2, 6): user 2 posts tweet 6
getNewsFeed(1): returns [6, 5] (most recent from user 1 and followees)
unfollow(1, 2): user 1 unfollows user 2
getNewsFeed(1): returns [5] (only user 1's tweets)
```

### TIME COMPLEXITY:
- postTweet: O(1)
- getNewsFeed: O(N log k) where N is total tweets, k=10
- follow: O(1)
- unfollow: O(1)

### SPACE COMPLEXITY:
O(U + T) where U is users, T is total tweets

### EDGE CASES:
- User has no tweets
- User follows no one
- More than 10 tweets in feed
- User follows themselves

</details>
"""


