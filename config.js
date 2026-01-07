export default {
  "baseURL": "https://api.polanji.com",
  "credentials": {
    "username": "performancetest09@gmail.com",
    "password": "user123456"
  },
  "courseId": 19,
  "userId": 13,
  "loadTest": {
    "stages": [
      { "duration": "5s", "target": 5 },
      { "duration": "10s", "target": 5 },
      { "duration": "5s", "target": 0 }
    ]
  },
  "stressTest": {
    "stages": [
      { "duration": "5s", "target": 5 },
      { "duration": "10s", "target": 5 },
      { "duration": "5s", "target": 0 }
    ]
  }
};