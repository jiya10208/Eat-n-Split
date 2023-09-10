import Button from "./Button";

export default function Friend({ name, img, balance }) {
  return (
    <li>
      <img src={img} alt="😁" />
      <h3> {name}</h3>
      <p className={balance > 0 ? "green" : balance === 0 ? "" : "red"}>
        {balance > 0
          ? `${name} owes you ${balance + 2 * balance} ₹`
          : balance === 0
          ? `You and ${name} are even`
          : `you owe ${name} ${Math.abs(balance)} ₹`}
      </p>
      <Button children="Select" />
    </li>
  );
}
