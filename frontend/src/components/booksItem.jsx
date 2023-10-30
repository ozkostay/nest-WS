import React from 'react';

export default function BooksItem({ item, index, deleteItem, view }) {
  const id = item._id;
  return (
    <>
      <div>
        <span onClick={() => view(id)}>{`${index + 1} ${item.title}`}</span>
        <button onClick={() => deleteItem(id)}>Удалить</button>
      </div>

    </>
  )
};
