import * as React from "react";
import {
  ChoiceGroup,
  IChoiceGroupOption,
} from "@fluentui/react/lib/ChoiceGroup";
import { PreferencesContext } from "../../../context/PreferencesContext";
import { useContext } from "react";

const options: IChoiceGroupOption[] = [
  {
    key: "1",
    text: "Any Category",
    iconProps: { iconName: "SocialListeningLogo" },
  },
  { key: "11", text: "Film", iconProps: { iconName: "MyMoviesTV" } },
  {
    key: "12",
    text: "Music",
    iconProps: { iconName: "MusicInCollectionFill" },
  },
  {
    key: "15",
    text: "Video Games",
    iconProps: { iconName: "Game" },
  },
  {
    key: "18",
    text: "Computers",
    iconProps: { iconName: "ThisPC" },
  },
  {
    key: "19",
    text: "Mathematics",
    iconProps: { iconName: "NumberField" },
  },
  {
    key: "20",
    text: "Mythology",
    iconProps: { iconName: "EmojiTabSymbols" },
  },
  { key: "21", text: "Sports", iconProps: { iconName: "Baseball" } }, //MoreSports
  { key: "23", text: "History", iconProps: { iconName: "BookAnswers" } },
  { key: "27", text: "Animals", iconProps: { iconName: "BugSolid" } },
  { key: "28", text: "Vehicles", iconProps: { iconName: "Car" } },
  { key: "29", text: "Comics", iconProps: { iconName: "GreetingCard" } },
];

export const ChoiceGroupIconExample: React.FunctionComponent = () => {
  const { setPreferences } = useContext(PreferencesContext);

  const [selectedKey, setSelectedKey] = React.useState<string | undefined>("");
  const onChange = React.useCallback(
    (ev: React.SyntheticEvent<HTMLElement>, { key,text }) => {
      console.log(key);
      setSelectedKey(key);
      setPreferences(
        (p) => ({ ...p, idCategory: key,nameCategory:text })
        );
    },
    []
  );

  return (
    <ChoiceGroup
      selectedKey={selectedKey}
      options={options}
      onChange={onChange}
      label="Pick category"
    />
  );
};
