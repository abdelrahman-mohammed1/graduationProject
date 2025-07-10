import { useContext, useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { Slide, toast } from "react-toastify";

const ProviderData = createContext();

function DateContext({ children }) {
  const [loading, setIsLoading] = useState(false);
  const [nurseLoading, setNurseIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const [nurses, setNurses] = useState([]);
  const [city, setCity] = useState([]);
  const [token1, setToken] = useState("");
  const [getNurseLoading, setGetNurseLoading] = useState(false);

  const token = JSON.parse(localStorage.getItem("access_token"));
  console.log(token);
  const [loadingBooking, setLoadingBooking] = useState(false);
  const [bookings, setBookings] = useState([]);
  useEffect(
    function () {
      async function getAllBookings() {
        if (!token) return;
        setLoadingBooking(true);
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}appointments/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        setBookings(data);
        setLoadingBooking(false);
      }
      getAllBookings();
    },
    [token]
  );

  async function handleDelete(id) {
    try {
      setNurseIsLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}nurses/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Update the nurses state by filtering out the deleted nurse
      setNurses((prevNurses) => prevNurses.filter((nurse) => nurse._id !== id));

      toast.success("Nurse deleted successfully!", {
        transition: Slide,
        autoClose: 2000,
        delay: 1000,
        pauseOnHover: false,
      });
    } catch (error) {
      console.error("Error deleting nurse: ", error);
    } finally {
      setNurseIsLoading(false);
    }
  }

  useEffect(function () {
    async function FetchData() {
      try {
        setIsLoading(true);
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}governorates`);
        const data = await res.json();
        setData(data);
      } catch {
        alert("We Have a Error");
      } finally {
        setIsLoading(false);
      }
    }
    FetchData();
  }, []);

  useEffect(function () {
    async function FetchData() {
      try {
        setIsLoading(true);
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}cities/`);
        const data = await res.json();
        setCity(data);
      } catch {
        alert("We Have a Error");
      } finally {
        setIsLoading(false);
      }
    }
    FetchData();
  }, []);

  useEffect(
    function () {
      async function getUsers() {
        if (!token) return;
        setIsLoading(true);

        try {
          const res = await fetch(`${import.meta.env.VITE_BASE_URL}users/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }

          const data = await res.json();
          setUsers(data.data);
        } catch (error) {
          console.error("Error fetching data: ", error);
        } finally {
          setIsLoading(false);
        }
      }
      getUsers();
    },
    [token]
  );
  useEffect(
    function () {
      async function getNurses() {
        if (!token) return;
        setGetNurseLoading(true);

        try {
          const res = await fetch(`${import.meta.env.VITE_BASE_URL}nurses/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }

          const data = await res.json();
          setNurses(data.data);
        } catch (error) {
          console.error("Error fetching data: ", error);
        } finally {
          setGetNurseLoading(false);
        }
      }
      getNurses();
    },
    [token]
  );

  return (
    <ProviderData.Provider
      value={{
        loadingBooking,
        bookings,
        token,
        setToken,
        data,
        loading,
        users,
        getNurseLoading,
        nurses,
        city,
        nurseLoading,
        handleDelete,
      }}
    >
      {children}
    </ProviderData.Provider>
  );
}

function useData() {
  const context = useContext(ProviderData);
  if (context === undefined)
    throw new Error("Using context values Outside the context area");
  return context;
}

export { DateContext, useData };
