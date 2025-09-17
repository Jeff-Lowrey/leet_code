"""
380. Insert Delete GetRandom O(1)
Medium

Implement the RandomizedSet class:
- RandomizedSet() Initializes the RandomizedSet object.
- bool insert(int val) Inserts an item val into the set if not present.
  Returns true if the item was not present, false otherwise.
- bool remove(int val) Removes an item val from the set if present.
  Returns true if the item was present, false otherwise.
- int getRandom() Returns a random element from the current set of elements.
  Each element must have the same probability of being returned.

You must implement the functions of the class such that each function works in
average O(1) time complexity.

Example:
Input:
["RandomizedSet", "insert", "remove", "insert", "getRandom", "remove", "insert", "getRandom"]
[[], [1], [2], [2], [], [1], [2], []]
Output:
[null, true, false, true, 2, true, false, 2]
"""

import random

class RandomizedSet:
    """
    Approach: Hash map + dynamic array
    Time Complexity: O(1) average for all operations
    Space Complexity: O(n)
    """

    def __init__(self):
        self.nums = []
        self.indices = {}  # val -> index in nums

    def insert(self, val: int) -> bool:
        if val in self.indices:
            return False

        self.indices[val] = len(self.nums)
        self.nums.append(val)
        return True

    def remove(self, val: int) -> bool:
        if val not in self.indices:
            return False

        # Get index of element to remove
        index = self.indices[val]
        last_val = self.nums[-1]

        # Move last element to the position of element to remove
        self.nums[index] = last_val
        self.indices[last_val] = index

        # Remove the last element
        self.nums.pop()
        del self.indices[val]

        return True

    def getRandom(self) -> int:
        return random.choice(self.nums)


"""
381. Insert Delete GetRandom O(1) - Duplicates allowed
Hard

Design a data structure that supports all following operations in average O(1) time.

Note: Duplicate elements are allowed.
- insert(val): Inserts an item val to the collection.
- remove(val): Removes an item val from the collection if present.
- getRandom: Returns a random element from current collection of elements.

Example:
Input:
["RandomizedCollection", "insert", "insert", "insert", "getRandom", "remove", "getRandom"]
[[], [1], [1], [2], [], [1], []]
Output:
[null, true, false, true, 2, true, 1]
"""

from collections import defaultdict

class RandomizedCollection:
    """
    Approach: Hash map with set of indices + array
    Time Complexity: O(1) average for all operations
    Space Complexity: O(n)
    """

    def __init__(self):
        self.nums = []
        self.indices = defaultdict(set)  # val -> set of indices

    def insert(self, val: int) -> bool:
        self.indices[val].add(len(self.nums))
        self.nums.append(val)
        return len(self.indices[val]) == 1

    def remove(self, val: int) -> bool:
        if not self.indices[val]:
            return False

        # Get an index of val (any one)
        remove_index = self.indices[val].pop()
        last_val = self.nums[-1]

        # Replace with last element
        self.nums[remove_index] = last_val

        # Update indices
        if self.indices[last_val]:
            self.indices[last_val].add(remove_index)
            self.indices[last_val].discard(len(self.nums) - 1)

        self.nums.pop()
        return True

    def getRandom(self) -> int:
        return random.choice(self.nums)


"""
355. Design Twitter
Medium

Design a simplified version of Twitter where users can post tweets,
follow/unfollow another user, and see the 10 most recent tweets in the
user's news feed.

Implement the Twitter class:
- Twitter() Initializes your twitter object.
- void postTweet(int userId, int tweetId) Composes a new tweet with ID tweetId by userId.
- List<Integer> getNewsFeed(int userId) Retrieves the 10 most recent tweet IDs
  in the user's news feed.
- void follow(int followerId, int followeeId) The user with ID followerId follows followeeId.
- void unfollow(int followerId, int followeeId) The user with ID followerId unfollows followeeId.
"""

import heapq
from collections import defaultdict, deque

class Twitter:
    """
    Time Complexity: O(1) for post, follow, unfollow; O(n log k) for getNewsFeed
    Space Complexity: O(users * tweets)
    """

    def __init__(self):
        self.time = 0
        self.tweets = defaultdict(deque)  # userId -> deque of (time, tweetId)
        self.following = defaultdict(set)  # userId -> set of followeeIds

    def postTweet(self, userId: int, tweetId: int) -> None:
        self.tweets[userId].appendleft((self.time, tweetId))
        if len(self.tweets[userId]) > 10:
            self.tweets[userId].pop()
        self.time += 1

    def getNewsFeed(self, userId: int) -> list[int]:
        # Get tweets from user and all followees
        heap = []

        # User's own tweets
        for tweet in self.tweets[userId]:
            heapq.heappush(heap, (-tweet[0], tweet[1]))

        # Followees' tweets
        for followeeId in self.following[userId]:
            for tweet in self.tweets[followeeId]:
                heapq.heappush(heap, (-tweet[0], tweet[1]))

        # Get top 10
        result = []
        while heap and len(result) < 10:
            result.append(heapq.heappop(heap)[1])

        return result

    def follow(self, followerId: int, followeeId: int) -> None:
        if followerId != followeeId:
            self.following[followerId].add(followeeId)

    def unfollow(self, followerId: int, followeeId: int) -> None:
        self.following[followerId].discard(followeeId)


# Test cases
if __name__ == "__main__":
    # Test RandomizedSet
    print("Testing RandomizedSet:")
    random_set = RandomizedSet()
    operations = [
        ("insert", 1),
        ("remove", 2),
        ("insert", 2),
        ("getRandom",),
        ("remove", 1),
        ("insert", 2),
        ("getRandom",)
    ]

    for op in operations:
        if op[0] == "insert":
            result = random_set.insert(op[1])
            print(f"Insert {op[1]}: {result}")
        elif op[0] == "remove":
            result = random_set.remove(op[1])
            print(f"Remove {op[1]}: {result}")
        else:  # getRandom
            result = random_set.getRandom()
            print(f"Random: {result}")

    print("\n" + "="*50 + "\n")

    # Test RandomizedCollection
    print("Testing RandomizedCollection:")
    random_collection = RandomizedCollection()
    collection_ops = [
        ("insert", 1),
        ("insert", 1),
        ("insert", 2),
        ("getRandom",),
        ("remove", 1),
        ("getRandom",)
    ]

    for op in collection_ops:
        if op[0] == "insert":
            result = random_collection.insert(op[1])
            print(f"Insert {op[1]}: {result}")
        elif op[0] == "remove":
            result = random_collection.remove(op[1])
            print(f"Remove {op[1]}: {result}")
        else:  # getRandom
            result = random_collection.getRandom()
            print(f"Random: {result}")

    print("\n" + "="*50 + "\n")

    # Test Twitter
    print("Testing Twitter:")
    twitter = Twitter()
    twitter_ops = [
        ("postTweet", 1, 5),
        ("getNewsFeed", 1),
        ("follow", 1, 2),
        ("postTweet", 2, 6),
        ("getNewsFeed", 1),
        ("unfollow", 1, 2),
        ("getNewsFeed", 1)
    ]

    for op in twitter_ops:
        if op[0] == "postTweet":
            twitter.postTweet(op[1], op[2])
            print(f"User {op[1]} posted tweet {op[2]}")
        elif op[0] == "getNewsFeed":
            result = twitter.getNewsFeed(op[1])
            print(f"User {op[1]} feed: {result}")
        elif op[0] == "follow":
            twitter.follow(op[1], op[2])
            print(f"User {op[1]} followed user {op[2]}")
        else:  # unfollow
            twitter.unfollow(op[1], op[2])
            print(f"User {op[1]} unfollowed user {op[2]}")
