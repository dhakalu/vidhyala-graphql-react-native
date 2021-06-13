import React from "react";
import AssignmentCard from "./AssignmentCard";
import { View, Button } from "react-native";
import { gql, useQuery } from "@apollo/client";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { DiscoveryStackParamList } from "../../index";
import Text from "../../../../core/components/Text";

const GET_ASSIGNMENTS = gql`
  query getAssignments($subject: String!) {
    announcements(subject: $subject) {
      id
      title
      description
    }
  }
`;

type ClassDetailScreenRouteProp = RouteProp<DiscoveryStackParamList, "Details">;

const Assignments = () => {
  const route: ClassDetailScreenRouteProp = useRoute();
  const navigation = useNavigation();
  const subject: any | undefined = route?.params;
  const { loading, error, data } = useQuery(GET_ASSIGNMENTS, {
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

  const handleOnPressAddAssignment = () => {
    navigation.navigate("AssignmentForm", {
      ...subject,
    });
  };

  return (
    <View>
      <Button onPress={handleOnPressAddAssignment} title="Add Assignment" />
      {/* TODO fix the type */}
      {data.assignments.map((assignment: any) => (
        <AssignmentCard {...assignment} />
      ))}
    </View>
  );
};

export default Assignments;
