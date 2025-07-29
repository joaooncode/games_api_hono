export function getReturnDays(category: string): number {
  switch (category) {
    case "Bronze": return 9;
    case "Silver": return 7;
    case "Gold": return 5;
    case "Platinum": return 4;
    case "Diamond": return 3;
    default: return 7;
  }
}
