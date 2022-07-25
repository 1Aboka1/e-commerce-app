import React from 'react'
import axios from 'axios'
import './datatable.scss'

import { DataGrid } from '@mui/x-data-grid';


const userColumns = [
  { field: 'id', headerName: 'ID', width: 40 },
  { field: 'name', headerName: 'Full name', width: 150,
    cellRenderer: (cellData) => {
      return (
        <div>{cellData}</div>
      );
    } 
  },
  { field: 'email', headerName: 'Email', width: 200 },
  {
    field: 'balance',
    headerName: 'Balance',
    type: 'number',
    width: 75,
  },
  {
    field: 'is_staff',
    headerName: 'Staff',
    type: 'boolean',
    width: 70,
  },
  {
    field: 'is_active',
    headerName: 'Status',
    width: 200,
    renderCell: (cellData) => {
      return (
        <div className={"cellWithStatus " + (cellData ? "Active" : "Passive")}>{cellData ? "Active" : "Passive"}</div>
      )
    }
  },
];

export class DataTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      usersData: [],
    }
    this.actionColumn = [
      {
        field: 'action',
        headerName: 'Action',
        width: 200,
        renderCell: () => {
          return(
            <div className="cellAction">
              <div className="viewButton">View</div>
              <div className="deleteButton">Delete</div>
            </div>
          )
        }
      }
    ]
  }

  refreshList = () => {
    axios
      .get("api/users")
      .then((response) => {this.setState({usersData: response.data})})
      .catch((error) => {console.log(error)})
  }

  componentDidMount() {
    this.refreshList()
  }

  render() {
    return (
      <div className='datatable'>
          <DataGrid
          rows={this.state.usersData}
          columns={userColumns.concat(this.actionColumn)}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    )
  }
}