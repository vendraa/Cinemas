//Abstract Class
class Booking {
    constructor(movieId, theater, date, time, tickets) {
      if (new.target === Booking) {
        throw new Error('Cannot instantiate an abstract class!');
      }
      this.movieId = movieId;
      this.theater = theater;
      this.date = date;
      this.time = time;
      this.tickets = tickets;
    }
  
    calculateTotalPrice() {
      throw new Error('Abstract method must be implemented!');
    }
  
    //Encapsulation (Getters & Setters)
    getMovieId() {
      return this.movieId;
    }
  
    setMovieId(movieId) {
      this.movieId = movieId;
    }
  }
  
  //Inheritance
  class MovieBooking extends Booking {
    constructor(movieId, theater, date, time, tickets, pricePerTicket) {
      super(movieId, theater, date, time, tickets);
      this.pricePerTicket = pricePerTicket;
    }
  
    //Polymorphism
    calculateTotalPrice() {
      return this.tickets * this.pricePerTicket;
    }
  }
  
  //Inner Class
  class Seat {
    constructor(row, number) {
      this.row = row;
      this.number = number;
    }
  
    getSeatInfo() {
      return `${this.row}-${this.number}`;
    }
  }
  
  export { Booking, MovieBooking, Seat };
  