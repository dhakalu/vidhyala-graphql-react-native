import React from "react";
import Text from "../../../../core/components/Text";
import { View } from "react-native";
import theme from "../../../../core/theme";
import Avatar from "../../../../core/components/Avatar";
import { Comment } from "../../../../types";

const CommentCard = ({ content = "", creator }: Comment) => {
  return (
    <View style={{ flexDirection: "row", padding: theme.spacing.small }}>
      <Avatar />
      <View>
        <Text variant="medium">{creator?.name}</Text>
        <Text color="secondary" variant="small">
          {content}
        </Text>
      </View>
    </View>
  );
};

export default CommentCard;
