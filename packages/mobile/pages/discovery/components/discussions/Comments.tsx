import React, { useState } from "react";
import Text from "../../../../core/components/Text";
import { Button, View } from "react-native";
import CommentCard from "./CommentCard";
import Input from "../../../../core/components/Input";
import { gql, useMutation } from "@apollo/client";
import theme from "../../../../core/theme";
import { Comment } from "../../../../types";
import { useAppSelector } from "../../../../hooks/redux";
import ApolloErrorParser from "../../../../core/components/ApolloErrorParser";

const POST_COMMENET = gql`
  mutation postComemnt($post: String!, $content: String!, $creator: String!) {
    createComment(
      commentInput: { post: $post, content: $content, creator: $creator }
    ) {
      id
      content
    }
  }
`;

type CommentsProps = {
  comments: [Comment] | null;
  postId: string;
};

const Comments = ({ comments = null, postId = "" }: CommentsProps) => {
  const [comment, setComment] = useState("");
  const [addComment, { loading, error }] = useMutation(POST_COMMENET);
  const loggedInUser = useAppSelector((state) => state?.auth.user);

  const handlePostCommentPress = () => {
    addComment({
      variables: {
        post: postId,
        content: comment,
        creator: loggedInUser?.id,
      },
    });
  };
  return (
    <View
      style={{
        width: "100%",
        marginLeft: theme.spacing.small,
      }}
    >
      {comments &&
        comments.map((comment: Comment) => <CommentCard {...comment} />)}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          flex: 1,
        }}
      >
        <Input placeholder="Write your comments" onChangeText={setComment} />
        <Button
          disabled={loading}
          onPress={handlePostCommentPress}
          title={loading ? "Loading..." : "Post"}
        />
        <ApolloErrorParser error={error} />
      </View>
    </View>
  );
};

export default Comments;
