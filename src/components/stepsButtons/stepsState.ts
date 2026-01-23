export class StepsState {
  private streak: number[] = [];
  private selectedIndices: number[] = [];
  private total: number | null = null;
  private prevStreakKey = "";

  setStreak(streak: number[]): boolean {
    const key = streak.join(",");
    const changed = key !== this.prevStreakKey;
    if (changed) {
      this.streak = streak.slice();
      this.prevStreakKey = key;
      this.clearSelection();
    }
    return changed;
  }

  selectIndex(i: number): { total: number; indices: number[] } {
    if (i < 0 || i >= this.streak.length) return { total: this.total ?? 0, indices: this.selectedIndices.slice() };
    if (!this.selectedIndices.includes(i)) {
      this.selectedIndices.push(i);
      this.total = (this.total ?? 0) + this.streak[i];
    } else {
      this.selectedIndices = this.selectedIndices.filter(x => x !== i);
      const sum = this.selectedIndices.reduce((s, idx) => s + this.streak[idx], 0);
      this.total = this.selectedIndices.length ? sum : null;
    }
    return { total: this.total ?? 0, indices: this.selectedIndices.slice() };
  }

  clearSelection() {
    this.selectedIndices = [];
    this.total = null;
  }

  clear() {
    this.streak = [];
    this.prevStreakKey = "";
    this.clearSelection();
  }

  getSelectedIndices(): number[] {
    return this.selectedIndices.slice();
  }

  getTotal(): number | null {
    return this.total;
  }
}
