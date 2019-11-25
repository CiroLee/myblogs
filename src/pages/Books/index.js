import React, { useState, useEffect } from 'react';
import BookCover from '@/components/BookCover';
import { getBookList } from '@/service/article';
const Books = props => {
    const [booklist,setBookList] = useState([]);
    useEffect(()=>{
        getBookList().then(resp=>{
            setBookList(resp.data)
        })
    },[]);
    return (
      <div className='global-wrapper'>
        {booklist.map(item => (
          <BookCover
            key={item.id}
            bookId={item.id}
            type={item.type}
            title={item.title}
            abstract={item.abstract}
          />
        ))}
      </div>
    );
}

export default Books;