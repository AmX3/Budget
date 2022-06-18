// Using an inbuilt international number formatter, we can determine currency type (add $ infront of number) and number of digits after decimal place

export const currencyFormatter = new Intl.NumberFormat("en", {
    currency: "usd",
    style: "currency",
    minimumFractionDigits: 2,
});
