let id = -1
let arr1 = []
let arr2 = []
let arr = JSON.parse(localStorage.getItem('books'))

let manageData = () => {
  let book = document.getElementById('book').value
  let author = document.getElementById('author').value
  let publisher = document.getElementById('publisher').value
  let date = document.getElementById('date').value
  if (book == '' || author == '' || publisher == '' || date == '') {
    alert('Please fill all the fields!')
  } else {
    if (id == -1) {
      let arr = JSON.parse(localStorage.getItem('books'))
      if (arr == null) {
        let dataObj = { book, author, publisher, date }
        let data = [dataObj]
        localStorage.setItem('books', JSON.stringify(data))
      } else {
        let arrObj = { book, author, publisher, date }
        if (
          arr.some(value => {
            return value.book == book
          })
        ) {
          alert('The book with the same name is already present.')
        } else {
          arr.push(arrObj)
          localStorage.setItem('books', JSON.stringify(arr))
        }
      }
      // alert('New record has been added successfully!')
    } else {
      let arr = JSON.parse(localStorage.getItem('books'))
      let arrObj = { book, author, publisher, date }
      arr.splice(id, 1, arrObj)
      localStorage.setItem('books', JSON.stringify(arr))
      document.getElementById('submit').innerHTML = 'submit'
      // alert('Record has been updated')
    }
    document.getElementById('form').reset()
    selectData()
  }
}

const selectData = () => {
  let arr = JSON.parse(localStorage.getItem('books'))
  let srNo = 1
  let tbl = document.getElementById('data-table')
  let x = tbl.rows.length
  while (--x) {
    tbl.deleteRow(x)
  }
  arr.map(function (val1, i) {
    let r = tbl.insertRow()
    let cell0 = r.insertCell()
    let cell1 = r.insertCell()
    let cell2 = r.insertCell()
    let cell3 = r.insertCell()
    let cell4 = r.insertCell()
    let cell5 = r.insertCell()

    cell0.innerHTML = srNo
    cell1.innerHTML = arr[i].book
    cell2.innerHTML = arr[i].author
    cell3.innerHTML = arr[i].publisher
    cell4.innerHTML = arr[i].date
    cell5.innerHTML = `<button class="edit-btn" onClick=editData(${i})>Edit</button>
                      <button class="del-btn" onClick="deleteData(${i})">Delete</button>`
    srNo++
  })
}

let editData = rid => {
  id = rid
  let arr = JSON.parse(localStorage.getItem('books'))
  let studObj = arr[rid]
  document.getElementById('book').value = studObj.book
  document.getElementById('author').value = studObj.author
  document.getElementById('publisher').value = studObj.publisher
  document.getElementById('date').value = studObj.date
  document.getElementById('submit').innerHTML = 'update'
}

let deleteData = rid => {
  let arr = JSON.parse(localStorage.getItem('books'))
  arr.splice(rid, 1)
  localStorage.setItem('books', JSON.stringify(arr))
  selectData()
}

let resetClicked = () => {
  id = -1
  // document.getElementById('submit').innerHTML = 'Submit'
}

const getauthors = () => {
  let arr = JSON.parse(localStorage.getItem('books'))
  let srNo = 1
  let tbl = document.getElementById('author-table')
  let x = tbl.rows.length
  while (--x) {
    tbl.deleteRow(x)
  }
  let isBookPresent = -1
  arr.map(function (val1, i) {
    if (arr1.length === 0) {
      arr1.push({ author: arr[i].author, book: [arr[i].book] })
    } else {
      let isAuthorPresent = arr1.filter(checkAuthor)
      function checkAuthor (author) {
        return author.author === arr[i].author
      }
      if (isAuthorPresent.length === 0) {
        arr1.push({ author: arr[i].author, book: [arr[i].book] })
      } else {
        arr1.map(function (val2, j) {
          arr1[j].book.map(function (val3, k) {
            if (arr[i].author === arr1[j].author) {
              if (arr[i].book === arr1[j].book[k]) {
                isBookPresent = k
              }
            }
          })
          if (isBookPresent === -1 && arr[i].author === arr1[j].author) {
            arr1[j].book.push(arr[i].book)
          }
        })
      }
    }
  })

  for (let i = 0; i < arr1.length; i++) {
    let r = tbl.insertRow()
    let cell0 = r.insertCell()
    let cell1 = r.insertCell()
    let cell2 = r.insertCell()
    let cell3 = r.insertCell()
    let cell4 = r.insertCell()

    cell0.innerHTML = srNo
    cell1.innerHTML = arr1[i].author
    cell2.innerHTML = arr1[i].book.join('<br>')
    cell3.innerHTML = arr1[i].book.length
    cell4.innerHTML = `<button class="delete-btn" onClick="deleteAuthor(${i})">Delete</button>`

    srNo++
  }
}

let deleteAuthor = rid => {
  let delBook = []

  for (let i = 0; i < arr1[rid].book.length; i++) {
    delBook.push({ book: arr1[rid].book[i] })
  }
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < delBook.length; j++) {
      if (arr[i].book === delBook[j].book) {
        arr.splice(i, 1)
      }
    }
  }
  localStorage.setItem('books', JSON.stringify(arr))
  getauthors()
  window.location.reload(true)
}

const getPublishers = () => {
  let arr = JSON.parse(localStorage.getItem('books'))
  let srNo = 1
  let tbl = document.getElementById('publisher-table')
  let x = tbl.rows.length
  while (--x) {
    tbl.deleteRow(x)
  }
  let isBookPresent = -1
  arr.map(function (val1, i) {
    if (arr2.length === 0) {
      arr2.push({ publisher: arr[i].publisher, book: [arr[i].book] })
    } else {
      let isPublisherPresent = arr2.filter(checkPublisher)
      function checkPublisher (publisher) {
        return publisher.publisher === arr[i].publisher
      }
      if (isPublisherPresent.length === 0) {
        arr2.push({ publisher: arr[i].publisher, book: [arr[i].book] })
      } else {
        arr2.map(function (val2, j) {
          arr2[j].book.map(function (val3, k) {
            if (arr[i].publisher === arr2[j].publisher) {
              if (arr[i].book === arr2[j].book[k]) {
                isBookPresent = k
              }
            }
          })
          if (isBookPresent === -1 && arr[i].publisher === arr2[j].publisher) {
            arr2[j].book.push(arr[i].book)
          }
        })
      }
    }
  })
  for (let i = 0; i < arr2.length; i++) {
    let r = tbl.insertRow()
    let cell0 = r.insertCell()
    let cell1 = r.insertCell()
    let cell2 = r.insertCell()
    let cell3 = r.insertCell()
    let cell4 = r.insertCell()

    cell0.innerHTML = srNo
    cell1.innerHTML = arr2[i].publisher
    cell2.innerHTML = arr2[i].book.join('<br>')
    cell3.innerHTML = arr2[i].book.length
    cell4.innerHTML = `<button class="delete-btn" onClick="deletePublisher(${i})">Delete</button>`
    srNo++
  }
}

let deletePublisher = rid => {
  let delBook = []
  for (let i = 0; i < arr2[rid].book.length; i++) {
    delBook.push({ book: arr2[rid].book[i] })
  }

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < delBook.length; j++) {
      if (arr[i].book === delBook[j].book) {
        arr.splice(i, 1)
      }
    }
  }
  localStorage.setItem('books', JSON.stringify(arr))
  getPublishers()
  window.location.reload(true)
}


book.addEventListener('keyup', function (event) {
  if (event.getModifierState('CapsLock')) {
    alert('Caps Lock is on')
  }
})

author.addEventListener('keyup', function (event) {
  if (event.getModifierState('CapsLock')) {
    alert('Caps Lock is on')
  }
})

publisher.addEventListener('keyup', function (event) {
  if (event.getModifierState('CapsLock')) {
    alert('Caps Lock is on')
  }
})
