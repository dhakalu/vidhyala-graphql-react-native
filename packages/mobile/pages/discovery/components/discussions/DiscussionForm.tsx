import React, { useState } from "react";
import Components from "../../../../core";
import { View, Button } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { DiscoveryStackParamList } from "../../index";
import { gql, useMutation } from "@apollo/client";
import Modal from "../../../../core/components/Modal";
import theme from "../../../../core/theme";
import { useAppSelector } from "../../../../hooks/redux";
import ApolloErrorParser from "../../../../core/components/ApolloErrorParser";

type ClassDetailScreenRouteProp = RouteProp<DiscoveryStackParamList, "Details">;

const CREATE_ANNOUNCEMENT = gql`
  mutation createDiscussion(
    $subject: String!
    $title: String!
    $content: String!
    $creator: String!
  ) {
    createPost(
      postInput: {
        subject: $subject
        title: $title
        content: $content
        creator: $creator
      }
    ) {
      id
      subject
      content
      title
    }
  }
`;

type DiscussionFormProps = {
  onDismiss: Function;
  isOpen: boolean;
};

const DiscussionForm = ({
  isOpen = false,
  onDismiss = () => false,
}: DiscussionFormProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const route: ClassDetailScreenRouteProp = useRoute();
  const subject = route?.params?.selectedSubject;
  const [addDiscussion, { loading, error }] = useMutation(CREATE_ANNOUNCEMENT);
  const loggedInUser = useAppSelector((state) => state?.auth.user);
  const handleCreate = () => {
    addDiscussion({
      variables: {
        subject: subject.id,
        title,
        content,
        creator: loggedInUser?.id,
      },
    });
  };
  return (
    <Modal isOpen={isOpen} onDismiss={onDismiss}>
      <View
        style={{
          padding: theme.spacing.xLarge,
        }}
      >
        <Components.Input
          label="Title"
          onChangeText={setTitle}
          disabled={loading}
        />
        <Components.Input
          label="Content"
          multiline
          numberOfLines={5}
          onChangeText={setContent}
          disabled={loading}
        />
        <Button
          title={loading ? "Saving..." : "Create"}
          onPress={handleCreate}
        />
        <ApolloErrorParser error={error} />
      </View>
    </Modal>
  );
};

export default DiscussionForm;
