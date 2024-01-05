import React, { Component } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './sales.css';

class Sales extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      Category: '',
      Quantity: '',
      Item: '',
      Brand: '',
      Description: '',
      Price: '',
      date: '',
      total: 0,
      editIndex: null,
      editedItem: {},
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { Category, Quantity, Item, Brand, Description, Price, date } = this.state;
    const totalPrice = parseFloat(Quantity) * parseFloat(Price);

    const newItemObject = {
      date,
      Category,
      Quantity,
      Item,
      Brand,
      Description,
      Price,
      totalPrice,
    };

    this.setState((prevState) => ({
      data: [...prevState.data, newItemObject],
      Category: '',
      Quantity: '',
      Item: '',
      Brand: '',
      Description: '',
      Price: '',
      date: '',
      total: prevState.total + totalPrice,
    }));
  };

  handleEdit = (index) => {
    const selectedItem = this.state.data[index];
    this.setState({
      editIndex: index,
      editedItem: { ...selectedItem },
    });
  };

  handleSaveEdit = () => {
    const { editIndex, editedItem, data } = this.state;

    if (editIndex !== null) {
      const newData = [...data];
      newData[editIndex] = { ...editedItem };
      newData[editIndex].totalPrice = newData[editIndex].Quantity * newData[editIndex].Price;

      const total = newData.reduce((acc, item) => acc + item.totalPrice, 0);

      this.setState({
        data: newData,
        editIndex: null,
        editedItem: {},
        total,
      });
    }
  };

  handleCancelEdit = () => {
    this.setState({
      editIndex: null,
      editedItem: {},
    });
  };

  handleDelete = (index) => {
    const { data } = this.state;
    const deletedItem = data[index];
    const total = this.state.total - deletedItem.totalPrice;
    data.splice(index, 1);

    this.setState({
      data,
      total,
    });
  };

  render() {
    const { data, Category, Quantity, Item, Brand, Description, Price, date, total, editIndex, editedItem } = this.state;

    return (
      <div className="container">
        <div className="form-container">
          <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Sales Detail</h1>
          <form onSubmit={this.handleSubmit}>
            <TextField
              label="Item"
              variant="outlined"
              fullWidth
              name="Item"
              value={Item}
              onChange={this.handleChange}
            />
            <TextField
              label="Category"
              variant="outlined"
              fullWidth
              name="Category"
              value={Category}
              onChange={this.handleChange}
            />
            <TextField
              label="Brand"
              variant="outlined"
              fullWidth
              name="Brand"
              value={Brand}
              onChange={this.handleChange}
            />
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              name="Description"
              value={Description}
              onChange={this.handleChange}
            />
            <TextField
              label="Price"
              variant="outlined"
              fullWidth
              name="Price"
              value={Price}
              onChange={this.handleChange}
            />
            <TextField
              label=""
              variant="outlined"
              fullWidth
              type="date"
              name="date"
              value={date}
              onChange={this.handleChange}
            />
            <TextField
              label="Quantity"
              variant="outlined"
              fullWidth
              type="number"
              name="Quantity"
              value={Quantity}
              onChange={this.handleChange}
            />
            <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>
              Add Item
            </Button>
          </form>
        </div>
        <div className="table-container">
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Item</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Brand</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Total Price</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {editIndex === index ? (
                        <TextField
                          type="date"
                          value={editedItem.date}
                          onChange={(e) => this.setState({ editedItem: { ...editedItem, date: e.target.value } })}
                        />
                      ) : (
                        item.date
                      )}
                    </TableCell>
                    <TableCell>
                      {editIndex === index ? (
                        <TextField
                          value={editedItem.Item}
                          onChange={(e) => this.setState({ editedItem: { ...editedItem, Item: e.target.value } })}
                        />
                      ) : (
                        item.Item
                      )}
                    </TableCell>
                    <TableCell>
                      {editIndex === index ? (
                        <TextField
                          value={editedItem.Category}
                          onChange={(e) => this.setState({ editedItem: { ...editedItem, Category: e.target.value } })}
                        />
                      ) : (
                        item.Category
                      )}
                    </TableCell>
                    <TableCell>
                      {editIndex === index ? (
                        <TextField
                          value={editedItem.Brand}
                          onChange={(e) => this.setState({ editedItem: { ...editedItem, Brand: e.target.value } })}
                        />
                      ) : (
                        item.Brand
                      )}
                    </TableCell>
                    <TableCell>
                      {editIndex === index ? (
                        <TextField
                          value={editedItem.Description}
                          onChange={(e) => this.setState({ editedItem: { ...editedItem, Description: e.target.value } })}
                        />
                      ) : (
                        item.Description
                      )}
                    </TableCell>
                    <TableCell>
                      {editIndex === index ? (
                        <TextField
                          type="number"
                          value={editedItem.Quantity}
                          onChange={(e) => this.setState({ editedItem: { ...editedItem, Quantity: e.target.value } })}
                        />
                      ) : (
                        item.Quantity
                      )}
                    </TableCell>
                    <TableCell>
                      {editIndex === index ? (
                        <TextField
                          type="number"
                          value={editedItem.Price}
                          onChange={(e) => this.setState({ editedItem: { ...editedItem, Price: e.target.value } })}
                        />
                      ) : (
                        item.Price
                      )}
                    </TableCell>
                    <TableCell>{item.totalPrice}</TableCell>
                    <TableCell>
                      {editIndex === index ? (
                        <>
                          <Button onClick={this.handleSaveEdit} color="primary" size="small">
                            Save
                          </Button>
                          <Button onClick={this.handleCancelEdit} color="secondary" size="small">
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button onClick={() => this.handleEdit(index)} startIcon={<EditIcon />} color="primary" size="small">
                            Edit
                          </Button>
                          <Button onClick={() => this.handleDelete(index)} startIcon={<DeleteIcon />} color="secondary" size="small">
                            Delete
                          </Button>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={7}>Total:</TableCell>
                  <TableCell>{total.toFixed(2)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </div>
      </div>
    );
  }
}

export default Sales;
