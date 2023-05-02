import logo from './logo.svg';
import './App.css';

import { collection, query, orderBy, onSnapshot } from "firebase/firestore"

import { db } from "./firebase/firebase";

import { useState, useEffect } from 'react'

import { ref, onValue, update, push, child, remove, set } from "firebase/database";

function App() {

  // get all rooms
  useEffect(() => {
    console.log(db)
    const roomRef = ref(db, 'rooms');
    onValue(roomRef, (snapshot) => {
      console.log(snapshot.val())
    })
  }, [])

  const [users, setUsers] = useState([])
  const [usersOwe, setUsersOwe] = useState({})
  const [events, setEvents] = useState({})

  // get rooms by id
  useEffect(() => {
    const roomRef = ref(db, 'rooms/sdvsdv',);
    onValue(roomRef, (snapshot) => {
      var data = snapshot.key;
      console.log(data)
    })
  }, [])

  // get users
  useEffect(() => {
    const roomRef = ref(db, 'rooms/-NUG3IODsuSSEjz8coqn/users',);
    onValue(roomRef, (snapshot) => {
      var users = []

      snapshot.forEach((childSnapshot) => {
        users.push(childSnapshot.val().name)
        // users_owe[childSnapshot.val().name] = 0
      })

      setUsers(users)

      console.log(users)
    })
  }, [])

  // get all events
  useEffect(() => {
    const roomRef = ref(db, 'rooms/-NUG3IODsuSSEjz8coqn/events');
    onValue(roomRef, (snapshot) => {
      var data = snapshot.val();
      console.log(data)
      setEvents(data)
    })
  }, [])

  // get and calculate owe
  useEffect(() => {
    // build user owe
    var users_owe = {}
    for (const userKey in users) {
      var user = users[userKey]
      var user_owe_array = {}
      for (const userKey2 in users) {
        var user2 = users[userKey2]
        if (user !== user2) {
          user_owe_array[user2] = 0
        }
      }
      users_owe[user] = user_owe_array
    }

    for (const eventKey in events) {
      var event = events[eventKey]
      const paid_by = event['paid_by']
      var items = event['items']

      console.log(event)
      console.log(paid_by)
      console.log(items)

      for (const itemKey in items) {
        var item = items[itemKey]
        const ppu = item['ppu']
        console.log(item)
        console.log(ppu)
        for (const userKey in users) {
          var user = users[userKey]
          console.log(user)

          if (user !== paid_by) {
            var amount = item[user] * ppu
            users_owe[user][paid_by] += amount
          }
        }
      }
    }
    console.log(users_owe)
    setUsersOwe(users_owe)
  }, [events])

  // create room
  const createRoom = () => {
    // const roomRef = ref(db, 'rooms/')
    // const newRoomRef = roomRef.push();
    // newRoomRef.set({
    //   events: {},
    //   users: {}
    // })

    const newRoomData = {
      title: "JAPAN",
      events: {},
      users: {}
    }

    const newRoomKey = push(child(ref(db), 'rooms')).key;

    const updates = {}
    updates['rooms/' + newRoomKey] = newRoomData
    update(ref(db), updates)
    return newRoomKey;
  }

  // add users in room
  const addUsers = () => {
    const newUsers = ["jab", "januzz"]

    for (const userKey in newUsers) {
      const user = newUsers[userKey]

      const newUserData = {
        name: user,
      }

      const newUserKey = push(child(ref(db), 'rooms/' + '-NUG3IODsuSSEjz8coqn' + '/users/')).key;
      const updates = {}
      updates['rooms/' + '-NUG3IODsuSSEjz8coqn' + '/users/' + newUserKey] = newUserData
      update(ref(db), updates)
    }
  }

  // add events
  const addEvents = (name, id, paid_by) => {

    const newEventData = {
      name: name,
      paid_by: paid_by
    }

    const newEventKey = push(child(ref(db), 'rooms/' + id + '/events/')).key;
    const updates = {}
    updates['rooms/' + id + '/events/' + newEventKey] = newEventData
    update(ref(db), updates)

    // addItems('-NUG3IODsuSSEjz8coqn', newEventKey, "tomato soup", 3, {januzz: 1, jab: 1})
    return newEventKey
  }

  const addItems = (id, eventid, name, price, users) => {

    const newItemData = {
      name: name,
      price: price
    }

    var unitCount = 0

    for (const userKey in users) {
      newItemData[userKey] = users[userKey]
      unitCount += users[userKey]
    }

    var ppu = (price / unitCount).toFixed(2)

    newItemData['ppu'] = Number(ppu)

    console.log(newItemData)

    const newItemKey = push(child(ref(db), 'rooms/' + id + '/events/' + eventid + '/items/')).key;
    const updates = {}
    updates['rooms/' + id + '/events/' + eventid + '/items/' + newItemKey] = newItemData
    update(ref(db), updates)

  }

  const removeItem = (id, eventid, itemid) => {
    remove(ref(db, 'rooms/' + id + '/events/' + eventid + '/items/' + itemid))
  }

  const removeEvent = (id, eventid) => {
    remove(ref(db, 'rooms/' + id + '/events/' + eventid))
  }

  const updateItem = (id, eventid, itemid, name, price, users) => {
    const newItemData = {
      name: name,
      price: price
    }

    var unitCount = 0

    for (const userKey in users) {
      newItemData[userKey] = users[userKey]
      unitCount += users[userKey]
    }

    var ppu = (price / unitCount).toFixed(2)

    newItemData['ppu'] = Number(ppu)

    console.log(newItemData)

    const updates = {}
    updates['rooms/' + id + '/events/' + eventid + '/items/' + itemid] = newItemData
    update(ref(db), updates)
  }

  const updateEvent = (id, eventid, name, paid_by) => {
    const newItemData = {
      name: name,
      paid_by: paid_by,
      items: {}
    }

    // const updates = {}
    // updates['rooms/' + id + '/events/' + eventid] = newItemData
    update(ref(db, 'rooms/' + id + '/events/' + eventid + "/"), {name: name, paid_by: paid_by})
  }

  useEffect(() => {
    // console.log(createRoom())
    // addUsers()
    // addEvents("SOUP", '-NUG3IODsuSSEjz8coqn', 'jab')
    // addItems('-NUG3IODsuSSEjz8coqn', '-NUGDURZBI_feEuvHzj4', "tomato soup", 3, {januzz: 1, jab: 1})

    // var eventid = addEvents("drinks", '-NUG3IODsuSSEjz8coqn', 'januzz')
    // addItems('-NUG3IODsuSSEjz8coqn', eventid, "mushroom soup", 3, {januzz: 1, jab: 1})
    // addItems('-NUG3IODsuSSEjz8coqn', eventid, "orange", 1, {januzz: 1, jab: 0})
    // addItems('-NUG3IODsuSSEjz8coqn', eventid, "code", 2, {januzz: 0, jab: 1})

    // removeItem('-NUG3IODsuSSEjz8coqn', '-NUGHo-bBL1HTmp1gdUE', '-NUGHo-oL1BR9gKlO_Jp')
    // removeEvent('-NUG3IODsuSSEjz8coqn', '-NUGHo-bBL1HTmp1gdUE')
    // updateItem('-NUG3IODsuSSEjz8coqn', '-NUGO3YozZmBm5sIT4El', '-NUGO3YwxXUpDFoRZqzY', "tomato soup3", 4, {januzz: 1, jab: 1})
    
    // updateEvent('-NUG3IODsuSSEjz8coqn', '-NUGO3YozZmBm5sIT4El', "SOOOUP2", "jab")
  }, [])


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
