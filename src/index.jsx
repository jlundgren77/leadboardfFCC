import React from 'react';
import {render} from 'react-dom';
import styles from './main.scss';
var classNames = require('classnames');








class TableHeaders extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		
		this.state = {
			
			sorted: this.props.sorted,
		}
	}
    
 	handleClick(sortBy) {
 		
 		this.props.sortCampers(sortBy);

 		setTimeout(function() {
 			this.setState({sorted: sortBy});
 		}.bind(this), 800);
 		
 		
 		
 		

 	}

	render() {
		var allTimeCol = 'sortCol';
		var recentCol = 'sortCol';
		this.state.sorted == 'alltime' ? allTimeCol = "sortCol sorted" : recentCol = "sortCol sorted";
		return (

			<thead>
				<tr>
					<th>#</th>
					<th className="sortCol" >Camper Name</th>
					<th className={recentCol} onClick={this.handleClick.bind(this, 'recent')}>Points in Past 30 Days</th>
					<th className={allTimeCol} onClick={this.handleClick.bind(this, 'alltime')}>All Time Points</th>

					
					
					
				</tr>
			</thead>

		)
	}
}

class Campers extends React.Component {
	constructor(props) {
		super(props);
			this.state = {
				entries: this.props.entries,
				allTimeUrl: "https://fcctop100.herokuapp.com/api/fccusers/top/alltime",
    			recentScoreURl: "https://fcctop100.herokuapp.com/api/fccusers/top/recent"
			}
		
	}

	


	render() {
		return(
			<tbody>
				{this.props.entries.map(function(entries, index) {
					
					return(
						<tr key={index}>
							<td className="rank">{index + 1}</td>
							<td><img className="avatar" src={entries.img} />{entries.username}</td>
							<td className="recent">{entries.recent}</td>
							<td className="alltime">{entries.alltime}</td>
							
						</tr>
					);
				})}
							
							
							
			</tbody>
		)
	}
}

class Header extends React.Component {
	render() {
		return(
			<div className="logo-header">
				<a href="http://freecodecamp.com" target="_blank"><img className="logo" src="https://s3.amazonaws.com/freecodecamp/freecodecamp_logo.svg"
        alt="FreeCodeCamp logo" />
				</a>
			</div>
		)
	}
}

class Table extends React.Component {
	constructor(props) {
		super(props);
		this.sortCampers = this.sortCampers.bind(this);
		this.state = {
			entries: [],
			sorted: "alltime",


		}
	}
    
   
   sortCampers(sortBy) {

    	
    	var url = "";
    	
    	sortBy == "alltime" ? url= "https://fcctop100.herokuapp.com/api/fccusers/top/alltime" : url="https://fcctop100.herokuapp.com/api/fccusers/top/recent";
    	$.ajax({
			url: url,
			dataType: 'json',
			cache: false,
			success: function(data) {
				

				this.setState({entries: data});
				
				
				
				
			}.bind(this),
			error: function(xhr, status, err) {
				console.log("erro");
			}
		});
    }

    componentDidMount() {
    	this.sortCampers("https://fcctop100.herokuapp.com/api/fccusers/top/alltime");
    }
    
    
	
	render() {
		return (
	
			<table className="table table-striped">
						<TableHeaders sortCampers={this.sortCampers}  sorted={this.state.sorted}/>
						<Campers  entries={this.state.entries}/>
			</table>
		)
	}
}





class App extends React.Component {

	constructor(props) {
		super(props);
		this.clickFilter = this.clickFilter.bind(this);
		this.state = {
    		
    	sorted: "recentScore",
    		
    		
    	};
	}
	
	

	clickFilter(sortField, e) {
		
		if(sortField == this.state.sorted) {
			
			return 0;
		} else {
			if (sortField == "recentScore") {
				this.getEntries(this.state.recentScoreURl);
				
				this.setState({sorted: true})

			} else {
				this.getEntries(this.state.allTimeUrl);
				this.setState({sorted: false});

			}
		}
		this.getEntries("https://fcctop100.herokuapp.com/api/fccusers/top/alltime");
	}

	

	render () {
		
		return (
			<div>
				<Header />
				<div className="leaderboard container">
					
					<h1 className="table-header">leaderboard</h1>
				   	<Table />

					
					
					
					
					
				</div>
			</div>
		)
	}
}





render (<App />, document.getElementById('app'));

