const Square = (props) => {
  return (
    <button onClick={() => props.onClick()} className="square">
      {props.square}
    </button>
  );
};

export default Square;
