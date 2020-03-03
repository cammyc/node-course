const fs = require('fs')
const chalk = require('chalk')


const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if(!duplicateNote){
        notes.push({
            title: title,
            body: body
        })
    
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    }else{
        console.log(chalk.red.inverse('Note title taken!'))
    }
}

const removeNote = (noteTitle) => {
    const notes = loadNotes()
    const updatedNotes = notes.filter((note) => note.title !== noteTitle)

    if(updatedNotes.length === notes.length){
        console.log(chalk.red.inverse('The note you want to remove does not exist!'))
    }else{
        console.log(chalk.green.inverse('Note deleted.'))
        saveNotes(updatedNotes)
    }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.inverse('****Your Notes****'))
    notes.forEach(note => {
        console.log(chalk.green(note.title))
        // console.log('-' + chalk.grey(note.body))
    });
}

const readNote = (noteTitle) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === noteTitle)
    if(note){
        console.log(chalk.grey.bold(note.title))
        console.log(chalk.yellow(note.body))
    }else{
        console.log(chalk.red.inverse('Note not found!'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }catch (e){
        return []
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}