import React, { Component } from "react";
import Modal from "./components/Modal";
import axios from "axios";
import {
  Button,
  // Modal,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      activeItem: {
        title: "",
        description: "",
        completed: false,
        reminder_datatime: ""
      },
      todoList: [],
      sending_time: {
        reminder_datatime: ""
      }
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get(`${process.env.REACT_APP_URL}/api/todos/`)
      .then(res => this.setState({ todoList: res.data }))
      .catch(err => console.log(err));
  };

  displayCompleted = status => {
    if (status) {
      return this.setState({ viewCompleted: true });
    }
    return this.setState({ viewCompleted: false });
  };

  renderTabList = () => {
    return (
      <div className="my-5 tab-list">
        <span
          onClick={() => this.displayCompleted(true)}
          className={this.state.viewCompleted ? "active" : ""}
        >
          complete
            </span>
        <span
          onClick={() => this.displayCompleted(false)}
          className={this.state.viewCompleted ? "" : "active"}
        >
          Incomplete
            </span>
      </div>
    );
  };

  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.todoList.filter(
      item => item.completed === viewCompleted
    );
    return newItems.map(item => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${this.state.viewCompleted ? "completed-todo" : ""
            }`}
          title={item.description}
        >
          {item.title}
        </span>
        <span>
          <button
            onClick={() => this.editItem(item)}
            className="btn btn-secondary mr-2"
          >
            {" "}
                Edit{" "}
          </button>
          <button
            onClick={() => this.handleDelete(item)}
            className="btn btn-danger"
          >
            Delete{" "}
          </button>
        </span>
      </li>
    ));
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = item => {
    this.toggle();
    if (item.id) {
      axios
        .put(`${process.env.REACT_APP_URL}/api/todos/${item.id}/`, item)
        .then(res => this.refreshList());
      return;
    }
    axios
      .post(`${process.env.REACT_APP_URL}/test/addTask/`, item)
      .then(res => this.refreshList());
  };


  summery_email = () => {
    // print("in react summary")
    // console.log(this.state.rishabh)
    axios
      .post(`${process.env.REACT_APP_URL}/test/summary/`, this.state.sending_time)
      .then(res => this.refreshList());
  }

  handleChange = e => {
    let { name, value } = e.target;
    const sending_time = { ...this.state.sending_time, [name]: value };
    this.setState({ sending_time });
  };



  handleDelete = item => {
    axios
      .delete(`${process.env.REACT_APP_URL}/api/todos/${item.id}`)
      .then(res => this.refreshList());
  };

  createItem = () => {
    const item = { title: "", description: "", completed: false, reminder_datatime: "" };
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  editItem = item => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  render() {
    return (
      <main className="content">
        <h1 className="text-white text-uppercase text-center my-4">Todo app</h1>
        <Form>
          <FormGroup>
            <Label for="reminder_datatime">sending_date</Label>
            <Input
              type="datetime-local"
              name="reminder_datatime"
              value={this.state.sending_time.reminder_datatime}
              onChange={this.handleChange}
              placeholder="Enter Todo reminder_datatime"
            />
          </FormGroup>
          <Button color="success" onClick={() => this.summery_email()}>
            send_mail
          </Button>
        </Form>
        <div className="row ">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="">

                <button onClick={this.createItem} className="btn btn-primary">
                  Add task
                    </button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
        {/* <h1>{process.env.REACT_APP_RISHABH}</h1> */}
      </main>
    );
  }
}
export default App;