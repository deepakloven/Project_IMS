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
import '../styles/vendors.css'; // Use your vendors.css stylesheet
import firebaseDB from './Firebase'; // Import the Firebase database reference

function Vendors() {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    fullName: '',
    vendorId: '',
    phoneNumber: '',
    emailId: '',
    address: '',
    city: '',
    district: '',
  });
  const [editIndex, setEditIndex] = useState(null);
  const [editedVendor, setEditedVendor] = useState({});

  useEffect(() => {
    const vendorsRef = firebaseDB.child('vendors');

    const fetchData = () => {
      vendorsRef.on('value', (snapshot) => {
        const vendorsData = snapshot.val();
        if (vendorsData) {
          const vendorsArray = Object.values(vendorsData);
          setData(vendorsArray);
        }
      });
    };

    fetchData();

    return () => {
      vendorsRef.off();
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

    const newVendorObject = { ...formData };

    if (editIndex !== null) {
      const newData = [...data];
      newData[editIndex] = { ...editedVendor };
      newData[editIndex] = { ...newVendorObject };

      // Update the data
      setData(newData);

      // Update the Firebase data
      firebaseDB.child('vendors').set(newData);

      setEditIndex(null);
      setEditedVendor({});
    } else {
      const vendorsRef = firebaseDB.child('vendors');
      vendorsRef.push(newVendorObject);
    }

    setFormData({
      fullName: '',
      vendorId: '',
      phoneNumber: '',
      emailId: '',
      address: '',
      city: '',
      district: '',
    });
  };

  const handleEdit = (index) => {
    const selectedVendor = data[index];
    setEditIndex(index);
    setEditedVendor({ ...selectedVendor });
  };

  const handleSaveEdit = () => {
    if (editIndex !== null) {
      const newData = [...data];
      newData[editIndex] = { ...editedVendor };

      // Update the data
      setData(newData);

      // Update the Firebase data
      firebaseDB.child('vendors').set(newData);

      setEditIndex(null);
      setEditedVendor({});
    }
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
    setEditedVendor({});
  };

  const handleDelete = (index) => {
    const deletedVendor = data[index];
    data.splice(index, 1);

    // Update the data
    setData([...data]);

    // Update the Firebase data
    firebaseDB.child('vendors').set(data);
  };

  return (
    <div className="vendors_container">
      <div className="v-form-container">
        <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          Vendors Detail
        </h1>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Full Name"
            variant="outlined"
            fullWidth
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
          <TextField
            label="Vendor ID"
            variant="outlined"
            fullWidth
            name="vendorId"
            value={formData.vendorId}
            onChange={handleChange}
          />
          <TextField
            label="Phone Number"
            variant="outlined"
            fullWidth
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          <TextField
            label="Email ID"
            variant="outlined"
            fullWidth
            name="emailId"
            value={formData.emailId}
            onChange={handleChange}
          />
          <TextField
            label="Address"
            variant="outlined"
            fullWidth
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
          <TextField
            label="City"
            variant="outlined"
            fullWidth
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
          <TextField
            label="District"
            variant="outlined"
            fullWidth
            name="district"
            value={formData.district}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>
            {editIndex !== null ? 'Save Vendor' : 'Add Vendor'}
          </Button>
        </form>
      </div>
      <div className="v-table-container">
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Full Name</TableCell>
                <TableCell>Vendor ID</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Email ID</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>City</TableCell>
                <TableCell>District</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((vendor, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {editIndex === index ? (
                      <TextField
                        value={editedVendor.fullName}
                        onChange={(e) => setEditedVendor({ ...editedVendor, fullName: e.target.value })}
                      />
                    ) : (
                      vendor.fullName
                    )}
                  </TableCell>
                  <TableCell>
                    {editIndex === index ? (
                      <TextField
                        value={editedVendor.vendorId}
                        onChange={(e) => setEditedVendor({ ...editedVendor, vendorId: e.target.value })}
                      />
                    ) : (
                      vendor.vendorId
                    )}
                  </TableCell>
                  <TableCell>
                    {editIndex === index ? (
                      <TextField
                        value={editedVendor.phoneNumber}
                        onChange={(e) => setEditedVendor({ ...editedVendor, phoneNumber: e.target.value })}
                      />
                    ) : (
                      vendor.phoneNumber
                    )}
                  </TableCell>
                  <TableCell>
                    {editIndex === index ? (
                      <TextField
                        value={editedVendor.emailId}
                        onChange={(e) => setEditedVendor({ ...editedVendor, emailId: e.target.value })}
                      />
                    ) : (
                      vendor.emailId
                    )}
                  </TableCell>
                  <TableCell>
                    {editIndex === index ? (
                      <TextField
                        value={editedVendor.address}
                        onChange={(e) => setEditedVendor({ ...editedVendor, address: e.target.value })}
                      />
                    ) : (
                      vendor.address
                    )}
                  </TableCell>
                  <TableCell>
                    {editIndex === index ? (
                      <TextField
                        value={editedVendor.city}
                        onChange={(e) => setEditedVendor({ ...editedVendor, city: e.target.value })}
                      />
                    ) : (
                      vendor.city
                    )}
                  </TableCell>
                  <TableCell>
                    {editIndex === index ? (
                      <TextField
                        value={editedVendor.district}
                        onChange={(e) => setEditedVendor({ ...editedVendor, district: e.target.value })}
                      />
                    ) : (
                      vendor.district
                    )}
                  </TableCell>
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
            </TableBody>
          </Table>
        </Paper>
      </div>
    </div>
  );
}

export default Vendors;
