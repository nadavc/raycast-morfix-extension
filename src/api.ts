import axios from "axios"
import { parse } from "node-html-parser";


export async function fetchTranslations(word: string): Promise<string[]> {
    if (!word) {
        return [];
    }
    
    const response = await axios.get(`https://www.morfix.co.il/${word}`)

    if (response.status != 200) {
        throw new Error("unable to fetch the word");
    }

    const root = parse(response.data);
    const translations = root.querySelectorAll(".normal_translation_div");
  
    return translations.map(item => item.innerText.trim());
}

export async function fetchAutocomplete(partialWord: string): Promise<string[]> {
    console.log("search text is: " + partialWord);

    if (!partialWord) {
        return [];
    }
    const response = await axios.get(`https://www.morfix.co.il/AutoComplete/AutoComplete/GetHebrewAutoComplete/${partialWord}`);

    if (response.status != 200) {
        throw new Error("unable to fetch autocomplete");
    }

    return response.data.Results;
}