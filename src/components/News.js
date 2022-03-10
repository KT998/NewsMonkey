import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
    static defaultProps = {
        pageSize: 8,
        country: "in",
        category: "sports",
        
    }
    static propTypes = {
        pageSize: PropTypes.number,
        country: PropTypes.string,
        category: PropTypes.string,
        
    }
    captialize = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }
    parsedData;
    constructor(props) {
        super(props)
        this.state = {
            articles: [],
            loading: false,
            page: 1,
        }
        document.title = this.captialize(this.props.category);
    }

    updateNews = async (page) => {
        const url = `https://newsapi.org/v2/top-headlines?country=` + this.props.country + `&category=` + this.props.category + `&apiKey=`+ this.props.apiKey +`&page=`+ page + `&pageSize=` + this.props.pageSize;
        this.props.setProgress(30);
        this.setState({ loading: true });
        let data = await fetch(url);
        this.props.setProgress(70);
        this.parsedData = await data.json();
        this.props.setProgress(100);
        
        
    }
    fetchMoreData=async ()=>{
        this.setState({
            page : this.state.page+1,
        })
        await this.updateNews(this.state.page);
        this.setState({ 
              loading: false, 
              articles: this.state.articles.concat(this.parsedData.articles), 
              totalResults: this.parsedData.totalResults 
            });
    }

    async componentDidMount() {
        await this.updateNews(this.state.page);
        this.setState({ loading: false, articles: this.parsedData.articles, totalResults: this.parsedData.totalResults });

    }
    render() {

        return (
            <>
               <h1 className="text-center">NewsMonkey - Top Headlines from {this.captialize(this.props.category)} </h1>
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner/>}
                    >
                    <div className="container my-3">
                        <div className="row my-4">
                            {this.state.articles.map((element) => {
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
}

export default News
