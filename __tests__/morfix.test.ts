import axios from "axios";
import fs from "fs";
import { fetchTranslations, fetchAutocomplete } from "../src/api"


test("parses out the meaning of the word", async () => {
  // Setup
  const resp = {
    status: 200,
    statusText: "OK",
    data: fs.readFileSync("__tests__/word.html"),
  }
  axios.get = jest.fn();
  (axios.get as jest.Mock).mockResolvedValue(resp); // required because TypeScript can't infer this. 

  // When
  const result = await fetchTranslations("word");
  
  // Then
  expect(result).toHaveLength(2);
  expect(result[0]).toBe("מִלָּה; הוֹרָאָה, פְּקֻדָּה; מֵידָע, יְדִיעָה; הַבְטָחָה");
  expect(result[1]).toBe("הִבִּיעַ, בִּטֵּא, אָמַר");
});

test("uses autocomplete", async () => {
  // Setup
  const resp = {
    status: 200,
    statusText: "OK",
    data: JSON.parse(fs.readFileSync("__tests__/autocomplete.json", "utf-8")),
  }
  axios.get = jest.fn();
  (axios.get as jest.Mock).mockResolvedValue(resp); // required because TypeScript can't infer this. 

  // When
  const result = await fetchAutocomplete("wor");
  
  // Then
  expect(result).toHaveLength(10);
  expect(result[9]).toBe("worthy");
});