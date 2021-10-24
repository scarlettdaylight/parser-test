import React from "react";

type ViewTableProps = {
  data: PageViewCount;
  title: string;
  className?: string;
};

const ViewTable = ({ data, title, className }: ViewTableProps) => {
  if (Object.keys(data).length === 0) {
    return null;
  }

  return (
    <div className={`${className ?? ""}`}>
      <h4>{title}</h4>
      <table className={`view-table`}>
        <thead>
          <tr>
            <th>Path</th>
            <th>Views</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).map((key) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{data[key]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewTable;
