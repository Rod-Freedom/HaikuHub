import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_HAIKU = gql`
  mutation addHaiku($haikuText: String!) {
    addHaiku(haikuText: $haikuText) {
      _id
      haikuText
      haikuAuthor
      createdAt
      comments {
        _id
        commentText
        likes
      }
    }
  }
`;

export const REMOVE_HAIKU = gql`
  mutation removeHaiku($haikuId: ID!) {
    removeHaiku(haikuId: $haikuId) {
      _id
      haikuText
      haikuAuthor
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($haikuId: ID!, $commentText: String!) {
    addComment(haikuId: $haikuId, commentText: $commentText) {
      _id
      haikuText
      haikuAuthor
      createdAt
      comments {
        _id
        commentText
        likes
        createdAt
      }
    }
  }
`;

export const REMOVE_COMMENT = gql`
  mutation removeComment($haikuId: ID!, $commentId: ID!) {
    removeComment(haikuId: $haikuId, commentId: $commentId) {
      _id
      haikuText
      haikuAuthor
      createdAt
      comments {
        _id
        commentText
        likes
        createdAt
      }
    }
  }
`;

export const UPDATE_HAIKU_LIKE = gql`
  mutation updateHaikuLike($haikuId: ID!) {
    updateHaikuLike(haikuId: $haikuId) {
      _id
      haikuText
      haikuAuthor
      likes
      createdAt
      comments {
        _id
        commentText
        likes
        createdAt
      }
    }
  }
`;

export const UPDATE_COMMENT_LIKE = gql`
  mutation updateCommentLike($haikuId: ID!, $commentId: ID!) {
    updateCommentLike(haikuId: $haikuId, commentId: $commentId) {
        _id
        commentText
        likes
        createdAt
    }
  }
`;
