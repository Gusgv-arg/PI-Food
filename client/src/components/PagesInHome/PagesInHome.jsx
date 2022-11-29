import React from "react"
import "./PagesInHome.css"

function PagesInHome ({recipesPerPage, recipesApi, paginado}){
    const pageNumbers=[]

    for (let i=1; i<=Math.ceil(recipesApi/recipesPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <div className="all-pages">            
                {
                    pageNumbers && 
                    pageNumbers.map(number=>(
                                              
                    <div key={number} className="page">
                        <a onClick={()=>paginado(number)}>{number}</a>
                    </div>
                    ))
                }

            
        </div>


    )
}

export default PagesInHome