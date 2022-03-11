import React, {useState,useEffect} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

const  News = (props) => {
    const[articles,setArticles]= useState([]);
    const[loading,setLoading]= useState(false);
    const[page,setPage]= useState(1);
    const[totalResults,setTotalResults]= useState(0);
    const captialize = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }
    
    var parsedData=[[]];
        // document.title = this.captialize(this.props.category);
    

    const updateNews = async (page) => {
        const url = `https://newsapi.org/v2/top-headlines?country=` + props.country + `&category=` + props.category + `&apiKey=`+ props.apiKey +`&page=`+page + `&pageSize=` + props.pageSize;
        setPage(page+1);
        props.setProgress(30);
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(70);
        parsedData = await data.json();
        props.setProgress(100);
        
        
    }
    const fetchMoreData=async ()=>{
        await updateNews(page);
        setLoading(false);
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
        console.log(articles.length);
        console.log('Loading'+loading);
        console.log('page'+page);
    }
    useEffect(async ()=>{
        await updateNews(page);
        setLoading(false);
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
    },[])
    
   

        return (
            <>
               <h1 className="text-center" style={{margin : '90px 0px 0px 0px'}}>NewsMonkey - Top Headlines from {captialize(props.category)} </h1>
               {loading && <Spinner/>}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={loading && <Spinner/>}
                    >
                    <div className="container my-3">
                        <div className="row my-4">
                            {articles.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title === null ? "" : element.title} description={element.description === null ? "" : element.title} imageUrl={element.urlToImage === null ? "novelcoronavirus-optimized.jpg" : element.urlToImage} newsUrl={element.url}
                                author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}


                        </div>
                    </div>
                       
                    </InfiniteScroll>


                
            </>


        )
    
}
News.defaultProps = {
    pageSize: 8,
    country: "in",
    category: "sports",
    
}
 News.propTypes = {
    pageSize: PropTypes.number,
    country: PropTypes.string,
    category: PropTypes.string,
    
}

export default News
