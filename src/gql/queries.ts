import { _, $_, comp } from "./lib";
const content = { content: _ };
const id = _("id");
const commentsQuery = {
  comment: {
    [$_]: { id: _ },
    ...id,
    ...content,
    user: {
      ...id,
      name: _
    },
    post: {
      title: _,
      user: {
        ...id
      }
    }
  }
};

export const comments = comp<{ commentId: number }>(commentsQuery);
