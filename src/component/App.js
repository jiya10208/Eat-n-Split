// import Friends from "./friends";
// import Button from "./Button";
// import FormAddFriend from "./FormAddFriend";

import { React, useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Anamika",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Srestha",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Vishnu",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function App() {
  const [friends, setFriends] = useState(initialFriends);

  const [addFriendButton, SetAddFriendButton] = useState(false);

  const [SelectedFriend, setSelectedFriend] = useState(null);

  function HandleShowAddFriend() {
    SetAddFriendButton((addFriendButton) => !addFriendButton);
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    SetAddFriendButton(false);
  }

  function handleSelection(friend) {
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    SetAddFriendButton(false);
  }

  function handlesplit(value) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === SelectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelectedFriend(null);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <Friends
          friends={friends}
          onSelection={handleSelection}
          SelectedFriend={SelectedFriend}
        />

        {addFriendButton && <FormAddFriend OnAddFriend={handleAddFriend} />}

        <Button
          onClick={HandleShowAddFriend}
          children={addFriendButton === true ? "Close" : "Add friend"}
        />
      </div>
      {SelectedFriend && (
        <SplitBill
          SelectedFriend={SelectedFriend}
          onsplitBill={handlesplit}
          key={SelectedFriend.id}
        />
      )}
    </div>
  );
}

function Button({ children, onClick }) {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  );
}

function Friends({ friends, onSelection, SelectedFriend }) {
  return (
    <ul>
      {friends.map((el) => (
        <Friend
          friend={el}
          key={el.id}
          onSelection={onSelection}
          SelectedFriend={SelectedFriend}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, onSelection, SelectedFriend }) {
  const isSelected = SelectedFriend?.id === friend.id;
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt="😁" />
      <h3> {friend.name}</h3>
      <p
        className={
          friend.balance > 0 ? "green" : friend.balance === 0 ? "" : "red"
        }
      >
        {friend.balance > 0
          ? `${friend.name} owes you ${friend.balance} ₹`
          : friend.balance === 0
          ? `You and ${friend.name} are even`
          : `you owe ${friend.name} ${Math.abs(friend.balance)} ₹`}
      </p>
      <button onClick={() => onSelection(friend)} className="button">
        {isSelected ? "Close" : "Select"}
      </button>
    </li>
  );
}
function FormAddFriend({ OnAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;
    const id = crypto.randomUUID();
    const newFriend = {
      name,
      balance: 0,
      id,
      image: `${image}?=$id`,
    };
    OnAddFriend(newFriend);
    console.log(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/48");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label for=" ">👩🏽‍🤝‍👩🏻Friend name </label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>🙋🏽 Image URL </label>
      <input
        type="url"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <Button children="Add" />
    </form>
  );
}

function SplitBill({ SelectedFriend, onsplitBill }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const paidByfriend = bill ? bill - paidByUser : "";
  const [whoIspaying, SetwhoIpaying] = useState("user");

  function handleSubmit(e) {
    e.preventDefault();

    if (!bill || !paidByUser) return;

    onsplitBill(whoIspaying === "user" ? paidByfriend : -paidByUser);
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>SPLIT A BILL WITH {SelectedFriend.name}</h2>
      <label>💰Bill value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(e.target.value)}
      />

      <label>🙆🏽‍♂️Your expense</label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(
            Number(e.target.value) > bill ? paidByUser : Number(e.target.value)
          )
        }
      />

      <label> {SelectedFriend.name}'s expense</label>
      <input type="text" disabled value={paidByfriend} />

      <label>🤑 who's paying the bill</label>
      <select
        value={whoIspaying}
        onChange={(e) => SetwhoIpaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{SelectedFriend.name}</option>
      </select>
      <Button children={"Split Bill"} />
    </form>
  );
}

export default App;
