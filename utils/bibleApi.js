// utils/bibleApi.js
import axios from "axios";

const API_BASE = "https://bible-api.com";

export const getVerse = async (reference) => {
  try {
    const res = await axios.get(
      `${API_BASE}/${encodeURIComponent(reference)}?translation=web`
    );
    return res.data;
  } catch (e) {
    console.log("getVerse error", e);
    return null;
  }
};

export const getChapter = async (book, chapter) => {
  try {
    const res = await axios.get(
      `${API_BASE}/${book}+${chapter}?translation=web`
    );
    return res.data;
  } catch (e) {
    console.log("getChapter error", e);
    return null;
  }
};
