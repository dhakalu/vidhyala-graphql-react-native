import { View, Text, ScrollView } from "react-native";
import React from "react";
import { RouteProp } from "@react-navigation/native";

import { useRoute, useNavigation } from "@react-navigation/native";
import { DiscoveryStackParamList } from "../index";
import NavigationPill from "../../../core/components/NavigationPill";
import { Subject } from "../../../types";

type ClassDetailScreenRouteProp = RouteProp<DiscoveryStackParamList, "Details">;

type NavigationItem = {
  id: number;
  title: string;
};

const ClassDetail = ({}) => {
  const route: ClassDetailScreenRouteProp = useRoute();

  //   const classId = route?.params?.id;

  const currentClass: Subject | undefined = route?.params?.selectedSubject;

  if (currentClass === undefined) {
    console.error("Oops! There is no class to display.");
    return null;
  }

  const navigationItems = [
    {
      id: 1,
      title: "Announcement",
    },
    {
      id: 2,
      title: "Assignments",
    },
    {
      id: 3,
      title: "Discussions",
    },
    ,
    {
      id: 4,
      title: "Files",
    },
    {
      id: 5,
      title: "Members",
    },
  ];

  const navigation = useNavigation();

  // todo update the proper type of param
  const handleNavigationItemPress = (navigationItem: NavigationItem) => {
    navigation.navigate(navigationItem.title, { ...route.params });
  };

  return (
    <View>
      <ScrollView
        horizontal={true}
        style={{
          paddingTop: 24,
          paddingBottom: 24,
          display: "flex",
          flexDirection: "row",
        }}
      >
        {navigationItems.map((navigationItem) => {
          return navigationItem ? (
            <NavigationPill
              key={navigationItem?.id}
              {...navigationItem}
              onPress={() => handleNavigationItemPress(navigationItem)}
            />
          ) : null;
        })}
      </ScrollView>
      <Text>{JSON.stringify(currentClass)}</Text>
    </View>
  );
};

export default ClassDetail;
