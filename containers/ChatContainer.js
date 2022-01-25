import React, { useEffect } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { useQuery, useSubscription, useMutation, gql } from "@apollo/client";
import Plus from "../assets/plus";
import Phone from "../assets/phone";
import Videocall from "../assets/videocall";
import ChatMessagesAll from "../components/ChatMessagesAll";
import ChatInput from "../components/ChatInput";
import HeaderBar from "../components/HeaderBar";
import HeaderTitleWithIcon from "../components/HeaderTitleWithIcon";
import Footer from "../components/Footer";

const ROOM_QUERY = gql`
  query getRoomById($id: ID!) {
    room(id: $id) {
      name
      messages {
        id
        body
        insertedAt
        user {
          id
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
    console.log(roomId);
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
      id: message.id,
      body: message.body,
      date: message.insertedAt,
      author: `${message.user.firstName} ${message.user.lastName}`,
      authorId: message.user.id,
    };
  });

  function handleSend(message) {
    console.log(roomId);
    sendMessage({
      variables: {
        body: message,
        roomId,
      },
    });
  }

  return (
    <React.Fragment>
      <HeaderBar button1={Phone} button2={Videocall}>
        <HeaderTitleWithIcon
          title={data.room.name}
          subtitle={"Active now"}
          icon={<Plus />}
        />
      </HeaderBar>

      {!loading && <ChatMessagesAll messagesList={messagesList} />}
      <Footer>
        <ChatInput handleSend={handleSend} />
      </Footer>
    </React.Fragment>
  );
}
