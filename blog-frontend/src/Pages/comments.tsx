import { useState } from "react";
import ApiCaller from "../Services/apiConfig";

const Comments = ({
  commentsData,
  onPostClick,
  commentText,
  setCommentText,
}) => {
  return (
    <section className="relative bg-[#130F40]">
      <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
        <div className="w-full flex-col justify-start items-start lg:gap-14 gap-7 inline-flex">
          <h2 className="w-full text-gray-200 text-3xl font-bold font-manrope leading-normal">
            Comments ( {commentsData?.length} )
          </h2>
          <div className="w-full flex-col justify-start items-start gap-5 flex">
            <div className="w-full rounded-3xl justify-start items-start gap-3.5 inline-flex">
              <img
                className="w-10 h-10 object-cover"
                src="https://pagedone.io/asset/uploads/1710225753.png"
                alt="John smith image"
              />
              <textarea
                name=""
                rows="5"
                className="w-full px-5 py-3 rounded-2xl border border-gray-300 shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] resize-none focus:outline-none placeholder-gray-400 text-gray-900 text-lg font-normal leading-7"
                placeholder="Write your thoughts here...."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              ></textarea>
            </div>
            <button
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-800 transition-all duration-700 ease-in-out rounded-xl shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] justify-center items-center flex"
              onClick={onPostClick}
            >
              <span className="px-2 py-px text-white text-base font-semibold leading-relaxed">
                Post your comment
              </span>
            </button>
          </div>
          {commentsData.map((comment, index) => (
            <div
              key={index}
              className="w-full flex-col justify-start items-start gap-8 flex"
            >
              <div className="w-full pb-6 border-b border-gray-300 justify-start items-start gap-2.5 inline-flex">
                <img
                  className="w-10 h-10 rounded-full object-cover"
                  src="https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg?t=st=1738601947~exp=1738605547~hmac=f89e35102e70cad397db66eb7551625a79d96f773f5c3c8a642c326938819543&w=740"
                  alt={comment.author}
                />
                <div className="w-full flex-col justify-start items-start gap-3.5 inline-flex">
                  <div className="w-full justify-start items-start flex-col flex gap-1">
                    <div className="w-full justify-between items-start gap-1 inline-flex">
                      <h5 className="text-gray-100 text-sm font-semibold leading-snug">
                        {comment.username}
                      </h5>
                      <span className="text-right text-gray-200 text-xs font-normal leading-5">
                        {new Date(comment.created_at).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </span>
                    </div>
                    <h5 className="text-gray-300 text-sm font-normal leading-snug">
                      {comment.content}
                    </h5>
                  </div>
                  {/* <div className="justify-start items-start gap-5 inline-flex">
                    <a
                      href="#"
                      className="w-5 h-5 flex items-center justify-center group"
                    >
                      <svg
                        className="text-indigo-600 group-hover:text-indigo-800 transition-all duration-700 ease-in-out"
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                      >
                        <path
                          d="M8.57084 0.140905C8.77176 -0.0157322 9.04438 -0.0441704 9.2733 0.067628C9.50221 0.179426 9.6474 0.411912 9.6474 0.666672V4.007C11.5347 4.11302 13.0359 4.67225 14.2134 5.55105C15.5204 6.52639 16.3797 7.85847 16.9418 9.28015C18.0571 12.1006 18.0478 15.3937 17.9706 17.3595C17.9563 17.7223 17.6544 18.007 17.2913 17.9999C16.9283 17.9927 16.6378 17.6964 16.6378 17.3333C16.6378 17.2088 16.599 16.9855 16.4876 16.6619C16.3796 16.3485 16.2165 15.978 16.0015 15.572C15.5714 14.7597 14.9518 13.8391 14.207 12.9928C13.4603 12.1445 12.6071 11.3927 11.716 10.8938C11.0208 10.5045 10.3252 10.2811 9.6474 10.2644V13.6296C9.6474 13.8844 9.50221 14.1169 9.2733 14.2287C9.04438 14.3405 8.77176 14.312 8.57084 14.1554L0.257105 7.67392C0.095068 7.5476 0.000331879 7.35361 0.000331879 7.14815C0.000331879 6.94269 0.095068 6.74871 0.257105 6.62239L8.57084 0.140905Z"
                          fill="currentColor"
                        />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="w-5 h-5 flex items-center justify-center group"
                    >
                      <svg
                        className="text-indigo-600 group-hover:text-indigo-800 transition-all duration-700 ease-in-out"
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                      >
                        <path
                          d="M1.62629 2.43257C3.64001 0.448687 6.82082 0.311339 8.99614 2.02053C11.1723 0.311339 14.3589 0.448687 16.3726 2.43257L16.3734 2.43334C18.5412 4.57611 18.5412 8.04382 16.3804 10.1867L16.378 10.1891L9.46309 16.9764C9.20352 17.2312 8.78765 17.2309 8.52844 16.9758L1.62629 10.1821C-0.542748 8.04516 -0.542748 4.56947 1.62629 2.43257Z"
                          fill="currentColor"
                        />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="w-5 h-5 flex items-center justify-center group"
                    >
                      <svg
                        className="text-indigo-600 group-hover:text-indigo-800 transition-all duration-700 ease-in-out"
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M4.5835 3.16634V3.83301H1.50016C1.13197 3.83301 0.833496 4.13148 0.833496 4.49967C0.833496 4.86786 1.13197 5.16634 1.50016 5.16634L2.33356 5.16642L2.33356 11.5482C2.33354 12.6855 2.33352 13.6065 2.43103 14.3318C2.5325 15.0865 2.75042 15.7283 3.26105 16.2389C3.77168 16.7495 4.4135 16.9675 5.16821 17.0689C5.89348 17.1665 6.81445 17.1664 7.9518 17.1664H10.0486C11.186 17.1664 12.107 17.1665 12.8322 17.0689C13.5869 16.9675 14.2288 16.7495 14.7394 16.2389C15.25 15.7283 15.4679 15.0865 15.5694 14.3318C15.6669 13.6065 15.6669 12.6856 15.6669 11.5483V5.16642L16.5002 5.16634C16.8684 5.16634 17.1668 4.86786 17.1668 4.49967C17.1668 4.13148 16.8684 3.83301 16.5002 3.83301H13.4168V3.16634C13.4168 1.87768 12.3722 0.833008 11.0835 0.833008H6.91683C5.62817 0.833008 4.5835 1.87768 4.5835 3.16634ZM6.91683 2.16634C6.36455 2.16634 5.91683 2.61406 5.91683 3.16634V3.83301H12.0835V3.16634C12.0835 2.61406 11.6358 2.16634 11.0835 2.16634H6.91683ZM7.50014 7.58303C7.86833 7.58303 8.16681 7.8815 8.16681 8.24969L8.16681 12.7497C8.16681 13.1179 7.86833 13.4164 7.50014 13.4164C7.13195 13.4164 6.83348 13.1179 6.83348 12.7497L6.83348 8.24969C6.83348 7.8815 7.13195 7.58303 7.50014 7.58303ZM11.1669 8.24969C11.1669 7.8815 10.8684 7.58303 10.5002 7.58303C10.132 7.58303 9.83356 7.8815 9.83356 8.24969V12.7497C9.83356 13.1179 10.132 13.4164 10.5002 13.4164C10.8684 13.4164 11.1669 13.1179 11.1669 12.7497L11.1669 8.24969Z"
                          fill="currentColor"
                        />
                      </svg>
                    </a>
                  </div> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Comments;
