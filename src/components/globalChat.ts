import {
  listenGlobalChat,
  sendGlobalMessage,
  getCurrentPlayerName,
  getCurrentPlayerInfo,
} from "../server/server";

const sendSVG = `
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.9047 4.31477C12.2672 4.49582 12.2672 4.49582 12.637 4.68052C13.1936 4.95882 13.7491 5.23922 14.3038 5.52127C15.3425 6.04876 16.3873 6.56371 17.4325 7.07817C22.5166 9.5827 27.5875 12.1141 32.6596 14.6428C35.485 16.0513 38.3116 17.4571 41.14 18.8596C43.1413 19.8522 45.1411 20.8479 47.1398 21.8458C48.3292 22.4396 49.5193 23.032 50.7111 23.6211C51.8282 24.1733 52.9433 24.7293 54.057 25.2882C54.4649 25.4921 54.8734 25.6946 55.2827 25.8956C57.507 26.9889 59.2852 27.8776 60.5937 30.0782C60.9859 31.7647 60.9008 33.2307 60.1152 34.7784C59.0928 36.0987 57.7197 36.8372 56.2524 37.5598C56.0556 37.6587 55.8588 37.7576 55.6561 37.8595C55.0001 38.1886 54.3427 38.5149 53.6853 38.8411C53.2133 39.0772 52.7414 39.3134 52.2696 39.5498C50.9906 40.19 49.7104 40.8277 48.43 41.4649C47.0903 42.132 45.7518 42.8014 44.4132 43.4705C42.1662 44.5931 39.9184 45.7144 37.6702 46.8345C34.7823 48.2735 31.8955 49.7147 29.0091 51.1567C26.529 52.3957 24.0484 53.6338 21.5677 54.8717C20.7694 55.2701 19.9711 55.6686 19.1728 56.0671C17.9203 56.6923 16.6676 57.3169 15.4146 57.941C14.9541 58.1705 14.4936 58.4002 14.0332 58.6301C13.4065 58.943 12.7794 59.2552 12.1523 59.5673C11.9688 59.6591 11.7852 59.7509 11.5961 59.8455C9.88798 60.6939 8.32212 61.1504 6.43551 60.5792C5.01281 59.9273 4.20937 59.0376 3.42184 57.6876C2.76303 55.0523 3.68695 52.429 4.34371 49.8809C4.45607 49.4362 4.56817 48.9913 4.68002 48.5464C4.97333 47.3827 5.27017 46.2198 5.56777 45.0572C5.87154 43.8678 6.17193 42.6775 6.47262 41.4874C7.06178 39.1574 7.65468 36.8285 8.24996 34.5001C10.5345 34.2804 12.819 34.0608 15.1035 33.8415C16.1649 33.7395 17.2264 33.6376 18.2878 33.5355C20.4962 33.3231 22.7046 33.1114 24.9132 32.9015C26.0164 32.7965 27.1194 32.6898 28.2224 32.5819C28.7049 32.5357 29.1874 32.4895 29.6699 32.4434C29.8728 32.4231 30.0757 32.4027 30.2848 32.3817C31.7751 32.2418 33.2538 32.2305 34.75 32.2501C34.75 32.0851 34.75 31.9201 34.75 31.7501C34.5384 31.7575 34.5384 31.7575 34.3226 31.7651C31.8821 31.81 29.4704 31.5505 27.0439 31.3214C26.565 31.277 26.0861 31.2328 25.6072 31.1886C24.608 31.0963 23.6088 31.0031 22.6098 30.9093C21.333 30.7894 20.0562 30.6709 18.7793 30.5529C17.555 30.4397 16.3307 30.3259 15.1064 30.212C14.8751 30.1905 14.6437 30.169 14.4054 30.1469C13.7469 30.0856 13.0884 30.0239 12.43 29.962C12.2381 29.9442 12.0462 29.9264 11.8485 29.9081C10.6456 29.7945 9.44827 29.6551 8.24996 29.5001C7.59454 26.9365 6.94235 24.372 6.29421 21.8066C5.9931 20.6152 5.69092 19.4241 5.38619 18.2336C5.09181 17.0833 4.80036 15.9324 4.51087 14.7809C4.40028 14.3431 4.28865 13.9056 4.17594 13.4683C2.67503 7.63815 2.67503 7.63815 3.93258 5.43855C6.01501 2.56159 9.0644 2.83251 11.9047 4.31477Z" fill="black"/>
  </svg>
`;

function $(s: string) {
  const el = document.querySelector(s);
  if (!el) throw new Error(`Missing element: ${s}`);
  return el as HTMLElement;
}

function getName(): string {
  const input = document.getElementById(
    "player-name"
  ) as HTMLInputElement | null;
  const v = (input?.value ?? "").trim();
  return v.length >= 3 ? v.slice(0, 14) : getCurrentPlayerName();
}

function getColor(): string {
  const currentPlayer = getCurrentPlayerInfo();

  if (currentPlayer) {
    if (currentPlayer?.color) {
      return currentPlayer.color;
    }
  }

  return "#ff0000";
}

function fmt(n: number) {
  return n < 10 ? `0${n}` : String(n);
}

function timeFromTs(ts: number | null) {
  const d = ts ? new Date(ts) : new Date();
  return `${fmt(d.getHours())}:${fmt(d.getMinutes())}:${fmt(d.getSeconds())}`;
}

function createItem(
  ts: number | null,
  name: string,
  text: string,
  color: string,
  animated = false
) {
  const li = document.createElement("li");
  li.className = "gchat-log__item";

  const nm = document.createElement("span");
  nm.className = "gchat-log__name";
  nm.textContent = `[${timeFromTs(ts)}] ${name}:`;
  nm.style.color = color;

  const msg = document.createElement("span");
  msg.className = "gchat-log__msg";
  msg.append(nm);

  const words = text.split(" ");
  words.forEach((word) => {
    const wordSpan = document.createElement("span");
    wordSpan.textContent = word;

    msg.appendChild(wordSpan);
    msg.appendChild(document.createTextNode(" "));
  });

  if (animated) msg.style.animation = "slideIn 300ms ease forwards";

  li.appendChild(msg);
  return li;
}

export function initGlobalChat() {
  const input = $("#gchat-message") as HTMLInputElement;
  const btn = $("#gchat-send") as HTMLButtonElement;
  const list = $("#gchat-log-list") as HTMLUListElement;
  const logPanel = $("#gchat-log") as HTMLElement;

  const updateBtn = () => {
    const text = input.value.trim();
    btn.disabled = text.length === 0;
  };

  listenGlobalChat((messages) => {
    const frag = document.createDocumentFragment();
    const now = Date.now();

    for (let i = messages.length - 1; i >= 0; i--) {
      const m = messages[i];
      const ts = m.ts ?? now;

      const animated = now - ts <= 500;

      const li = createItem(ts, m.name, m.text, m.color, animated);
      frag.appendChild(li);
    }

    list.innerHTML = "";
    list.appendChild(frag);
  });

  input.addEventListener("input", updateBtn);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !btn.disabled) btn.click();
  });

  btn.addEventListener("click", async () => {
    const text = input.value.trim().slice(0, 200);
    if (!text) return;
    btn.disabled = true;
    try {
      await sendGlobalMessage(getName(), text, getColor());
      input.value = "";
      input.focus();

      logPanel.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      updateBtn();
    }
  });

  updateBtn();
}

export function loadSendBtnIcon() {
  const btn = document.querySelector("#gchat-send") as HTMLElement;
  btn.innerHTML = sendSVG;
}
