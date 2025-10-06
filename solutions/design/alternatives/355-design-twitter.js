/**
 * 355. Design Twitter
 * Medium
 *
 * Twitter System Design Implementation This implementation includes core Twitter functionalities like: - Posting tweets - Following/unfollowing users - Getting news feed (recent tweets from followed users)
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Design Twitter is to understand the core problem pattern
 * and apply the most efficient algorithmic approach.
 *
 * ### APPROACH:
 * 1. Analyze the problem requirements
 * 2. Choose the optimal data structure
 * 3. Implement the solution step by step
 * 4. Handle edge cases appropriately
 *
 * ### WHY THIS WORKS:
 * This approach works because it leverages the fundamental properties of the problem
 * to achieve an efficient solution.
 *
 * ### EXAMPLE WALKTHROUGH:
 * For a typical input, the algorithm processes the data systematically
 * to produce the expected output.
 *
 * </details>
 */

/**
 * Twitter System Design Implementation
 * This implementation includes core Twitter functionalities like:
 * - Posting tweets
 * - Following/unfollowing users
 * - Getting news feed (recent tweets from followed users)
 */

class Twitter {
    constructor() {
        // Initialize data structures
        this.tweets = [];         // Store all tweets
        this.following = {};      // Store following relationships
        this.tweetCounter = 0;    // Used to maintain tweet order
    }

    /**
     * Posts a new tweet by a user
     * @param {number} userId - The ID of the user posting the tweet
     * @param {number} tweetId - The ID of the tweet being posted
     */
    postTweet(userId, tweetId) {
        this.tweets.push({
            userId: userId,
            tweetId: tweetId,
            timestamp: this.tweetCounter++
        });
    }

    /**
     * Retrieves the 10 most recent tweets in the user's news feed
     * Includes tweets from the user and all users they follow
     * @param {number} userId - The ID of the user requesting their feed
     * @return {number[]} - Array of tweet IDs in the user's feed
     */
    getNewsFeed(userId) {
        // Get users being followed
        const followedUsers = this.following[userId] || new Set();
        
        // Filter and sort relevant tweets
        const userFeed = this.tweets
            .filter(tweet => 
                tweet.userId === userId || followedUsers.has(tweet.userId)
            )
            .sort((a, b) => b.timestamp - a.timestamp)
            .slice(0, 10)
            .map(tweet => tweet.tweetId);

        return userFeed;
    }

    /**
     * Makes followerId follow followeeId
     * @param {number} followerId - The ID of the user following
     * @param {number} followeeId - The ID of the user being followed
     */
    follow(followerId, followeeId) {
        if (!this.following[followerId]) {
            this.following[followerId] = new Set();
        }
        this.following[followerId].add(followeeId);
    }

    /**
     * Makes followerId unfollow followeeId
     * @param {number} followerId - The ID of the user unfollowing
     * @param {number} followeeId - The ID of the user being unfollowed
     */
    unfollow(followerId, followeeId) {
        if (this.following[followerId]) {
            this.following[followerId].delete(followeeId);
        }
    }
}

/**
 * Example usage:
 */
function runExample() {
    const twitter = new Twitter();

    // User 1 posts a tweet
    twitter.postTweet(1, 5);  // User 1 posts tweet with ID 5

    // User 1's news feed should show tweet 5
    console.log(twitter.getNewsFeed(1));  // Output: [5]

    // User 2 follows user 1
    twitter.follow(2, 1);

    // User 2's news feed should show tweet 5
    console.log(twitter.getNewsFeed(2));  // Output: [5]

    // User 2 unfollows user 1
    twitter.unfollow(2, 1);

    // User 2's news feed should be empty
    console.log(twitter.getNewsFeed(2));  // Output: []
}

// Export the Twitter class for use in other files
module.exports = Twitter;

// Uncomment to run the example
// runExample();