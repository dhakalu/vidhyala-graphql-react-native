import React from "react";
import AnnouncementCard from "./AnnouncementCard";
import { ScrollView, Button } from "react-native";
import { gql, useQuery } from "@apollo/client";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { DiscoveryStackParamList } from "../../index";
import Text from "../../../../core/components/Text";

export const GET_ANNOUNCEMENTS = gql`
  query getAnnouncements($subject: String!) {
    announcements(subject: $subject) {
      id
      title
      description
    }
  }
`;

type ClassDetailScreenRouteProp = RouteProp<DiscoveryStackParamList, "Details">;

const Announcements = () => {
  const route: ClassDetailScreenRouteProp = useRoute();
  const navigation = useNavigation();
  const subject: any | undefined = route?.params;
  const { loading, error, data } = useQuery(GET_ANNOUNCEMENTS, {
    variables: {
      subject: subject?.selectedSubject?.id,
    },
  });

  if (loading) {
    return <Text color="secondary">Loading...</Text>;
  }

  if (error) {
    return <Text color="error">{error}</Text>;
  }

  const handleOnPressAddAnnouncement = () => {
    console.log("Called!");
    navigation.navigate("AnnouncementForm", {
      ...subject,
    });
  };

  return (
    <ScrollView>
      <Button onPress={handleOnPressAddAnnouncement} title="Add announcement" />
      {/* TODO fix the type */}
      {data.announcements.map((announcement: any) => (
        <AnnouncementCard key={announcement.id} {...announcement} />
      ))}
    </ScrollView>
  );
};

export default Announcements;
