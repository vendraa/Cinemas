class Seat {
  constructor(row, number, isAvailable = true) {
    this.row = row;
    this.number = number;
    this.isAvailable = isAvailable;
  }

  getSeatLabel() {
    return `${this.row}${this.number}`;
  }
}

class UserSeat extends Seat {
  constructor(row, number) {
    super(row, number, true); 
    this.isSelected = false; 
  }

  selectSeat() {
    if (!this.isAvailable) {
      throw new Error(`Seat ${this.getSeatLabel()} is not available.`);
    }
    this.isSelected = true;
  }

  deselectSeat() {
    this.isSelected = false;
  }
}

class SeatFactory {
  static createSeat(row, number, isAvailable = true) {
    if (isAvailable) {
      return new UserSeat(row, number);
    }
    return new Seat(row, number, false);
  }
}

export { Seat, UserSeat, SeatFactory };
