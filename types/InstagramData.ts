import { InstagramPost } from "./InstagramPost";

export interface InstagramData {
  data: {
    items: InstagramPost[];
  };
}
