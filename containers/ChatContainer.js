import { StyleSheet, View, Text } from "react-native";
import { useQuery, gql } from "@apollo/client";

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

export default function ChatContainer() {
  const { loading, error, data } = useQuery(USER_ROOMS, {
    variables: {
      id: "CHAT_ID",
    },
  });
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>{error.message}</Text>;
  console.log(data);

  const chat = data.room.messages.map((el) => (
    <Text>
      {el.user.firstName}
      {"\n"}
      {el.body}
    </Text>
  ));

  return <View>{chat}</View>;
}

const styles = StyleSheet.create({});
