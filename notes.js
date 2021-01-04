const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)


    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
    
       saveNotes(notes)
       console.log(chalk.bgGreen('New note added!'))
    }else{
        console.log(chalk.bgRed('Note title taken!'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)

    if(notesToKeep.length === notes.length){
        console.log(chalk.bgRed('No note found!'))
    }else{
        console.log(chalk.bgGreen('Note removed!'))
    }
    saveNotes(notesToKeep)
}

const listNotes = () => {
    console.log(chalk.bgBlue('Your notes:'))
    const notes = loadNotes()
    notes.forEach((note) => console.log(chalk.blue(note.title)))
}

const readNote = (title) => {
    const notes = loadNotes()
    const toRead = notes.find((note) => note.title === title)

    if(toRead){
        console.log(chalk.blue(toRead.title))
        console.log(toRead.body)
    }else{
        console.log(chalk.red('Note not found'))
    }
}

const saveNotes = (notes) =>{
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () =>{

    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch(e){
        return []
    }
   
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}