





////v1
// import React, { createContext, useContext, useState } from "react";
// import { utils, writeFile } from "xlsx";

// const SearchExportContext = createContext();

// export const useSearchExport = () => useContext(SearchExportContext);

// export const SearchExportProvider = ({ children }) => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [data, setData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);

//   const handleSearch = (query) => {
//     setSearchQuery(query);
//     const filtered = data.filter((item) =>
//       Object.values(item).some((value) =>
//         value.toString().toLowerCase().includes(query.toLowerCase())
//       )
//     );
//     setFilteredData(filtered);
//   };

//   const handleExport = (dataToExport, tableColumns, tableName) => {
//     const exportData = dataToExport.map((item, index) =>
//       tableColumns.reduce((acc, col) => {
//         if (col.key === "srNo") {
//           acc[col.label] = index + 1; // Add serial number starting from 1
//         } else {
//           acc[col.label] = item[col.key];
//         }
//         return acc;
//       }, {})
//     );

//     const worksheet = utils.json_to_sheet(exportData);
//     const workbook = utils.book_new();

//     // Add headers
//     const headers = tableColumns.map((col) => col.label);
//     utils.sheet_add_aoa(worksheet, [headers], { origin: "A1" });

//     // Style headers
//     headers.forEach((_, index) => {
//       const cellAddress = utils.encode_cell({ r: 0, c: index });
//       worksheet[cellAddress].s = {
//         font: { bold: true },
//       };
//     });

//     utils.book_append_sheet(workbook, worksheet, "Sheet1");
//     writeFile(workbook, `${tableName}.xlsx`);
//   };

//   return (
//     <SearchExportContext.Provider
//       value={{
//         searchQuery,
//         handleSearch,
//         handleExport,
//         setData,
//         data,
//         filteredData,
//       }}
//     >
//       {children}
//     </SearchExportContext.Provider>
//   );
// };







////v2
// import React, { createContext, useContext, useState } from "react";
// import { utils, writeFile } from "xlsx";

// const SearchExportContext = createContext();

// export const useSearchExport = () => useContext(SearchExportContext);

// export const SearchExportProvider = ({ children }) => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [data, setData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);

//   const handleSearch = (query) => {
//     setSearchQuery(query);
//     const filtered = data.filter((item) =>
//       Object.values(item).some((value) =>
//         value !== null && value !== undefined && value.toString().toLowerCase().includes(query.toLowerCase())
//       )
//     );
//     setFilteredData(filtered);
//   };

//   const handleExport = (dataToExport, tableColumns, tableName) => {
//     const exportData = dataToExport.map((item, index) =>
//       tableColumns.reduce((acc, col) => {
//         if (col.key === "srNo") {
//           acc[col.label] = index + 1; // Add serial number starting from 1
//         } else {
//           acc[col.label] = item[col.key];
//         }
//         return acc;
//       }, {})
//     );

//     const worksheet = utils.json_to_sheet(exportData);
//     const workbook = utils.book_new();

//     // Add headers
//     const headers = tableColumns.map((col) => col.label);
//     utils.sheet_add_aoa(worksheet, [headers], { origin: "A1" });

//     // Style headers
//     headers.forEach((_, index) => {
//       const cellAddress = utils.encode_cell({ r: 0, c: index });
//       if (worksheet[cellAddress]) {
//         worksheet[cellAddress].s = {
//           font: { bold: true },
//         };
//       }
//     });

//     utils.book_append_sheet(workbook, worksheet, "Sheet1");
//     writeFile(workbook, `${tableName}.xlsx`);
//   };

//   return (
//     <SearchExportContext.Provider
//       value={{
//         searchQuery,
//         handleSearch,
//         handleExport,
//         setData,
//         data,
//         filteredData,
//       }}
//     >
//       {children}
//     </SearchExportContext.Provider>
//   );
// };











////v3
// import React, { createContext, useContext, useState } from "react";
// import { utils, writeFile } from "xlsx";

// const SearchExportContext = createContext();

// export const useSearchExport = () => useContext(SearchExportContext);

// export const SearchExportProvider = ({ children }) => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [data, setData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);

//   const handleSearch = (query) => {
//     setSearchQuery(query);
//     const filtered = data.filter((item) =>
//       Object.values(item).some((value) =>
//         value !== null && value !== undefined && value.toString().toLowerCase().includes(query.toLowerCase())
//       )
//     );
//     setFilteredData(filtered);
//   };

//   const handleExport = (dataToExport, tableColumns, tableName) => {
//     const exportData = dataToExport.map((item, index) =>
//       tableColumns.reduce((acc, col) => {
//         if (col.key === "srNo") {
//           acc["Sr. No."] = index + 1; // Add serial number starting from 1
//         } else if (col.selector) {
//           acc[col.name.props.name] = col.selector(item);
//         }
//         return acc;
//       }, {})
//     );

//     const worksheet = utils.json_to_sheet(exportData);
//     const workbook = utils.book_new();

//     // Add headers
//     const headers = tableColumns.map((col) => col.name.props.name);
//     utils.sheet_add_aoa(worksheet, [headers], { origin: "A1" });

//     // Style headers
//     headers.forEach((_, index) => {
//       const cellAddress = utils.encode_cell({ r: 0, c: index });
//       if (worksheet[cellAddress]) {
//         worksheet[cellAddress].s = {
//           font: { bold: true },
//         };
//       }
//     });

//     utils.book_append_sheet(workbook, worksheet, "Sheet1");
//     writeFile(workbook, `${tableName}.xlsx`);
//   };

//   return (
//     <SearchExportContext.Provider
//       value={{
//         searchQuery,
//         handleSearch,
//         handleExport,
//         setData,
//         data,
//         filteredData,
//       }}
//     >
//       {children}
//     </SearchExportContext.Provider>
//   );
// };











////v4
import React, { createContext, useContext, useState } from "react";
import { utils, writeFile } from "xlsx";

const SearchExportContext = createContext();

export const useSearchExport = () => useContext(SearchExportContext);

export const SearchExportProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = data.filter((item) =>
      Object.values(item).some((value) =>
        value !== null && value !== undefined && value.toString().toLowerCase().includes(query.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

  const handleExport = (dataToExport, tableColumns, tableName) => {
    const filteredColumns = tableColumns.filter(
      (col) => col.key !== "actions" && col.key !== "cv"
    );

    const exportData = dataToExport.map((item, index) =>
      filteredColumns.reduce((acc, col) => {
        if (col.key === "srNo") {
          acc["Sr. No."] = index + 1; // Add serial number starting from 1
        } else if (col.selector) {
          acc[col.name.props.name] = col.selector(item);
        }
        return acc;
      }, {})
    );

    const worksheet = utils.json_to_sheet(exportData);
    const workbook = utils.book_new();

    // Add headers
    const headers = filteredColumns.map((col) => col.name.props.name);
    utils.sheet_add_aoa(worksheet, [headers], { origin: "A1" });

    // Style headers
    headers.forEach((_, index) => {
      const cellAddress = utils.encode_cell({ r: 0, c: index });
      if (worksheet[cellAddress]) {
        worksheet[cellAddress].s = {
          font: { bold: true },
        };
      }
    });

    utils.book_append_sheet(workbook, worksheet, "Sheet1");
    writeFile(workbook, `${tableName}.xlsx`);
  };

  return (
    <SearchExportContext.Provider
      value={{
        searchQuery,
        handleSearch,
        handleExport,
        setData,
        data,
        filteredData,
      }}
    >
      {children}
    </SearchExportContext.Provider>
  );
};