type ProbeOptions = {
  mainBtn: HTMLButtonElement;
  getIsMyTurn: () => boolean;
  getIsStrikeEmpty: () => boolean;
  getRemainingSec?: () => number;
  thresholdSec?: number;
};

type ProbeApi = {
  onTick: (remainingSec: number) => void;
  notifyStrikeChanged: () => void;
  reset: () => void;
  destroy: () => void;
};

export function initAutoEndTurnProbe(opts: ProbeOptions): ProbeApi {
  const threshold = Math.max(0, opts.thresholdSec ?? 50);
  let logged = false;
  let lastRemaining = Number.POSITIVE_INFINITY;
  let destroyed = false;

  const getRemaining = () =>
    typeof opts.getRemainingSec === "function"
      ? opts.getRemainingSec()!
      : lastRemaining;

  const maybeEndTurn = () => {
    if (destroyed || logged) return;
    if (!opts.getIsMyTurn()) return;
    const remaining = getRemaining();
    if (!Number.isFinite(remaining)) return;
    if (remaining > threshold) return;
    if (!opts.getIsStrikeEmpty()) return;

    const btn = opts.mainBtn;
    const isDisabled = btn.classList.contains("disabled");
    const isEndTurn = btn.getAttribute("data-type") === "end-turn";
    if (isDisabled || !isEndTurn) return;

    logged = true;
    btn.click();
  };

  const onTick = (remainingSec: number) => {
    lastRemaining = Math.max(0, remainingSec);
    maybeEndTurn();
  };

  const notifyStrikeChanged = () => {
    maybeEndTurn();
  };

  const reset = () => {
    logged = false;
    lastRemaining = Number.POSITIVE_INFINITY;
  };

  const destroy = () => {
    destroyed = true;
  };

  return { onTick, notifyStrikeChanged, reset, destroy };
}
