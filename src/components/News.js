import Newsitem from './Newsitem'
import React, { useEffect,useState } from 'react'
import Spinner from './Spinner';
import PropTypes from 'prop-types'



const News =(props)=>{
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

const  capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
   


  const  updateNews=async()=> {
   props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false)
    props.setProgress(100);
  }

  useEffect(() => {
    document.title = "News - " + capitalize(props.category);
    updateNews();
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  
const handleNextClick = async () => {
    console.log("nxt");
    setPage( page + 1 );
   updateNews();
  }
 const handlePrevClick = async () => {
  setPage( page -1);
  updateNews();
  }
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{ margin: '35px 0px',marginTop:'90px' }}>Newsdekhlo - Top {capitalize(props.category)}  Headlines</h1>
        {loading && <Spinner />}
        <div className="row"  >
          {!loading && articles.map((element) => {
            return <div className="col-md-4" key={element.url} >
              <Newsitem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} /></div>


          })}

        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={handlePrevClick}>&larr; Previous</button>
          <button disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }



News.defaultProps = {
  country: 'in',
  pageSize: 8,
  catergory: 'general'
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number
}

export default News
