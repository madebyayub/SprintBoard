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
            <i className={`${this.state.editStory ? "fa fa-pencil" : "fa fa-times"} mt-1`} aria-hidden="true"></i>
          </button>
        </div>
        <div className="detail-title ml-1 mb-2 mt-1">
          <input className="title" value="Title of the user story" readOnly={this.state.editStory}/>
        </div>
        <div className="detailInformation">
          </div>
          <div className="line ml-2 mr-2">
            <div className="lineDetail">Detail</div>
          </div>
          <div className="mt-3">
            <div className={`detailSection ${this.state.editStory ? "noEdit" : "edit"} ml-2`} >
              <label className="labelSection">State:</label>
                <input id="stateid"className="detailInput" readOnly={this.state.editStory}/>
            </div>
            <div className={`detailSection ${this.state.editStory ? "noEdit" : "edit"} ml-2`}>
              <label className="labelSection">Assigned:</label>
                <input className="detailInput" value="N/A"readOnly={this.state.editStory}/>
            </div>
            <div className={`detailSection ${this.state.editStory ? "noEdit" : "edit"} ml-2`}>
              <label className="labelSection">Points:</label>
                <input className="detailInput" value="2" readOnly={this.state.editStory}/>
            </div>
            <div className={`detailSection ${this.state.editStory ? "noEdit" : "edit"} ml-2`}>
              <label className="labelSection">Reported:</label>
                <input className="detailInput" value="John Doe" readOnly={this.state.editStory}/>
            </div>
          </div>
        <div className="line ml-2 mr-2 mt-3">
          <div className="lineDetail">Description</div>
        </div>
        <div className="mt-3 ml-3 mr-3 mb-5">
          <textarea className="form-control"style={{width:"100%", height:"125px", borderRadius:"4px 4px 0 0"}} row="10" readOnly={this.state.editStory}></textarea>
          <div className={`textEditButton ${this.state.editStory ? "text-edithide" : "text-editshow"}`} >
            <button className="cancelBtn ml-1 mr-1">Cancel</button>
            <button className="saveBtn">Save</button>
          </div>
        </div>
      </div>
    );
  }
};

export default StoryDetail;
