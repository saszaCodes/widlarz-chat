import ChatContainer from "../containers/ChatContainer";

export default function ChatScreen(props) {
  const { navigation, route } = props;
  const { roomId } = route.params;
  return <ChatContainer roomId={roomId} />;
}
