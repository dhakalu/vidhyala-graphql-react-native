import React, { useState } from "react";
import DiscussionCard from "./DiscussionCard";
import { Alert, ScrollView } from "react-native";
import { gql, useQuery } from "@apollo/client";
import { useRoute, RouteProp } from "@react-navigation/native";
import { DiscoveryStackParamList } from "../../index";
import Text from "../../../../core/components/Text";
import Input from "../../../../core/components/Input";
import DiscussionForm from "./DiscussionForm";
import ApolloErrorParser from "../../../../core/components/ApolloErrorParser";
import DiscussionDetail from "./DiscussionDetail";
import Modal from "../../../../core/components/Modal";

const GET_DISCUSSIONS = gql`
  query getDiscussions($subject: String!) {
    posts(subject: $subject) {
      id
      title
      content
      likes
      comments {
        id
        content
        creator {
          id
          name
        }
      }
      creator {
        id
        username
        name
      }
    }
  }
`;

type ClassDetailScreenRouteProp = RouteProp<DiscoveryStackParamList, "Details">;

const Discussions = () => {
  const [isCreatingPost, setIsCreatingPost] = useState<boolean>(false);
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);
  const [detailPost, setDetailPost] = useState({});

  const route: ClassDetailScreenRouteProp = useRoute();
  const subject: any | undefined = route?.params;
  const { loading, error, data } = useQuery(GET_DISCUSSIONS, {
    variables: {
      subject: subject?.selectedSubject?.id,
    },
  });

  if (loading) {
    return <Text color="secondary">Loading...</Text>;
  }

  if (error) {
    return <ApolloErrorParser error={error} />;
  }

  return (
    <ScrollView>
      <Input
        placeholder="Whats on your mind?"
        onTouchStart={() => setIsCreatingPost(true)}
        multiline
        numberOfLines={2}
      />
      {/* TODO fix the type */}
      {data.posts.map((discussion: any) => (
        <DiscussionCard
          {...discussion}
          onPressComment={() => {
            setDetailPost(discussion);
            setIsDetailOpen(!isDetailOpen);
          }}
        />
      ))}
      <DiscussionForm
        isOpen={isCreatingPost}
        onDismiss={() => setIsCreatingPost(false)}
      />
      <Modal
        isOpen={isDetailOpen}
        onDismiss={() => {
          Alert.alert("Modal has been closed.");
          setIsDetailOpen(!isDetailOpen);
        }}
      >
        <DiscussionDetail {...detailPost} />
      </Modal>
    </ScrollView>
  );
};

export default Discussions;
