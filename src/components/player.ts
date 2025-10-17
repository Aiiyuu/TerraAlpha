import type { Player } from "../types/player.ts";

const elements: Element[] = [
  ...document.querySelectorAll('.dice-button'),
  ...document.querySelectorAll('.move-button'),
];

const chatElements: Element[] = [...document.querySelectorAll('.chat-wrapper')];

export type CreatePlayerResult = [
  (newState: Partial<Player>) => Player,
  () => Player,
]

/**
 * This function displays everything based on the provided current user ID.
 * @param id
 */
export function showPlayerContent(id: string) {
  elements.forEach(element => {
    if (element.classList.contains(String(id))) {
      element.classList.add('active');
      element.classList.remove('hidden');
    } else {
      element.classList.remove('active');
      element.classList.add('hidden');
    }
  });
}

/**
 * This function adds phrases.ts to the player chat block
 * @param id
 * @param message
 */
export function addMessage(id: string, message: string) {
  chatElements.forEach((chat: Element) => {
    if (chat.classList.contains(String(id))) {
      const chatItem: HTMLLIElement = document.createElement("li");
      chatItem.classList.add('chat-item');
      chatItem.innerHTML = `${message}`;

      chat.prepend(chatItem);
    }
  });
}

/**
 * This function removes all chat messages from the player chat block.
 * @param id - The identifier (as a class) used to find the correct chat element.
 */
export function removeAllMessages(id: string) {
  chatElements.forEach((chat: Element) => {
    if (chat.classList.contains(String(id))) {
      const chatItems = chat.querySelectorAll('.chat-item');
      chatItems.forEach((item) => item.remove());
    }
  });
}
