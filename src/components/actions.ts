import { getCurrentPlayerName } from "../server/server";
import { ActionTypes, type Action } from "../types/action";
import { HelperTypes, triggerHelper } from "./helper";
import { handleReset } from "./reset";

const showedActions: Action["id"][] = [];

export function syncActions(actions: Action[]) {
  for (const action of actions) {
    if (showedActions.includes(action.id)) continue;

    if (action.authorName !== getCurrentPlayerName()) {
      showedActions.push(action.id);
      
      const actionType =
        action.type === ActionTypes.INFORM
          ? HelperTypes.HELPER_WARNING
          : HelperTypes.HELPER_OFFER;

      triggerHelper({
        duration: action.duration,
        text: action.text,
        type: actionType,
        ...handleReset,
      });
    }
  }
}
