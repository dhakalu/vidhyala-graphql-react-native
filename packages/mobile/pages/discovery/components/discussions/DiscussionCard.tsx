import React from "react";
import Text from "../../../../core/components/Text";
import Card from "../../../../core/components/Card";
import Comments from "./Comments";
import { View } from "react-native";
import Avatar from "../../../../core/components/Avatar";
import { User, Comment } from "../../../../types";
import { gql, useMutation } from "@apollo/client";
import { useAppSelector } from "../../../../hooks/redux";
import ApolloErrorParser from "../../../../core/components/ApolloErrorParser";
import theme from "../../../../core/theme";
import { Button } from "react-native-paper";

type TitleProps = {
  title: string;
  creator?: User | null;
};

type DiscussionCardProps = TitleProps & {
  id: string;
  content: string;
  comments: [Comment] | null;
  likes: number;
  onPressComment?: Function;
  showDetail: boolean;
};

const Title = ({ title = "", creator = null }: TitleProps) => {
  return (
    <View
      style={{
        flexDirection: "row",
      }}
    >
      <Avatar />
      <View>
        <Text variant="large" color="primary">
          {title}
        </Text>
        {creator && (
          <Text variant="small" color="secondary">
            Posted by {creator?.name}
          </Text>
        )}
      </View>
    </View>
  );
};

const CREATE_ANNOUNCEMENT = gql`
  mutation likePost($likedObject: String!, $likedBy: String!) {
    createLike(likeInput: { likedObject: $likedObject, likedBy: $likedBy }) {
      id
    }
  }
`;

const DiscussionCard = ({
  id = "",
  title = "",
  content = "",
  creator = null,
  comments = null,
  likes = 0,
  onPressComment = () => false,
  showDetail = false,
}: DiscussionCardProps) => {
  const [addLike, { loading, error }] = useMutation(CREATE_ANNOUNCEMENT);

  const loggedInUser = useAppSelector((state) => state.auth.user);

  const handleLikePress = () => {
    addLike({
      variables: {
        likedObject: id,
        likedBy: loggedInUser?.id,
      },
    });
  };

  const handleCommentPress = () => {
    onPressComment();
  };

  return (
    <Card>
      <Title title={title} creator={creator} />
      <Text
        variant="medium"
        color="secondary"
        style={{
          padding: theme.spacing.small,
        }}
      >
        {content}
      </Text>
      <View
        style={{
          padding: theme.spacing.small,
        }}
      >
        <Text variant="small" color="secondary">
          {likes} Likes
        </Text>
      </View>
      {/* TODO replace with icon */}
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: theme.spacing.small,
          justifyContent: "space-between",
        }}
      >
        <Button onPress={handleLikePress}>
          {loading ? "Liking...." : "Like"}
        </Button>
        <Button onPress={handleCommentPress}>Comment</Button>
        <Button onPress={handleLikePress}> Share </Button>
      </View>
      <ApolloErrorParser error={error} />
      {showDetail && <Comments comments={comments} postId={id} />}
    </Card>
  );
};

export default DiscussionCard;
