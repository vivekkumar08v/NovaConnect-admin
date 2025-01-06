import { createContext } from "react";

export const AppContext = createContext()

const AppContextProvider = (props) => {

    const months =["","Jan", "Feb", "Mar","Apr", "May", "Jun","Jul", "Aug","Sep", "Oct", "Nov", "Dec"]

    const slotDateFormat = (slotDate) =>{
        if (typeof slotDate !== "string") {
            console.error("Invalid slotDate:", slotDate);
            return "Invalid Date";
          }
        const dateArray = slotDate.split('-');
        if (dateArray.length !== 3) {
            console.error("Unexpected date format:", slotDate);
            return "Invalid Date";
          }
        return dateArray[0]+" "+months[Number(dateArray[1])]+" "+dateArray[2]
      };

    const value ={
      slotDateFormat  
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider