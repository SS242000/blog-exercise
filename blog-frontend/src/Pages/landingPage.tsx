import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Footer } from "./footer";
import Navbar from "./navbars";
import { Blogs } from "./blogs";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const locationData = useLocation();
  const navigate = useNavigate();
  const {id:userId,email,username} = locationData.state?.userDetails || {};
  const sessionToken = sessionStorage.getItem('token');
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    if (!sessionToken || sessionToken === null) {
      navigate("/");
    }
  }, [sessionToken, navigate]);
 
  return  (
    <div className="flex flex-col">
      <Navbar showSearch={true} onSearch={setSearchQuery} />
      <div className="flex-1">
        <div className="">
          <Blogs
            userId={userId}
            onClick={(title) =>
              navigate("/blogs", { state: { blogId: title, userId: userId } })
            }
            searchValue={searchQuery}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
