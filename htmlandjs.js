const myname = document.getElementById('name')
const age = document.getElementById('age')
const password = document.getElementById('password')
const repeat = document.getElementById('repeat')
const form = document.getElementById('form')
const submit = document.getElementById('submit')
const massname = document.getElementById('massname')
const massage = document.getElementById('massage')
const masspassword = document.getElementById('masspassword')
const massrepeat = document.getElementById('massrepeat')
const secondmassname = document.getElementById('secondmassname')
let isname = true, isage = true, ispass = true, isrepeat = true
submit.disabled = true
myname.addEventListener('blur', () => {
    if(myname.value === 'moshe'){
        massname.className = 'empty'
        secondmassname.className = 'red'
        isname = true
    }
    else if(myname.value.length === 0) {
        secondmassname.className = 'empty'
        massname.className = 'red'
        isname = true
    }
    else {
        secondmassname.className = 'empty'
        massname.className = 'empty'
        isname = false
    }
    submit.disabled = issub()
})
age.addEventListener('blur', () => {
    if(age.value < 12) {
        massage.className = 'red'
        isage = true
    }
    else {
        massage.className = 'empty'
        isage = false
    }
    submit.disabled = issub()
})
password.addEventListener('blur', () => {
    if(password.value.length < 6) {
        masspassword.className = 'red'
        ispass = true
    }
    else {
        masspassword.className = 'empty'
        ispass = false
    }
    submit.disabled = issub()
})
repeat.addEventListener('blur', () => {
    if(repeat.value !== password.value) {
        massrepeat.className = 'red'
        isrepeat = true
    }
    else {
        massrepeat.className = 'empty'
        isrepeat = false
    }
    submit.disabled = issub()
})
form.addEventListener('submit', (event) => {
    event.preventDefault()
    const last = document.getElementById('last')
    last.innerHTML = `name: ${myname.value}
                      age: ${age.value}
                      password: ${password.value}`
})
function issub(){
    return (isname || isage || ispass || isrepeat)
}
