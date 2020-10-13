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
class Square extends Component {
	// components have state by setting this.state in their constructors
	constructor(props) {
		// in JS classes, you need to always call super when
		// defining the constructor of a subclass.
		// All react component class that have a constructor SHOULD start w/
		// super(props)
		super(props);
		this.state = {
			value: null,
			clicked: false,
		}
	}

	// render method
	render() {
		return (
			// onClick passes in a function
			// inorder to remember things in react components use state
			<button
				className="square"
				// by calling this.setState we tell React to re-render that square
				// whenever its button is clicked
				onClick={() =>
					this.state.clicked ?
						// when you call setSate, React auto updates the child components
						this.setState({ value: null, clicked: false }) :
						this.setState({ value: 'X', clicked: true })
				}
			>
				{/* Passed a prop from a parent Board to a child square */}
				{this.state.value}
			</button>
		);
	}
}

class Board extends Component {
	renderSquare(i) {
		return <Square value={i} />;
	}

	render() {
		const status = 'Next player: X';

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

// ========================================

ReactDOM.render(
	<Game />,
	document.getElementById('root')
);

