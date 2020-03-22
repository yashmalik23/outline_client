import React, { Component } from 'react';
import './emp.scss';
import { connect } from 'react-redux';
import {fetchData,updateData} from '../reducers/actions'
import { bindActionCreators } from 'redux';


class Employee extends Component {
	constructor(props) {
        super(props);
		this.state = {
			activeEmp: {name:""},
			emp: [],
			avSur: [],
            assSur: [],
            loaded: false
        };
        this.surveys = []
    }
    
    componentDidMount(){
        this.props.fetchData('employee')
        this.props.fetchData('survey')
    }

    componentWillReceiveProps(props){
        if(props.store.fetched ==  true){
            this.surveys = props.store.survey
            let avSur  = []
            let assSur = []
            let activeEmp = (this.state.activeEmp.name == "") ? props.store.employee[0] : this.state.activeEmp
            for(let i = 0; i< this.surveys.length;i++){
                if(!this.surveys[i].emp){
                    avSur.push(this.surveys[i])
                }else if(this.surveys[i].emp == activeEmp._id){
                    assSur.push(this.surveys[i])
                }
            }
            this.setState({
                loading: true,
                emp: props.store.employee,
                activeEmp,
                avSur,
                assSur
            })
        }

    }

	toggleDrop = (e) => {
		let dropdown = document.getElementById('dropdown-menu');
		if (dropdown.style.display === 'none' || dropdown.style.display === '') {
			dropdown.style.display = 'block';
		} else {
			dropdown.style.display = 'none';
		}
    };
    
    filterSurvey = (e,column) => {
        let text = e.target.value.toLowerCase()
        if(column == 'available'){
            let avSur = [...this.surveys]
            let newSur = []
            for(let i =0; i< avSur.length;i++){
                if(avSur[i].name.toLowerCase().indexOf(text) > -1){
                    newSur.push(avSur[i])
                }
            }
            this.setState({
                avSur: newSur
            })
        }else if(column == 'assigned'){
            let assSur = [...this.surveys]
            let newSur = []
            for(let i =0; i< assSur.length;i++){
                if(assSur[i].name.toLowerCase().indexOf(text) > -1 && assSur[i].emp && assSur[i].emp == this.state.activeEmp._id){
                    newSur.push(assSur[i])
                }
            }
            this.setState({
                assSur: newSur
            })
        }
    }

    setEmp = (e) => {
        let name = e.target.value
        let emp = [...this.state.emp]
        for(let i=0;i<emp.length;i++){
            if(emp[i].name == name){
                let assSur = []
                for(let j = 0; j< this.surveys.length;j++){
                    if(this.surveys[j].emp == emp[i]._id){
                        assSur.push(this.surveys[j])
                    }
                }
                this.setState({activeEmp:emp[i],assSur})
                break
            }
        }
    }

    addSurv = (survey) => {
        let sur = {}
        sur["id"] = survey._id
        sur["empId"] = this.state.activeEmp._id
        this.props.updateData(sur)
    }

    removeSurv = (survey) => {
        let sur = {}
        sur["id"] = survey._id
        this.props.updateData(sur)
    }

	render() {
		return (
			//Main container
			<div className="container">
				{/*------ Drop Down ---------- */}
				<div className="center has-text-centered">
					<div className="subtitle is-size-7  has-text-weight-medium">Select employee </div>
					<div className="select is-info is-small">
						<select onChange={this.setEmp}>{this.state.emp.map((item, i) => <option key={i}>{item.name}</option>)}</select>
					</div>
				</div>

				{/* ------------ Surveys ---------------- */}
				<div className="columns">
					<div className="column has-text-centered">
						<div className="subtitle is-size-7  has-text-weight-medium">
							Available surveys
						</div>
						<input className="input" type="text" placeholder="Search survey" onChange={(e)=>this.filterSurvey(e,'available')} />
						<div className="list has-text-centered">
							{this.state.avSur.map((item, i) => (
								<div className="list-item" key={i}>
									<span>{item.name}</span>
									<div className="button is-link is-small" style={{ marginLeft: '50px' }} onClick={(e)=>this.addSurv(item)}>
										Add
									</div>
								</div>
							))}
						</div>
					</div>
					<div className="column has-text-centered">
						<div className="subtitle is-size-7  has-text-weight-medium">
							Assigned surveys
						</div>
						<input className="input" type="text" placeholder="Search survey" onChange={(e)=>this.filterSurvey(e,'assigned')} />
						<div className="list has-text-centered">
							{this.state.assSur.map((item, i) => (
								<div className="list-item" key={i}>
									<span>{item.name}</span>
									<div className="button is-danger is-small" style={{ marginLeft: '50px' }} onClick={(e)=>this.removeSurv(item)}>
										Remove
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* --------Save button ---------- */}
				<div className="column has-text-centered">
					<button className="button is-success has-text-centered">Done</button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
    return {
        store : state
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators( {updateData,fetchData}, dispatch )
}

export default connect(mapStateToProps,mapDispatchToProps)(Employee);
