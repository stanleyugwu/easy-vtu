/**
 * Formats given amount with commas e.g 2,000,000
 */
const formatAmt = (amount: number | string) =>
  amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export default formatAmt;
