import React, { useState, useEffect } from 'react';
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
import './purchase.css'; // Use your purchase.css stylesheet
import firebaseDB from './Firebase'; // Import the Firebase database reference

function Purchase() {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    Category: '',
    Quantity: '',
    Item: '',
    Brand: '',
    Description: '',
    Price: '',
    date: '',
  });
  const [total, setTotal] = useState(0);
  const [editIndex, setEditIndex] = useState(null);
  const [editedItem, setEditedItem] = useState({});

  useEffect(() => {
    const purchaseRef = firebaseDB.child('purchase');

    const fetchData = () => {
      purchaseRef.on('value', (snapshot) => {
        const purchaseData = snapshot.val();
        if (purchaseData) {
          const purchaseArray = Object.values(purchaseData);
          setData(purchaseArray);
          // Calculate the total price when data changes
          const total = purchaseArray.reduce((acc, item) => acc + (item.Quantity * item.Price), 0);
          setTotal(total);
        }
      });
    };

    fetchData();

    return () => {
      purchaseRef.off();
    };
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { Category, Quantity, Item, Brand, Description, Price, date } = formData;

    const newItemObject = {
      Category,
      Quantity: parseInt(Quantity), // Parse Quantity to an integer
      Item,
      Brand,
      Description,
      Price: parseFloat(Price),
      date,
    };

    const totalPrice = newItemObject.Quantity * newItemObject.Price;
    newItemObject.totalPrice = totalPrice;

    firebaseDB.child('purchase').push(newItemObject);

    setFormData({
      Category: '',
      Quantity: '',
      Item: '',
      Brand: '',
      Description: '',
      Price: '',
      date: '',
    });

    // Calculate the new total price
    setTotal(total + totalPrice);
  };

  const handleEdit = (index) => {
    const selectedItem = data[index];
    setEditIndex(index);
    setEditedItem({ ...selectedItem });
  };

  const handleSaveEdit = () => {
    if (editIndex !== null) {
      const newData = [...data];
      newData[editIndex] = { ...editedItem };
      const totalPrice = newData[editIndex].Quantity * newData[editIndex].Price;
      newData[editIndex].totalPrice = totalPrice;

      // Update the data and total price
      setData(newData);
      setEditIndex(null);
      setEditedItem({});

      // Calculate the new total price
      const newTotal = newData.reduce((acc, item) => acc + item.totalPrice, 0);
      setTotal(newTotal);

      // Update the Firebase data
      firebaseDB.child('purchase').set(newData);
    }
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
    setEditedItem({});
  };

  const handleDelete = (index) => {
    const deletedItem = data[index];
    const newTotal = total - deletedItem.totalPrice;
    data.splice(index, 1);

    // Update the data and total price
    setData([...data]);
    setTotal(newTotal);

    // Update the Firebase data
    firebaseDB.child('purchase').set(data);
  };

  return (
    <div className="purchase_container">
      <div className="p-form-container">
        <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Purchase Detail</h1>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Item"
            variant="outlined"
            fullWidth
            name="Item"
            value={formData.Item} // Use formData to access values
            onChange={handleChange}
          />
          <TextField
            label="Category"
            variant="outlined"
            fullWidth
            name="Category"
            value={formData.Category} // Use formData to access values
            onChange={handleChange}
          />
          <TextField
            label="Brand"
            variant="outlined"
            fullWidth
            name="Brand"
            value={formData.Brand} // Use formData to access values
            onChange={handleChange}
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            name="Description"
            value={formData.Description} // Use formData to access values
            onChange={handleChange}
          />
          <TextField
            label="Price"
            variant="outlined"
            fullWidth
            name="Price"
            value={formData.Price} // Use formData to access values
            onChange={handleChange}
          />
          <TextField
            label=""
            variant="outlined"
            fullWidth
            type="date"
            name="date"
            value={formData.date} // Use formData to access values
            onChange={handleChange}
          />
          <TextField
            label="Quantity"
            variant="outlined"
            fullWidth
            type="number"
            name="Quantity"
            value={formData.Quantity} // Use formData to access values
            onChange={handleChange}
          />
          {/* ... */}
          <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>
            Add Item
          </Button>
        </form>
      </div>
      <div className="p-table-container">
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
                        onChange={(e) => setEditedItem({ ...editedItem, date: e.target.value })}
                      />
                    ) : (
                      item.date
                    )}
                  </TableCell>
                                    {/* Render other table cells */}
                                    <TableCell>{item.Item}</TableCell>
                  <TableCell>{item.Category}</TableCell>
                  <TableCell>{item.Brand}</TableCell>
                  <TableCell>{item.Description}</TableCell>
                  <TableCell>{item.Quantity}</TableCell>
                  <TableCell>{item.Price.toFixed(2)}</TableCell>
                  <TableCell>{item.totalPrice.toFixed(2)}</TableCell>
                  <TableCell>
                    {editIndex === index ? (
                      <>
                        <Button onClick={handleSaveEdit} color="primary" size="small">
                          Save
                        </Button>
                        <Button onClick={handleCancelEdit} color="secondary" size="small">
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button onClick={() => handleEdit(index)} startIcon={<EditIcon />} color="primary" size="small">
                          Edit
                        </Button>
                        <Button onClick={() => handleDelete(index)} startIcon={<DeleteIcon />} color="secondary" size="small">
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

export default Purchase;
