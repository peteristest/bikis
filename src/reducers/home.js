const initialState = {
  projectName: 'peter.is',
  ownerName: 'peteris',
  color: 'rgb(153, 102, 255)',
  disciplines: [
    'Design', // ✏️
    'Tech', // 💾
    'Internet', // 🌐
    'Cycling', // 🚴
    'Travel', // ️️✈️
    'Photo' // 📷
  ]
}

function home (state = initialState, action) {
  return state
}

export default home
