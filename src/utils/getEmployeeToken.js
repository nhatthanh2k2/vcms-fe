export const getEmployeeToken = () => {
    const employeeToken = sessionStorage.getItem("token");
  
    if (employeeToken) {
      try {
        const parsedToken = JSON.parse(employeeToken);
        return parsedToken?.token || "";  
      } catch (error) {
        console.error("Error parsing employee data from sessionStorage:", error);
        return ""; 
      }
    }
  
    return ""; 
  };
  
  