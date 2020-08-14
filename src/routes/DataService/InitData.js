import { Map, List, Record } from "immutable";

export default Map({
  urls: List([
    "https://movie.naver.com/movie/bi/mi/basic.nhn?code=182234",
    "https://movie.naver.com/movie/bi/mi/basic.nhn?code=192066",
  ]),
  urlCounter: 2,
  commonTags: List([
    "#content > div.article > div.mv_info_area > div.mv_info > h3 > a:nth-child(1)",
    "#content > div.article > div.section_group.section_group_frst > div:nth-child(1) > div > div > h5",
  ]),
  tagCounter: 2,
});

export const stateHead = Map({
  url: "URL",
  tags: List([]),
});

export const stateRow = Record({ url: "", tagResult: List([]) });

export const stateRows = List([]);
