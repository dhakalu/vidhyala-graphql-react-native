import React from "react";
import Text from "../../../../core/components/Text";
import Card from "../../../../core/components/Card";

// todo move this to central place
type User = {
  email?: string;
  username?: string;
  name?: string;
};

type AnnouncementCardProps = {
  title: string;
  description: string;
  postedBy?: User | null;
};

const AnnouncementCard = ({
  title = "",
  description = "",
  postedBy = null,
}: AnnouncementCardProps) => {
  return (
    <Card>
      <Text variant="large" color="primary">
        {" "}
        {title}{" "}
      </Text>
      {postedBy && (
        <Text variant="small" color="secondary">
          Wosted by {postedBy.name}
        </Text>
      )}
      <Text variant="medium" color="secondary">
        {description}
      </Text>
    </Card>
  );
};

export default AnnouncementCard;
