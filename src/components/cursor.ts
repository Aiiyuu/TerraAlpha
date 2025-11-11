import cursorRegular from "../assets/icons/cursor-regular.svg";
import cursorBlocked from "../assets/icons/cursor-blocked.svg";
import cursorPointer from "../assets/icons/cursor-pointer.svg";

export function getRegularCursor() {
  return `url('${cursorRegular}') 8 8, auto`;
}

export function getBlockedCursor() {
  return `url('${cursorBlocked}') 8 8, not-allowed`;
}

export function getPointerCursor() {
  return `url('${cursorPointer}') 8 8, pointer`;
}
