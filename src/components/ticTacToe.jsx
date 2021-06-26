import React, { Component } from 'react';
import Unit from './unit';


class TicTacToe extends Component {
    state = {
        content: [
          [{id: 1, content: ""}, {id: 2, content: ""}, {id: 3, content: ""}],
          [{id: 4, content: ""}, {id: 5, content: ""}, {id: 6, content: ""}],
          [{id: 7, content: ""}, {id: 8, content: ""}, {id: 9, content: ""}],
        ],
        player: 'X'
      };
    
    handleClick = (row, col) => {
        if(col.content) return;

        const { content: allContent, player } = this.state;
        const content = [...allContent];
        const rowIndex = content.indexOf(row);
        content[rowIndex] = [...content[rowIndex]];
        const colIndex = content[rowIndex].indexOf(col);
        content[rowIndex][colIndex] = {...content[rowIndex][colIndex]};
        content[rowIndex][colIndex].content = player;
        
        this.setState({content, player: player === 'X' ? 'O' : 'X'});
    }

    handleReset = () => {
        const content = this.state.content.map(
            row => row.map(
                col => { 
                    return { ...col, content: "" }
                }
            )
        );
        this.setState({ content });
    };

    render() { 
        return (
            <React.Fragment>
                <div className="m-2">
                    {
                        this.state.content.map(
                        row => 
                            <div key={row[0].id} className="row mb-2">
                                {row.map(col => 
                                <div key={col.id} className="ml-2">
                                    <Unit content={col.content} onClick={() => this.handleClick(row, col)} />
                                </div>)}
                            </div>
                        )
                    }
                </div>
                <button className="btn btn-danger" onClick={this.handleReset}>Reset</button>
            </React.Fragment>
        );
    }
}
 
export default TicTacToe;