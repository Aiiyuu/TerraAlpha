// state.ts
export type PlayerColor = 'red' | 'blue';
export type CellId = string;

export type ShipKind = 'mother' | 'simple';

export type ShipLocation =
  | { type: 'hand' }
  | { type: 'board'; cell: CellId }
  | { type: 'final'; lane: 0 | 1 | 2 };

export interface Ship {
  id: string;
  color: PlayerColor;
  kind: ShipKind;
  location: ShipLocation;
}

type Occupant = { shipId: string; color: PlayerColor };

type Listener<T> = (payload: T) => void;
type Events = {
  'ship:moved': { shipId: string; from: ShipLocation; to: ShipLocation; color: PlayerColor };
  'state:reset': {};
  'turn:changed': { color: PlayerColor };
};

class GameState {
  private ships = new Map<string, Ship>();
  private occupancy = new Map<CellId, Occupant>();
  private activeColor: PlayerColor = 'red';
  private listeners = new Map<keyof Events, Set<Listener<any>>>();

  on<K extends keyof Events>(event: K, cb: Listener<Events[K]>): () => void {
    const set = this.listeners.get(event) ?? new Set();
    set.add(cb as Listener<any>);
    this.listeners.set(event, set);
    return () => set.delete(cb as Listener<any>);
  }

  private emit<K extends keyof Events>(event: K, payload: Events[K]) {
    this.listeners.get(event)?.forEach(cb => cb(payload));
  }

  reset() {
    this.ships.clear();
    this.occupancy.clear();
    this.emit('state:reset', {});
  }

  // ---- Turn ----
  setTurn(color: PlayerColor) {
    this.activeColor = color;
    this.emit('turn:changed', { color });
  }
  getActiveColor(): PlayerColor {
    return this.activeColor;
  }

  // ---- Ships ----
  registerShip(ship: Ship) {
    this.ships.set(ship.id, ship);
    if (ship.location.type === 'board') {
      this.occupancy.set(ship.location.cell, { shipId: ship.id, color: ship.color });
    }
  }

  getShip(id: string) {
    return this.ships.get(id);
  }

  getOccupant(cell: CellId): Occupant | null {
    return this.occupancy.get(cell) ?? null;
  }
  isCellFree(cell: CellId): boolean {
    return !this.occupancy.has(cell);
  }

  moveShip(
    shipId: string,
    to: ShipLocation
  ) {
    const ship = this.ships.get(shipId);
    if (!ship) return;

    const from = ship.location;

    // release old cell if needed
    if (from.type === 'board') {
      this.occupancy.delete(from.cell);
    }

    // block new cell if board
    if (to.type === 'board') {
      if (this.occupancy.has(to.cell)) return; // invalid (зайнято)
      this.occupancy.set(to.cell, { shipId, color: ship.color });
    }

    ship.location = to;
    this.ships.set(shipId, ship);

    this.emit('ship:moved', { shipId, from, to, color: ship.color });
  }
}

export const gameState = new GameState();
