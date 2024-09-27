export const getEmployeeToken = () => {
    const employeeData = sessionStorage.getItem("employee");
  
    if (employeeData) {
      try {
        const parsedEmployee = JSON.parse(employeeData);
        return parsedEmployee?.token || "";  
      } catch (error) {
        console.error("Error parsing employee data from sessionStorage:", error);
        return ""; 
      }
    }
  
    return ""; 
  };
  
  