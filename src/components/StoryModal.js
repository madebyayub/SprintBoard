import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");
class StoryModal extends React.Component {
    state={modalOpen: true};

    render (){
        return (
            <Modal isOpen={this.state.modalOpen} onRequestClose={()=> this.setState({modalOpen: false})} style={{
                overlay:{
                    backgroundColor: "rgba(0,0,0,0.3)"
                },
                content: {
                    border:"none",
                    borderRadius:"10px",
                    boxShadow: "0 0 15px rgba(0,0,0,0.5)",
                    backgroundColor:" rgba(255,255,255,0.9)",
                    width: "40%",
                    height: "85vh",
                    margin: "auto"

                }
            }} >
                <div className="ModalContainer mt-2">
                    <div className="closeModal">
                        <label>Create</label>
                        <button onClick={()=> this.setState({modalOpen: false})} style={{float:"right", backgroundColor:"transparent",border:"none", outline:"none"}}>
                            <i className="fa fa-times" aria-hidden="true"></i>
                        </button>
                    </div>
                    <div className="modalTitle">
                            <label>Summary:</label>
                            <input className="ml-2"/>
                    </div>
                    <div className="line mt-1"></div>
                    <div className="modalDetailContainer mt-3">
                        <div className="modalDetail">
                            <label className="mr-2">State:</label>
                            <input/>
                        </div>
                        <div className="modalDetail mt-2">
                            <div style={{display:"flex"}}>
                            <label className="mr-2">Assigned:</label>
                            <div style={{ border:"1px solid"}}>
                                <input style={{border:"none", outline:"none"}} />
                                <button type = "button" className = "dropdown-toggle" style={{border:"1px solid", outline:"none", verticalAlign:"middle", backgroundColor:"white"}}></button>
                            </div>
                            </div>
                        </div>
                        <div className="modalDetail mt-2">
                            <label className="mr-2" >Points:</label>
                            <input/>
                        </div>
                        <div className="modalDetail">
                            <label className="mr-2">Reporter:</label>
                            <input/>
                        </div>
                    </div>
                    <div className="line"></div>
                    <div className="ModalDescription mt-3">
                    <textarea className="form-control"style={{width:"100%", height:"200px", borderRadius:"4px 4px 0 0"}} row="10" readOnly={this.state.editStory}></textarea>
                    </div>
                </div>
            </Modal>
        );
        
    }
}

export default StoryModal;