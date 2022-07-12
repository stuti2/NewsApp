import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
    articles = [
        {
            "source": {
                "id": "abc-news-au",
                "name": "ABC News (AU)"
            },
            "author": "Russell Jackson",
            "title": "WACA removed elite junior cricket coach Jim Watkins's name from trophy after abuse allegation",
            "description": "The Western Australian Cricket Association confirms it removed a former elite junior coach's name from a commemorative shield after abuse allegations from a former player.",
            "url": "http://www.abc.net.au/news/2022-07-03/waca-removed-jim-watkins-name-from-trophy/101180728",
            "urlToImage": "https://live-production.wcms.abc-cdn.net.au/56c02906f3bac2114cbccbd9e9290d25?impolicy=wcms_crop_resize&cropH=761&cropW=1352&xPos=0&yPos=259&width=862&height=485",
            "publishedAt": "2022-07-02T20:58:50Z",
            "content": "The Western Australian Cricket Association (WACA) removed a former elite junior coach's name from a commemorative shield presented to under-15 players after abuse allegations from a former player, th… [+11432 chars]"
        },
        {
            "source": {
                "id": "talksport",
                "name": "TalkSport"
            },
            "author": "Cameron Temple",
            "title": "Stuart Broad lands unwanted record by getting smashed for Test cricket’s most expensive over in history a...",
            "description": "On day one of England’s 5th test against India, the hosts managed to skittle their opponents to 98-5, as it seemed they were riding the wave of success from their recent 3-0 series win over New Zealand.",
            "url": "https://talksport.com/sport/cricket/1141653/stuart-broad-record-over-england-india-test/",
            "urlToImage": "https://talksport.com/wp-content/uploads/sites/5/2022/07/crop-1141691.jpg?strip=all&quality=100&w=1920&h=1080&crop=1",
            "publishedAt": "2022-07-02T14:13:23Z",
            "content": "Stuart Broad is one of England’s greatest-ever bowlers with 550 Test wickets to his name, but he has just broken what will be an unwanted record. \r\nOn day one of England’s 5th test against India, the… [+2784 chars]"
        },
        {
            "source": {
                "id": "bbc-sport",
                "name": "BBC Sport"
            },
            "author": "BBC Sport",
            "title": "Shane Warne memorial - watch & follow updates",
            "description": "Watch live coverage and follow text updates and tributes from the state memorial for Australian cricket legend Shane Warne at the Melbourne Cricket Ground.",
            "url": "http://www.bbc.co.uk/sport/live/cricket/60916236",
            "urlToImage": "https:////m.files.bbci.co.uk/modules/bbc-morph-sport-seo-meta/1.22.0/images/bbc-sport-logo.png",
            "publishedAt": "2022-03-30T08:22:26.498888Z",
            "content": "Former England bowler and BBC cricket presenter Isa Guha, who became a colleague of Warne's in the commentary box: \"It has been a strange few weeks - a lot of shock and then we did our own tribute at… [+396 chars]"
        },
        {
            "source": {
                "id": "espn-cric-info",
                "name": "ESPN Cric Info"
            },
            "author": null,
            "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
            "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
            "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
            "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
            "publishedAt": "2020-04-27T11:41:47Z",
            "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
        },
        {
            "source": {
                "id": "espn-cric-info",
                "name": "ESPN Cric Info"
            },
            "author": null,
            "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
            "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
            "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
            "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
            "publishedAt": "2020-03-30T15:26:05Z",
            "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
        }
    ]

    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
        document.title = `${(this.props.category)[0].toUpperCase() + (this.props.category).slice(1).toLowerCase()}-NewsMonkey`;
    }

    async updateNews() {
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json();
        this.props.setProgress(70);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
        this.props.setProgress(100);
    }

    async componentDidMount() {
        this.updateNews();
    }



    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 });
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults
        })
    };


    render() {
        return (
            <div className='my-3 mx-5'>
                <h2 className='text-center' style={{ margin: '35px 0px' }}>NewsMonkey- Top {(this.props.category)[0].toUpperCase() + (this.props.category).slice(1).toLowerCase()} Headlines</h2>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<h4><Spinner /></h4>}
                >
                    <div className="conatainer mx-3">
                        <div className="row">
                            {this.state.articles.map((element,index) => {
                                return <div className="col-md-4" key={index}>
                                    <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </div>
        )
    }
}

export default News
