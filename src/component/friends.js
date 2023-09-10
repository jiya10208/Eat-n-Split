import Friend from "./friend";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function Friends() {
  const friends = initialFriends;
  return (
    <ul>
      {friends.map((el) => (
        <Friend
          name={el.name}
          img={el.image}
          key={el.id}
          balance={el.balance}
        />
      ))}
    </ul>
  );
}
