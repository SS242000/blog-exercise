const express = require("express")
const router = express.Router()
const verifyToken = require("../Middleware/middleware")
const {ValidateUser} = require("../Controller/login")
const { GetAllUserBlogs, GetBlogDetails, SaveUserComments,GetBlogViews } = require("../Controller/blogs")

router.post("/login",ValidateUser)
router.get("/get-user-blogs/:id",verifyToken,GetAllUserBlogs);
router.get("/get-blog-details/:id",verifyToken,GetBlogDetails);
router.post("/post-user-comments",verifyToken,SaveUserComments);
router.get("/blog-view/:id",verifyToken,GetBlogViews)

module.exports = router