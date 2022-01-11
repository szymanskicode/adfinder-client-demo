import React, { useEffect, useState } from 'react';

// Css Styles
import './Logs.css';

const Logs = () => {
  const [logs, setLogs] = useState([]);
  const url = (process.env.REACT_APP_API_URL || '') + '/api/admin/logs'

  useEffect(() => {
    const iID = setInterval(() => {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          // Sort data by time created
          function compare(a, b) {
            const timeA = a.createdAt;
            const timeB = b.createdAt;

            let comparison = 0;
            if (timeA > timeB) {
              comparison = -1;
            } else if (timeA < timeB) {
              comparison = 1;
            }
            return comparison;
          }
          data.sort(compare);
          // Save sorted data
          setLogs(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 1000);
    return () => {
      clearInterval(iID);
    };
  }, [url]);

  return (
    <div>
      <h1>Logs</h1>
      <table id='logsTable'>
        <thead>
          <tr style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)' }}>
            <th>time</th>
            <th>scraper</th>
            <th>message</th>
            <th>source</th>
          </tr>
        </thead>

        <tbody>
          {logs.map((log) => {
            // Date format
            const dateObject = new Date(log.createdAt);
            const localDate = dateObject.toLocaleString();

            // Log color
            let color;
            switch (log.type.toLowerCase()) {
              case 'danger':
                color = 'pink';
                break;
              case 'warning':
                color = 'lightyellow';
                break;
              case 'success':
                color = 'lightgreen';
                break;
              default:
                color = 'lightblue';
            }

            return (
              <tr style={{ backgroundColor: color }} key={log._id}>
                <td>{localDate}</td>
                <td>{log.scraper}</td>
                <td>{log.msg}</td>
                <td>{log.info}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Logs;
