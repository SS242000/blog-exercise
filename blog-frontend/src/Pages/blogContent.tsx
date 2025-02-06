import { useLocation, useNavigate } from "react-router-dom";
import ApiCaller from "../Services/apiConfig";
import Comments from "./comments";
import { useEffect, useState } from "react";
import Navbar from "./navbars";

const BlogContent = () => {
  const [blog, setBlogData] = useState(null);
  const [commentsData, setCommentsData] = useState([]);
  const [commentText, setCommentText] = useState("");
  const navigate = useNavigate();
  const sessionToken = sessionStorage.getItem("token");
  useEffect(() => {
    if (!sessionToken || sessionToken === null) {
      navigate("/");
    }
  }, [sessionToken, navigate]);

  const ImageList = {
    "My First Blog":
      "https://img.freepik.com/free-vector/blogging-fun-content-creation-online-streaming-video-blog-young-girl-making-selfie-social-network-sharing-feedback-self-promotion-strategy-vector-isolated-concept-metaphor-illustration_335657-855.jpg?t=st=1738498393~exp=1738501993~hmac=ba5edddfed8ff2bf256c18f01300c20dfe84f21fc66dde2a5175b3001031be30&w=740",
    "How to Build a Simple Web App with Flask":
      "https://img.freepik.com/free-vector/laptop-with-program-code-isometric-icon-software-development-programming-applications-dark-neon_39422-971.jpg?t=st=1738498162~exp=1738501762~hmac=8d023ccc244c55041e46b3c45175202a1c71379f1101ce9ee24b2190887d861b&w=996",
    "Introduction to SQL for Beginners":
      "https://img.freepik.com/free-vector/hand-drawn-flat-design-sql-illustration_23-2149243381.jpg?t=st=1738498559~exp=1738502159~hmac=ca2402bada09feec8d42a2f91fead1bbcbbd3d0940e9900c83e2a391ee0ef6a9&w=996",
    "Why Functional Programming Matters":
      "https://media.licdn.com/dms/image/v2/D4D12AQFSR5LAIDX8bg/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1697053292143?e=2147483647&v=beta&t=p4_tUevZrgAkG8cYJT93tHkknOA5Qb8mdq4SUg5HknE",
    "Setting Up a Personal Blog with GitHub Pages":
      "https://miro.medium.com/v2/resize:fit:1200/1*HohTRnjW5zr0jvWiFC-pRw.jpeg",
    "Version Control with Git and GitHub":
      "https://miro.medium.com/v2/resize:fit:1400/1*mtsk3fQ_BRemFidhkel3dA.png",
    "How to Optimize SQL Queries":
      "https://img.freepik.com/premium-vector/abstract-technology-sql-illustration_23-2149223762.jpg?w=740",
    "Building Scalable Web Applications":
      "https://miro.medium.com/v2/resize:fit:1358/1*on2HiLQkWjCbaSspqvdKHA.jpeg",
    "Tech Trends in 2025":
      "https://img.freepik.com/free-vector/man-using-virtual-reality-headset_23-2148788412.jpg?t=st=1738607105~exp=1738610705~hmac=adc3938708587fb6df900c28372eccf65fffca6dea1b353321a4d2f96b946123&w=740",
    "Exploring Python for Data Science":
      "https://img.freepik.com/free-vector/data-analysis-concept-illustration_114360-8013.jpg?ga=GA1.1.480488536.1738497612&semt=ais_hybrid",
    "10 Tips for Writing Better Code":
      "https://img.freepik.com/premium-vector/programming-coding-girl-illustration_250257-989.jpg?ga=GA1.1.480488536.1738497612&semt=ais_hybrid",
    "Understanding Machine Learning Basics":
      "https://img.freepik.com/premium-vector/flat-design-learn-from-home-illustration_23-2149245117.jpg?ga=GA1.1.480488536.1738497612&semt=ais_hybrid",
    "Advanced Pandas for Data Analysis":
      "https://img.freepik.com/free-vector/landing-page-template-gradient-effect_52683-21849.jpg?ga=GA1.1.480488536.1738497612&semt=ais_hybrid",
    "Deploying Applications with Docker":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiJtzVPDhJxYBm_szxtpFJOqEyMz9hjYZge2YYyOLWzD6txoqEQGM09oMTvZNZS-TNcwU&usqp=CAU",
    "REST API Design Best Practices":
      "https://media.licdn.com/dms/image/D4D12AQFdbYVIUKcfcw/article-cover_image-shrink_720_1280/0/1682596916909?e=2147483647&v=beta&t=tJ3SM8EWPVAYjwCSAERM9PkjEzM8Ikfw-8289uvAY20",
    "A Guide to Unit Testing in Python":
      "https://www.dataquest.io/wp-content/uploads/2022/10/copies-of-lists-1.webp",
    "The Future of AI and Machine Learning":
      "https://media.licdn.com/dms/image/v2/D4D12AQHwwSsrP6MqWA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1697320309456?e=2147483647&v=beta&t=CCXtvuHo0xGuYAq_T7CY3dUHWStShAZdSA-y1Y9ehYU",
  };
  const locationData = useLocation();
  const { blogId, userId } = locationData.state || {};

  async function getBlogContents(blogId, userId) {
    try {
      const response = await ApiCaller.get(
        `/get-blog-details/${blogId}+${userId}`
      );
      const { blogsData = [], commentsData = [] } = response || {};
      if (blogsData.length > 0) {
        setBlogData(blogsData[0]); // Assuming blogsData is an array with one item
      }
      if (commentsData.length > 0) {
        setCommentsData(commentsData);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (userId && blogId) {
      getBlogContents(blogId, userId);
    }
  }, [userId, blogId]);

  async function postBlogViewCount() {
    try {
      await ApiCaller.get(`/blog-view/${blogId}+${userId}`);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    postBlogViewCount();
  }, []);

  const handleSubmitComment = async () => {
    const newComment = {
      user_id: userId,
      content: commentText,
      blogId: blogId,
      created_at: new Date().toISOString(),
    };

    try {
      const response = await ApiCaller.post(`/post-user-comments`, newComment);

      setCommentsData(response?.commentsData);

      setCommentText("");
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  return (
    <div className="w-full sm:px-6 lg:px-8 bg-[#130F40] ">
      <div className=" sticky top-0">
        <Navbar showSearch={false} />
      </div>
      {blog ? (
        <div className="max-w-3xl mx-auto ">
          <div className="py-8">
            <h1 className="text-3xl text-gray-100 font-bold mb-2">
              {blog.title}
            </h1>
            <p className="text-gray-300 text-sm">
              Published on{" "}
              <time dateTime="2022-04-05">
                {new Date(blog.published_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </time>
            </p>
          </div>

          <div className="flex w-full border border-b-2 rounded-lg overflow-hidden">
            <img
              src={ImageList[blog.title]}
              alt="Featured image"
              className="w-full h-auto"
            />
          </div>

          <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto py-4 text-gray-100">
            <p className="py-10">{blog.content}</p>
          </div>

          {commentsData.length > 0 && (
            <Comments
              commentsData={commentsData}
              onPostClick={handleSubmitComment}
              commentText={commentText}
              setCommentText={setCommentText}
            />
          )}
        </div>
      ) : (
        <div>No Details Available</div>
      )}
    </div>
  );
};

export default BlogContent;
