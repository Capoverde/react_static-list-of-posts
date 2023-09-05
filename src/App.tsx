import React from 'react';
import { PostList } from './components/PostList';
import { User } from './types/User';
import { Comment } from './types/Comment';
import { Post } from './types/Post';
import postsFromServer from './api/posts';
import commentsFromServer from './api/comments';
import usersFromServer from './api/users';
import './App.scss';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

function getComments(postId: number): Comment[] | null {
  const postComments = commentsFromServer
    .filter(comment => comment.postId === postId);

  return postComments.length > 0 ? postComments : null;
}

export const posts: Post[] = postsFromServer.map(post => ({
  ...post,
  user: getUser(post.userId),
  comments: getComments(post.id),
}));

export const App: React.FC = () => (
  <section className="App">
    <h1 className="App__title">Static list of posts</h1>
    <PostList posts={posts} />
  </section>
);