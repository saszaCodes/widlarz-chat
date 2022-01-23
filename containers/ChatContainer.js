import React, { useEffect } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { useQuery, useSubscription, useMutation, gql } from "@apollo/client";
import ChatMessagesAll from "../components/ChatMessagesAll";
import ChatInput from "../components/ChatInput";

const ROOM_QUERY = gql`
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

const ROOM_SUBSCRIPTION = gql`
  subscription getNewMessages($roomId: String!) {
    messageAdded(roomId: $roomId) {
      body
      insertedAt
      user {
        firstName
        lastName
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

export default function ChatContainer(props) {
  const { roomId } = props;

  const { subscribeToMore, loading, data, error } = useQuery(ROOM_QUERY, {
    variables: {
      id: roomId,
    },
  });

  const [sendMessage, mutationResponse] = useMutation(SEND_MESSAGE, {
    variables: {
      body: undefined,
      roomId: undefined,
    },
  });

  useEffect(() => {
    subscribeToMore({
      document: ROOM_SUBSCRIPTION,
      variables: { roomId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newMessage = subscriptionData.data.messageAdded;
        return Object.assign({}, prev, {
          room: {
            messages: [...prev.room.messages, newMessage],
          },
        });
      },
    });
  }, []);

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
        roomId,
      },
    });
  }

  return (
    <ScrollView>
      {!loading && <ChatMessagesAll messagesList={messagesList} />}
      <ChatInput handleSend={handleSend} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
