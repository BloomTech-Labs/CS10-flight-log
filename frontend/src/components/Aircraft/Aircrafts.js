import axios from 'axios';
import React, { Component } from 'react';
import AircraftCard from './AircraftCard';
import NavBar from '../NavBar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	ButtonDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from 'reactstrap';
import CardMedia from '@material-ui/core/CardMedia';
import './AircraftCard.css';
import Dropzone from 'react-dropzone';
import TopHeader from '../TopHeader';
import Auth from './../Authenication/Auth';
import './Aircrafts.css';

let headers;
let URL = process.env.REACT_APP_URL;

class Aircrafts extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			token: '',
			name: '',
			content: '',
			openModal: false,
			dropdownOpen: false,
			dropdownButtonTitle: 'Airplane SEL',
			tail_number_edit: '',
			man_type_edit: '',
			license_type_edit: 'Airplane SEL',
			uploadurl: 'http://res.cloudinary.com/dkzzjjjj9/image/upload/v1538078252/rurz4wt0ngzacnfz06io.jpg',
			data: [
				{
					id: '',
					man_type: '',
					tail_number: '',
					license_type: '',
					uploadurl: '',
				},
			],
		};
	}

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	toggleModal = (e) => {
		this.setState({ openModal: !this.state.openModal });
	};
	toggleAndPost = (e) => {
		this.setState({
			openModal: !this.state.openModal,
		});
		
		axios({
			method: 'POST',
			url: `${URL}api/aircraft/`,
			data: {
				man_type: this.state.man_type_edit,
				tail_number: this.state.tail_number_edit,
				license_type: this.state.license_type_edit,
				id: this.state.id,
				photo: this.state.uploadurl,
			},
			headers: headers,
		})
			.then((response) => {
			})
			.catch((error) => {
				console.log('put error', error);
			});
		window.location.reload();
	};

	handleDropDownButton = (e) => {
		this.setState({ dropdownButtonTitle: e.target.name, license_type_edit: e.target.name });
	};

	toggleDropdownButton = () => {
		this.setState({
			dropdownOpen: !this.state.dropdownOpen,
		});
	};

	componentDidMount() {
		setTimeout(() => this.setState({ loading: false }), 950);
		axios({
			method: 'GET',
			url: `${URL}api/aircraft/`,
			headers: headers,
		})
			.then((response) => {
				const reversed_data = response.data.reverse();
				this.setState({
					data: reversed_data,
				});
			})
			.catch((error) => {
				console.log('error :', error);
				this.props.history.push('/');
			});
	}
	upload = () => {
		window.cloudinary.openUploadWidget({ cloud_name: 'dkzzjjjj9', upload_preset: 'ggbmyqmo' }, (error, result) => {
			let imgurl;
			result
				? (imgurl = result[0].url)
				: (imgurl = `http://res.cloudinary.com/dkzzjjjj9/image/upload/v1538078252/rurz4wt0ngzacnfz06io.jpg`);
			this.setState({ uploadurl: imgurl });
		}),
			false;
	};
	render() {
		headers = {
      Authorization: "JWT " + localStorage.getItem("token")
    };

    const { loading } = this.state;
    if (loading) {
      return (
        <div className="Aircrafts">
          <NavBar />
          <TopHeader />
          <div className="Aircraft-content">
            <Card
            className="AircraftList-loading"
              >
              <div className="load-bar">
                <div className="bar" />
                <div className="bar" />
                <div className="bar" />
              </div>
            </Card>
          </div>
        </div>

    );
  }else
		return (
			<div className="Aircrafts">
				<TopHeader breadcrumb={[ 'aircraft' ]} displayTotal={true} username={this.props.username} />
				<NavBar />
				<div className="Aircraft-content">
				<div className="AircraftList">
				<Card
            onClick={this.toggleModal}
            style={{
              boxShadow: this.state.openModal ? "inset 1px 1px 1px gray" : "",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
							height: "287px",
							width: '244px',
            }}
          >
					<i class="fas fa-plus-circle Plus-sign" onClick={this.toggleModal}></i>
					</Card>
					{this.state.data.map((plane) => {
						let id = plane.id;
						return <AircraftCard key={id} data={plane} props={this.props} />;
					})}
					<Card onClick={this.toggle} className="Aircraft-NewCard">
						<Typography className="card-typography" onClick={this.toggle} />
						<CardContent>
						
							<Modal className="NewAircraft-content" isOpen={this.state.openModal} toggle={this.toggleModal}>
								<ModalHeader>
									<input
										className="new-aircraft-input-tn"
										name="tail_number_edit"
										onChange={this.handleChange}
										placeholder="Tail Number"
									/>
									<ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdownButton}>
										<DropdownToggle caret>{this.state.dropdownButtonTitle}</DropdownToggle>
										<DropdownMenu>
											<DropdownItem name="Airplane SEL" onClick={this.handleDropDownButton}>
												Airplane SEL
											</DropdownItem>
											<DropdownItem name="Airplane SES" onClick={this.handleDropDownButton}>
												Airplane SES
											</DropdownItem>
											<DropdownItem name="Airplane MEL" onClick={this.handleDropDownButton}>
												Airplane MEL
											</DropdownItem>
											<DropdownItem name="Airplane MES" onClick={this.handleDropDownButton}>
												Airplane MES
											</DropdownItem>
										</DropdownMenu>
									</ButtonDropdown>
									<input
										className="new-aircraft-input-mt"
										name="man_type_edit"
										onChange={this.handleChange}
										placeholder="Manufacturer Type"
									/>
								</ModalHeader>
								<ModalBody className="nested-modal-body">
									<button className="nested-modal-button" onClick={this.upload}>CLICK ME TO UPLOAD</button>
								</ModalBody>
								<ModalFooter>
									<button className="save-button" onClick={this.toggleAndPost}>
										Save
									</button>
								</ModalFooter>
							</Modal>
						</CardContent>
					</Card>
				</div>
				</div>
			</div>
		);
	}
}

export default Auth(Aircrafts);
