import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Discovery from "./discovery";
import { Text } from "react-native";
import { withAuth } from "../withAuth";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

type UnderDevelopmentProps = {
  name: string;
};

const UnderDevelopment = ({ name }: UnderDevelopmentProps) => (
  <Text>Feature {name} is under development. Stay tuned!</Text>
);

const Subjects = () => <Discovery />;

const underDevelopmentFeatures = [
  {
    name: "Posts",
  },
  {
    name: "Settings",
  },
  {
    name: "More",
  },
];

const Pages = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Subjects} />
        {underDevelopmentFeatures.map((feature) => {
          const currentComponent = () => (
            <UnderDevelopment name={feature.name} />
          );
          return (
            <Tab.Screen
              key={feature.name}
              name={feature.name}
              component={currentComponent}
            />
          );
        })}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default withAuth(Pages);
