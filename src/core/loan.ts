export class Loan {
  principal: number;
  rateAPR: number;
  termDays: number;
  paymentPerDay: number;
  outstanding: number;
  nextDue: number;

  constructor(principal: number, rateAPR: number, termDays: number) {
    this.principal = principal;
    this.rateAPR = rateAPR;
    this.termDays = termDays;
    const r = rateAPR / 365;
    this.paymentPerDay = (principal * r) / (1 - Math.pow(1 + r, -termDays));
    this.outstanding = principal;
    this.nextDue = 1;
  }

  processDay(): number {
    if (this.outstanding <= 0) return 0;
    const r = this.rateAPR / 365;
    const interest = this.outstanding * r;
    const principalPayment = Math.min(this.paymentPerDay - interest, this.outstanding);
    this.outstanding -= principalPayment;
    this.nextDue += 1;
    return this.paymentPerDay;
  }
}
