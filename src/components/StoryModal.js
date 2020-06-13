import React from "react";
import Modal from "react-modal";
import {connect} from "react-redux";
import {createStory} from "../actions";

Modal.setAppElement("#root");
class StoryModal extends React.Component {
    
    createUserStory (e) {
        e.preventDefault();
        const storyData = {
            title: this.storyTitle.value,
            user: this.props.currentUser,
            description: this.storyDescription.value,
            status: this.storyState.value,
            assigned: this.storyAssigned.value,
            point: this.storyPoint.value
        }
        this.props.createStory(storyData,this.props.team);
        this.props.toggleModal();
    }


    render (){
        return (
            <Modal isOpen={this.props.openModal} onRequestClose={this.props.toggleModal} style={{
                overlay:{
                    backgroundColor: "rgba(0,0,0,0.3)"
                },
                content: {
                    border:"none",
                    borderRadius:"10px",
                    boxShadow: "0 0 15px rgba(0,0,0,0.5)",
                    backgroundColor:" rgba(255,255,255,0.9)",
                    width: "40%",
                    height: "80vh",
                    margin: "auto"
                }
            }} >
                <div className="ModalContainer mt-2">
                    <div className="closeModal">
                        <label style={{fontSize:"20px", fontWeight:"700"}}>Create</label>
                        <button onClick={this.props.toggleModal} style={{float:"right", backgroundColor:"transparent",border:"none", outline:"none"}}>
                            <i className="fa fa-times" aria-hidden="true"></i>
                        </button>
                    </div>
                    <div className="modalTitle">
                            <label>Summary:</label>
                            <input ref={(input) => this.storyTitle = input}  className="ml-1" style={{width:"70%"}}/>
                    </div>
                    <div className="line mt-1"></div>
                    <div className="modalDetailContainer mt-3">
                        <div className="modalDetail">
                            <label className="mr-2 col-2">State:</label>
                            <input ref={(input) => this.storyState = input}  className="col-5" style={{left:"30px"}}/>
                        </div>
                        <div className="modalDetail mt-2">
                            <div style={{display:"flex"}}>
                            <label className="mr-2 col-2">Assigned:</label>
                            <div style={{ border:"0.5px solid rgb(117, 117, 117)", borderRadius:"2px", left:"30px", position:"relative", backgroundColor:"white"}}>
                                <input ref={(input) => this.storyAssigned = input} style={{border:"none", outline:"none"}} />
                                <button type = "button" className = "dropdown-toggle" style={{border:"none", outline:"none", verticalAlign:"middle", backgroundColor:"white"}}></button>
                            </div>
                            </div>
                        </div>
                        <div className="modalDetail" style={{marginTop:"13px"}}>
                            <label className="mr-2 col-2" >Points:</label>
                            <input ref={(input) => this.storyPoint = input} className="col-5" style={{left:"30px"}}/>
                        </div>
                        <div className="modalDetail" style={{marginTop:"8px"}}>
                            <label className="mr-2 col-2">Reporter:</label>
                            <input className="col-5" style={{left:"30px"}}/>
                        </div>
                    </div>
                    <div className="line"></div>
                    <div className="ModalDescription mt-3">
                    <textarea  ref={(input) => this.storyDescription = input} className="form-control"style={{width:"100%", height:"200px", borderRadius:"4px 4px 0 0"}} row="10"></textarea>
                    </div>
                    <div className="mt-2 mb-4" style={{textAlign:"right"}}>
                        <button className="btn btn-success" onClick={(e) => this.createUserStory(e)}>Save</button>
                        <button className="btn btn-danger ml-2">Cancel</button>
                    </div>
                </div>
            </Modal>
        );
        
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.auth.user.userId,
        team: state.auth.user.team
    }
}
export default connect(mapStateToProps, {createStory}) (StoryModal);