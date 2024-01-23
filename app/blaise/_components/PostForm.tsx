import React from "react";

const PostForm = () => {
  return (
    <form>
      <div className="form-group">
        <label id="title">Title</label>
        <input id="title" type="text" />
      </div>
      <div className="form-group">
        <label id="slug">Slug</label>
        <input id="slug" type="text" />
      </div>
      <div className="form-group">
        <label id="category">Category</label>
        <input id="category" type="text" />
      </div>
      <div className="form-group">
        <label id="description">Description</label>
        <textarea name="description" id="description"></textarea>
      </div>
      <button type="submit">Submit New Post</button>
    </form>
  );
};

export default PostForm;
