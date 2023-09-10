import Button from "./Button";

export default function FormAddFriend() {
  return (
    <form className="form-add-friend">
      <label for=" ">👩🏽‍🤝‍👩🏻Friend name </label>
      <input type="text" />

      <label>🙋🏽 Image URL </label>
      <input type="url" />

      <Button children="Add" />
    </form>
  );
}
