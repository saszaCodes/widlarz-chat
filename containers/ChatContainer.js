import { StyleSheet, View, Text } from "react-native";
import { useQuery, useMutation, gql } from "@apollo/client";
import ChatMessagesAll from "../components/ChatMessagesAll";
import ChatInput from "../components/ChatInput";
import React from "react";

const USER_ROOMS = gql`
  query getRoomById($id: ID!) {
    room(id: $id) {
      name
      messages {
        body
        insertedAt
        user {
          firstName
          lastName
        }
      }
    }
  }
`;

const SEND_MESSAGE = gql`
  mutation sendMessage($roomId: String!, $body: String!) {
    sendMessage(roomId: $roomId, body: $body) {
      body
      insertedAt
      user {
        firstName
        lastName
      }
    }
  }
`;

export default function ChatContainer() {
  const { loading, data, error } = useQuery(USER_ROOMS, {
    variables: {
      id: "CHAT_ID",
    },
    pollInterval: 500,
  });

  const [sendMessage, mutationResponse] = useMutation(SEND_MESSAGE, {
    variables: {
      body: undefined,
      roomId: undefined,
    },
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>{error.message}</Text>;

  const messagesList = data.room.messages.map((message) => {
    return {
      body: message.body,
      date: message.insertedAt,
      author: `${message.user.firstName} ${message.user.lastName}`,
    };
  });

  function handleSend(message) {
    sendMessage({
      variables: {
        body: message,
        roomId: "CHAT_ID",
      },
    });
  }

  return (
    <React.Fragment>
      <ChatMessagesAll messagesList={messagesList} />
      <ChatInput handleSend={handleSend} />
    </React.Fragment>
  );
}

const styles = StyleSheet.create({});
