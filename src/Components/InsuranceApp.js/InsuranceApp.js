import { useEffect, useState } from "react";
import axios from "axios";

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const createUser = async () => {
    try {
      const response = await axios.post("http://api.qinsx.de/user", {
        username,
        password,
      });
      if (response.status === 201) {
        localStorage.setItem("token", btoa(`${username}:${password}`));
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div>
      <label>Username:</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={createUser}>Create User</button>
    </div>
  );
};

const InsuranceCreate = () => {
  const [insuranceNo, setInsuranceNo] = useState("");

  const createInsurance = async (data) => {
    try {
      const token = getToken();
      const reqBody = {
        insurance_number: insuranceNo,
      };
      const response = await axios.post(
        "http://api.qinsx.de/insurance",
        reqBody,
        {
          headers: {
            Authorization: `Basic ${token}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div>
      <label>Insuorance No:</label>
      <input
        type="text"
        value={insuranceNo}
        onChange={(e) => setInsuranceNo(e.target.value)}
      />
      <button onClick={createInsurance}>Create</button>
      <ul>
        {/* {insurances.map((item, idx) => <li key={idx}>{item.insurance_number}</li>)} */}
      </ul>
    </div>
  );
};

const InsuranceList = () => {
  const [insurances, setInsurances] = useState([]);
  const getInsurances = async () => {
    try {
      const token = getToken();
      const response = await axios.get("http://api.qinsx.de/insurance", {
        headers: {
          Authorization: `Basic ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (getToken()) {
        const lists = await getInsurances();
        setInsurances(lists);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      List of insurances
      <ul>
        {insurances &&
          insurances.map((item, idx) => (
            <li key={idx}>{item.insurance_number}</li>
          ))}
      </ul>
    </div>
  );
};

export default function InsuranceApp() {
  return (
    <div>
      <h1>Insurance App</h1>
      {getToken() ? (
        <>
          <InsuranceCreate />
          <InsuranceList />
        </>
      ) : (
        <Register />
      )}
    </div>
  );
}
