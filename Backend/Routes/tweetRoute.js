import express from "express"
import { createTweet, deleteTweet, followingTweet, getAllTweets, likeOrDislike } from "../Controller/tweetController.js"
import { isAuthenticated } from "../config/Auth.js"

const tweetrouter = express.Router()

tweetrouter.post("/create",isAuthenticated, createTweet)
tweetrouter.delete("/delete/:id", isAuthenticated, deleteTweet)
tweetrouter.put("/like/:id",isAuthenticated, likeOrDislike)
tweetrouter.get("/alltweets/:id", isAuthenticated, getAllTweets)
tweetrouter.get("/followingtweet/:id", isAuthenticated, followingTweet)

export default tweetrouter