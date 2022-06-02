import React from 'react';

import './book.css';

const Book = ({ orders, alignment = 'left' }) => {
    const sortedOrders = [...orders];
    const columns = [
        { id: 'count', label: 'Count', style: {width: '50px', minWidth: '50px', maxWidth: '50px', textAlign: 'center'}},
        { id: 'amount', label: 'Amount', style: {minWidth: '25%', textAlign: 'right'}},
        { id: 'total', label: 'Total', style: {width: '65px', minWidth: '65px', maxWidth: '65px', textAlign: 'right' }},
        { id: 'price', label: 'Price', style: {minWidth: '25%', textAlign: 'right'}}];

    if (alignment === 'right') {
        columns.reverse()
    }

    if (sortedOrders.length > 0) {
        sortedOrders.sort((a,b) => (a.count < b.count) ? 1 : -1)
    }
    return (
        <div className="book">
            <div className="bookHeader">
                {columns.map((col, index) => (
                    <div style={col.style} key={`head-${Math.random() * 20}-${index}`}>{col.id}</div>
                ))}
            </div>
            <div className="bookBody">
                {sortedOrders.map((order, index) => {
                    if (order) {
                        const total = order.count * order.amount;
                        const calculatedOrder = {
                            ...order,
                            total: total ? total.toFixed(4) : '',
                            amount: order.amount ? order.amount.toFixed(4) : ''
                        }
                        return (
                            <div className="bookRow" key={`order-${index}-${total}`}>
                                {columns.map(col => (
                                    <div style={col.style} key={`col-${index}${Math.random() * 20}`}>{calculatedOrder[col.id]}</div>
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
