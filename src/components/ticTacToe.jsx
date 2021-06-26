import React, { Component } from 'react';
import Unit from './unit';


class TicTacToe extends Component {
    state = {
        content: [
          [{id: 1, content: ""}, {id: 2, content: ""}, {id: 3, content: ""}],
          [{id: 4, content: ""}, {id: 5, content: ""}, {id: 6, content: ""}],
          [{id: 7, content: ""}, {id: 8, content: ""}, {id: 9, content: ""}],
        ],
        player: 'X',
        winner: ''
      };
    
    handleClick = (row, col) => {
        const { content: allContent, player, winner } = this.state;
        if (col.content) return;
        if (winner) return;
        
        const content = [...allContent];
        const rowIndex = content.indexOf(row);
        content[rowIndex] = [...content[rowIndex]];
        const colIndex = content[rowIndex].indexOf(col);
        content[rowIndex][colIndex] = {...content[rowIndex][colIndex]};
        content[rowIndex][colIndex].content = player;
        
        this.setState({content, player: player === 'X' ? 'O' : 'X'});
        this.findWinner();
    }

    handleReset = () => {
        const content = this.state.content.map(
            row => row.map(
                col => { 
                    return { ...col, content: "" }
                }
            )
        );
        this.setState({ content, winner: '' });
    };

    findWinner = () => {
        const { content } = this.state;
        const getColumn = (i) => content.map(row => row[i]);
        for (let i = 0; i < 3; i++) {
            if (content[i][0].content && content[i].every(e => content[i][0].content === e.content)) 
                return this.setState({ winner:  content[i][0].content });
            if (content[0][i].content && getColumn(i).every(e => content[0][i].content === e.content)) 
                return this.setState({ winner:  content[0][i].content });
        }
    }

    render() { 
        const { winner, content } = this.state;

        return (
            <React.Fragment>
                <div className="m-2">
                    {
                        content.map(
                            (row, i) =>
                                <div key={i} className="row mb-2">
                                    {row.map(
                                        (col, j) => 
                                            <div key={j} className="ml-2">
                                                <Unit 
                                                    content={col.content} 
                                                    onClick={() => this.handleClick(row, col)} 
                                                />
                                            </div>)
                                    }
                                </div>
                            )
                    }
                </div>
                <button className="btn btn-danger" onClick={this.handleReset}>Reset</button>
                { winner && <span className="ml-4 badge badge-pill badge-secondary p-2">Player {winner} won</span> }
            </React.Fragment>
        );
    }
}
 
export default TicTacToe;