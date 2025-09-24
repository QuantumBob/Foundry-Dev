import { MergeJournalsDialog } from "../dialogs/merge-journals-dialog.js";

const mergeJournals = (li) => {
  new MergeJournalsDialog(li).render(true);
};

export { mergeJournals };
