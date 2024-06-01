import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { backendEndpoint } from '../../config';
import '../../styles/Home.css'

const Home = () => {
  const [roomName, setRoomName] = useState('');
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    // Fetch available chat rooms from the backend
    const fetchRooms = async () => {
      const response = await axios.get(`${backendEndpoint}/api/rooms`, { withCredentials: true });
      setRooms(response.data);
    };
    fetchRooms();
  }, []);

  const handleCreateRoom = async () => {
    if (roomName.trim()) {

      try {
        const response = await axios.post(`${backendEndpoint}/api/rooms`, { name: roomName }, { withCredentials: true });
        if (response.data.success) {
          setRooms([...rooms, roomName]);
        }
      } catch(error) {
        console.error('Error creating room', error);
        const errorResp = error.response.data.message;
        errorResp ? alert(errorResp) : alert('Error creating room');
      }
      setRoomName('');
    }
  };

  const handleJoinRoom = async (roomName) => {
    try {
      const response = await axios.get(`${backendEndpoint}/api/rooms/${roomName}`, { withCredentials: true });
      if (response.data.success) {
        navigate(`/chat/${roomName}`); // Navigate to the chat room
      } else {
        alert('Room does not exist');
      }
    } catch (error) {
      console.error('Error checking room existence', error);
      alert('Error checking room existence');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCreateRoom();
    }
  };

  return (
    <>
      <div>
        <input
          type="text"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter room name"
        />
        <button onClick={handleCreateRoom}>Create</button>
      </div>
      <div>
        <h3>Available Chat Rooms:</h3>
        <ul>
          {rooms.map((room, index) => (
            <li key={index} onClick={() => handleJoinRoom(room)}>
              <Link to={`/chat/${room}`}>{room}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Home;
