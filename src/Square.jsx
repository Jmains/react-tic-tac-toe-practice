const Square = (props) => {
  return (
    <button
      onClick={() => props.onClick()}
      className={props.isWinner ? "square win" : "square"}
    >
      {props.square}
    </button>
  );
};

export default Square;
