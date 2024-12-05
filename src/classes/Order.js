//Abstract Class
class Order {
  constructor(orderId, bookingDetails, selectedSeats, totalPrice, paymentDetails = null) {
    if (new.target === Order) {
      throw new Error("Cannot instantiate an abstract class!");
    }
    this.orderId = orderId;
    this.bookingDetails = bookingDetails;
    this.selectedSeats = selectedSeats;
    this.totalPrice = totalPrice;
    this.paymentDetails = paymentDetails; // New property
  }

  //Abstract Method
  generateTransaction() {
    throw new Error("Abstract method must be implemented!");
  }

  //Encapsulation
  getOrderId() {
    return this.orderId;
  }

  setOrderId(orderId) {
    this.orderId = orderId;
  }

  getTotalPrice() {
    return this.totalPrice;
  }

  setTotalPrice(totalPrice) {
    this.totalPrice = totalPrice;
  }

  setPaymentDetails(paymentDetails) {
    this.paymentDetails = paymentDetails;
  }

  getPaymentDetails() {
    return this.paymentDetails;
  }
}

//Concrete Class
class MovieOrder extends Order {
  //Polymorphism
  generateTransaction() {
    return {
      transactionId: this.orderId,
      theater: this.bookingDetails.theater,
      date: this.bookingDetails.date,
      movieTitle: this.bookingDetails.title,
      tickets: this.selectedSeats.map((seat) => `${seat.row}${seat.number}`).join(", "),
      time: this.bookingDetails.time,
    };
  }
}


//Inner Class
class PaymentDetails {
  constructor(paymentMethod, paymentStatus) {
    this.paymentMethod = paymentMethod;
    this.paymentStatus = paymentStatus;
  }

  getPaymentInfo() {
    return `Payment Method: ${this.paymentMethod}, Status: ${this.paymentStatus}`;
  }
}

export { Order, MovieOrder, PaymentDetails };
