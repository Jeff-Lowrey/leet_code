"""
# 355. Design Twitter
# Difficulty: Medium
Design a simplified version of Twitter where users can post tweets, follow/unfollow users, and see a news feed.

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

### TIME COMPLEXITY:
- postTweet: O(1)
- getNewsFeed: O(N log k) where N is total tweets, k=10
- follow: O(1)
- unfollow: O(1)

### SPACE COMPLEXITY: O(U + T) where U is users, T is total tweets

### EXAMPLE WALKTHROUGH:
```
postTweet(1, 5): user 1 posts tweet 5
follow(1, 2): user 1 follows user 2
postTweet(2, 6): user 2 posts tweet 6
getNewsFeed(1): returns [6, 5] (most recent from user 1 and followees)
unfollow(1, 2): user 1 unfollows user 2
getNewsFeed(1): returns [5] (only user 1's tweets)
```

### EDGE CASES:
- User has no tweets
- User follows no one
- More than 10 tweets in feed
- User follows themselves

</details>

<details>
<summary><b>💡 APPROACH</b></summary>

The approach uses hash maps for user data and a heap for efficient feed retrieval.

### Algorithm Steps:
1. Store tweets with timestamps per user
2. Maintain following relationships in sets
3. Use heap to merge and retrieve top 10 recent tweets

</details>
"""

import heapq
from collections import defaultdict
from typing import List

class Twitter:
    """
    Simplified Twitter system with posting, following, and news feed.
    """

    def __init__(self):
        """
        Initialize the Twitter system.

        Time Complexity: O(1)
        Space Complexity: O(1)
        """
        self.timestamp = 0
        # Map userId -> list of (timestamp, tweetId)
        self.tweets = defaultdict(list)
        # Map userId -> set of followee userIds
        self.following = defaultdict(set)

    def postTweet(self, userId: int, tweetId: int) -> None:
        """
        Post a new tweet.

        Args:
            userId: ID of user posting the tweet
            tweetId: ID of the tweet

        Time Complexity: O(1)
        Space Complexity: O(1)
        """
        self.tweets[userId].append((self.timestamp, tweetId))
        self.timestamp += 1

    def getNewsFeed(self, userId: int) -> List[int]:
        """
        Retrieve the 10 most recent tweet IDs in the user's news feed.

        News feed includes tweets from the user and all users they follow.

        Args:
            userId: ID of user requesting news feed

        Returns:
            List of up to 10 most recent tweet IDs

        Time Complexity: O(N log k) where N is total tweets, k=10
        Space Complexity: O(N) for collecting tweets
        """
        # Use max heap (negate timestamps for max behavior)
        heap = []

        # Add user's own tweets
        for timestamp, tweet_id in self.tweets[userId]:
            heapq.heappush(heap, (-timestamp, tweet_id))

        # Add tweets from followees
        for followee_id in self.following[userId]:
            for timestamp, tweet_id in self.tweets[followee_id]:
                heapq.heappush(heap, (-timestamp, tweet_id))

        # Extract top 10 most recent tweets
        result = []
        for _ in range(min(10, len(heap))):
            _, tweet_id = heapq.heappop(heap)
            result.append(tweet_id)

        return result

    def follow(self, followerId: int, followeeId: int) -> None:
        """
        User followerId follows user followeeId.

        Args:
            followerId: ID of follower
            followeeId: ID of followee

        Time Complexity: O(1)
        Space Complexity: O(1)
        """
        # User should not follow themselves
        if followerId != followeeId:
            self.following[followerId].add(followeeId)

    def unfollow(self, followerId: int, followeeId: int) -> None:
        """
        User followerId unfollows user followeeId.

        Args:
            followerId: ID of follower
            followeeId: ID of followee

        Time Complexity: O(1)
        Space Complexity: O(1)
        """
        self.following[followerId].discard(followeeId)

def test_solution():
    """
    Test cases for Twitter.
    """
    # Test case 1: Basic functionality
    twitter1 = Twitter()
    twitter1.postTweet(1, 5)
    feed1 = twitter1.getNewsFeed(1)
    assert feed1 == [5], f"Expected [5], got {feed1}"

    twitter1.follow(1, 2)
    twitter1.postTweet(2, 6)
    feed2 = twitter1.getNewsFeed(1)
    assert feed2 == [6, 5], f"Expected [6, 5], got {feed2}"

    twitter1.unfollow(1, 2)
    feed3 = twitter1.getNewsFeed(1)
    assert feed3 == [5], f"Expected [5], got {feed3}"

    # Test case 2: Multiple tweets and followers
    twitter2 = Twitter()
    twitter2.postTweet(1, 1)
    twitter2.postTweet(1, 2)
    twitter2.postTweet(1, 3)
    twitter2.follow(2, 1)
    feed4 = twitter2.getNewsFeed(2)
    assert feed4 == [3, 2, 1], f"Expected [3, 2, 1], got {feed4}"

    # Test case 3: More than 10 tweets
    twitter3 = Twitter()
    for i in range(15):
        twitter3.postTweet(1, i)
    feed5 = twitter3.getNewsFeed(1)
    assert len(feed5) == 10, f"Expected 10 tweets, got {len(feed5)}"
    assert feed5 == list(range(14, 4, -1)), f"Expected [14, 13, ..., 5], got {feed5}"

    # Test case 4: Multiple users
    twitter4 = Twitter()
    twitter4.postTweet(1, 5)
    twitter4.postTweet(2, 3)
    twitter4.postTweet(1, 101)
    twitter4.follow(2, 1)
    twitter4.postTweet(2, 13)
    feed6 = twitter4.getNewsFeed(2)
    assert feed6 == [13, 101, 3, 5], f"Expected [13, 101, 3, 5], got {feed6}"

    # Test case 5: Self-follow prevention
    twitter5 = Twitter()
    twitter5.postTweet(1, 10)
    twitter5.follow(1, 1)  # Should be ignored
    feed7 = twitter5.getNewsFeed(1)
    assert feed7 == [10], f"Expected [10], got {feed7}"

    # Test case 6: Unfollow non-followed user
    twitter6 = Twitter()
    twitter6.postTweet(1, 1)
    twitter6.unfollow(1, 2)  # Should not crash
    feed8 = twitter6.getNewsFeed(1)
    assert feed8 == [1], f"Expected [1], got {feed8}"

    print("All test cases passed!")

if __name__ == "__main__":
    test_solution()

    # Example usage
    print("Twitter demonstration:")
    twitter = Twitter()

    twitter.postTweet(1, 5)
    print(f"User 1's feed: {twitter.getNewsFeed(1)}")  # [5]

    twitter.follow(1, 2)
    twitter.postTweet(2, 6)
    print(f"User 1's feed: {twitter.getNewsFeed(1)}")  # [6, 5]

    twitter.unfollow(1, 2)
    print(f"User 1's feed: {twitter.getNewsFeed(1)}")  # [5]
