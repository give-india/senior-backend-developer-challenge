export default interface Account {
  id: number;
  userId: number;
  type: "Savings" | "Current" | "BasicSavings";
  balance: number;
}
