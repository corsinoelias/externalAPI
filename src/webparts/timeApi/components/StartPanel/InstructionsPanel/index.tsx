import * as React from "react";
import { Text } from "@fluentui/react/lib/Text";
const InstructionsPanel = () => {
  return (
    <div>
      <Text variant="large">Instructions: </Text>
      <Text variant="medium">
        First at all, choose difficulty and then choose one category from list.
      </Text>
      <br />
      <Text variant="medium">Finally, press on <u>START QUIZ</u> .</Text>
      <br />
    </div>
  );
};

export default InstructionsPanel;
