import axios from "axios";

const getTotalValidators = async () => {
  try {
    const response = await axios.get(
      `https://namadaindexer.nodeworld.xyz/validators`
    );
    setValidators(response.data.result.total);
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
};
