import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchReservations } from "../redux/reservation/Reservation";
import { cancelReservation } from "../redux/reservation/Reservation";
import { updateReservationStatus } from "../redux/reservation/Reservation";
import './reservation.css'

function Reservations() {
  const { reservations, getReservationStatus, cancelStatus } = useSelector((state) => state.reservations);
  const dispatch = useDispatch();
  const [successMsg, setSuccess] = useState(false);

  useEffect(() => {
    if (cancelStatus === "fulfilled") {
      setSuccess(true);
      dispatch(fetchReservations());
      setTimeout(() => {
        setSuccess(false);
        dispatch(updateReservationStatus(""));
      }, 1000);
    }
  }, [cancelStatus, dispatch]);

  useEffect(() => {
    dispatch(fetchReservations());
  }, [dispatch]);

  if (getReservationStatus === "pending") return <div className="reservation"> <span class="reservation-loader"></span></div>

  return (
    <div className="reservation-container">
      {(successMsg) && <p style={{ color: 'green' }}>Reservation canceled successfully </p>}

      {(cancelStatus === 'rejected') && <p style={{ color: 'red' }}>Something went wrong, please try again </p>}

      {(reservations.length === 0 && getReservationStatus === 'fulfilled') && <p style={{ color: 'red' }}>You have no reservations </p>}

      {(getReservationStatus === 'rejected') && <p style={{ color: 'red' }}>Something went wrong, please try again </p>
      }
      <h1>My Reservations</h1>
      {(cancelStatus === 'pending') && <span class="cancel-loader"></span>}
      <table>
        <tr>
          <th>Date</th>
          <th>Product name</th>
          <th>City</th>
          <th>Actions</th>
        </tr>
        {reservations.map((reservation) =>
          <tr>
            <td>{reservation.date}</td>
            <td>{reservation.product.name}</td>
            <td>{reservation.city}</td>
            <td><button type="button" className="btn cancel" onClick={() => dispatch(cancelReservation(reservation.id))}>Cancel</button></td>
          </tr>
        )}
      </table>
    </div>
  );
}

export default Reservations;