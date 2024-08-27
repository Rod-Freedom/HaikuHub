import { gql } from '@apollo/client';


// ME FALTA EL REMOVE HAIKU Y REMOVE COMMENT 
//LO SAQUÉ DE TYPE MUTATIONS EN TYPDEFS
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
      }
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
        createdAt
      }
    }
  }
`;
