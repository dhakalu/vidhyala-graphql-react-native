import React, { ReactElement } from "react";
import SubjectCard from "./SubjectCard";
import { useNavigation } from "@react-navigation/native";
import { Subject } from "../../../types";
import Text from "../../../core/components/Text";

import styled from "styled-components/native";
import theme from "../../../core/theme";
import { useDispatch } from "react-redux";
import { addParameter } from "../../../redux/routes";

import { gql, useQuery } from "@apollo/client";
import ApolloErrorParser from "../../../core/components/ApolloErrorParser";

const GET_SUBJECTS = gql`
  query {
    subjects {
      id
      title
      description
    }
  }
`;

const Wrapper = styled.ScrollView`
  background-color: ${theme.palette.background.dark};
`;

const MySubjects = (): ReactElement => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const { loading, error, data } = useQuery(GET_SUBJECTS);

  if (loading) return <Text variant="medium">Loading...</Text>;
  if (error) {
    return <ApolloErrorParser error={error} />;
  }

  const onCardPressed = (subject: Subject) => {
    navigation.navigate({
      name: "Details",
      params: {
        selectedSubject: subject,
      },
    });
    dispatch(
      addParameter({
        key: "headerTitle",
        value: subject.title,
      })
    );
    return true;
  };

  return (
    <Wrapper>
      {data.subjects.map((subject: Subject) => (
        <SubjectCard
          {...subject}
          key={subject.id}
          onPress={() => onCardPressed(subject)}
        />
      ))}
    </Wrapper>
  );
};

export default MySubjects;
