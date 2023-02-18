
import { useMemo } from 'react';
import { useTable } from 'react-table';

export default function ScoreTable({ data }) {

  const columns = useMemo(() => [
    {Header: "Username", accessor: "user_name"},
    {Header: "Turns", accessor: "turns_played"},
    {Header: "Date", accessor: "game_date"}

  ],[])  

  const tableInstance = useTable({ columns, data });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance

  return (
    <>
      <div className="chess__leaderboard">
        <div className="chess__leaderboard__header">
          <h3>Leaderboard</h3>
        </div>

        <table {...getTableProps()} className="chess__leaderboard__list">
       <thead>
         {headerGroups.map(headerGroup => (
           <tr {...headerGroup.getHeaderGroupProps()}>
             {headerGroup.headers.map(column => (
               <th
                 {...column.getHeaderProps()}
         
               >
                 {column.render('Header')}
               </th>
             ))}
           </tr>
         ))}
       </thead>
       <tbody {...getTableBodyProps()}>
         {rows.map(row => {
           prepareRow(row)
           return (
             <tr {...row.getRowProps()}>
               {row.cells.map(cell => {
                 return (
                   <td
                     {...cell.getCellProps()}
                
                   >
                     {cell.render('Cell')}
                   </td>
                 )
               })}
             </tr>
           )
         })}
       </tbody>
     </table>
   
      </div>
    </>
  );
}
