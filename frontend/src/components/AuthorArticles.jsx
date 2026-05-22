import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useAuth } from "../store/authStore";

import {
  loadingClass,
  errorClass,
  emptyStateClass,
} from "../styles/common";

function AuthorArticles() {
  const navigate = useNavigate();
  const user = useAuth((state) => state.currentUser);

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log("user in author profile", user);

  useEffect(() => {
    if (!user) return;

    const getAuthorArticles = async () => {
      setLoading(true);

      try {
        const res = await axios.get(
          `https://final-blog-app.onrender.com/author-api/articles/${user._id}`,
          {
            withCredentials: true,
          }
        );

        setArticles(res.data.payload);
      } catch (err) {
        console.log(err);
        setError(
          err.response?.data?.error || "Failed to fetch articles"
        );
      } finally {
        setLoading(false);
      }
    };

    getAuthorArticles();
  }, [user]);

  const openArticle = (article) => {
    navigate(`/article/${article._id}`, {
      state: article,
    });
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
    });
  };

  if (loading)
    return (
      <p className={`${loadingClass} text-center mt-10`}>
        Loading articles...
      </p>
    );

  if (error)
    return (
      <p className={`${errorClass} text-center mt-10`}>
        {error}
      </p>
    );

  if (articles.length === 0) {
    return (
      <div
        className={`${emptyStateClass} text-center text-gray-500 text-lg mt-20`}
      >
        You haven't published any articles yet.
      </div>
    );
  }

  return (
    <div className="px-6 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {articles.map((article) => (
          <div
            key={article._id}
            className="
              relative flex flex-col
              bg-white dark:bg-zinc-900
              rounded-2xl
              border border-gray-200 dark:border-zinc-700
              shadow-md hover:shadow-2xl
              hover:-translate-y-2
              transition-all duration-300
              overflow-hidden
              p-6
              min-h-[300px]
            "
          >
            {/* Status Badge */}
            <span
              className={`absolute top-4 right-4 px-3 py-1 text-xs font-semibold rounded-full ${
                article.isArticleActive
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {article.isArticleActive ? "ACTIVE" : "DELETED"}
            </span>

            {/* Category */}
            <p className="text-sm uppercase tracking-wider text-blue-500 font-medium mb-3">
              {article.category}
            </p>

            {/* Title */}
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3 line-clamp-2">
              {article.title}
            </h2>

            {/* Article Preview */}
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-6 line-clamp-4 flex-grow">
              {article.content.slice(0, 120)}...
            </p>

            {/* Date */}
            {article.dateOfModification && (
              <p className="text-xs text-gray-400 mt-4">
                Updated: {formatDate(article.dateOfModification)}
              </p>
            )}

            {/* Footer Button */}
            <div className="mt-6 pt-4 border-t border-gray-100 dark:border-zinc-700">
              <button
                onClick={() => openArticle(article)}
                className="
                  w-full
                  py-3
                  rounded-xl
                  bg-black text-white
                  hover:bg-gray-800
                  dark:bg-white dark:text-black
                  dark:hover:bg-gray-200
                  transition-all duration-300
                  font-medium
                "
              >
                Read Article →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AuthorArticles;
