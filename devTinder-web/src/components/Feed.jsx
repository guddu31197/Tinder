import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL, getCookie } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;

    try {
      const token = getCookie("token");
      console.log("Token being sent:", token);

      const res = await axios.get(BASE_URL + "/feed", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.error("Feed fetch error:", err?.response?.data || err.message);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);
  return (
    feed && (
      <div className="flex justify-center my-10">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
