import React, { useState } from "react";
import Components from "../../../../core";
import { View, Button } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { DiscoveryStackParamList } from "../../index";
import { gql, useMutation } from "@apollo/client";
import Text from "../../../../core/components/Text";
import { GET_ANNOUNCEMENTS } from ".";

type ClassDetailScreenRouteProp = RouteProp<DiscoveryStackParamList, "Details">;

const CREATE_ANNOUNCEMENT = gql`
  mutation createAnnouncement(
    $subject: String!
    $title: String!
    $description: String!
  ) {
    createAnnouncement(
      announcementInput: {
        subject: $subject
        title: $title
        description: $description
      }
    ) {
      id
      subject
      description
      title
    }
  }
`;

const AnnouncementForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const route: ClassDetailScreenRouteProp = useRoute();
  const subject = route?.params?.selectedSubject;
  const [addAnnouncement, { loading, error }] = useMutation(
    CREATE_ANNOUNCEMENT,
    {
      update: (cache, { data }) => {
        const newAnnouncement = data.createAnnouncement;
        const existingAnnouncements = cache.readQuery({
          query: GET_ANNOUNCEMENTS,
          variables: {
            subject: subject.id,
          },
        });
        if (existingAnnouncements && newAnnouncement) {
          cache.writeQuery({
            query: GET_ANNOUNCEMENTS,
            variables: {
              subject: subject.id,
            },
            data: {
              announcements: [
                newAnnouncement,
                ...existingAnnouncements.announcements,
              ],
            },
          });
        }
      },
    }
  );

  const handleCreate = () => {
    addAnnouncement({
      variables: {
        subject: subject.id,
        title,
        description,
      },
    });
  };
  return (
    <View>
      <Components.Input
        label="Title"
        placeholder="Title"
        onChangeText={setTitle}
      />
      <Components.Input
        label="Description"
        placeholder="Message"
        multiline
        numberOfLines={4}
        onChangeText={setDescription}
      />
      <Button title={loading ? "Saving..." : "Create"} onPress={handleCreate} />
      {error && (
        <Text color="error" variant="medium">
          {error}
        </Text>
      )}
    </View>
  );
};

export default AnnouncementForm;
