import React from "react";
import MySubjects from "./components/MySubjects";
import Details from "./components/Detail";
import { createStackNavigator } from "@react-navigation/stack";
import Announcements from "./components/announcement";
import AnnouncementForm from "./components/announcement/AnnouncementForm";
import { useAppSelector } from "../../hooks/redux";
import { Subject } from "../../types";
import Components from "../../core";
import Discussions from "./components/discussions";

export type DiscoveryStackParamList = {
  Home: undefined;
  Details: {
    selectedSubject: Subject;
  };
};

const DiscoveryStack = createStackNavigator();

const HomeScreen = () => <MySubjects />;

const AssignmentScreen = () => <Components.Camera />;
const AnnouncementScreen = () => <Announcements />;
const AnnouncementFormScreen = () => <AnnouncementForm />;
const DiscussionsScreen = () => <Discussions />;

const Discovery = ({}) => {
  const routeParams = useAppSelector((state) => state?.navigation?.params);

  return (
    <DiscoveryStack.Navigator>
      <DiscoveryStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "My Subjects",
        }}
      />
      <DiscoveryStack.Screen
        name="Details"
        component={Details}
        options={{
          title: routeParams.headerTitle,
        }}
      />
      <DiscoveryStack.Screen
        name="Announcement"
        component={AnnouncementScreen}
      />
      <DiscoveryStack.Screen
        name="AnnouncementForm"
        component={AnnouncementFormScreen}
      />
      <DiscoveryStack.Screen name="Discussions" component={DiscussionsScreen} />
      <DiscoveryStack.Screen name="Assignments" component={AssignmentScreen} />
    </DiscoveryStack.Navigator>
  );
};

export default Discovery;
