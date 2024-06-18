import React, { useState } from "react";

function Post({ post, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(post.title);
  const [editedContent, setEditedContent] = useState(post.content);

  const handleSaveEdit = () => {
    onEdit(editedTitle, editedContent);
    setIsEditing(false);
  };

  return (
    <div className="border rounded-md p-4">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="border rounded-md py-2 px-3 mb-2 w-full text-lg outline-none"
          />
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="border rounded-md py-2 px-3 mb-2 w-full h-32 text-lg outline-none"
          ></textarea>
          <div className="flex justify-between">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={handleSaveEdit}
            >
              Save
            </button>
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-bold mb-2">{post.title}</h2>
          <p>{post.content}</p>
          <div className="mt-2">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={onDelete}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleAddPost = () => {
    if (title !== "" && content !== "") {
      const newPost = {
        id: posts.length + 1,
        title,
        content,
      };
      setPosts([...posts, newPost]);
      setTitle("");
      setContent("");
    } else {
      alert("Please enter both title and content.");
    }
  };

  const handleDeletePost = (id) => {
    const updatedPosts = posts.filter((post) => post.id !== id);
    setPosts(updatedPosts);
  };

  const handleEditPost = (id, updatedTitle, updatedContent) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === id) {
        return {
          ...post,
          title: updatedTitle,
          content: updatedContent,
        };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  return (
    <div className="max-w-6xl container p-4 m-auto mt-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Professional Blog App
      </h1>
      <div className="mb-8 flex flex-col items-center">
        <input
          type="text"
          placeholder="Enter title"
          className="border rounded-md py-2 px-3 w-80 md:w-96 text-lg outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Enter content"
          className="border rounded-md py-2 px-3 w-80 md:w-96 h-32 mt-4 text-lg outline-none"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={handleAddPost}
        >
          Add Post
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Post
            key={post.id}
            post={post}
            onDelete={() => handleDeletePost(post.id)}
            onEdit={(updatedTitle, updatedContent) =>
              handleEditPost(post.id, updatedTitle, updatedContent)
            }
          />
        ))}
      </div>
    </div>
  );
}

export default App;