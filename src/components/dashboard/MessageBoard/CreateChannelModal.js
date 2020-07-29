import React, { Component } from "react";
import Modal from "react-modal";
import ServerAPI from "../../../api/ServerAPI";

export default class CreateChannelModal extends Component {
  state = {
    createChannelInput: "",
    error: false,
    errorMsg: "",
    private: false,
  };
  handleCreateChange = (e) => {
    this.setState({ createChannelInput: e.target.value });
  };
  handleSwitchChange = () => {
    this.setState({
      private: !this.state.private,
    });
  };
  handleCreateChannel = async () => {
    const response = await ServerAPI.get(
      `/channel/${this.state.createChannelInput}`
    );
    if (response.status === 200) {
      if (!response.data.channel) {
        this.props.createChannel(
          this.state.createChannelInput,
          this.state.private
        );
        this.props.closeModal();
        this.setState({
          createChannelInput: "",
          error: false,
          errorMsg: "",
          private: false,
        });
      } else {
        this.setState({ error: true, errorMsg: "Channel name already taken" });
      }
    } else {
      this.setState({
        error: true,
        errorMsg: "Internal error - refresh your page",
      });
    }
  };
  render() {
    return (
      <Modal
        isOpen={this.props.showCreateChannel ? true : false}
        onRequestClose={() => this.props.closeModal()}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 1031,
          },
          content: {
            padding: "0",
            border: "none",
            borderRadius: "1px",
            boxShadow: "0 0 15px rgba(0,0,0,0.5)",
            backgroundColor: " rgba(240,240,240,1)",
            width: "35%",
            height: "65vh",
            margin: "auto",
          },
        }}
      >
        <div className="createChannelContainer">
          <div className="createChannelHeader">
            <h4>Create Channel</h4>
            <button
              className="createChannelclose px-3"
              onClick={() => this.props.closeModal()}
            >
              <i className="fa fa-times" aria-hidden="true"></i>
            </button>
          </div>
          <div className="createChannelDescription">
            <p>
              Channels allow you to communicate with your team, or even
              cross-team to improve productivity.
            </p>
          </div>
          <div className="createChannelName">
            <label>Channel Name</label>
            <input
              className="form-control"
              placeholder="e.g. general"
              value={this.state.createChannelInput}
              onChange={(e) => this.handleCreateChange(e)}
            />
            {this.state.error ? (
              <label id="status-label">{this.state.errorMsg}</label>
            ) : (
              <></>
            )}
          </div>
          <div className="createChannelDetail">
            <label>Make Private</label>
            <div className="detailContent">
              <p>
                When a channel is set to private it can only be viewed or joined
                by invitation.
              </p>
              <div className="custom-control custom-switch">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customSwitch1"
                  checked={this.state.private}
                  onChange={this.handleSwitchChange}
                />
                <label
                  className="custom-control-label"
                  htmlFor="customSwitch1"
                ></label>
              </div>
            </div>
          </div>
          <div className="createChannelAction">
            <button className="joined-btn" onClick={this.handleCreateChannel}>
              Create
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}
