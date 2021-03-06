import React from 'react'
import axios from 'axios'
import { Add } from './components/Add'
import { News } from './components/News'
import './App.css'

class App extends React.Component {
  state = {
    news: null,
    isLoading: false,
  }

  static getDerivedStateFromProps(props, state) {
    let nextFilteredNews

    // смотрим в state.news (ранее смотрели в props)
    // и проверяем, чтобы не клоинировать null
    // например, в момент первой отрисовки
    if (Array.isArray(state.news)) {
      nextFilteredNews = [...state.news]

      nextFilteredNews.forEach((item, index) => {
        if (item.bigText.toLowerCase().indexOf('angular') !== -1) {
          item.bigText = 'СПАМ'
        }
      })
      return {
        filteredNews: nextFilteredNews,
      }
    }
    return null
  }

  componentDidMount() {
    this.setState({ isLoading: true })
    /* nativeJs
    fetch('http://localhost:3000/data/newsData.json')
    .then(response => {
      return response.json()
    })
    .then(data => {
      setTimeout(() => { // добавили задержку
        this.setState({ isLoading: false, news: data })
      }, 3000) // в три секунды
    })
    */

      const domain = 'http://localhost:3000/data/newsData.json';
      axios.get(domain).then((res) => {
      console.log(res.data);
      setTimeout(() => {
        this.setState({ isLoading: false, news: res.data })
      }, 3000)
    }).catch( err => console.log(err))
  }
  handleAddNews = data => {
    const nextNews = [data, ...this.state.news]
    this.setState({ news: nextNews })
  }
  render() {
    const { news, isLoading } = this.state

    return (
      <React.Fragment>
        <Add onAddNews={this.handleAddNews} />
        <h3>Новости</h3>
        {isLoading && <p>Загрузиться через 3 секунды </p>}
        {Array.isArray(news) && <News data={news} />}
      </React.Fragment>
    )
  }
}

export default App