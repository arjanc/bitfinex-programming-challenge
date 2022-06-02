import React from 'react';

import './book.css';

const Book = ({ orders }) => {
    return (
        <div className="book">
            <div className="bookHeader">
                <div style={{width: '40px', minWidth: '40px', maxWidth: '40px'}}>Count</div>
                <div style={{minWidth: '25%', textAlign: 'right'}}>Amount</div>
                <div style={{width: '65px', minWidth: '65px', maxWidth: '65px',textAlign: 'right' }}>Total</div>
                <div style={{minWidth: '25%', textAlign: 'right'}}>Price</div>
            </div>
            <div className="bookBody">
                {orders.map((order, index) => {
                    if (order) {
                        return (
                            <div className="bookRow" key={`order-${index}`}>
                                <div style={{width: '40px', minWidth: '40px', maxWidth: '40px'}}>{order.count}</div>
                                <div style={{minWidth: '25%', textAlign: 'right'}}>{order.amount}</div>
                                <div style={{width: '65px', minWidth: '65px', maxWidth: '65px',textAlign: 'right' }}>{order.price * order.amount}</div>
                                <div style={{minWidth: '25%', textAlign: 'right'}}>{order.price}</div>
                            </div>
                        )
                    } else {
                        return null;
                    }
                })}
            </div>
        </div>
    )
}

export default Book;
