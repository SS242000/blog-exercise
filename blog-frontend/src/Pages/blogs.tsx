import React, { useEffect, useState } from "react";
import ApiCaller from "../Services/apiConfig";
import { useLocation, useNavigate } from "react-router-dom";

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
    "The Future of AI and Machine Learning":"https://media.licdn.com/dms/image/v2/D4D12AQHwwSsrP6MqWA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1697320309456?e=2147483647&v=beta&t=CCXtvuHo0xGuYAq_T7CY3dUHWStShAZdSA-y1Y9ehYU"
};

export const Blogs = ({ userId = 1, onClick, searchValue }) => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const locationData = useLocation();
  const {blogId} = locationData.state || {}
  console.log(locationData)
  const navigate = useNavigate();
  const sessionToken = sessionStorage.getItem("token");
  console.log(searchValue)
  useEffect(() => {
    if (!sessionToken) {
      navigate("/");
    }
  }, [sessionToken, navigate]);
  useEffect(() => {
    async function getUserBlogs(userId) {
      try {
        const response = await ApiCaller.get(`/get-user-blogs/${userId}`);
        setBlogs(response);
        setFilteredBlogs(response);
      } catch (error) {
        console.log(error);
      }
    }

    getUserBlogs(userId);
  }, [userId]);

  useEffect(() => {
    if (searchValue) {
      const filtered = blogs.filter(blog => 
        blog?.title.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredBlogs(filtered);
    } else {
      setFilteredBlogs(blogs);
    }
  }, [searchValue, blogs]);

  return (
    <section className="py-10 bg-[#130F40]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-manrope text-4xl font-bold text-gray-100 text-center mb-16">
          Explore Blogs
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8 cursor-pointer">
          {filteredBlogs.map((blog, idx) => (
            <div
              key={idx}
              className="border border-gray-300 rounded-2xl hover:border-violet-700 grid grid-cols-2"
              onClick={() => onClick(blog?.id)}
            >
              <div className="sm:order-2">
                <div className="p-4 lg:p-6">
                  <span className="text-sky-500 font-medium block">
                    {new Date(blog?.published_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <h4 className="text-xl text-gray-100 font-medium leading-8 mb-5">
                    {blog?.title}
                  </h4>
                  <p className="text-gray-200 leading-6 mb-10">
                    Discover {blog.title}
                  </p>
                  <text className="cursor-pointer text-lg text-indigo-600 font-semibold">
                    Read more..
                  </text>
                </div>
              </div>
              <div className="sm:order-1">
                <div className="flex items-center md:h-full">
                  <img
                    src={ImageList[blog.title] || "https://via.placeholder.com/150"}
                    alt="blogs tailwind section"
                    className="rounded-2xl w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
