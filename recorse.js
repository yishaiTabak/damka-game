// const isPrime = (el) => {
//     if(el < 2)
//         return false
//     for(let j = 2; j <= el/2; j++) {
//         if(el % j === 0)
//             return false
//     }
//     return true
// }
// const isRe = (num, ...rest) => {
//     if (num === 1) return false
//     const denominator = rest.length === 2? num -1: rest[0]
//     if(denominator< 2) return true
//     return num%denominator === 0? false: isRe(num, denominator-1)
// }
// numbers = [4, 5]
// for(let i =1; i< 1000;i++)
//     numbers.push(i)
// let timeb = Date.now()
// console.log(numbers.filter(isRe), Date.now() - timeb)
// timeb = Date.now()
// console.log(numbers.filter(isPrime), Date.now() - timeb)
// const myMap = (arr, callBack) => {
//     let newArr = []
//     for(let el of arr) {
//         newArr.push(callBack(el))
//     }
//     return newArr
// }
// console.log(myMap([1,2,3,4, 6, 10], (el) =>
//     el ** 2 
// ))

// let arr = ['a', 'b', 'c', 'h', 'r', 'v', 'g', 'A']
// arr.sort((el2, el1) => {
//     if(el1 === el2) return 0
//     if(el2>el1) return 1
//     return -1
// })
// console.log(arr)

// const myReduce = (arr, callback, initialValue) => {
//     if(initialValue != null)
//     {
//         for(let a of arr) {
//             initialValue = callback(initialValue, a)
//         }
//     }
//     else {
//         initialValue = arr[0]
//         for(let i = 1; i< arr.length;i++) {
//             initialValue = callback(initialValue, arr[i])
//         }
//     }
//     return initialValue
// }
// let obj = {}
// console.log(myReduce([['a',1], ['b', 2], ['c', 3]], (acc, [key, value]) => {
//     acc[key] = value
//     return acc    
// }, obj))
// function aaa(first, second, start = 0) {
//     let Ind = -1
//     for(let i = start; i < first.length; i++) {
//         for(let j = 0; j < second.length && j + i < first.length; j++) {
//             if(second[j] !== first[i + j])
//                 break
//             if (j === second.length - 1)
//                 Ind = i
//         }
//     } 
//     return Ind
// }
// console.log(aaa('akjlfnkbafkdjfaknkldn', 'ak'))
// console.log('akjlfnkbafkdjfaknkldn'.lastIndexOf('ak'))
// const mySlice = (str,start = 0, end = str.length-1) => {
//     let result = ''
//     for(;start<=end && start < str.length;start++) {
//         result += str[start]
//     }
//     return result
// }
// console.log(mySlice('salkjfhskdjhsn', 5, 100))
// function aaa(first, second, start = 0) {
//     let Ind = 0
//     for(let i = start; i < first.length; i++) {
//         for(let j = 0; j < second.length && j + i < first.length; j++) {
//             if(second[j] !== first[i + j])
//                 break
//             if (j === second.length - 1)
//                 Ind += 1
//         }
//     } 
//     return Ind === 0? -1: Ind
// }

// console.log(aaa('aareerbtradsresaaesarearearearearearearearaearearear', 'arel', 3))
// console.log(strInStr('aareerbtradsresaaesarearearearearearearearaearearear', 'arel', 3))

// function strInStr(first, second, start = 0) {
//     let index = first.indexOf(second, start)
//     if(index != -1)
//         return strInStr(first, second, index + 1) + 1
//     if(start === 0)
//         return -1
// //     return 0
//  

// const myreplaceAll = (str, toReplace, sub) =>{
//     let result = str
//     while(true){
//         if(!str.includes(toReplace) || toReplace === sub)
//             return result
//         result = str.slice(0, str.indexOf(toReplace)).concat(sub, str.slice(str.indexOf(toReplace) + toReplace.length))
//         str = result
//     }
// }

// console.log(myreplaceAll('i love dog because dogs are so cute and dog love meat', 'dog', 'cat'))

// const myreplaceAllRecursive = (str, toReplace, sub) =>{
//     if(!str.includes(toReplace))
//         return str
//     return str.slice(0, str.indexOf(toReplace)).concat(sub) + myreplaceAllRecursive(str.slice(str.indexOf(toReplace) + toReplace.length), toReplace, sub)
// }
// console.log(myreplaceAllRecursive('i love dog because dogs are so cute and dog love meat', 'dog', 'cat'))

// const mySplit =(str, deliminator) => {
//     let result = []
//     if(deliminator === undefined) 
//         result.push(str)
//     else if(deliminator === '') {
//         for(let i =0;i<str.length;i++)
//             result.push(str[i])
//     }
//     else {
//         let newStr = str
//         while(newStr.includes(deliminator)) {
//             if(newStr.slice(0,newStr.indexOf(deliminator)) !== '')
//                 result.push(newStr.slice(0,newStr.indexOf(deliminator)))
//             newStr = newStr.slice(newStr.indexOf(deliminator) + deliminator.length)
//         }
//         if(newStr !== '')
//             result.push(newStr)
//     }
//     return result
// }
// console.log(mySplit('what bbbbbbare you do today bbb bbb', 'bbbh'))

// const spli = (str, deliminator) => {
//     if(deliminator === undefined)
//         return[str]
//     else if(deliminator === '') {
//         let result = []
//         for(let i =0;i<str.length;i++)
//             result.push(str[i])
//         return result
//     }
//     if(str.lastIndexOf(deliminator) === str.length - deliminator.length)
//         return spli(str.slice(0, str.length - deliminator.length), deliminator)
//     if (!str.includes(deliminator))
//         return [str]
//     if(str.indexOf(deliminator) === 0)
//         return spli(str.slice(deliminator.length), deliminator)
//     return [str.slice(0, str.indexOf(deliminator))].concat(spli(str.slice(str.indexOf(deliminator) + deliminator.length), deliminator))
// }
// console.log(spli('what bbbbbbare you do today bbb bbb', ' '))
// console.log('a b c d'.split('b'))

// const comb = (str) => {
//     mySet = new Set()
//     rec(str.split(''), mySet, '')
//     return mySet

// }
// const rec = (arr, set, char) => {    
//     for(let i = 0; i<arr.length;i++) {
//         let newChar = char + arr[i]
//         let newArr = [...arr]
//         newArr.splice(i, 1)
//         rec(newArr,set, newChar)
//     }
//     if(arr.length === 0) {
//         set.add(char)
//         return
//     }
// }
// console.log(7*6*5*4*6)
let myDict = new Map()
const search = document.getElementById('search')
const sel = document.getElementById('select')
const disp = () => {
const mydiv = document.getElementById('upper-box')

myDict = sel.value === 'regular'? new Map([...myDict.entries()].sort()): new Map([...myDict.entries()].sort().reverse()) 
mydiv.innerHTML = ''
for(let [key,value] of myDict) {
    if(!key.includes(search.value))
        continue
    const aa = document.createElement('div')
    aa.innerHTML = `name: ${key} ; phone: ${value}    `
    mydiv.appendChild(aa)
    const del = document.createElement('button')
    del.innerHTML = 'delete'
    aa.appendChild(del)
    del.addEventListener('click', () => {
        myDict.delete(key)
        disp()
    })
}
}
const addPhone = document.getElementById('submit')
addPhone.addEventListener('click', () => {
    const phone = document.getElementById('phone')
    const mas = document.getElementById('massage')
    if(phone.value.includes(' ')) {
        mas.className = 'red'
    }
    else {
        if(phone.value.includes('-')) {
            phone.value = phone.value.replace('-','')
        }
        const name = document.getElementById('name')
        myDict.set(name.value,phone.value)
        mas.className = 'none'
        phone.value = ''
        name.value = ''
        disp()
    }
    console.log(myDict)
})
search.addEventListener('keyup', () => {
    disp()
})
sel.addEventListener('change' ,() => {
    disp()
})