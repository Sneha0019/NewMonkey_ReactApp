
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
import React, {useEffect, useState} from "react";


const News = (props)=> {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);




   const updateNews = async()=>{
    props.setProgress(5);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    props.setProgress(30);
    let data = await fetch(url);
    props.setProgress(60);
    let parsedData = await data.json();
    props.setProgress(80);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);

   props.setProgress(100);

   }
   
   useEffect(()=>{
    document.title = `${props.category} - NewsMonkey`;
    updateNews();
    //eslint-disable-next-line
   },[])


  // const updateNews = async () => {
  //   try {
  //     props.setProgress(5);
  //     const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
  //     setLoading(true);
  //     props.setProgress(30);
  
  //     let data = await fetch(url);
  
  //     if (!data.ok) {
  //       throw new Error(`Failed to fetch: ${data.status} - ${data.statusText}`);
  //     }
  
  //     props.setProgress(60);
  //     let parsedData = await data.json();
  //     props.setProgress(0);
  
  //     setArticles(parsedData.articles);
  //     setTotalResults(parsedData.totalResults);
  //     setLoading(false);
  //     props.setProgress(100);
  //   } catch (error) {
  //     console.error('Error fetching data:', error.message);
  //     // Handle the error (e.g., show an error message to the user)
  //     setLoading(false);
  //   }
  // };
  
  

  //  const handlePrevClick= async ()=>{
  //   setPage(page-1);
  //   updateNews();

  //  }

  // const handleNextClick= async ()=>{
  //   setPage(page+1);
  //   updateNews();
  
  //  }

  const fetchMoreData = async() => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1);
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    setLoading(false);

  };



    return (
    <>
        <h1 className="text-center" style={{margin:"30px 0px", marginTop:"90px"}}>NewsMonkey - Top {props.category} Headlines</h1>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!==totalResults}
          loader={loading && <Spinner/>}
        >
       
       <div className="container">
        <div className="row">
        {articles.map((element)=>{
            return  <div className="col-md-4" key={element.url}>
              <NewsItem tittle={element.title?element.title:""} description={element.description?element.description:""} imageUrl={!element.urlToImage?"https://cdn.wionews.com/sites/default/files/2024/01/26/408148-nasa-2.jpg":element.urlToImage} newsUrl={element.url} 
               author={element.author} date={element.publishedAt} source={element.source.name} />     
          </div>
          })}
        </div> 
        </div>
        </InfiniteScroll>
     </>
      
    );
  
        };


News.defaultProps={
  country:'in',
  pageSize:8,
  category:'general',
  apiKey:'0',
  progress:0
}

News.propTypes = {
  country: PropTypes.string,
  pageSize:PropTypes.number,
  category: PropTypes.string,
  progress:PropTypes.number

}

export default News;






