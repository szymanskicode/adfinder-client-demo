export default function saveLog(props) {
  const { type, msg, info } = props;
  const url = (process.env.REACT_APP_API_URL || '') + '/api/admin/log';
  const data = { type, msg, info };

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      return null;
    })
    .catch((err) => {
      return null;
    });
}
