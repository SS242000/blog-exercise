const { Blog ,Comment,User,BlogView} = require("../dbSchema");

exports.GetAllUserBlogs = async (req, res) => {
  try {
    const userId = req.params.id || null;

    if (!userId) {
      return res.status(404).json({ error: "User ID Not Provided" });
    }

    const userBlogs = await Blog.findAll({
      where: {
        user_id: userId,
      },
    });

    if (!userBlogs || userBlogs.length === 0) {
      return res.status(404).json({ error: "No Blogs Found for this User" });
    }

    const blogsData = userBlogs.map((blog) => blog.dataValues);

    return res.status(200).json(blogsData);
  } catch (error) {
    const errorMessage = error.message || "Unable to Fetch Blogs";
    return res.status(500).json({ error: errorMessage });
  }
};

exports.GetBlogDetails = async (req, res) => {
    const [blogId, userId] = req.params?.id?.split("+");
  
    try {
      // Fetch user's blogs based on blogId and userId
      const userBlogs = await Blog.findAll({
        where: {
          user_id: userId,
          id: blogId
        }
      });
  
      // Check if userBlogs exist
      if (!userBlogs || userBlogs.length === 0) {
        return res.status(404).json({ error: "No Blogs Found for this User" });
      }
  
      // Fetch comments for the specific blogId
      const blogComments = await Comment.findAll({
        where: {
          blog_id: blogId
        }
      });
  
      // Extract data values from userBlogs and commentsData
      const blogsData = userBlogs.map((blog) => blog.dataValues);
      const commentsData = blogComments.map((comment) => comment.dataValues);
  
      // Function to fetch username based on user_id
      async function fetchUsername(userId) {
        try {
          const user = await User.findByPk(userId); // Adjust according to your User model
          return user.username;
        } catch (error) {
          console.error(`Error fetching username for user_id ${userId}:`, error);
          return null;
        }
      }
  
      // Function to append usernames to commentsData
      async function appendUsernamesToComments(commentsData) {
        const updatedComments = await Promise.all(commentsData.map(async (comment) => {
          const username = await fetchUsername(comment.user_id);
          return { ...comment, username }; // Append username to the comment object
        }));
        return updatedComments;
      }
  
      // Append usernames to commentsData
      const updatedComments = await appendUsernamesToComments(commentsData);
  
      // Return combined data in response
      return res.status(200).json({ blogsData, commentsData:updatedComments });
  
    } catch (error) {
      const errorMessage = error.message || "Unable to Fetch Blogs";
      return res.status(500).json({ error: errorMessage });
    }
  };

exports.SaveUserComments  = async(req,res)=>{

    console.log(req.body)
    const {user_id=null,blogId=null,content=null}  = req.body || {}

    try{
            // const userData=await User.findOne({where:{user_id:user_id}})
            // const { dataValues = {} } = userData || {};
            const response = await Comment.create({user_id:user_id,blog_id:blogId,content:content})
            console.log(response)
            const blogComments = await Comment.findAll({
                where: {
                  blog_id: blogId
                }
              });
            
              const commentsData = blogComments.map((comment) => comment.dataValues);
  
              // Function to fetch username based on user_id
              async function fetchUsername(userId) {
                try {
                  const user = await User.findByPk(userId); // Adjust according to your User model
                  return user.username;
                } catch (error) {
                  console.error(`Error fetching username for user_id ${userId}:`, error);
                  return null;
                }
              }
          
              // Function to append usernames to commentsData
              async function appendUsernamesToComments(commentsData) {
                const updatedComments = await Promise.all(commentsData.map(async (comment) => {
                  const username = await fetchUsername(comment.user_id);
                  return { ...comment, username }; // Append username to the comment object
                }));
                return updatedComments;
              }
          
              // Append usernames to commentsData
              const updatedComments = await appendUsernamesToComments(commentsData);
          
              // Return combined data in response
              return res.status(200).json({  commentsData:updatedComments });

            
    }catch(error){
      const errorMessage = error.message || "Unable to Save User Comments";
      return res.status(500).json({ error: errorMessage });
    }
}

exports.GetBlogViews = async(req,res)=>{

  try{
    const [id=null,userId=null] = req.params?.id.split("+");

    const blog = await Blog.findByPk(id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    const response = await BlogView.create({
        blog_id: id,
        user_id: userId
    });

    res.status(200).json(blog);
  }catch(error){
    const errorMessage = error.message || "Unable to Get Blog Views";
    return res.status(500).json({error: errorMessage });
  }
}