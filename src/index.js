// Currently working on printing:
// The location for each move in the format (col, row) in the move history list.

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

	renderSquare(i) {
		return (
			<Square
				// props that will be sent to the children components
				value={this.props.squares[i]}
				// its conventional to use on[Event] names for props 
				// handle[Event] for the methods which handle the events
				onClick={() => this.props.onClick(i)}
			/>
		);
	}

	render() {
		return (
			<div>
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
	// lifting state up again
	// components have state by setting this.state in their constructors
	constructor(props) {
		// in JS classes, you need to always call super when
		// defining the constructor of a subclass.
		// All react component class that have a constructor SHOULD start w/
		// super(props)
		super(props);
		this.state = {
			history: [{
				squares: Array(9).fill(null),
			}],
			xNext: true,
			stepNumber: 0,
			// current: Array(9).fill(null),
		};
	}

	handleClick(i) {
		const history = this.state.history.slice(0, this.state.stepNumber + 1);
		const current = history[history.length - 1];
		// make a copy of the array: immutability is important
		const squares = current.squares.slice();

		if (calculateWinner(squares) || squares[i]) return;
		squares[i] = this.state.xNext ? 'X' : 'O';
		// when you call setSate, React auto updates the child components
		this.setState({
			// concat over push because of immutability
			history: history.concat([{
				squares: squares,
			}]),
			stepNumber: history.length,
			xNext: !this.state.xNext,
			//current: ,
		});
	}

	jumpTo(step) {
		this.setState({
			stepNumber: step,
			xNext: (step % 2) === 0,
		});
	}

	render() {
		const history = this.state.history;
		const current = history[this.state.stepNumber];
		const winner = calculateWinner(current.squares);

		const moves = history.map((step, move) => {
			console.log('step:', move);
			const description = move ?
				'Go to move #' + move + ' POS: ' + this.state.current :
				'Go to game start';
			return (
				// if we were displaying data from a database, 
				// DB IDs could be used as keys
				// Keys DO NOT need to be globally unique;
				// They only need to be unique between components and their siblings
				<li key={move}>
					<button
						onClick={() => this.jumpTo(move)}
					>
						{description}
					</button>
				</li>
			);
		});

		let status = '';
		status = !winner ? 'Next player: ' + (this.state.xNext ? 'X' : 'O') : 'Winner: ' + winner;

		return (
			<div className="game">
				<div className="game-board">
					<Board
						squares={current.squares}
						onClick={(i) => this.handleClick(i)}
					/>
				</div>
				<div className="game-info">
					<div>{status}</div>
					<ol>{moves}</ol>
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

