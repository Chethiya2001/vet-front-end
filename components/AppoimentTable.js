const AppointmentTable = ({ appointments }) => {
    if (appointments.length === 0) {
      return <p>No appointments found</p>;
    }
  
    return (
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th>ID</th>
            <th>Time</th>
            <th>Animal Owner Name</th>
            <th>Animal Name</th>
            <th>NIC</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.id}</td>
              <td>{new Date(appointment.date).toLocaleString()}</td>
              <td>{appointment.AnimalOwner.name}</td>
              <td>{appointment.Animal.name}</td>
              <td>{appointment.AnimalOwner.nic}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default AppointmentTable;
  