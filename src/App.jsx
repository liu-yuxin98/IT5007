/*Q1. JS Variable needs to be created here. Below variable is just an example. Try to add more attributes.*/

const initialTravellers = [
  {
    id: 1,
    name: "Jack",
    phone: 88885555,
    bookingTime: new Date(),
    Seates_number: 0,
  },
  {
    id: 2,
    name: "Rose",
    phone: 88884444,
    bookingTime: new Date(),
    Seates_number: 1,
  },
];

let all_travellers = Object.keys(initialTravellers).length;
function TravellerRow(props) {
  console.log("call TravellerRow()");
  {
    /*Q3. Placeholder to initialize local variable based on traveller prop.*/
    var traveller = props;
  }
  return (
    <tr>
      {/*Q3. Placeholder for rendering one row of a table with required traveller attribute values.*/}
      <td>{traveller["id"]}</td>
      <td>{traveller["name"]}</td>
      <td>{traveller["phone"]}</td>
      <td>{traveller["bookingTime"].toString()}</td>
      <td>{traveller["Seates_number"]}</td>
    </tr>
  );
}

function Display(props) {
  /*Q3. Write code to render rows of table, reach corresponding to one traveller. Make use of the TravellerRow function that draws one row.*/
  console.log("call Display()");
  let travellers = props;
  return (
    <table className="bordered-table">
      <thead>
        <tr>
          {/*Q3. Below table is just an example. Add more columns based on the traveller attributes you choose.*/}
          <th>ID</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Booking Time</th>
          <th>Seates_number</th>
        </tr>
      </thead>
      <tbody>
        {/* Q3. write code to call the JS variable defined at the top of this function to render table rows. */}
        {travellers.map((traveller) => TravellerRow(traveller))}
      </tbody>
    </table>
  );
}

class Add extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    console.log("add handleSubmit");
    e.preventDefault();
    let book_results = 0;
    /*Q4. Fetch the passenger details from the add form and call bookTraveller()*/
    // let p_id = Object.keys(all_travellers).length + 1;
    let p_id = all_travellers + 1;
    all_travellers += 1;
    let p_name = e.target.travellername.value;
    let p_phone = Number(e.target.travellerphone.value);
    let p_bookingtime = new Date();
    let p_seats = Number(e.target.travellerseats.value);

    e.target.reset();
    //check if p_seats in already taken
    if (p_seats >= 10) {
      book_results = "invalid seats. Enter number between 0 to 9";
      this.setState({ book_results });
      this.props.onBook(0);
    } else if (this.props.state.seats[p_seats] == 1) {
      book_results = "The seat is occupied";
      this.setState({ book_results });
      this.props.onBook(0);
    } else {
      book_results = "the seats is not occupied. Book successfull";
      this.setState({ book_results });
      // create passenger
      let new_passenger = {
        id: p_id,
        name: p_name,
        phone: p_phone,
        bookingTime: p_bookingtime,
        Seates_number: p_seats,
      };

      this.props.onBook(new_passenger);
    }
    console.log("set book results");
  }

  render() {
    console.log("render-add");

    return (
      <React.Fragment>
        <form name="addTraveller" onSubmit={this.handleSubmit}>
          {/*Q4. Placeholder to enter passenger details. Below code is just an example.*/}
          <input type="text" name="travellername" placeholder="Name" />
          <input type="text" name="travellerphone" placeholder="Phone" />
          <input type="text" name="travellerseats" placeholder="SeatsNumber" />
          <button type="submit">Add</button>
        </form>
        <h1>Results{this.props.state.book_results}</h1>
      </React.Fragment>
    );
  }
}

class Delete extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    console.log("delete handleSubmit");
    e.preventDefault();
    /*Q5. Fetch the passenger details from the deletion form and call deleteTraveller()*/
    let p_name = e.target.travellername.value;
    let travellers = this.props.state.travellers;
    let found = false;
    let removed_passenger = 0;
    for (let i = 0; i < Object.keys(this.props.state.travellers).length; i++) {
      if (p_name == this.props.state.travellers[i]["name"]) {
        removed_passenger = this.props.state.travellers[i];
        removed_passenger = this.props.state.travellers.splice(i, 1);
        found = true;
        break;
      }
    }
    if (found == true) {
      this.props.onDelete(removed_passenger);
    } else {
      this.props.onDelete(0);
    }
  }

  render() {
    console.log("render-delete");
    return (
      <form name="deleteTraveller" onSubmit={this.handleSubmit}>
        {/*Q5. Placeholder form to enter information on which passenger's ticket needs to be deleted. Below code is just an example.*/}
        <input type="text" name="travellername" placeholder="Name" />

        <button>Delete</button>
      </form>
    );
  }
}

class Homepage extends React.Component {
  constructor() {
    super();
  }
  render() {
    console.log("render-homepage");
    let travellers = this.props.state.travellers;
    let seats = this.props.state.seats;
    let free_seats = 0;
    //update seats
    for (let i = 0; i < Object.keys(travellers).length; i++) {
      seats[i] = 1;
    }
    // count free seats
    for (let i = 0; i < Object.keys(seats).length; i++) {
      if (seats[i] === 0) {
        free_seats += 1;
      }
    }
    let traveller_table = Display(travellers);

    return (
      <div>
        {/*Q2. Placeholder for Homepage code that shows free seats visually.*/}
        <h1>Total number of empty seats={free_seats}</h1>
        <button
          onClick={() => {
            Display(travellers);
          }}
        >
          Display Traveller
        </button>
        <span id="homepage_span">{traveller_table}</span>
      </div>
    );
  }
}

class TicketToRide extends React.Component {
  constructor() {
    super();
    this.state = {
      travellers: [...initialTravellers],
      selector: 1,
      seats: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 },
      book_results: " ",
    };
    this.bookTraveller = this.bookTraveller.bind(this);
    this.deleteTraveller = this.deleteTraveller.bind(this);
  }

  setSelector(value) {
    /*Q2. Function to set the value of component selector variable based on user's button click.*/
    this.setState({ selector: value });
  }
  componentDidMount() {
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      this.setState({ travellers: initialTravellers });
    }, 500);
  }

  bookTraveller(passenger) {
    console.log("call bookTraveller");
    if (passenger == 0) {
      console.log("THIS SEAT IS OCCUPIED, PLEASE TAKE ANOTHER ONE");
    } else {
      //update travellers
      let curr_travelers = [...this.state.travellers];
      curr_travelers.push(passenger);
      this.setState({ travellers: curr_travelers });

      //update seats
      // let seats = this.state.seats;
      for (let i = 0; i < Object.keys(this.state.travellers).length; i++) {
        this.state.seats[i] = 1;
      }
      // console.log(this.state.travellers);
      // console.log(this.state.seats);
    }

    /*Q4. Write code to add a passenger to the traveller state variable.*/
  }

  deleteTraveller(passenger) {
    console.log("call deleteTraveller");
    /*Q5. Write code to delete a passenger from the traveller state variable.*/
    if (passenger != 0) {
      console.log("passenger is inside travellers");
    } else {
      console.log("passenger not inside travellers");
    }
  }
  render() {
    console.log("render-tickettoride");

    let content;
    if (this.state.selector == 1) {
      content = <Homepage state={this.state} />;
    } else if (this.state.selector == 2) {
      content = <Add state={this.state} onBook={this.bookTraveller} />;
    } else if (this.state.selector == 3) {
      content = <Delete state={this.state} onDelete={this.deleteTraveller} />;
    }
    let nav;
    if (this.state.selector == 1 || this.state.selector == 3) {
      nav = (
        <React.Fragment>
          <button onClick={() => this.setSelector(1)}>Home Page</button>
          <button onClick={() => this.setSelector(2)}>Add Traveller</button>
          <button onClick={() => this.setSelector(3)}>Delete Traveller</button>
          <button onClick={() => this.setSelector(1)}>display freeseats</button>
        </React.Fragment>
      );
    } else {
      nav = (
        <React.Fragment>
          <button onClick={() => this.setSelector(1)}>Home Page</button>
          <button onClick={() => this.setSelector(2)}>Add Traveller</button>
          <button onClick={() => this.setSelector(3)}>Delete Traveller</button>
        </React.Fragment>
      );
    }

    return (
      <div>
        <h1>Ticket To Ride</h1>
        <h1></h1>
        <div>
          {/*Q2. Code for Navigation bar. Use basic buttons to create a nav bar. Use states to manage selection.*/}
          {nav}
          {/* <button>Home Page</button>
          <button>Add Traveller</button>
          <button>Delete Traveller</button>
          <button>display travellers</button>
          <button>display freeseats</button> */}
        </div>
        <div>
          {content}

          {/*Only one of the below four divisions is rendered based on the button clicked by the user.*/}
          {/*Q2 and Q6. Code to call Instance that draws Homepage. Homepage shows Visual Representation of free seats.*/}
          {/*Q3. Code to call component that Displays Travellers.*/}
          {/*Q4. Code to call the component that adds a traveller.*/}
          {/*Q5. Code to call the component that deletes a traveller based on a given attribute.*/}
        </div>
      </div>
    );
  }
}

const element = <TicketToRide />;

ReactDOM.render(element, document.getElementById("contents"));
