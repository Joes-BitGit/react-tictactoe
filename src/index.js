import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/**
 * Square Component: renders a single button
 * Board Component: renders 9 squares
 * Game Component renders a board
 */

// react componenet class 
// or react component type
/**
 * A Component takes in parameters, called props.
 * Then they return a hierarchy of views to display via the render method
 */
function Square(props) {
	return (
		<button
			className="square"
			onClick={props.onClick}
		>
			{props.value}
		</button>
	);
}

class Board extends Component {

	// components have state by setting this.state in their constructors
	constructor(props) {
		// in JS classes, you need to always call super when
		// defining the constructor of a subclass.
		// All react component class that have a constructor SHOULD start w/
		// super(props)
		super(props);
		this.state = {
			squares: Array(9).fill(null),
			xNext: true,
		};
	}

	handleClick(i) {
		// make a copy of the array: immutability is important
		const box = this.state.squares.slice();
		if (calculateWinner(box) || box[i]) return;
		box[i] = this.state.xNext ? 'X' : 'O';
		this.setState({
			squares: box,
			xNext: !this.state.xNext,
		});
	}

	renderSquare(i) {
		return (
			<Square
				// props that will be sent to the children components

				// when you call setSate, React auto updates the child components
				value={this.state.squares[i]}
				// its conventional to use on[Event] names for props 
				// handle[Event] for the methods which handle the events
				onClick={() => this.handleClick(i)}
			/>
		);
	}

	render() {
		const winner = calculateWinner(this.state.squares);
		let status = '';
		status = !winner ? 'Next player: ' + (this.state.xNext ? 'X' : 'O') : 'Winner: ' + winner;

		return (
			<div>
				<div className="status">{status}</div>
				<div className="board-row">
					{this.renderSquare(0)}
					{this.renderSquare(1)}
					{this.renderSquare(2)}
				</div>
				<div className="board-row">
					{this.renderSquare(3)}
					{this.renderSquare(4)}
					{this.renderSquare(5)}
				</div>
				<div className="board-row">
					{this.renderSquare(6)}
					{this.renderSquare(7)}
					{this.renderSquare(8)}
				</div>
			</div>
		);
	}
}

class Game extends Component {
	render() {
		return (
			<div className="game">
				<div className="game-board">
					<Board />
				</div>
				<div className="game-info">
					<div>{/* status */}</div>
					<ol>{/* TODO */}</ol>
				</div>
			</div>
		);
	}
}

function calculateWinner(squares) {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
		}
	}
	return null;
}

// ========================================

ReactDOM.render(
	<Game />,
	document.getElementById('root')
);

