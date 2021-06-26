import React from 'react';

const Unit = ({content, onClick}) => {
    return (
            <div className="unit" onClick={onClick}>
                {content}
            </div>
        );
}
 
export default Unit;