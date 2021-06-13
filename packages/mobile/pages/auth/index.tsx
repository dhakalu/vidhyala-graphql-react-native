import { gql, useQuery } from "@apollo/client";
import React from "react";
import { View, Button } from "react-native";
import { useDispatch } from "react-redux";
import Text from "../../core/components/Text";
import theme from "../../core/theme";
import { login } from "../../redux/auth";
import { User } from "../../types";

const GET_USERS = gql`
  query {
    users {
      id
      username
      name
    }
  }
`;

const Auth = () => {
  const { data, loading, error } = useQuery(GET_USERS);

  const dispatch = useDispatch();

  const handleUserSelect = (user: User) => {
    console.log("logging in", user);
    dispatch(login({ user }));
  };

  if (loading) {
    return <Text>Loading....</Text>;
  }

  if (error) {
    return <Text>{JSON.stringify(error)}</Text>;
  }

  return (
    <View style={{ padding: theme.spacing.xLarge }}>
      <Text style={{ marginBottom: theme.spacing.large }}>
        Select User to log in with:
      </Text>
      {data.users.map((user: User) => (
        <View style={{ marginBottom: theme.spacing.large }} key={user.id}>
          <Button title={user.name} onPress={() => handleUserSelect(user)} />
        </View>
      ))}
    </View>
  );
};

export default Auth;
