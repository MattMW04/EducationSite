"use client"
import { useEffect, useState } from 'react';

export default function PublicRoutesList() {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    fetch('/api/myRoutes/public')
      .then((res) => res.json())
      .then((data) => setRoutes(data))
      .catch(() => setRoutes([]));
  }, []);

  return (
    <div>
      <h2>Public Routes</h2>
      <ul>
        {routes.map((route) => (
          <li key={route._id}>{route.title}</li>
        ))}
      </ul>
    </div>
  );
}