/* eslint-disable */

import React, { useState, useEffect } from "react";
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from "react-icons/fi";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Chart from "chart.js/auto";

const platforms = [
  {
    id: 0,
    name: "Facebook",
    followers: 1000,
    likes: 2000,
    shares: 150,
    growth: 5,
    chartData: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      datasets: [
        {
          label: "Likes",
          data: [150, 220, 180, 250, 190],
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
        {
          label: "Shares",
          data: [20, 35, 25, 40, 30],
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    },
  },
  {
    id: 1,
    name: "Twitter",
    followers: 800,
    retweets: 1200,
    mentions: 300,
    growth: 2,
    chartData: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      datasets: [
        {
          label: "Retweets",
          data: [180, 250, 200, 300, 220],
          backgroundColor: "rgba(255, 206, 86, 0.2)",
          borderColor: "rgba(255, 206, 86, 1)",
          borderWidth: 1,
        },
        {
          label: "Mentions",
          data: [40, 55, 45, 60, 50],
          backgroundColor: "rgba(50, 168, 82, 0.2)",
          borderColor: "rgba(50, 168, 82, 1)",
          borderWidth: 1,
        },
      ],
    },
  },
];

const SocialMediaDashboard = () => {
  const [selectedPlatform, setSelectedPlatform] = useState(0);

  useEffect(() => {
    const ctx = document.getElementById("platformChart").getContext("2d");
    const existingChart = Chart.getChart("platformChart");

    if (existingChart) {
      existingChart.destroy();
    }

    new Chart(ctx, {
      type: "line",
      data: platforms[selectedPlatform].chartData,
      options: {
        maintainAspectRatio: false,
      },
    });
  }, [selectedPlatform]);

  const renderPlatformStats = (platform) => (
    <div
      key={platform.name}
      onClick={() => setSelectedPlatform(platform.id)}
      className={`bg-white shadow-md rounded-lg p-4 mb-4 cursor-pointer transition-transform transform hover:scale-105 ${
        selectedPlatform === platform.id ? "ring-2 ring-blue-500" : ""
      }`}
    >
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {platform.name}
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <p className="text-xl font-bold text-gray-900">
            {platform.followers}
          </p>
          <span className="text-gray-500">Followers</span>
        </div>
        {platform.likes && (
          <div className="text-center">
            <p className="text-xl font-bold text-gray-900">{platform.likes}</p>
            <span className="text-gray-500">Likes</span>
          </div>
        )}
        {platform.shares && (
          <div className="text-center">
            <p className="text-xl font-bold text-gray-900">{platform.shares}</p>
            <span className="text-gray-500">Shares</span>
          </div>
        )}
        {platform.retweets && (
          <div className="text-center">
            <p className="text-xl font-bold text-gray-900">
              {platform.retweets}
            </p>
            <span className="text-gray-500">Retweets</span>
          </div>
        )}
        {platform.mentions && (
          <div className="text-center">
            <p className="text-xl font-bold text-gray-900">
              {platform.mentions}
            </p>
            <span className="text-gray-500">Mentions</span>
          </div>
        )}
        <div className="flex items-center justify-center mt-4 col-span-2">
          <span
            className={`text-green-500 font-bold px-2 py-1 rounded-full mr-2 ${
              platform.growth > 0 ? "" : "hidden"
            }`}
          >
            +{platform.growth}%
          </span>
          <span className="text-gray-500">Growth (Last Week)</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold text-gray-900 mb-6 text-center">
        Social Media Dashboard
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {platforms.map(renderPlatformStats)}
      </div>
      <div className="mt-12">
        <h3 className="text-xl font-medium text-gray-900 mb-4">
          Engagement Chart
        </h3>
        <div className="relative h-96">
          <canvas id="platformChart" width="600" height="400"></canvas>
        </div>
      </div>
    </div>
  );
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const App = () => {
  const [facebookStats, setFacebookStats] = useState({
    likes: 0,
    followers: 0,
    posts: [],
  });

  const [twitterStats, setTwitterStats] = useState({
    followers: 0,
    tweets: [],
  });

  const [instagramStats, setInstagramStats] = useState({
    followers: 0,
    posts: [],
  });

  const [linkedinStats, setLinkedinStats] = useState({
    connections: 0,
    articles: [],
  });

  const chartData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Followers",
        data: [1000, 1500, 1200, 1700, 1400, 1800],
        fill: false,
        borderColor: "#3182CE",
        tension: 0.4,
      },
    ],
  };

  useEffect(() => {
    // Simulated data fetching
    // Replace with actual API calls in a real application
    setFacebookStats({
      likes: 1200,
      followers: 2500,
      posts: [
        { id: 1, text: "First post" },
        { id: 2, text: "Second post" },
        { id: 3, text: "Third post" },
      ],
    });

    setTwitterStats({
      followers: 1800,
      tweets: [
        { id: 1, text: "Tweet 1" },
        { id: 2, text: "Tweet 2" },
        { id: 3, text: "Tweet 3" },
      ],
    });

    setInstagramStats({
      followers: 3500,
      posts: [
        { id: 1, imageUrl: "https://via.placeholder.com/150" },
        { id: 2, imageUrl: "https://via.placeholder.com/150" },
        { id: 3, imageUrl: "https://via.placeholder.com/150" },
      ],
    });

    setLinkedinStats({
      connections: 1800,
      articles: [
        { id: 1, title: "Article 1" },
        { id: 2, title: "Article 2" },
        { id: 3, title: "Article 3" },
      ],
    });
  }, []);

  return (
    <>
      <SocialMediaDashboard />
      <br />

      <hr />
      <br />

      <div className="container mx-auto my-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
          Social Media Dashboard
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <FiFacebook className="text-blue-600 text-3xl" />
              <span className="text-xl font-bold text-gray-800">
                {facebookStats.likes}
              </span>
            </div>
            <p className="text-sm text-gray-600">Likes</p>
            <div className="flex items-center mt-4">
              <FiFacebook className="text-blue-600 mr-2" />
              <span className="text-lg font-bold">
                {facebookStats.followers}
              </span>
              <span className="text-gray-600 ml-2">followers</span>
            </div>
            <div className="mt-6">
              <p className="text-sm text-gray-600 mb-2">Recent Posts:</p>
              {facebookStats.posts.map((post) => (
                <p key={post.id} className="text-sm text-gray-700">
                  {post.text}
                </p>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <FiTwitter className="text-blue-400 text-3xl" />
              <span className="text-xl font-bold text-gray-800">
                {twitterStats.followers}
              </span>
            </div>
            <p className="text-sm text-gray-600">Followers</p>
            <div className="mt-6">
              <p className="text-sm text-gray-600 mb-2">Recent Tweets:</p>
              {twitterStats.tweets.map((tweet) => (
                <p key={tweet.id} className="text-sm text-gray-700">
                  {tweet.text}
                </p>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <FiInstagram className="text-pink-600 text-3xl" />
              <span className="text-xl font-bold text-gray-800">
                {instagramStats.followers}
              </span>
            </div>
            <p className="text-sm text-gray-600">Followers</p>
            <div className="mt-6">
              <p className="text-sm text-gray-600 mb-2">Recent Posts:</p>
              <div className="flex flex-wrap">
                {instagramStats.posts.map((post) => (
                  <img
                    key={post.id}
                    src={post.imageUrl}
                    alt="Instagram Post"
                    className="w-16 h-16 object-cover mr-2 mb-2 rounded-lg"
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <FiLinkedin className="text-blue-800 text-3xl" />
              <span className="text-xl font-bold text-gray-800">
                {linkedinStats.connections}
              </span>
            </div>
            <p className="text-sm text-gray-600">Connections</p>
            <div className="mt-6">
              <p className="text-sm text-gray-600 mb-2">Recent Articles:</p>
              {linkedinStats.articles.map((article) => (
                <p key={article.id} className="text-sm text-gray-700">
                  {article.title}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Followers Growth</h2>
          <div className="h-80">
            <Line data={chartData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
