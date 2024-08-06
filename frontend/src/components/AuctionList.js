import React from 'react';
import AuctionItem from './AuctionItem';

function AuctionList({ items }) {
  return (
    <div className="auction-list">
      {items.map(item => (
        <AuctionItem 
          key={item._id}
          id={item._id}
          title={item.name}
          description={item.decription}
          image={item.imgUrl}
        />
      ))}
    </div>
  );
}

export default AuctionList;