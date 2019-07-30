'use strict';

const e = React.createElement;

class HistoryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasHistory: false };
  }

  componentDidMount(){
    this.timerID = setInterval(
      () => this.setState({hasHistory: false}),
      1000
    );
  }

  render() {

    var listArray;
    var hasHistory = this.state.hasHistory;

    if (typeof(Storage) !== "undefined") {
      listArray = [];
      if (localStorage.getItem("listString") !== null) {
          hasHistory = true;
          if(typeof JSON.parse(localStorage.getItem("listString")) == "string"){
          listArray = listArray.push(JSON.parse(localStorage.getItem("listString")));
          }else{
          listArray = listArray.concat(JSON.parse(localStorage.getItem("listString")));
          }
      }else{
        hasHistory = false;
      }

    } else {
      alert("Your browser does not support local storage.");
    }

    if (!hasHistory) {
      return 'Nothing has been scanned.';
    }else{
      listArray = listArray.reverse();
      return e(
        'ol',
        null,
        listArray.map((item) => e('li', null, item))
      )
    }
  }
}

const domContainer = document.querySelector('#history_list_container');
ReactDOM.render(e(HistoryList), domContainer);