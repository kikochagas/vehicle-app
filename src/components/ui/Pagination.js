import React, { useEffect, useState } from 'react'

export const Pagination = ({pages, setCurrentPage,currentItems,totalItems, setItemsPerPage, itemsPerPage}) => {

    const numOfPages = []

    for (let i = 1; i <= pages; i++) {
        numOfPages.push(i);
    }

    const [currentButton, setCurrentButton] = useState(1)


    

    const onChangeSelect = (e) => {
        setItemsPerPage(parseInt(e.target.value))
      };

    useEffect(() => {
      setCurrentPage(currentButton)
    
    }, [currentButton, setCurrentPage])
    


  return (
    <div className="clearfix">
        <div className="hint-text">Showing <b>{currentItems?.length}</b> out of <b>{totalItems?.length}</b> entries</div>

        <ul className="pagination">
        <li className='page-item'>
        <select value={itemsPerPage} onChange={(e)=>{onChangeSelect(e)}}>
            <option value="10">10</option>
            <option value="50">50</option>
            <option value="1000">All</option>
        </select>
        </li>


            <li className={`${currentButton === 1 ? 'page-item disabled' : 'page-item' }`}><a href="#!"
                onClick = { () => setCurrentButton((prev) => prev === 1 ? prev : prev - 1)}
            >Previous</a></li>
            {
                numOfPages.map((page, index) => {
                    return (
                        <li key={index} className={`${currentButton === page ? 'page-item active' : 'page-item' }`}><a href="#!" className="page-link"
                            onClick = {()=>setCurrentButton(page)}
                        >{page}</a></li> 
                    )
                })

            }

            <li className={`${currentButton === numOfPages.length ? 'page-item disabled' : 'page-item' }`}><a href="#!"
                    onClick = { () => setCurrentButton((next) => next === numOfPages.length ? next : next + 1)}
            >Next</a></li>
        </ul>
    </div>
  )
}