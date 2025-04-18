import React from "react"

const FleetTable = () => {
  const rows = new Array(10).fill({
    fleet: "BMW",
    seller: "Samrat01",
    address: "Bhaktapur",
    number: "9090876512",
    email: "samratgreat@gmail.com",
    status: "Active"
  })

  return (
    <div className="table-container">
      <div className="table-header">
        <h2>Sellers Details</h2>
        <div className="actions">
          <button>Delete</button>
          <button>Filters</button>
          <button>Export</button>
          <button className="cta">Add new CTA</button>
        </div>
      </div>
      <table className="fleet-table">
        <thead>
          <tr>
            <th></th>
            <th>Fleet</th>
            <th>Seller</th>
            <th>Address</th>
            <th>Number</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              <td><input type="checkbox" /></td>
              <td>{row.fleet}</td>
              <td>{row.seller}</td>
              <td>{row.address}</td>
              <td>{row.number}</td>
              <td>{row.email}</td>
              <td><span className={`status ${row.status.toLowerCase()}`}>{row.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default FleetTable
