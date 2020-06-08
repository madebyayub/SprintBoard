import React from "react";
import '../../../stylesheets/storydetail.css';

class StoryDetail extends React.Component {
  state={editStory: true};

  allowEdits = () => {
    this.setState((prevState) => ({
      editStory: !prevState.editStory,
    }));
  }

  render(){
    return (
      <div className="detail-container">
        <div className="editButtonContainer mr-3 mt-1">
          <button className="editIcon" onClick={this.allowEdits}>
            <i className="fa fa-pencil" aria-hidden="true"></i>
          </button>
        </div>
        <div className="detail-title mb-2">
          <input className="title ml-2" value="Title of the user story" readOnly={this.state.editStory}/>
        </div>
        <div className="detailInformation">
        <div className="detailSection">
          </div>
          <div className="line ml-2 mr-2">
            <div className="lineDetail">Detail</div>
          </div>
          <div className="mt-3">
            <div className= "detailSection mt-2 mb-2">
              <label className="ml-2 mr-2">State:</label>
              <div className="ml-5">
                <input id="stateid"className="detailInput" value="New" readOnly={this.state.editStory}/>
              </div>
            </div>
            <div className= "detailSection mt-2 mb-2">
              <label className="ml-2 mr-2">Assigned:</label>
              <div className="ml-1">
                <input className="detailInput ml-3" value="N/A"readOnly={this.state.editStory}/>
              </div>
            </div>
            <div className= "detailSection mt-2 mb-2">
              <label className="ml-2 mr-2">Points:</label>
              <div className="PointLabel">
                <input className="detailInput" value="2" readOnly={this.state.editStory}/>
              </div>
            </div>
            <div className= "detailSection mt-2 mb-2">
              <label className="ml-2 mr-2">Reported:</label>
              <div className="ml-1">
                <input className="detailInput ml-3" value="John Doe" readOnly={this.state.editStory}/>
              </div>
            </div>
          </div>
        </div>
        <div className="line ml-2 mr-2 mt-3">
          <div className="lineDetail">Description</div>
        </div>
        <div className="mt-3 ml-3 mr-3 mb-5">
          <textarea className="form-control"style={{width:"100%", height:"125px", borderRadius:"4px 4px 0 0"}} row="10" readOnly={this.state.editStory}></textarea>
          <div style={{width:"100%", height:"30px", border:"1px solid lightgrey", borderRadius:"0 0 4px 4px"}}>
            <button className="ml-2" style={{backgroundColor:"transparent", border:"none"}}>B</button>
            <button className="ml-2" style={{backgroundColor:"transparent", border:"none"}}>I</button>
            <button className="ml-2" style={{backgroundColor:"transparent", border:"none"}}>U</button>
            <button className="cancelBtn ml-1 mr-1">Cancel</button>
            <button className="saveBtn">Save</button>
          </div>
        </div>
      </div>
    );
  }
};

export default StoryDetail;
