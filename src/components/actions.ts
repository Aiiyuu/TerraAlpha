import { getCurrentPlayerName } from "../server/server";
import { ActionTypes, type Action } from "../types/action";
import { HelperTypes, triggerHelper } from "./helper";
import { handleReset } from "./reset";

const showedActions: Action["id"][] = [];

function getHelperType(actionType: ActionTypes) {
  switch (actionType) {
    case ActionTypes.RESET:
      return HelperTypes.HELPER_OFFER;
    case ActionTypes.INFORM:
      return HelperTypes.HELPER_INFORM;
    case ActionTypes.WARNING:
      return HelperTypes.HELPER_WARNING;
    case ActionTypes.HINT:
    default:
      return HelperTypes.HELPER_HINT;
  }
}

export function syncActions(actions: Action[]) {
  for (const action of actions) {
    if (showedActions.includes(action.id)) continue;

    if (action.authorName !== getCurrentPlayerName()) {
      showedActions.push(action.id);

      triggerHelper({
        duration: action.duration,
        text: action.text,
        type: getHelperType(action.type),
        ...handleReset,
      });
    }
  }
}
