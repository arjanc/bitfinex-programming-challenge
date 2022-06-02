import React from 'react';

import './book.css';

const Book = ({ orders, alignment }) => {

    const columns = [
        { id: 'count', label: 'Count', style: {width: '50px', minWidth: '50px', maxWidth: '50px', textAlign: 'center'}},
        { id: 'amount', label: 'Amount', style: {minWidth: '25%', textAlign: 'right'}},
        { id: 'total', label: 'Total', style: {width: '65px', minWidth: '65px', maxWidth: '65px', textAlign: 'right' }},
        { id: 'price', label: 'Price', style: {minWidth: '25%', textAlign: 'right'}}];

    if (alignment === 'right') {
        columns.reverse()
    }
    return (
        <div className="book">
            <div className="bookHeader">
                {columns.map(col => (
                    <div style={col.style}>{col.id}</div>
                ))}
            </div>
            <div className="bookBody">
                {orders.map((order, index) => {
                    if (order) {
                        const total = order.count * order.amount;
                        const calculatedOrder = {
                            ...order,
                            total: total ? total.toFixed(4) : '',
                            amount: order.amount ? order.amount.toFixed(4) : ''
                        }
                        return (
                            <div className="bookRow" key={`order-${index}`}>
                                {columns.map(col => (
                                    <div style={col.style}>{calculatedOrder[col.id]}</div>
                                ))}
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
