import React, { useEffect, useState } from "react";
import ListingsContainer from "./ListingsContainer";

function App() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    // Define the function to fetch listings
    const fetchListings = async () => {
      try {
        const response = await fetch("http://localhost:6001/listings");
        if (!response.ok) {
          throw new Error("Failed to fetch listings");
        }

        const data = await response.json();
        setListings(data);
      } catch (error) {
        console.error("Error fetching listings:", error.message);
      }
    };

    // Call the function to fetch listings when the component mounts
    fetchListings();
  }, []); // The empty dependency array ensures this runs only once on mount

  // Function to handle deleting a listing
  const handleDeleteListing = async (id) => {
    try {
      const response = await fetch(`http://localhost:6001/listings/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete listing");
      }

      // Update state by removing the deleted listing
      setListings((prevListings) =>
        prevListings.filter((listing) => listing.id !== id)
      );
    } catch (error) {
      console.error("Error deleting listing:", error.message);
    }
  };

  return (
    <div>
      <h1>gregslist</h1>
      <ListingsContainer
        listings={listings}
        onDeleteListing={handleDeleteListing}
      />
    </div>
  );
}

export default App;
