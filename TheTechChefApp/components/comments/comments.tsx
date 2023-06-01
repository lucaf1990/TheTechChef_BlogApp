/* eslint-disable @next/next/no-img-element */
import {
  ComCommentProps,
  commentDTO,
  Recipe,
} from "../../components/interfaces/interfaces";
import React, { useState } from "react";
import style from "../../styles/Home.module.scss";
import { BsReply } from "react-icons/bs";
import { Comment } from "../interfaces/interfaces";

const MyComment: React.FC<ComCommentProps & { recipe: Recipe }> = ({
  comRefresh,
  comments,
  recipe,
}) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [replyToCommentId, setReplyToCommentId] = useState<number | null>(null);

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newCommentObj: commentDTO = {
      comment: newComment,
    };
  };

  const handleReplyClick = (commentId: number) => {
    setReplyToCommentId(commentId);
  };

  const toggleShowComments = () => {
    setShowComments((prevShowComments) => !prevShowComments);
  };

  const findCommentById = (
    comments: Comment[],
    commentId: number
  ): Comment | undefined => {
    for (const comment of comments) {
      if (comment.id === commentId) {
        return comment;
      }
      const foundReply = findCommentById(comment.comments, commentId);
      if (foundReply) {
        return foundReply;
      }
    }
    return undefined;
  };

  const renderComment = (comment: Comment) => (
    <div className="d-flex w-100 mb-3" key={comment.id}>
      <div>
        <img
          src={comment.userSection.urlPic}
          alt="comment"
          style={{
            height: "40px",
            width: "40px",
            borderRadius: "100%",
            margin: "0",
          }}
        />
      </div>
      <div className="d-flex w-100">
        <div className="d-flex w-100  flex-column">
          <p className={`${style.commentName} ms-2`}>
            {comment.userSection.name} {comment.userSection.lastName}
          </p>
          <p className={`${style.commentP} ms-2 me-2 w-100`}>
            {comment.comment}
          </p>

          {comment.comments.length > 0 && (
            <div>{comment.comments.map((reply) => renderComment(reply))}</div>
          )}
        </div>
        <p
          className={style.commentbtn}
          onClick={() => handleReplyClick(comment.id)}
        >
          <BsReply style={{ background: "none" }} />
        </p>
      </div>
    </div>
  );

  const postComment = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/comment/add/${recipe.id}`,
        {
          method: "POST",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJsdWNhZiIsImlhdCI6MTY4NTY1NDczNywiZXhwIjoxNjg2MjU5NTM3fQ.RE1oEFO4O78fvae3sX4UXWYwIHmDnYTQsAdZvhoZkAb_OptnvLfXvBvCXXBxFMa1",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newComment),
        }
      );
      if (res.ok) {
        const comments: Comment = await res.json();
        comRefresh();
        setNewComment("");
        return comments;
      } else {
        throw new Error("Failed to fetch recipes");
      }
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch recipes");
    }
  };

  return (
    <>
      <div className={style.comment_section}>
        <h2>Comments</h2>
        <div>
          <form onSubmit={handleCommentSubmit}>
            <input
              style={{ color: "black" }}
              type="text"
              value={newComment}
              onChange={handleCommentChange}
              placeholder="Write a comment..."
            />
            <button
              className={style.commentbtn}
              type="button"
              onClick={postComment}
            ></button>
          </form>
        </div>
      </div>
      <div className={style.commentSection}>
        {comments.map((comment) => renderComment(comment))}
      </div>
    </>
  );
};

export default MyComment;
