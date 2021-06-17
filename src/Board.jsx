import Square from "./Square";

const Board = (props) => {
  // const val = useContext(GameStateContext);
  console.log("winning squares: ", props.winningLine);

  const renderSquare = (i) => {
    return (
      <Square
        isWinner={props.winningLine && props.winningLine.includes(i)}
        key={i}
        square={props.squares[i]}
        onClick={() => props.handleSquareClick(i)}
      />
    );
  };

  const createBoard = () => {
    const boardSize = 3;
    let squares = [];
    for (let i = 0; i < boardSize; i++) {
      let row = [];
      for (let j = 0; j < boardSize; j++) {
        row.push(renderSquare(i * boardSize + j));
      }
      squares.push(
        <div key={i} className="board-row">
          {row}
        </div>
      );
    }
    return squares;
  };

  const gameBoard = createBoard();

  return <div>{gameBoard}</div>;
};

export default Board;
