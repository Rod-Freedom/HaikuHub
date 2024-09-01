import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      haikus {
        _id
        haikuText
        likes
        createdAt
      }
    }
  }
`;


export const QUERY_HAIKUS = gql` 
  query getHaikus {
    haikus {
      _id
      haikuText
      haikuAuthor
      likes
      createdAt
    }
  }
`;

export const QUERY_SINGLE_HAIKU = gql`
  query getSingleHaiku($haikuId: ID!) {
    haiku(haikuId: $haikuId) {
      _id
      haikuText
      haikuAuthor
      likes
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        likes
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      haikus {
        _id
        haikuText
        haikuAuthor
        likes
        createdAt
      }
    }
  }
`;
