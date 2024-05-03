import { useState } from "react";
import { Action, ActionPanel, Detail, List } from "@raycast/api";
import { fetchAutocomplete, fetchTranslations } from "./api";
import { usePromise } from "@raycast/utils";

export default function Command() {
  const [searchText, setSearchText] = useState<string>("");
  const [selectedWord, setSelectedWord] = useState<string>("");

  const { data: acData, isLoading: acLoading } = usePromise(fetchAutocomplete, [searchText]);
  const { data: wordData, isLoading: wordIsLoading } = usePromise(fetchTranslations, [selectedWord]);

  if (selectedWord) {
    return <Detail navigationTitle={selectedWord} isLoading={wordIsLoading} markdown={wordData?.join("\n")} />;
  }

  return (
    <List isLoading={acLoading} filtering={false} onSearchTextChange={setSearchText} navigationTitle="Search Morfix">
      {acData?.map((item: string) => (
        <List.Item
          key={item}
          title={item}
          actions={
            <ActionPanel>
              <Action title="Select" onAction={() => setSelectedWord(item)} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
